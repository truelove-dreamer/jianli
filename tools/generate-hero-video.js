const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const outputPath = path.resolve(__dirname, "../assets/hero-tech-loop.webm");
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: fs.existsSync(chromePath) ? chromePath : undefined,
    args: ["--autoplay-policy=no-user-gesture-required"],
  });
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } });

  const base64 = await page.evaluate(async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 540;
    document.body.append(canvas);
    const ctx = canvas.getContext("2d");
    const duration = 4200;
    const recordMs = 1800;
    const start = performance.now();
    const stream = canvas.captureStream(30);
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";
    const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 550000 });
    const chunks = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    function draw(now) {
      const t = ((now - start) % duration) / duration;
      const width = canvas.width;
      const height = canvas.height;

      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "#030712");
      bg.addColorStop(0.36, "#071c2d");
      bg.addColorStop(0.72, "#0b1530");
      bg.addColorStop(1, "#140b24");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(width * 0.74, height * 0.38, 0, width * 0.74, height * 0.38, 570);
      glow.addColorStop(0, "rgba(73, 255, 226, 0.28)");
      glow.addColorStop(0.36, "rgba(88, 166, 255, 0.18)");
      glow.addColorStop(0.7, "rgba(171, 92, 255, 0.11)");
      glow.addColorStop(1, "rgba(7, 16, 29, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(216, 255, 247, 0.075)";
      ctx.lineWidth = 1;
      const offset = t * 72;
      for (let x = -72 + offset; x < width; x += 72) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - 170, height);
        ctx.stroke();
      }
      for (let y = -72 + offset; y < height; y += 72) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y - 120);
        ctx.stroke();
      }

      const nodes = [
        [750, 160, "#49ffe2", 0],
        [930, 220, "#8bb8ff", 0.16],
        [1120, 135, "#ffc857", 0.33],
        [1170, 388, "#49ffe2", 0.5],
        [930, 520, "#b18cff", 0.66],
        [670, 340, "#ffc857", 0.82],
      ];

      ctx.lineWidth = 2;
      for (let i = 0; i < nodes.length; i++) {
        const [x1, y1, color] = nodes[i];
        const [x2, y2] = nodes[(i + 1) % nodes.length];
        ctx.strokeStyle = color.replace(")", ", 0.32)").replace("rgb", "rgba");
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        const midX = (x1 + x2) / 2 + Math.sin(t * Math.PI * 2 + i) * 20;
        const midY = (y1 + y2) / 2 + Math.cos(t * Math.PI * 2 + i) * 20;
        ctx.quadraticCurveTo(midX, midY, x2, y2);
        ctx.stroke();
      }

      for (const [x, y, color, phase] of nodes) {
        const pulse = 0.5 + Math.sin((t + phase) * Math.PI * 2) * 0.5;
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.58 + pulse * 0.36;
        ctx.beginPath();
        ctx.arc(x + Math.sin(t * Math.PI * 2 + phase) * 10, y + Math.cos(t * Math.PI * 2 + phase) * 8, 5 + pulse * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      const panelX = 810 + Math.sin(t * Math.PI * 2) * 10;
      const panelY = 226 + Math.cos(t * Math.PI * 2) * 8;
      ctx.fillStyle = "rgba(3, 9, 20, 0.62)";
      ctx.strokeStyle = "rgba(219, 255, 250, 0.28)";
      ctx.lineWidth = 1;
      roundRect(ctx, panelX, panelY, 372, 236, 20);
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = "rgba(73, 255, 226, 0.18)";
      for (let i = 0; i < 4; i++) {
        roundRect(ctx, panelX + 22 + i * 82, panelY + 20, 58, 36, 8);
        ctx.stroke();
      }

      for (let i = 0; i < 8; i++) {
        const bar = 28 + Math.sin(t * Math.PI * 2 + i * 0.72) * 24 + i * 9;
        ctx.fillStyle = i % 3 === 0 ? "rgba(255, 200, 87, 0.7)" : i % 2 ? "rgba(139, 184, 255, 0.66)" : "rgba(73, 255, 226, 0.72)";
        roundRect(ctx, panelX + 42 + i * 32, panelY + 188 - bar, 16, bar, 5);
        ctx.fill();
      }

      ctx.strokeStyle = "rgba(73, 255, 226, 0.74)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let i = 0; i < 190; i++) {
        const x = panelX + 48 + i * 1.35;
        const y = panelY + 104 + Math.sin(i * 0.13 + t * Math.PI * 2) * 22 + Math.cos(i * 0.035) * 15;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = "rgba(177, 140, 255, 0.32)";
      ctx.lineWidth = 1;
      for (let ring = 0; ring < 4; ring++) {
        ctx.beginPath();
        ctx.ellipse(1020, 330, 180 + ring * 34 + Math.sin(t * Math.PI * 2) * 8, 74 + ring * 16, -0.26, 0, Math.PI * 2);
        ctx.stroke();
      }

      const scanX = width * (0.34 + t * 0.66);
      const scan = ctx.createLinearGradient(scanX - 80, 0, scanX + 80, 0);
      scan.addColorStop(0, "rgba(73, 255, 226, 0)");
      scan.addColorStop(0.5, "rgba(73, 255, 226, 0.2)");
      scan.addColorStop(1, "rgba(73, 255, 226, 0)");
      ctx.fillStyle = scan;
      ctx.fillRect(scanX - 80, 0, 160, height);

      if (now - start < duration) requestAnimationFrame(draw);
    }

    function roundRect(context, x, y, width, height, radius) {
      context.beginPath();
      context.moveTo(x + radius, y);
      context.arcTo(x + width, y, x + width, y + height, radius);
      context.arcTo(x + width, y + height, x, y + height, radius);
      context.arcTo(x, y + height, x, y, radius);
      context.arcTo(x, y, x + width, y, radius);
      context.closePath();
    }

    recorder.start(200);
    requestAnimationFrame(draw);
    await new Promise((resolve) => setTimeout(resolve, recordMs + 250));
    recorder.stop();
    await new Promise((resolve) => (recorder.onstop = resolve));
    const blob = new Blob(chunks, { type: mimeType });
    const buffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  });

  fs.writeFileSync(outputPath, Buffer.from(base64, "base64"));
  await browser.close();
  console.log(`Wrote ${outputPath}`);
})();
