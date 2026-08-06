# WORKLOG — Tessavra Landing Page (TWCM)

Continuity log for TWCM delivery. Repo: Tessavra/tessavra-landing-page · Branch: feature/evidence-ledger-landing-page.
Authoritative briefs: PLANS/TESSAVRA_SITE_BRIEFS/ (workspace) · Full engineering log: WORK_LOGS/TWCM_IMPLEMENTATION.md (workspace).

## TWCM-PR3 — four Wave 1 platform pages (COMMITTED)

Base HEAD at resume: c6ad066 · Pages built from approved Brand Studio briefs.

### State found at resume (2026-08-06 ~04:2xZ)
- /platform/voice-of-customer, /platform/ux-research, /platform/workflow-pipelines: on disk (untracked), written and validated in prior session(s).
- /platform/governance: directory present, empty — last remaining PR3 page, built this session.

### Per-page validation records
- /platform/voice-of-customer (569 lines): metadata + canonical + OG exact vs brief; structured-data trio (WebPage/BreadcrumbList/SoftwareApplication) exact; anchors #problem #solution #voc-workflow #signals #organization #capabilities #audience present; copy verbatim vs brief sections 1–8; well-formed (python html.parser, 1 h1); claim scan clean (no Radar/Praxis/Lattice/Buzz/SOC2/ISO27001/HIPAA/GDPR/Ordelith); demo CTAs mailto per PR7-swap convention. PASSED (prior session).
- /platform/ux-research (576 lines): built from platform-ux-research.md using shared nav/footer skeleton. Anchors #problem #solution #research-workflow #findings #organization #capabilities #audience #final-cta verified; metadata/canonical/OG exact; structured-data trio exact; well-formed (1 h1, no unclosed/mismatched); claim scan clean; hero CTA demo → mailto. PASSED (prior session).
- /platform/workflow-pipelines (602 lines): validation already passed in prior session; recorded here per Derick instruction (event dc9991f9), not re-run. Metadata/canonical/OG exact; structured-data trio exact; anchors #problem #solution #workflow-overview #pipeline-types #governance #integrations #capabilities #audience #final-cta present; well-formed (1 h1); claim scan clean. PASSED.
- /platform/governance (598 lines): built this session from platform-governance.md. Headline/sub-copy, 3-item problem ledger, 3-step solution, 4-step governance workflow with review-queue visual, evidence-traceability grid, audit-logs feature-row (reversed) with audit-log visual, policy-guardrails grid, 8-item capabilities checklist, 4-card audience grid, ink final-cta — brief copy. Includes id="evidence-governance" (routes-config.js nav anchor) alongside brief anchor #evidence-traceability. Validated: well-formed (1 h1, no dup ids); anchors #problem #solution #governance-workflow #evidence-traceability #audit-logs #policy-guardrails #capabilities #audience #evidence-governance present; metadata/canonical/OG exact; structured-data trio exact; claim scan clean. PASSED.

### Repo-wide validation (first full pass of this scope, this session)
- All 9 HTML pages well-formed via python html.parser (1 h1 each, no mismatched/unclosed tags, no duplicate ids).
- Link inventory: every link and anchor on all built pages resolves (after fix below). All local asset paths exist.
- Static-serve smoke test (python3 -m http.server :8811): 200 on /, /platform/, all four new routes, styles.css, script.js, assets/logo.png, routes-config.js.
- Claim scan clean on all five touched pages.

### Genuine failure found & fixed
- Nav mega-link /platform/conversation-intelligence#search-discovery pointed at a non-existent anchor on every page (brief platform-conversation-intelligence.md §5 subsection 2 never materialised). Fix: added #search-discovery section with brief headline/copy between #interaction-explorer and #integrations; section alternation preserved. Re-validated: 0 link/asset problems.

### Not regressions
- /integrations, /security, /solutions/*, /how-it-works, /request-demo remain unbuilt future routes (PR4–PR7), same as all pre-PR3 committed pages.

### Coordinator corrections applied (22:31Z check)
- Scratch files (.scratch-body.html, .scratch-head.html, .scratch-shared-nav.html, .scratch-shared-footer.html): never staged in the PR3 commit (explicit pathspec add only); additionally gitignored via .scratch-*.html entry so future blanket adds cannot pick them up.
- WORKLOG.md (this file) created in repo root for handoff continuity.

## Commits
- TWCM-PR3: on feature/evidence-ledger-landing-page (final SHA: run `git log -1`; amended from initial 31fc5c8 via 8201c8f) — 7 files, +2398/−1: .gitignore, WORKLOG.md, platform/conversation-intelligence/index.html (+13/−1 fix), platform/{voice-of-customer,ux-research,workflow-pipelines,governance}/index.html (new). Author: Derick <3790494+geek187@users.noreply.github.com>. Trailers: Co-authored-by Ordelith Engineering Agent; Co-authored-by Derick; Signed-off-by Derick. (Amended from initial 31fc5c8 to incorporate corrections 1–2.) Branch remains local-only (never pushed); push/PR timing is Derick's call.

## TWCM-PR4 — four Wave 2 solutions pages (IN PROGRESS)

Branch: feature/twcm-pr4-solutions · Base HEAD at resume: 9daa7cd (= origin/main) · Briefs: PLANS/TESSAVRA_SITE_BRIEFS/solutions-*.md.

### State found at resume (2026-08-06 ~10:1xZ)
- solutions/customer-support/index.html (610 lines) on disk, written ~00:48Z in a prior session; customer-experience/, product-ux-research/, quality-assurance/ empty.
- .scratch-assembler.py (2 bytes, "ok") in repo root: NOT covered by gitignore (.scratch-*.html only). Will never be staged; explicit pathspec adds only. Flagged to Coordinator for removal/hygiene ruling.

### Coordinator ruling applied (10:22Z, event 1731c1aa)
- Brief INTERNAL LINKS "Links FROM this page" lists are binding requirements, not optional — materialised as BODY links at build time.
- customer-support fix (applied this session): added body links /platform/conversation-intelligence (after #solution step-list), /solutions/quality-assurance (after #capabilities checklist), /platform (after #outcomes grid). Remaining FROM targets already present as body links: /platform/quality-management (×3), /platform/voice-of-customer, /integrations. Well-formedness re-run after edit: PASS (0 errors, 0 dup ids, 1 h1).
- /platform "Explore by use case" section is queued for PR6 — /platform NOT touched in PR4.

### PR7-swap exception (BINDING for all PR4 pages)
- Demo CTAs remain mailto:hello@tessavra.com?subject=Tessavra%20Demo%20Request; NO /request-demo hrefs anywhere in PR4. PR7 must swap these mailto CTAs to /request-demo.

### PR4 completion (merged 2026-08-06 13:39Z)
- Checkpoints 2–4: customer-support (610 lines), quality-assurance (631 lines), customer-experience, product-ux-research — all staged edits, all validated per-page.
- Commit `676d648` on `feature/twcm-pr4-solutions`, pushed and merged via PR #2 (merge commit `4f0815e`).
- Ordelith Verification Agent independently verified PR4 (13:59Z): all 8 checks PASS — metadata/canonical/OG exact, structured-data exact (with observation re: trio vs pair, see ruling below), anchors present, body links materialised, claim scan clean, nav/footer byte-identical, well-formedness clean, routes-config.js byOutcome anchors resolve.
- Coordinator spot-check (14:02Z): confirmed PASS, corrected mailto count to 5 per page (4 demo CTAs + 1 footer Contact), ruled compliant.

### Structured-data convention ruling (Coordinator, 14:02Z)
- All page types use the full schema trio (WebPage + BreadcrumbList + SoftwareApplication) regardless of whether briefs specify only the pair. Consistent with PR3 platform pages; richer schema; SoftwareApplication is structural, not a claim. Recorded here rather than rewriting merged briefs.

## TWCM-PR5 — integrations overview + Salesforce (IN PROGRESS)

Branch: feature/twcm-pr5-integrations · Base HEAD: 4f0815e (= origin/main) · Briefs: PLANS/TESSAVRA_SITE_BRIEFS/integrations.md, integrations-salesforce.md.

### Scope
- /integrations/index.html — integrations hub (7 sections including #developers anchor replacing standalone /developers page).
- /integrations/salesforce/index.html — dedicated Salesforce integration page.
- No standalone /developers page; Section 6 #developers anchor handles developer documentation per brief.

### Binding rules
- FROM lists as **body** links (Coordinator ruling from PR4, carried forward).
- Zero `/request-demo` hrefs; demo CTAs `mailto:hello@tessavra.com?subject=Tessavra%20Demo%20Request` until PR7 swap.
- Structured-data trio (WebPage + BreadcrumbList + SoftwareApplication) per convention ruling above.
- Nav/footer byte-identical per routes-config.js.
- Claims per GLOBAL_VOICE_AND_CLAIMS.md; mandatory disclaimers included.

### Hygiene (Commit 1, chore)
- Deleted `.scratch-assembler.py` (2 bytes, untracked, flagged in PR4 verification).
- Widened `.gitignore` from `.scratch-*.html` to `.scratch-*` (catches all scratch files).
- WORKLOG updated: PR4 completion, verification PASS, structured-data convention ruling, PR5 section opened.

### routes-config.js anchor mapping (INTEGRATIONS section)
Nav anchors on integrations page must use routes-config.js paths (which differ from brief anchor IDs):
- Brief `#contact-centre` → routes-config `#contact-centre-telephony`
- Brief `#meeting-tools` → routes-config `#meeting-research-tools`
- Brief `#files-apis` → routes-config `#files-apis-webhooks`
- Brief `#data-pipelines` → routes-config `#data-pipelines-automation`
- Brief `#salesforce-workflows` → routes-config `#salesforce-workflows` (match)
- Brief `#data-warehouse` → routes-config `#data-warehouse-pipelines`
- Brief `#operational-systems` → routes-config `#operational-system-sync`
- Brief `#alerts-actions` → routes-config `#alerts-actions` (match)
Resolution: section ids use routes-config.js names so nav mega-menu links resolve. Brief anchors that differ are aliased.
