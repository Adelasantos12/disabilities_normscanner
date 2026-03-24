# Normative-Conventional Scanner

**Herramienta de Análisis Jurídico Normativo Profundo asistido por IA**
**By Easy - (Adela Santos, PhD)**

---

## NOTA METODOLÓGICA
**Versión:** 1.0 — marzo 2025
**Ámbito inicial:** México (escalable)
**Caso piloto:** CDPD vs. LGIPD

### 1. Presentación y propósito
Este repositorio contiene el código fuente y la arquitectura de **Normative-Conventional**, una herramienta de análisis jurídico normativo profundo. Fue diseñada para superar el análisis puramente textual de leyes (búsqueda de palabras clave o comparación artículo por artículo) y sustituirlo por una metodología hermenéutica multinivel capaz de evaluar el efecto jurídico real de una norma, sus omisiones estructurales, sus sesgos implícitos y su compatibilidad con estándares internacionales de derechos humanos.

> **Premisa metodológica central:**
> Una ley no es solo lo que dice. Es lo que produce: quién puede exigirla, quién puede incumplirla sin consecuencias, a quién invisibiliza, qué estructuras de poder consolida y qué barreras crea para los grupos que declara proteger. El silencio normativo es un dato analítico tan relevante como el texto.

La herramienta está dirigida a personas operadoras de derecho, activistas, académicas e instituciones que requieren análisis rigurosos para litigio estratégico, cabildeo legislativo, incidencia en política pública o transparencia académica.

### 2. Naturaleza de la herramienta: qué es y qué no es
**Qué es:** Un conjunto estructurado de instrucciones metodológicas y documentos de referencia que guía a un modelo de lenguaje grande (LLM) para aplicar una metodología jurídica compleja de manera consistente.
**Qué no es:** No sustituye el criterio jurídico profesional, no tiene acceso a bases de datos jurisprudenciales en tiempo real ni produce análisis de constitucionalidad con valor procesal automático.

### 3. Arquitectura
La herramienta se estructura como una aplicación web (Node.js/Express) que inyecta marcos teóricos en el contexto de un LLM:
- **`SKILL.md`**: Núcleo orquestador que define los 5 pasos del análisis.
- **`references/frameworks/`**: Marcos analíticos (estructural, exclusiones, convencionalidad, argumentación).
- **`references/instruments/`**: Textos y doctrina de tratados (ej. CDPD).
- **`references/countries/`**: Particularidades de los sistemas jurídicos nacionales (actualmente México).

### 4. Metodología: los cinco pasos del análisis
1. **Paso 0 — Ingesta y verificación:** Lectura del texto de la ley.
2. **Paso 1 — Disección estructural:** Anatomía, mapa de actores y flujo de responsabilidad.
3. **Paso 2 — Análisis de exclusiones:** Sujetos normativos, género, interseccionalidad, perspectiva indígena y lenguaje.
4. **Paso 3 — Análisis de convencionalidad:** Contraste con el bloque de constitucionalidad (brechas y gravedad).
5. **Paso 4 — Construcción teórica:** Argumentación basada en IRAC adaptada a litigio y cabildeo.

### 5. Despliegue (Deploy) en Railway
Esta versión está diseñada para ser desplegada como una herramienta web interactiva, protegida contra descargas no autorizadas.
1. Vincula el repositorio a [Railway](https://railway.app/).
2. Configura la variable de entorno `OPENAI_API_KEY` en el panel de Railway.
3. Railway utilizará el comando `npm start` definido en el `package.json` para levantar la herramienta.

### 6. Cita Recomendada (APA 7ª ed.)
Santos-Domínguez, Adela B. (2025). Normative-conventional scanner v1.0: Herramienta de análisis jurídico normativo profundo asistido. Disponible en: https://github.com/Adelasantos12/disabilities_normscanner

---
*normative-conventional scanner v1.0 · Nota Metodológica · Marzo 2025*
