require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
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

${systemContext}

INSTRUCCIONES IMPORTANTES DE FORMATO:
Debes responder SIEMPRE con un objeto JSON válido, para que la interfaz web pueda renderizarlo correctamente en pestañas y paneles. No uses formato Markdown fuera del JSON. El JSON debe tener exactamente la siguiente estructura:

{
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

app.post('/api/analyze', async (req, res) => {
    try {
        const { text, version } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'No text provided for analysis.' });
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
