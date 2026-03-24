require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { OpenAI } = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar multer para almacenar el archivo en memoria (no escribirlo a disco permanentemente)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } }); // Límite de 10 MB para PDF

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('public'));

// Configure OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key', // Railway will provide this via env variables
});

// Load methodology and framework files from `references`
function loadContext() {
    let context = "";

    try {
        const skillPath = path.join(__dirname, 'SKILL.md');
        if (fs.existsSync(skillPath)) {
            let skillContent = fs.readFileSync(skillPath, 'utf-8');
            // Remove Claude specific instruction references, keeping the core methodology
            skillContent = skillContent.replace(/Usa este skill SIEMPRE que/g, "Usa esta herramienta SIEMPRE que");
            skillContent = skillContent.replace(/Este skill implementa/g, "Esta herramienta implementa");
            skillContent = skillContent.replace(/Usar `web_fetch`/g, "Extraer");
            skillContent = skillContent.replace(/Presentar usando `visualize:show_widget` con:/g, "Estructura tu respuesta para que la interfaz pueda presentar:");
            skillContent = skillContent.replace(/Ofrecer como descarga en Word \(usar skill `docx`\)/g, "");
            skillContent = skillContent.replace(/Ofrecer como Word descargable/g, "");
            context += `\n--- METODOLOGÍA GENERAL (SKILL.md) ---\n${skillContent}\n`;
        }

        const frameworksPath = path.join(__dirname, 'references', 'frameworks');
        if (fs.existsSync(frameworksPath)) {
            const files = fs.readdirSync(frameworksPath);
            for (const file of files) {
                if (file.endsWith('.md')) {
                    context += `\n--- FRAMEWORK: ${file} ---\n`;
                    context += fs.readFileSync(path.join(frameworksPath, file), 'utf-8') + '\n';
                }
            }
        }

        const instrumentsPath = path.join(__dirname, 'references', 'instruments');
        if (fs.existsSync(instrumentsPath)) {
            const files = fs.readdirSync(instrumentsPath);
            for (const file of files) {
                if (file.endsWith('.md')) {
                    context += `\n--- INSTRUMENTO: ${file} ---\n`;
                    context += fs.readFileSync(path.join(instrumentsPath, file), 'utf-8') + '\n';
                }
            }
        }

        const mexicoPath = path.join(__dirname, 'references', 'countries', 'mexico');
        if (fs.existsSync(mexicoPath)) {
            const files = fs.readdirSync(mexicoPath);
            for (const file of files) {
                if (file.endsWith('.md')) {
                    context += `\n--- CONTEXTO NACIONAL (MÉXICO): ${file} ---\n`;
                    context += fs.readFileSync(path.join(mexicoPath, file), 'utf-8') + '\n';
                }
            }
        }
    } catch (e) {
        console.error("Error loading context files:", e);
    }

    return context;
}

const systemContext = loadContext();

const SYSTEM_PROMPT = `
Eres la Herramienta de Análisis Normativo By Easy - (Adela Santos, PhD), un sistema experto en análisis jurídico normativo profundo de leyes y textos legislativos.
Aplica rigurosamente la metodología descrita a continuación para analizar el texto legislativo proporcionado por el usuario.

INSTRUCCIONES DE TONO Y LENGUAJE (OBLIGATORIAS):
- **Lenguaje Relajado y Condicional:** NUNCA afirmes categóricamente que una norma "está mal", "es discriminatoria" o "viola" un tratado. En su lugar, utiliza siempre construcciones condicionales y constructivas: "podría no ser incluyente porque...", "podría ser discriminatorio por...", "se sugiere revisar", "podría existir un área de oportunidad para la armonización convencional", "se observa una posible tensión normativa".
- **Cita del Texto Original:** Siempre que señales un hallazgo, debes incluir la cita literal breve del artículo (ej. "En el artículo X se señala que '...' lo cual podría...") para que el usuario pueda cotejarlo con el documento original cargado. El objetivo es evidenciar oportunidades de mejora para el *compliance* convencional, no emitir condenas judiciales.

${systemContext}

INSTRUCCIONES IMPORTANTES DE FORMATO:
Debes responder SIEMPRE con un objeto JSON válido, para que la interfaz web pueda renderizarlo correctamente en pestañas y paneles. No uses formato Markdown fuera del JSON. El JSON debe tener exactamente la siguiente estructura:

{
  "metricas": {
    "compatibilidad_convencional": "Número entero del 0 al 100 indicando el nivel general de compatibilidad con los tratados",
    "riesgo_exclusion": "Número entero del 0 al 100 indicando el nivel de riesgo de que la norma genere exclusiones (mayor número = mayor riesgo)",
    "riesgo_lenguaje": "Número entero del 0 al 100 indicando el riesgo por uso de lenguaje estigmatizante o médico-asistencial (mayor número = mayor riesgo)"
  },
  "estructura": {
    "anatomia_formal": "Texto sobre tipo de instrumento, jerarquía, fecha, etc.",
    "mapa_actores": [
      {
        "actor": "Nombre del actor",
        "tipo": "Tipo",
        "obligaciones": "Obligaciones asignadas",
        "facultades": "Facultades otorgadas",
        "exigibilidad": "Mecanismos de exigibilidad"
      }
    ],
    "flujo_responsabilidad": "Texto analizando el flujo",
    "mecanismos_exigibilidad": "Texto analizando sanciones, recursos, monitoreo"
  },
  "exclusiones": {
    "sujeto_normativo": "Análisis del sujeto",
    "perspectiva_genero": "Análisis de género e impacto",
    "interseccionalidad": "Análisis de interseccionalidad",
    "perspectiva_indigena": "Análisis de perspectiva indígena",
    "lenguaje_exclusion": "Análisis del lenguaje"
  },
  "convencionalidad": {
    "bloque_convencionalidad": "Texto sobre el bloque aplicable",
    "tabla_brechas": [
      {
        "estandar": "Artículo/Estándar internacional",
        "disposicion_ley": "Disposición en ley analizada",
        "tipo_brecha": "Ausencia total / Reconocimiento sin garantía / Regresión / Incompatibilidad / Brecha de implementación",
        "gravedad": "Baja / Media / Alta",
        "argumentacion": "Justificación"
      }
    ]
  },
  "argumentacion": [
    {
      "hallazgo": "Descripción del problema",
      "norma_vulnerada": "Artículo específico",
      "tipo_violacion": "Tipo de violación",
      "doctrina_aplicable": "Jurisprudencia, informes, etc.",
      "argumento_central": "Tesis jurídica",
      "propuesta_reforma": "Texto sugerido de modificación",
      "urgencia": "Nivel de urgencia",
      "remediabilidad": "Tipo de remedio necesario",
      "potencial_litigio": "Viabilidad"
    }
  ],
  "conclusion": "Un breve párrafo de resumen general del análisis"
}

Asegúrate de escapar las comillas dobles internas y devolver un JSON estricto. Analiza el texto proporcionado a continuación.
`;

app.post('/api/analyze', upload.single('lawPdf'), async (req, res) => {
    try {
        let text = req.body.text || "";
        const version = req.body.version || "";

        // Si el usuario subió un archivo, lo priorizamos
        if (req.file) {
            if (req.file.mimetype === 'application/pdf') {
                try {
                    // pdf-parse con options para ignorar ciertos errores de xref
                    const options = {
                        pagerender: function(pageData) {
                            return pageData.getTextContent().then(function(textContent) {
                                let lastY, text = '';
                                for (let item of textContent.items) {
                                    if (lastY == item.transform[5] || !lastY){
                                        text += item.str;
                                    } else {
                                        text += '\n' + item.str;
                                    }
                                    lastY = item.transform[5];
                                }
                                return text;
                            });
                        }
                    };
                    const pdfData = await pdfParse(req.file.buffer, options);
                    text = pdfData.text || "";
                    console.log(`Extracted ${text.length} characters from uploaded PDF.`);

                    if (text.trim().length < 50) {
                         // Likely a scanned document without an embedded text layer
                         return res.status(400).json({
                             error: `El documento parece ser un PDF escaneado (una imagen) o estar protegido. Solo se extrajeron ${text.trim().length} caracteres legibles. El análisis requiere texto seleccionable. Intente usar la pestaña "Pegar Texto" y asegúrese de copiar el texto real.`
                         });
                    }
                } catch (pdfError) {
                    console.error("Error parsing PDF with pdf-parse:", pdfError);
                    // Devolver el error sin fallar de manera crítica
                    return res.status(400).json({ error: 'No se pudo leer el texto del archivo PDF proporcionado. Podría estar escaneado como imagen, protegido con contraseña o dañado. Intente copiar el texto directamente en la pestaña "Pegar Texto".' });
                }
            } else {
                return res.status(400).json({ error: 'El archivo debe ser un PDF válido.' });
            }
        }

        if (!text || text.trim() === '') {
            return res.status(400).json({ error: 'No se detectó texto. Por favor, asegúrese de pegar el texto o subir un archivo PDF que contenga texto seleccionable.' });
        }

        // OpenAI gpt-4o-mini context window is 128k tokens (~500k chars).
        // Let's safely truncate to ~300,000 chars to leave room for the system prompt and output.
        const MAX_CHARS = 300000;
        if (text.length > MAX_CHARS) {
            console.log(`Truncating text from ${text.length} to ${MAX_CHARS} characters.`);
            text = text.substring(0, MAX_CHARS) + "\n\n...[TEXT TRUNCATED DUE TO LENGTH]...";
        }

        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy_key') {
            return res.status(500).json({ error: 'OpenAI API key is not configured on the server.' });
        }

        const userPrompt = `Versión/Contexto indicado por el usuario: ${version || 'No especificado'}\n\nTexto normativo a analizar:\n${text}`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Cost-effective model for large texts
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.2, // Low temperature for consistent, analytical responses
        });

        const resultJsonStr = response.choices[0].message.content;
        const resultData = JSON.parse(resultJsonStr);

        res.json(resultData);

    } catch (error) {
        console.error("Error in /api/analyze:", error);
        res.status(500).json({ error: 'An error occurred during analysis.', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
