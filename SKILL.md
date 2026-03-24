---
name: normative-analysis
description: >
  Análisis jurídico normativo profundo de leyes y textos legislativos. Usa este skill SIEMPRE que el usuario quiera: analizar una ley, decreto, reglamento o instrumento normativo; contrastar legislación nacional con tratados internacionales (convencionalidad); detectar exclusiones, discriminación implícita o ausencia de perspectiva de género en textos legales; evaluar si una ley delega responsabilidad correctamente, genera estructuras institucionales, permite trabajo intersectorial; argumentar teóricamente para litigio estratégico, cabildeo legislativo o reforma normativa; o comparar estructuras normativas entre países. Aplica metodología hermenéutica compleja — no búsqueda de palabras —: análisis estructural, omisiones, exclusiones implícitas, convencionalidad, género, interseccionalidad, perspectiva indígena. Primer caso de uso: CDPD (Convención sobre los Derechos de las Personas con Discapacidad) vs legislación mexicana.
---

# Skill: Análisis Normativo Profundo

Este skill implementa una metodología hermenéutica multinivel para el análisis jurídico de textos legislativos. No busca coincidencias de palabras: evalúa el *efecto jurídico real* de la norma, sus omisiones, sus estructuras de poder y su compatibilidad con estándares internacionales.

---

## PASO 0: Ingesta del texto normativo

Antes de cualquier análisis, obtener el texto completo de la ley:

### Si el usuario carga un PDF:
→ Leer `/mnt/skills/public/pdf-reading/SKILL.md` y extraer texto completo

### Si el usuario pega texto:
→ Usar directamente; confirmar si es texto completo o extracto

### Si el usuario proporciona URL (DOF, Cámara, portales legislativos):
→ Usar `web_fetch` para recuperar el texto
→ URLs comunes en México:
  - DOF: `https://www.dof.gob.mx`
  - Cámara de Diputados: `https://www.diputados.gob.mx/LeyesBiblio/`
  - SCJN: `https://www.scjn.gob.mx`

### Verificar versión:
Confirmar con el usuario si el texto es la versión vigente. Para México, siempre preguntar si hay reformas posteriores a la versión que se analiza.

---

## PASO 1: Disección estructural de la ley

Leer: `references/frameworks/structural-analysis.md`

Analizar los siguientes elementos en este orden:

### 1.1 Anatomía formal
- Tipo de instrumento normativo (ley general, ley federal, ley orgánica, reglamento, NOM, etc.)
- Jerarquía normativa en el sistema jurídico del país
- Fecha de publicación y última reforma
- Artículos: número, organización por capítulos/títulos/secciones

### 1.2 Mapa de actores normativos
Construir tabla con:
| Actor | Tipo | Obligaciones que se le asignan | Facultades que se le otorgan | Mecanismo de exigibilidad |
|-------|------|-------------------------------|------------------------------|--------------------------|

Categorías de actores a buscar:
- Poderes del Estado (Ejecutivo federal, estatal, municipal; Legislativo; Judicial)
- Organismos autónomos
- Sector privado / empleadores
- Sociedad civil / organizaciones de la sociedad civil
- Las propias personas titulares de derechos
- Organismos internacionales

### 1.3 Flujo de responsabilidad
¿La ley delega hacia abajo (subsidiariedad), hacia arriba (centralización), o dispersa sin coordinar?
Detectar: ¿existe un órgano con mandato de coordinación intersectorial? ¿Con presupuesto propio? ¿Con capacidad sancionatoria?

### 1.4 Mecanismos de exigibilidad
- ¿Existen sanciones? ¿Son proporcionales?
- ¿Hay acceso a recursos judiciales o administrativos?
- ¿Existe un mecanismo de monitoreo independiente?
- ¿Hay indicadores o metas medibles?

---

## PASO 2: Análisis de omisiones y exclusiones implícitas

Leer: `references/frameworks/exclusion-analysis.md`

Este es el análisis más complejo. No busca lo que *dice* la ley; busca lo que *no dice* y el efecto de esa ausencia.

### 2.1 Análisis del sujeto normativo
¿A quién se dirige la ley? Identificar:
- Definición legal del sujeto titular de derechos
- ¿Es la definición restrictiva o amplia?
- ¿Excluye subcategorías implícitamente? (ej. discapacidad "visible" vs invisible; nacional vs migrante)
- ¿Usa lenguaje médico-asistencial vs modelo social de derechos?

### 2.2 Perspectiva de género
- ¿La ley reconoce la intersección de género con la categoría principal?
- ¿Usa lenguaje inclusivo o masculino genérico?
- ¿Existe alguna disposición específica para mujeres y niñas dentro del grupo?
- ¿Reconoce violencia de género como variable?
- Test de impacto diferenciado: ¿la aplicación neutral de la ley produce efectos desiguales por género?

### 2.3 Interseccionalidad
Evaluar si la ley reconoce la intersección con:
- Pueblos y comunidades indígenas
- Condición migratoria
- Edad (infancia, vejez)
- Orientación sexual e identidad de género
- Condición socioeconómica / pobreza
- Ruralidad / urbanidad

### 2.4 Perspectiva indígena
- ¿La ley menciona pueblos indígenas?
- ¿Reconoce sistemas normativos propios (usos y costumbres)?
- ¿Hay disposiciones de consulta previa, libre e informada (CPLI)?
- ¿Los mecanismos de acceso son culturalmente accesibles (idioma, formato, distancia)?

### 2.5 Lenguaje como exclusión
- ¿La ley usa terminología clínica, peyorativa o desactualizada?
- ¿Usa un modelo de asistencia/beneficencia vs modelo de derechos?
- ¿Nombra a las personas como "beneficiarias" (pasivas) vs "titulares de derechos" (activas)?

---

## PASO 3: Análisis de convencionalidad

Leer: `references/frameworks/conventionality-analysis.md`

Leer también el instrumento internacional relevante en: `references/instruments/`

### 3.1 Identificar el bloque de convencionalidad aplicable
Para México, el bloque constitucional de derechos humanos incluye:
- Artículo 1° constitucional (reforma 2011)
- Todos los tratados ratificados por México en materia de DDHH
- Jurisprudencia de la Corte IDH
- Criterios del Comité de Naciones Unidas del tratado relevante

### 3.2 Metodología de contraste
**No hacer**: comparar artículo por artículo buscando coincidencias textuales.
**Hacer**: evaluar si el *efecto jurídico real* de la ley cumple con:
1. **Principio de no regresividad**: ¿La ley retrocede en derechos ya reconocidos?
2. **Progresividad**: ¿Avanza hacia la realización plena del derecho?
3. **Máxima protección**: ¿Adopta el estándar más favorable (pro persona)?
4. **Efectividad**: ¿Los mecanismos son realmente operables o son declarativos?

### 3.3 Tabla de brechas
Para cada derecho o estándar del instrumento internacional:
| Artículo / Estándar internacional | Disposición en ley analizada | Tipo de brecha | Gravedad | Argumentación |
|----------------------------------|------------------------------|----------------|----------|---------------|

Tipos de brecha:
- **Ausencia total**: el derecho no aparece en ninguna forma
- **Reconocimiento sin garantía**: el derecho se nombra pero sin mecanismo de realización
- **Regresión**: la ley es menos protectora que el estándar internacional
- **Incompatibilidad**: la ley contradice activamente el estándar
- **Brecha de implementación**: norma correcta pero sin recursos, órgano o sanción

---

## PASO 4: Construcción de argumentación teórica

Leer: `references/frameworks/legal-argumentation.md`

Para cada hallazgo de los pasos anteriores, construir:

### 4.1 Argumento estructurado
```
HALLAZGO: [descripción precisa del problema]
NORMA VULNERADA: [artículo específico del instrumento internacional / constitucional]
TIPO DE VIOLACIÓN: [acción / omisión / discriminación indirecta / etc.]
DOCTRINA APLICABLE: [jurisprudencia, observaciones generales, informes]
ARGUMENTO CENTRAL: [tesis jurídica en 3-5 oraciones]
PROPUESTA DE REFORMA: [texto sugerido de modificación legislativa]
```

### 4.2 Jerarquizar hallazgos
Clasificar cada brecha por:
- **Urgencia** (viola derecho inderogable vs derecho de realización progresiva)
- **Remediabilidad** (requiere reforma constitucional / legal / reglamentaria / administrativa)
- **Potencial de litigio** (viable ante SCJN, CIDH, Comité ONU)

---

## PASO 5: Outputs

### 5A: Análisis interactivo en pantalla
Presentar usando `visualize:show_widget` con:
- Dashboard con tabs: Estructura | Exclusiones | Convencionalidad | Argumentación
- Tabla de actores normativa (paso 1.2)
- Mapa de brechas visual (semáforo: verde/amarillo/rojo)
- Argumentos expandibles por hallazgo

### 5B: Tabla comparativa ley vs instrumento internacional
Formato estructurado con todos los campos del paso 3.3
Ofrecer como descarga en Word (usar skill `docx`)

### 5C: Argumentación para litigio/cabildeo
Documento con argumentos del paso 4.1, jerarquizados por paso 4.2
Incluir pie de página con citas doctrinarias completas
Ofrecer como Word descargable

---

## Adaptación a otros países

Para analizar legislación de otros países, leer el archivo de referencia correspondiente en:
`references/countries/[pais]/sistema-juridico.md`

Actualmente disponibles:
- `references/countries/mexico/` — Sistema jurídico mexicano

Para agregar un nuevo país, crear `references/countries/[pais]/sistema-juridico.md` con:
- Jerarquía normativa
- Bloque de constitucionalidad
- Técnica legislativa predominante
- Órganos de control constitucional
- Tratados internacionales ratificados relevantes

---

## Notas metodológicas importantes

1. **Nunca hacer análisis solo textual.** El significado jurídico de una norma incluye su contexto de aplicación, los sujetos obligados a aplicarla, los recursos presupuestales y la jurisprudencia interpretativa.

2. **El silencio normativo es dato analítico.** Lo que la ley no dice es tan importante como lo que dice.

3. **Usar siempre fuentes primarias.** Citar artículos específicos de tratados, observaciones generales numeradas del comité correspondiente, tesis de jurisprudencia con número de registro.

4. **Diferenciar diagnóstico de recomendación.** El análisis identifica brechas; la recomendación propone texto legislativo. Son dos productos distintos.
