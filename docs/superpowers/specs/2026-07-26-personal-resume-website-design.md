# Personal Resume Website Design

## Goal
Build a polished single-page personal resume website for Li Haohong. The site should work well today with limited project inventory, while reserving clear, credible space for future works and award certificates.

## Design Direction
Use a "resume-enhanced portfolio" structure:

- Lead with a strong resume-style hero: name, current identity, target direction, contact actions, and key proof points.
- Present the current ecommerce sales data analysis platform as a technical case study, not just a bullet list.
- Add a future works gallery with empty-but-professional placeholders that can later become real project cards.
- Add an awards section where each award can reveal its certificate preview and download state.

The opening hero should use a local technology-style looping video background, with a readable dark overlay and a static fallback background for browsers that cannot load video. The video may use a browser-native format such as WebM. The overall tone should feel professional, engineering-focused, and modern. It should avoid looking like a marketing landing page or a decorative template. Color should be restrained with strong contrast in the hero, light content sections below, and small accents for status, data, and achievements.

## Content
Use the resume PDF as the primary content source.

Hero:
- Name: 李浩鸿
- Identity: 汕头大学计算机科学与技术（教育部直属卓越工程师班）本科生
- Direction: AI 应用开发、全栈开发、数据分析/算法工程
- Contact: 1162938454@qq.com, phone, resume download
- Do not put the RFM algorithm detail in the opening proof cards; keep it in the project case study.

Education:
- 2024.09 至今，汕头大学，计算机科学与技术（教育部直属卓越工程师班）
- Main courses from the resume.

Project Case Study:
- 电商销售数据智能分析平台
- Role: team collaboration, algorithm module owner for RFM user segmentation
- Tech stack: Python, pandas, numpy, PyMySQL, Flask, MySQL, RFM model
- Highlight the RFM engine, dual scoring strategies, repeat purchase and retention calculations, task state machine, idempotent writes, and multiple run modes.

Awards:
- 汕头大学创新人才奖学金
- 第十七届蓝桥杯软件赛全国总决赛三等奖
- 2025 百度之星程序设计大赛初赛铜奖
- 2026 百度之星程序设计大赛初赛铜奖
- 2025 全球校园人工智能算法精英大赛全国二等奖

Certificates:
- Merge certificate access into the awards section.
- Clicking an award should reveal the matching certificate preview and download state.
- Until certificate files are uploaded, show a polished "certificate pending upload" state.

Future Works:
- Create 3 to 4 future project cards with clear empty states.
- Cards should be easy to replace later with title, description, stack, links, and screenshots.

Skills and Strengths:
- Python, C/C++, React, TypeScript, FastAPI, RAG, DeepSeek API, database/data analysis tooling, AI-assisted full-stack development.
- English CET-4, Chaozhou dialect, Cantonese.

## Page Structure
Single-page static site:

1. Sticky navigation with anchors.
2. Hero with proof-point metrics.
3. About and education.
4. Technical project case study.
5. Future works gallery.
6. Awards timeline/list with certificate detail panel.
7. Skills and contact footer.

## Technical Approach
Because the current repository is empty, implement as a static site:

- `index.html` for semantic markup.
- `styles.css` for responsive layout and visual polish.
- `script.js` for small interactions such as active navigation, smooth scrolling, and certificate/project placeholder controls if needed.
- `assets/` for the hero video, fallback visual, resume PDF copy, and future certificate files.

The website should work by opening `index.html` directly. If later deployment is needed, it can be hosted on GitHub Pages or any static hosting service.

## Responsiveness
Desktop should use a compact editorial layout with enough density for resume scanning. Mobile should become a single-column page with readable cards, no overlapping text, and navigation that remains usable.

## Verification
Before delivery:

- Open or serve the page locally.
- Check desktop and mobile layout with a browser screenshot or equivalent automated check.
- Confirm the video background loads or gracefully falls back, anchors work, text does not overflow, and future project/certificate placeholders are obvious but not unfinished-looking.
