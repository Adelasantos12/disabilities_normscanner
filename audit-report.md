# Phase 2 Repository Audit Report

## A. Alignment summary
The repository has successfully transitioned to the Phase 2 Mexico + Switzerland pilot structure in its overarching methodological narrative and architectural scope. The documentation effectively acknowledges the dual jurisdictions, subnational implementation in Switzerland (the cantonal layer), and carefully differentiates between the two domestic review pathways.

However, the repository is not fully coherent terminologically or structurally. A notable legacy of the Phase 1 Mexico-only focus remains: the term "conventionality analysis" is still treated as a universal concept in key foundational documents (such as the terminology guide and the general frameworks) and is incorrectly imposed on the Swiss case-law notes. Furthermore, there is a mixed-language filename issue with the CRPD instrument files retaining their Spanish acronym (`cdpd.md`), which conflicts with the English terminology used across the Phase 2 documentation.

## B. File-by-file findings

- **README.md**
  - **Status:** Partially aligned
  - **Key issue:** Cites outdated, mixed-language instrument filenames (`cdpd.md`) and over-centres conventionality in the framework list (`conventionality-analysis.md`).
  - **Precise correction needed:** Update file references from `cdpd.md` and `cdpd-key-articles.md` to `crpd.md` and `crpd-key-articles.md`. Update framework reference to `compatibility-analysis.md` (or similar).

- **normative-analysis-protocol.md**
  - **Status:** Partially aligned
  - **Key issue:** Continues to reference legacy instrument filenames (`cdpd.md`) and the Mexico-centric framework (`conventionality-analysis.md`).
  - **Precise correction needed:** Update instrument filenames to `crpd.md` and `crpd-key-articles.md`. Update the framework filename to `compatibility-analysis.md`.

- **docs/methodological-note.md**
  - **Status:** Aligned
  - **Key issue:** None. (Successfully frames the jurisdiction-sensitive difference between conventionality analysis and international human rights compatibility analysis without overstating functionality).
  - **Precise correction needed:** None.

- **docs/terminology-guide.md**
  - **Status:** Not aligned
  - **Key issue:** Treats "Conventionality analysis" as the universal structured method under "Core project terms", and completely omits a definition for "International human rights compatibility analysis". This universalises a Mexico-specific term.
  - **Precise correction needed:** Define "International human rights compatibility analysis" for the Swiss/general context, and clarify that "Conventionality analysis" is jurisdictionally specific to the Inter-American/Mexican context.

- **references/frameworks/structural-analysis.md**
  - **Status:** Aligned
  - **Key issue:** None.
  - **Precise correction needed:** None.

- **references/frameworks/exclusion-analysis.md**
  - **Status:** Aligned
  - **Key issue:** None.
  - **Precise correction needed:** None.

- **references/frameworks/conventionality-analysis.md**
  - **Status:** Partially aligned
  - **Key issue:** The filename `conventionality-analysis.md` and the title "Conventionality Analysis Framework" inappropriately elevate a jurisdiction-specific term to a universal general framework.
  - **Precise correction needed:** Rename file to `compatibility-analysis.md` and update title to "International Compatibility Analysis Framework", noting the two jurisdictional pathways within the text.

- **references/frameworks/legal-argumentation.md**
  - **Status:** Aligned
  - **Key issue:** None.
  - **Precise correction needed:** None.

- **references/instruments/cdpd.md & cdpd-key-articles.md**
  - **Status:** Not aligned
  - **Key issue:** Mixed-language filenames. The repository uses "CRPD" in English text, but the filenames use the Spanish acronym "cdpd", reflecting a legacy architecture.
  - **Precise correction needed:** Rename files to `crpd.md` and `crpd-key-articles.md`. Update internal text to replace instances of "cdpd" with "crpd" where referring to filenames or acronyms in English.

- **references/countries/mexico/legal-system.md**
  - **Status:** Aligned
  - **Key issue:** None. (Appropriately cautious and properly utilizes "conventionality control").
  - **Precise correction needed:** None.

- **references/countries/switzerland/legal-system.md**
  - **Status:** Aligned
  - **Key issue:** None. (Uses cautious language correctly regarding direct applicability and primacy).
  - **Precise correction needed:** None.

- **references/countries/switzerland/cantonal-analysis-protocol.md**
  - **Status:** Aligned
  - **Key issue:** None.
  - **Precise correction needed:** None.

- **references/case-law-notes/disability-rights-mexico.md**
  - **Status:** Aligned
  - **Key issue:** None.
  - **Precise correction needed:** None.

- **references/case-law-notes/disability-rights-switzerland.md**
  - **Status:** Not aligned
  - **Key issue:** Imposes the term "conventionality analysis" on Switzerland in the title and opening text by stating "(understood in Switzerland as treaty-compatibility analysis)". This directly violates the rule against treating Mexico-specific terminology as universal.
  - **Precise correction needed:** Remove references to "conventionality analysis" in the title and intro. Replace exclusively with "international human rights compatibility analysis".

## C. Cross-repository inconsistencies
- **Terminology drift (Universalising Mexico-specific concepts):** The term "conventionality analysis" is used as the default name for the compatibility framework and in the terminology guide, effectively forcing the Inter-American/Mexican doctrine onto the Swiss context (most noticeably in the Swiss case-law notes).
- **Mixed filename conventions:** The use of `cdpd` instead of `crpd` in instrument filenames creates a mismatch between the documentation's English text and the file structure, reflecting a legacy Mexico-only structure that has not been completely purged.

## D. Minimal correction plan
1. **Rename Files:**
   - Rename `references/instruments/cdpd.md` to `references/instruments/crpd.md`
   - Rename `references/instruments/cdpd-key-articles.md` to `references/instruments/crpd-key-articles.md`
   - Rename `references/frameworks/conventionality-analysis.md` to `references/frameworks/compatibility-analysis.md`
2. **Update Terminology Guide (`docs/terminology-guide.md`):**
   - Add a definition for "International human rights compatibility analysis".
   - Restrict the definition of "Conventionality analysis" to the Inter-American/Mexican context.
3. **Correct Swiss Case-Law Notes (`references/case-law-notes/disability-rights-switzerland.md`):**
   - Change title to "Disability Rights and International Human Rights Compatibility Analysis in Switzerland".
   - Remove the phrase "(understood in Switzerland as treaty-compatibility analysis)" and replace "conventionality analysis" with the appropriate Swiss term.
4. **Update Cross-References:**
   - In `README.md` and `normative-analysis-protocol.md`, update all file paths referencing `cdpd` to `crpd`, and `conventionality-analysis.md` to `compatibility-analysis.md`.
   - Update the title in the new `compatibility-analysis.md` framework to reflect general compatibility rather than conventionality control.
   - Update any remaining mentions of `cdpd` filenames inside the `crpd.md` and `crpd-key-articles.md` files themselves.