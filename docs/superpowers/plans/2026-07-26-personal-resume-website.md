# Personal Resume Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished static personal resume website for Li Haohong with a technology-style video hero, future project slots, and certificate sections.

**Architecture:** Use a dependency-free static site so it can be opened directly or deployed to static hosting. Content lives in semantic HTML, presentation in one CSS file, and small progressive interactions in one JavaScript file.

**Tech Stack:** HTML, CSS, vanilla JavaScript.

---

## File Structure

- `index.html`: page content and semantic section structure.
- `styles.css`: responsive visual system, layout, cards, timelines, and mobile states.
- `script.js`: active anchor highlighting, mobile navigation toggle, current year, and placeholder card affordances.
- `assets/resume-li-haohong.pdf`: local copy of the resume PDF for download.
- `assets/hero-tech-loop.mp4`: downloaded local looping technology-style hero video.
- `assets/hero-tech-loop.webm`: generated fallback looping technology-style hero video.
- `assets/hero-fallback.svg`: static fallback image for the hero.
- `.gitignore`: ignores `.superpowers/` visual brainstorming artifacts.

### Task 1: Tests and Static Content Shell

**Files:**
- Create: `tools/verify-site.js`
- Create: `index.html`
- Create: `assets/resume-li-haohong.pdf`

- [ ] **Step 1: Create a structure verification script**

Create `tools/verify-site.js` to assert required files, anchors, resume link, video source, and future project/certificate placeholder sections.

- [ ] **Step 2: Run verification and watch it fail**

Run: `node tools/verify-site.js`

Expected: FAIL because `index.html` does not exist yet.

- [ ] **Step 3: Copy the resume PDF**

Run: `Copy-Item -LiteralPath 'C:\Users\亦已哉\Desktop\（备份）李浩鸿个人简历.pdf' -Destination 'assets\resume-li-haohong.pdf' -Force`

Expected: `assets/resume-li-haohong.pdf` exists.

- [ ] **Step 4: Create semantic HTML**

Create `index.html` with these sections: navigation, video hero, about, education, project case study, future works, awards with certificate details, skills, contact footer.

- [ ] **Step 5: Check anchors**

Run: `Select-String -Path index.html -Pattern 'id="about"|id="project"|id="works"|id="awards"|id="contact"'`

Expected: all six anchors are present.

### Task 2: Responsive Visual Design

**Files:**
- Create: `styles.css`
- Modify: `index.html`
- Create: `assets/hero-fallback.svg`

- [ ] **Step 1: Add the stylesheet link**

Add `<link rel="stylesheet" href="styles.css">` in the document head.

- [ ] **Step 2: Implement layout and components**

Style the page with a professional light theme, sticky navigation, video hero overlay, proof metrics, case-study cards, future-work placeholders, awards timeline, certificate slots, and mobile-safe spacing.

- [ ] **Step 3: Verify color balance**

Run: `Select-String -Path styles.css -Pattern '#[0-9a-fA-F]{3,6}|rgb|hsl'`

Expected: no one-note single-hue palette dominates the stylesheet.

### Task 3: Video Asset and Small Interactions

**Files:**
- Create: `assets/hero-tech-loop.webm`
- Create: `assets/hero-tech-loop.mp4`
- Create: `script.js`
- Modify: `index.html`

- [ ] **Step 1: Create hero video asset**

Generate `assets/hero-tech-loop.webm`, a short silent looping technology-style background.

- [ ] **Step 2: Add the script tag**

Add `<script src="script.js"></script>` before `</body>`.

- [ ] **Step 3: Implement interactions**

Implement mobile navigation toggle, close nav after clicking an anchor, active-section highlighting, current year injection, and accessible placeholder click feedback.

- [ ] **Step 4: Static check**

Run: `Select-String -Path script.js -Pattern 'DOMContentLoaded|IntersectionObserver|aria-expanded|currentYear'`

Expected: all interaction hooks are present.

### Task 4: Local Verification

**Files:**
- Read: `index.html`
- Read: `styles.css`
- Read: `script.js`

- [ ] **Step 1: Serve locally**

Run: `python -m http.server 8080`

Expected: site available at `http://localhost:8080`.

- [ ] **Step 2: Browser check**

Use a browser to inspect desktop and mobile viewports. Confirm text does not overlap, anchors work, resume download links to `assets/resume-li-haohong.pdf`, and future project/certificate sections look intentional.

- [ ] **Step 3: Final status**

Run: `git status --short`

Expected: created site files, docs, and `.gitignore` are visible; `.superpowers/` remains ignored.
