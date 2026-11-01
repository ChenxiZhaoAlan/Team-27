# Team 27 — Codex Working Instructions

## Project overview
Team 27 / The 27 Society is an Auckland, New Zealand-based Texas Hold'em club website. The club has over 100 members and regular events. The website aims to introduce the club, its members, sponsors, events, and social channels. English and Chinese support is intended.

## Source of truth
- Read `docs/PROJECT_CONTEXT.md` before making changes.
- Read `docs/ROADMAP.md` for proposed work; proposals are not implemented features.
- Inspect the actual repository before assuming a framework, command, directory, deployment process, or feature exists.
- Existing GitHub repository: https://github.com/ChenxiZhaoAlan/Team-27

## Design
- Current creative direction discussed: "The 27 Society" concept. Previous discussions considered black/gold luxury branding, then alternative visual treatments. Do not assume all past alternatives are active requirements.
- Preserve existing branding and layout unless the task explicitly requests a redesign.
- Do not replace the official logo without supplied source and approval.
- Maintain bilingual-ready content and accessible, responsive UI.

## Development discipline
- Before editing, summarize which files will change and why.
- Keep changes small; preserve existing conventions.
- Do not remove site elements or redesign figures without explicit task scope.
- Run the project's real build/tests when possible; report any failures.
- Do not commit credentials, personal data, or `.env` files.
- Do not push or deploy without user authorization.
- When making a commit, add a dated markdown entry under `logfolder/` with change summary, affected files, verification, and outstanding issues. Git remains the canonical file-level history.
- For multiplayer or AI poker: start with architecture/security review; distinguish social play from real-money gambling, and review New Zealand legal/compliance requirements before shipping.

## Communication
- Explain changes and operational steps in Chinese; keep source filenames and commands in their native form.
- For ambiguous design choices, preserve current behavior and document options.
