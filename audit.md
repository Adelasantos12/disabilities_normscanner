# NormTrace Phase 2 Audit Report

## A. Alignment summary

The repository is **not aligned** with the Phase 2 architecture. It remains fundamentally structured as a Mexico-only pilot project, and none of the intended Phase 2 structural updates—most notably the integration of the Switzerland pilot, the separation of country modules from the general methodology, and the adoption of the updated repository naming conventions—have been executed. The repository also suffers from conceptual leakage, where Mexico-specific constitutional and legal details are embedded within general analytical frameworks. Furthermore, key Phase 2 structural files, such as the `README.md`, `normative-analysis-protocol.md`, and `docs/methodological-note.md` are completely missing. The terminology guide lacks Phase 2 vocabulary.

## B. File-by-file findings

- **README.md**
  - **Status:** Not aligned (Missing)
  - **Key issue:** The file does not exist.
  - **Precise correction needed:** Create `README.md` reflecting the repository-based, AI-assisted methodological system logic, the disability-rights pilot for Mexico + Switzerland, and the CRPD as the core instrument. Avoid overclaiming functionality.

- **normative-analysis-protocol.md**
  - **Status:** Not aligned (Missing)
  - **Key issue:** The file does not exist. The legacy file `SKILL.md` seems to serve a similar, outdated function.
  - **Precise correction needed:** Create `normative-analysis-protocol.md` with routes for Mexico and Switzerland (including the cantonal protocol), distinguishing conventionality analysis from compatibility analysis. Delete `SKILL.md`.

- **docs/methodological-note.md**
  - **Status:** Not aligned (Missing)
  - **Key issue:** The file does not exist.
  - **Precise correction needed:** Create `docs/methodological-note.md` accurately describing NormTrace as a repository-based, AI-assisted analytical system covering both Mexico and Switzerland. Ensure cautious, non-overpromising language.

- **docs/terminology-guide.md**
  - **Status:** Partially aligned
  - **Key issue:** It defines some core terms, but lacks key Phase 2 terminology like "international human rights compatibility analysis", and components like "country module", "rapid operational reference", "case-law notes", and "cantonal analysis protocol".
  - **Precise correction needed:** Add the missing terms and repository component descriptions to align with Phase 2.

- **references/frameworks/structural-analysis.md**
  - **Status:** Not aligned
  - **Key issue:** Overwhelmingly Mexico-specific. It explicitly names Mexican legal hierarchies (CPEUM, Ley General, NOM) and laws (LGIPD) inside what should be a portable general framework.
  - **Precise correction needed:** Strip Mexico-specific examples and references, moving them to the Mexico legal system module. Keep only the general methodology (e.g., mapping normative actors, identifying obligation verbs, institutional structure analysis).

- **references/frameworks/exclusion-analysis.md**
  - **Status:** Partially aligned
  - **Key issue:** Mostly portable, but contains some Mexico-specific legal references (e.g., "Art. 2 CPEUM", "Ley General de Derechos Lingüísticos", "CURP").
  - **Precise correction needed:** Generalise the examples and remove specific Mexican constitutional and legal citations.

- **references/frameworks/conventionality-analysis.md**
  - **Status:** Not aligned
  - **Key issue:** Highly specific to Mexico. Sections 2, 3, 6, and 8 explicitly detail the Mexican constitutional block, Mexican ratification dates, SCJN jurisprudence, and the LGIPD.
  - **Precise correction needed:** Refactor the file to explain "conventionality analysis" generally as a doctrine of the Inter-American system. Move the Mexican constitutional block, treaties, and SCJN jurisprudence to the Mexico legal system module.

- **references/frameworks/legal-argumentation.md**
  - **Status:** Partially aligned
  - **Key issue:** Mentions Mexican-specific mechanisms (SCJN, amparo, acción de inconstitucionalidad, CPEUM) and Mexican doctrinal authors.
  - **Precise correction needed:** Generalise the litigation mechanisms and remove or contextualise country-specific doctrinal references.

- **references/instruments/cdpd.md**
  - **Status:** Partially aligned
  - **Key issue:** Contains specific cross-references and "checklists" evaluating the Mexican LGIPD.
  - **Precise correction needed:** Remove all evaluations and mentions of the LGIPD. The file must remain strictly instrument-centred.

- **references/instruments/cdpd-key-articles.md**
  - **Status:** Not aligned (Missing)
  - **Key issue:** The file does not exist.
  - **Precise correction needed:** Create the file as a rapid operational reference.

- **references/countries/mexico/legal-system.md**
  - **Status:** Not aligned (Missing/Incorrect filename)
  - **Key issue:** The file is named `sistema-juridico.md` instead of `legal-system.md` and is in Spanish, mixing languages. It contains the material that should be the Mexico country module.
  - **Precise correction needed:** Rename `sistema-juridico.md` to `legal-system.md`. Translate/adapt the content to English (if that is the repository standard, or ensure consistency) and integrate the Mexico-specific material stripped from the framework files. Ensure cautious language regarding the constitutional parameter of rights review.

- **references/countries/switzerland/legal-system.md**
  - **Status:** Not aligned (Missing)
  - **Key issue:** The entire `switzerland` folder and this file are missing.
  - **Precise correction needed:** Create the folder and file, functioning as the main Swiss country module using cautious language on monism, direct applicability, primacy, and human rights compatibility analysis.

- **references/countries/switzerland/cantonal-analysis-protocol.md**
  - **Status:** Not aligned (Missing)
  - **Key issue:** The file does not exist.
  - **Precise correction needed:** Create the file as an operational, subnational protocol distinct from the main legal-system module.

- **references/case-law-notes/disability-rights-mexico.md**
  - **Status:** Aligned
  - **Key issue:** None. It appears to serve correctly as a support document with cautious language.
  - **Precise correction needed:** None.

- **references/case-law-notes/disability-rights-switzerland.md**
  - **Status:** Not aligned (Missing)
  - **Key issue:** The file does not exist.
  - **Precise correction needed:** Create the file for Swiss case-law notes aligned with the jurisdiction-specific logic.

## C. Cross-repository inconsistencies

1. **Missing Phase 2 Architecture:** The entire Switzerland pilot is missing. Foundational files (README, methodological note, protocol) do not exist.
2. **Terminology and Language Drift:** The repository is heavily mixed-language (English and Spanish). For example, `disability-rights-mexico.md` is in English, but `sistema-juridico.md` and the framework files are in Spanish. The terminology guide is in English.
3. **Conceptual Leakage (Universalising Jurisdiction-Specifics):** General frameworks (like `structural-analysis.md` and `conventionality-analysis.md`) are deeply infused with Mexican constitutional law, treating Mexican concepts as universal frameworks.
4. **Outdated Filenames & Logic:** `SKILL.md` persists as a legacy file containing outdated instructions ("usa este skill SIEMPRE") and assuming an agentic, over-promising AI role ("este skill implementa una metodología hermenéutica multinivel..."). `sistema-juridico.md` uses an outdated filename convention.

## D. Minimal correction plan

1. **Delete Legacy Files:** Remove `SKILL.md`.
2. **Rename and Realign Mexico Module:** Rename `references/countries/mexico/sistema-juridico.md` to `legal-system.md`.
3. **Purge Country-Specifics from Frameworks:** Edit the 4 files in `references/frameworks/` and `cdpd.md` in `references/instruments/` to remove all explicit mentions of Mexico, the LGIPD, the SCJN, and Mexican constitutional provisions. Transfer this content to `references/countries/mexico/legal-system.md`.
4. **Create Missing Core Architecture Files:**
   - `README.md`
   - `normative-analysis-protocol.md`
   - `docs/methodological-note.md`
5. **Update Terminology Guide:** Add Phase 2 vocabulary to `docs/terminology-guide.md`.
6. **Create Switzerland Pilot Stubs:**
   - Create `references/countries/switzerland/legal-system.md`
   - Create `references/countries/switzerland/cantonal-analysis-protocol.md`
   - Create `references/case-law-notes/disability-rights-switzerland.md`
7. **Create Missing Instrument Reference:** Create `references/instruments/cdpd-key-articles.md`.
8. **Harmonise Language:** Ensure a consistent language strategy (e.g., translating the Spanish markdown files to English, or establishing clear boundaries for language usage).