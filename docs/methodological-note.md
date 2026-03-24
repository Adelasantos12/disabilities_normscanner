# Methodological Note

**NormTrace: Structured Tool for Deep Normative Legal Analysis**
**Assisted by Artificial Intelligence**

**Version:** 1.0 — March 2025
**Initial scope:** Mexico (scalable)
**Pilot case:** CRPD vs. LGIPD

---

## 1. Presentation and purpose
This document describes the architecture, theoretical foundations, scope, and limitations of **NormTrace**: a structured tool for deep normative legal analysis assisted by artificial intelligence.

The tool was designed to move beyond purely textual legal review—keyword searching or superficial article-by-article comparison—and replace it with a multi-level hermeneutic methodology capable of evaluating the real legal effect of a norm, its structural omissions, its implicit biases, and its compatibility with international human rights standards.

> **Core methodological premise:**
> A law is not only what it says. It is what it produces: who can invoke it, who can disregard it without consequences, whom it renders visible or invisible, what power structures it consolidates, and what barriers it creates for the groups it claims to protect. Normative silence is an analytical datum as relevant as the text itself.

The tool is aimed at legal practitioners, activists, academics, and institutions requiring rigorous analysis for strategic litigation, legislative advocacy, public policy influence, or academic transparency.

## 2. Nature of the tool: what it is and what it is not
### 2.1 What it is
NormTrace is a structured tool—a set of methodological instructions and reference documents—that guides a large language model (LLM) to apply a complex legal methodology consistently and reproducibly. It is not a search engine, nor a legislative index, nor an information retrieval system.
It operates as a legal reasoning framework: it activates specific analytical categories, loads relevant doctrinal references, and compels the model to justify each finding with concrete normative grounding.

### 2.2 What it is not
*   It does not replace professional legal judgment. Its analyses are a starting point for expert review, not definitive legal opinions.
*   It does not have real-time access to jurisprudential databases. It operates using the knowledge embedded in the model and the reference documents provided by the tool.
*   It does not automatically detect legislative reforms subsequent to its last update. The user must verify the currency of the text analysed.
*   It does not produce constitutionality analyses with procedural validity. Its arguments require review and adaptation by specialists before being presented in a judicial setting.

> **Epistemic transparency:**
> Language models may incur citation errors, interpolation, or simplification of complex legal standards. Every analysis generated with this tool must be verified against the primary sources indicated in each finding. The tool makes its sources explicit precisely to facilitate this verification.

## 3. Architecture and file structure
The tool follows a principle of progressive disclosure: only what is necessary for each moment of the analysis is loaded into context, optimising the model's context window.

| File / Path | Function | When activated |
| :--- | :--- | :--- |
| `normative-analysis-protocol.md` | Orchestrating core. Defines the 5 steps of the analysis, ingestion instructions, and output criteria. | Step 0 |
| `frameworks/structural-analysis.md` | Structural analysis framework: legislative technique, typology of normative instruments, actor mapping methodology, medical vs. social model. | Step 1 |
| `frameworks/exclusion-analysis.md` | Omissions analysis framework: direct/indirect/structural discrimination, diagnostic questions, intersectional methodology, indigenous perspective, language as exclusion. | Step 2 |
| `frameworks/conventionality-analysis.md` | Conventionality framework: block of constitutionality, 5-step contrast methodology, CRPD Committee General Comments, SCJN and Inter-American Court jurisprudence, argument template. | Step 3 |
| `frameworks/legal-argumentation.md` | Argumentation framework: adapted IRAC model, typology by audience (litigation/UN/advocacy/civil society), prioritisation matrix, doctrine by thematic area, errors to avoid. | Step 4 |
| `instruments/cdpd.md` | Complete reference of the CRPD: relevant articles, Committee General Comments, Concluding Observations to Mexico (2014), gap checklist. | Step 3 (CRPD case) |
| `countries/mexico/legal-system.md` | Mexican legal system: normative hierarchy, post-2011 constitutional block, CONADIS, disability-related laws, CRPD Committee recommendations. | Steps 1–4 (Mexico) |

## 4. Methodology: the five steps of analysis
The analytical process is structured in five sequential steps.

### Step 0 — Ingestion and verification of the normative text
Before any analysis, the full text of the law is obtained. The tool accepts text pasted directly or via PDF upload. In all cases, the version is verified and the user is asked to confirm if there are later reforms to the version analysed.

### Step 1 — Structural dissection
The formal anatomy of the normative instrument is analysed (type, hierarchy, date), a normative actor map is constructed identifying obligations, powers, and enforceability mechanisms for each subject, and the flow of responsibility is traced to detect whether the law coordinates, centralises, or disperses without articulation.
*Key concept — state obligation trilogy: respect (refrain from interfering), protect (prevent third parties from interfering), and fulfill/guarantee (adopt positive measures).*

### Step 2 — Analysis of omissions and implicit exclusions
This is the most methodologically complex step. It examines not what the law says, but what it does not say and the effect of that absence. Five analytical lenses are applied:
*   **Normative subject:** definition of the rights-holder, its breadth or restriction, the underlying legal model (assistentialist vs. rights-based).
*   **Gender perspective:** recognition of the gender intersection, use of language, specific provisions for women and girls, differentiated impact test.
*   **Intersectionality:** recognition of overlapping categories of discrimination: ethnicity, age, migration status, sexual orientation, socioeconomic class, rurality.
*   **Indigenous perspective:** free, prior and informed consent, recognition of internal normative systems, cultural and linguistic accessibility.
*   **Language as technology of exclusion:** the use of medical or assistentialist terminology constructs legal relationships of discretionary beneficence, not enforceable obligations.

### Step 3 — Conventionality analysis
The domestic law is contrasted with the relevant international instrument by evaluating the real legal effect, not textual similarity. Four guiding principles are applied: non-regression, progressivity, maximum protection (pro persona), and effectiveness.

### Step 4 — Construction of theoretical argumentation
For each identified gap, a structured argument is built following an adapted IRAC model (Legal issue — Applicable rule — Application — Conclusion and remedy).

### Step 5 — Output generation
The analysis is presented as an interactive screen analysis with visual gap mapping and expandable arguments.

## 5. Theoretical foundations and doctrinal references
The tool integrates analytical frameworks from five legal and theoretical traditions:
1.  **International Human Rights Law:** State obligations (respect, protect, fulfill) and the pro persona principle.
2.  **Control of Conventionality:** The obligation of all State organs to verify that their norms are compatible with international treaties and Inter-American jurisprudence.
3.  **Social Model of Disability:** Shifting the problem from individual condition to environmental barriers. State obligation is to eliminate barriers and guarantee reasonable accommodation.
4.  **Gender Perspective and Intersectionality:** Differentiating formal, structural, and political-cultural components, and recognising that oppressions intersect rather than simply add up.
5.  **Indigenous Law and Legal Pluralism:** ILO Convention 169 and UNDRIP, evaluating whether laws recognise or ignore indigenous normative systems.

## 6. Current scope: Mexico
In its version 1.0, the tool includes a specific module for the Mexican legal system covering the post-2011 normative hierarchy, the constitutional block, control mechanisms, and the map of laws linked to disability.

## 7. Scalability to other legal systems
The tool's architecture is deliberately separated into two layers: a universal methodological core (the frameworks) and national context modules (the countries folder). This separation makes adaptation to any legal system possible without modifying the central methodology.

## 8. Limitations and ethical considerations
*   **Technical limitations:** The model does not have real-time access to jurisprudential portals.
*   **Methodological considerations:** Intersectional analysis requires empirical data on affected groups that the tool cannot generate.
*   **Epistemological position:** This tool adopts an explicit position: normative analysis is not neutral. The choice of which frameworks to apply implies a stance on which standards should govern the law.
