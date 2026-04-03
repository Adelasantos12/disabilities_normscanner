require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { OpenAI } = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Seguridad: Helmet para cabeceras HTTP
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
            scriptSrcAttr: ["'unsafe-inline'"], // Necesario para los onclick="function()" en el HTML
            styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:"]
        }
    }
}));

// Configuración de Seguridad: Limitador de peticiones (15 reqs por IP cada 15 min para la API)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 15,
    message: { error: 'Demasiadas peticiones desde esta IP, por favor intente de nuevo en 15 minutos.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Configurar multer para almacenar el archivo en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } }); // Límite de 10 MB

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('public'));

// Endpoint de Health Test
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        service: 'normative-scanner-backend'
    });
});

// Endpoint de Health Security Test
app.get('/api/health/security', (req, res) => {
    res.status(200).json({
        status: 'SECURE',
        timestamp: new Date().toISOString(),
        protections: {
            helmet_headers: true,
            rate_limiting: true,
            max_payload_size: '50mb',
            cors_enabled: true,
            file_upload_limit: '10mb',
            memory_storage_only: true
        }
    });
});

// Configure OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key', // Railway will provide this via env variables
});

// Load methodology and framework files from `references` and `docs`
function loadContext() {
    let context = "";

    try {
        const protocolPath = path.join(__dirname, 'normative-analysis-protocol.md');
        if (fs.existsSync(protocolPath)) {
            const protocolContent = fs.readFileSync(protocolPath, 'utf-8');
            context += `\n--- OPERATIONAL PROTOCOL (normative-analysis-protocol.md) ---\n${protocolContent}\n`;
        }

        const methodologyPath = path.join(__dirname, 'docs', 'methodological-note.md');
        if (fs.existsSync(methodologyPath)) {
            const methodologyContent = fs.readFileSync(methodologyPath, 'utf-8');
            context += `\n--- METHODOLOGICAL NOTE (methodological-note.md) ---\n${methodologyContent}\n`;
        }

        const terminologyPath = path.join(__dirname, 'docs', 'terminology-guide.md');
        if (fs.existsSync(terminologyPath)) {
            const terminologyContent = fs.readFileSync(terminologyPath, 'utf-8');
            context += `\n--- TERMINOLOGY GUIDE (terminology-guide.md) ---\n${terminologyContent}\n`;
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
                    context += `\n--- INSTRUMENT: ${file} ---\n`;
                    context += fs.readFileSync(path.join(instrumentsPath, file), 'utf-8') + '\n';
                }
            }
        }

        const caseLawPath = path.join(__dirname, 'references', 'case-law-notes');
        if (fs.existsSync(caseLawPath)) {
            const files = fs.readdirSync(caseLawPath);
            for (const file of files) {
                if (file.endsWith('.md')) {
                    context += `\n--- CASE LAW NOTES: ${file} ---\n`;
                    context += fs.readFileSync(path.join(caseLawPath, file), 'utf-8') + '\n';
                }
            }
        }

        // Dynamically load all available country modules
        const countriesPath = path.join(__dirname, 'references', 'countries');
        if (fs.existsSync(countriesPath)) {
            const countries = fs.readdirSync(countriesPath);
            for (const country of countries) {
                const countryDir = path.join(countriesPath, country);
                if (fs.statSync(countryDir).isDirectory()) {
                    const files = fs.readdirSync(countryDir);
                    for (const file of files) {
                        if (file.endsWith('.md')) {
                            context += `\n--- COUNTRY LEGAL CONTEXT (${country.toUpperCase()}): ${file} ---\n`;
                            context += fs.readFileSync(path.join(countryDir, file), 'utf-8') + '\n';
                        }
                    }
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
Eres NormTrace, una herramienta de análisis jurídico normativo profundo asistida por IA (By Easy - Adela Santos, PhD).
Tu objetivo es analizar rigurosamente la norma nacional contra los estándares internacionales, siguiendo de forma estricta las instrucciones del OPERATIONAL PROTOCOL (normative-analysis-protocol.md) y empleando la terminología fijada en la TERMINOLOGY GUIDE (terminology-guide.md). No inventes términos ni uses "compliance" si la guía dicta "legal compatibility".

INSTRUCCIONES METODOLÓGICAS NO NEGOCIABLES:
1. **Diferenciación Jurisdiccional:** Debes utilizar el Country Module correspondiente. Para México, analiza el control de convencionalidad bajo su parámetro constitucional; para Suiza, trátalo como un sistema monista bajo análisis de compatibilidad de tratados. No asumas que el modelo mexicano aplica a Suiza, ni viceversa.
2. **No inventar doctrina:** No inventes disposiciones legales, jurisprudencia, ni poderes institucionales. Solo afirma lo que puedes sustentar en el texto subido y en los marcos metodológicos. Ante la duda, indícala explícitamente.
3. **Cita del Texto Original:** Siempre que señales un hallazgo, debes incluir la cita literal breve del artículo para que el usuario pueda cotejarlo.

INSTRUCCIONES DE TONO Y LENGUAJE:
- **Lenguaje Constructivo y Académico:** Aplica un tono jurídico, constructivo y condicional. En lugar de emitir juicios tajantes ("está mal", "viola", "es discriminatoria"), utiliza expresiones como: "se observa una posible tensión normativa", "podría existir un área de oportunidad para la alineación normativa", "podría no ser incluyente en la medida en que omite...", "se sugiere revisar a la luz del estándar...".

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

app.post('/api/analyze', apiLimiter, upload.single('lawPdf'), async (req, res) => {
    try {
        let text = req.body.text || "";
        const version = req.body.version || "";
        const targetLanguage = req.body.language || "es";

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

        let dynamicSystemPrompt = SYSTEM_PROMPT;
        if (targetLanguage === 'en') {
            dynamicSystemPrompt += `\n\nTRANSLATION INSTRUCTION: The user interface is currently in English. You MUST translate all the generated content (the values of the JSON keys) into British English (e.g. 'analyse', 'programme', 'summarise'). However, DO NOT translate or modify the JSON keys themselves, keep them exactly as requested in Spanish so the frontend can parse them properly.`;
        }

        const userPrompt = `Versión/Contexto indicado por el usuario: ${version || 'No especificado'}\n\nTexto normativo a analizar:\n${text}`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Cost-effective model for large texts
            messages: [
                { role: "system", content: dynamicSystemPrompt },
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
