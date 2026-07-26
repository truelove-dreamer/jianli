const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const requiredFiles = [
  "index.html",
  "styles.css",
  "script.js",
  "assets/resume-li-haohong.pdf",
  "assets/16445083_3840_2160_30fps.mp4",
  "assets/hero-fallback.svg",
];

const requiredSnippets = [
  'href="styles.css"',
  'src="script.js"',
  'id="about"',
  'id="project"',
  'id="works"',
  'id="awards"',
  'id="contact"',
  "assets/16445083_3840_2160_30fps.mp4",
  "assets/resume-li-haohong.pdf",
  "1162938454@qq.com",
  "LIHAOHONG",
  "hero-dock",
  "profile-space",
  "关注 AI 应用开发、全栈工程与数据分析",
  "电商销售数据智能分析平台",
  "未来作品",
  "证书下载",
  "award-panel",
  "data-certificate",
  "蓝桥杯",
];

const failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    failures.push(`Missing required file: ${file}`);
  }
}

const indexPath = path.join(root, "index.html");
if (fs.existsSync(indexPath)) {
  const html = fs.readFileSync(indexPath, "utf8");
  for (const snippet of requiredSnippets) {
    if (!html.includes(snippet)) {
      failures.push(`index.html missing snippet: ${snippet}`);
    }
  }

  const firstAward = html.match(/<button[\s\S]*?class="award-item is-active"[\s\S]*?<strong>(.*?)<\/strong>/);
  if (!firstAward || !firstAward[1].includes("蓝桥杯")) {
    failures.push("First active award should be 蓝桥杯.");
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Site structure verification passed.");
