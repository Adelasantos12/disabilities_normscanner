// Diccionario de Traducciones
const translations = {
    es: {
        navTitle: "Herramienta de Análisis Normativo Profundo",
        btnMethodology: "Nota Metodológica",
        introTitle: "Ingreso de Texto Legislativo",
        introDesc: "Pega a continuación el texto de la ley, decreto o instrumento normativo que deseas evaluar. El sistema aplicará una metodología hermenéutica multinivel para detectar brechas de convencionalidad, omisiones estructurales y exclusiones.",
        labelVersion: "Versión / Fecha de última reforma (Opcional):",
        labelLawText: "Texto normativo:",
        btnSubmit: "Ejecutar Análisis",
        loaderText: "Aplicando metodología multinivel... Esto puede tomar un minuto.",
        tabStructure: "Estructura",
        tabExclusions: "Exclusiones",
        tabConventionality: "Convencionalidad",
        tabArgumentation: "Argumentación",
        structureTitle: "Disección Estructural de la Ley",
        footerNote: "Nota: Este análisis automatizado es un punto de partida y requiere revisión experta. No sustituye el criterio jurídico profesional.",
        modalTitle: "Nota Metodológica",
        modalSection1Title: "Niveles de Análisis",
        modalSection1Desc: "Este escáner trasciende la búsqueda de palabras clave. Evalúa el efecto jurídico real de la norma aplicando una metodología hermenéutica multinivel, la cual no es un simple análisis de coincidencias textuales, sino que contempla omisiones, exclusiones estructurales y sesgos implícitos.",
        modalSection2Title: "Elementos del Marco Jurídico",
        modalSection2Desc: "Analizamos anatomía formal, mapa de actores (obligaciones, facultades, exigibilidad), exclusiones explícitas o implícitas (interseccionalidad, perspectiva de género, pueblos indígenas) y el control de convencionalidad basado en la progresividad, no regresividad y máxima protección.",
        modalSection3Title: "Supuestos Teóricos",
        modalSection3List: "<li><strong>Compliance e Internalización:</strong> Evaluación de cómo los Estados adaptan y aplican los estándares internacionales en la normativa local.</li><li><strong>Relevancia:</strong> La omisión o silencio normativo es considerado un dato analítico tan importante como el texto mismo.</li>",
        modalSection4Title: "Limitaciones",
        modalSection4List: "<li>En su versión 1.0, esta herramienta está diseñada específicamente para analizar el marco jurídico de <strong>México</strong>.</li><li>El caso piloto actual está estructurado en torno a la legislación de Personas con Discapacidad (CDPD vs. LGIPD).</li>",
        modalSection5Title: "Fuentes",
        modalSection5Desc: "Constitución Política de los Estados Unidos Mexicanos, Convención sobre los Derechos de las Personas con Discapacidad (CDPD), Observaciones Generales del Comité CDPD y Jurisprudencia vinculante (SCJN, Corte IDH).",
        modalSection6Title: "Cómo citar esta herramienta",
        modalCitation: "Santos-Domínguez, Adela B. (2025). Normative-conventional scanner v1.0: Herramienta de análisis jurídico normativo profundo asistido. By Easy - Adela Santos, PhD."
    },
    en: {
        navTitle: "Deep Normative Analysis Tool",
        btnMethodology: "Methodological Note",
        introTitle: "Input Legislative Text",
        introDesc: "Paste the text of the law, decree, or normative instrument you wish to evaluate below. The system will apply a multi-level hermeneutic methodology to detect gaps in conventionality, structural omissions, and exclusions.",
        labelVersion: "Version / Date of last reform (Optional):",
        labelLawText: "Normative text:",
        btnSubmit: "Execute Analysis",
        loaderText: "Applying multi-level methodology... This may take a minute.",
        tabStructure: "Structure",
        tabExclusions: "Exclusions",
        tabConventionality: "Conventionality",
        tabArgumentation: "Argumentation",
        structureTitle: "Structural Dissection of the Law",
        footerNote: "Note: This automated analysis is a starting point and requires expert review. It does not replace professional legal judgement.",
        modalTitle: "Methodological Note",
        modalSection1Title: "Levels of Analysis",
        modalSection1Desc: "This scanner goes beyond keyword searching. It evaluates the real legal effect of the norm by applying a multi-level hermeneutic methodology, which is not a simple textual coincidence analysis, but contemplates omissions, structural exclusions, and implicit biases.",
        modalSection2Title: "Elements of the Legal Framework",
        modalSection2Desc: "We analyse formal anatomy, actor mapping (obligations, powers, enforceability), explicit or implicit exclusions (intersectionality, gender perspective, indigenous peoples) and the control of conventionality based on progressivity, non-regressivity, and maximum protection.",
        modalSection3Title: "Theoretical Assumptions",
        modalSection3List: "<li><strong>Compliance and Internalisation:</strong> Evaluation of how States adapt and apply international standards in local regulations.</li><li><strong>Relevance:</strong> Normative omission or silence is considered an analytical datum as important as the text itself.</li>",
        modalSection4Title: "Limitations",
        modalSection4List: "<li>In its version 1.0, this tool is specifically designed to analyse the legal framework of <strong>Mexico</strong>.</li><li>The current pilot case is structured around the legislation of Persons with Disabilities (CRPD vs. LGIPD).</li>",
        modalSection5Title: "Sources",
        modalSection5Desc: "Political Constitution of the United Mexican States, Convention on the Rights of Persons with Disabilities (CRPD), General Comments of the CRPD Committee and binding Jurisprudence (SCJN, Inter-American Court of Human Rights).",
        modalSection6Title: "How to cite this tool",
        modalCitation: "Santos-Domínguez, Adela B. (2025). Normative-conventional scanner v1.0: Assisted deep normative legal analysis tool. By Easy - Adela Santos, PhD."
    }
};

// Cambio de idioma
document.getElementById('lang-selector').addEventListener('change', function(e) {
    const lang = e.target.value;
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'UL') {
                el.innerHTML = translations[lang][key]; // Allow HTML for lists
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
});

// Manejo del Modal (Nota Metodológica)
const modal = document.getElementById("methodologyModal");
const btnMethodology = document.getElementById("btn-methodology");
const spanClose = document.getElementById("closeModal");

btnMethodology.onclick = function() {
    modal.style.display = "block";
}

spanClose.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Manejo de Tabs
function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    const tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Interacción de Formulario
document.getElementById('analyze-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const text = document.getElementById('law-text').value;
    const version = document.getElementById('law-version').value;
    const submitBtn = document.getElementById('submit-btn');
    const loader = document.getElementById('loader');
    const resultsDiv = document.getElementById('results');

    if (!text.trim()) {
        alert("Por favor, ingresa el texto normativo.");
        return;
    }

    // UI Updates
    submitBtn.disabled = true;
    loader.style.display = "block";
    resultsDiv.style.display = "none";

    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, version })
        });

        const data = await response.json();

        if (response.ok) {
            renderResults(data);
            resultsDiv.style.display = "block";
            // Set first tab active
            document.querySelector('.tablink').click();
        } else {
            alert("Error en el análisis: " + (data.error || "Ocurrió un error inesperado."));
        }
    } catch (error) {
        console.error("Error fetching analysis:", error);
        alert("Error de conexión con el servidor.");
    } finally {
        submitBtn.disabled = false;
        loader.style.display = "none";
    }
});

// Renderizado de Resultados JSON en el DOM
function renderResults(data) {
    // === TAB: ESTRUCTURA ===
    if (data.estructura) {
        document.getElementById('res-anatomia').textContent = data.estructura.anatomia_formal || "Sin datos.";
        document.getElementById('res-flujo').textContent = data.estructura.flujo_responsabilidad || "Sin datos.";
        document.getElementById('res-exigibilidad').textContent = data.estructura.mecanismos_exigibilidad || "Sin datos.";

        const tbodyActores = document.querySelector('#table-actores tbody');
        tbodyActores.innerHTML = "";
        if (data.estructura.mapa_actores && Array.isArray(data.estructura.mapa_actores)) {
            data.estructura.mapa_actores.forEach(actor => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${actor.actor || '-'}</strong></td>
                    <td>${actor.tipo || '-'}</td>
                    <td>${actor.obligaciones || '-'}</td>
                    <td>${actor.facultades || '-'}</td>
                    <td>${actor.exigibilidad || '-'}</td>
                `;
                tbodyActores.appendChild(tr);
            });
        }
    }

    // === TAB: EXCLUSIONES ===
    if (data.exclusiones) {
        const accContainer = document.getElementById('acc-exclusiones');
        accContainer.innerHTML = "";

        const exclusionesMap = {
            "Sujeto Normativo": data.exclusiones.sujeto_normativo,
            "Perspectiva de Género": data.exclusiones.perspectiva_genero,
            "Interseccionalidad": data.exclusiones.interseccionalidad,
            "Perspectiva Indígena": data.exclusiones.perspectiva_indigena,
            "Lenguaje como Exclusión": data.exclusiones.lenguaje_exclusion
        };

        for (const [key, value] of Object.entries(exclusionesMap)) {
            if (value) {
                const item = document.createElement('div');
                item.className = 'accordion-item';
                item.innerHTML = `
                    <div class="accordion-header" onclick="toggleAccordion(this)">
                        <span>${key}</span>
                        <span>▼</span>
                    </div>
                    <div class="accordion-body">
                        <p>${value}</p>
                    </div>
                `;
                accContainer.appendChild(item);
            }
        }
    }

    // === TAB: CONVENCIONALIDAD ===
    if (data.convencionalidad) {
        document.getElementById('res-bloque').textContent = data.convencionalidad.bloque_convencionalidad || "Sin datos.";

        const tbodyBrechas = document.querySelector('#table-brechas tbody');
        tbodyBrechas.innerHTML = "";
        if (data.convencionalidad.tabla_brechas && Array.isArray(data.convencionalidad.tabla_brechas)) {
            data.convencionalidad.tabla_brechas.forEach(brecha => {
                const tipoClass = brecha.tipo_brecha && brecha.tipo_brecha.includes("Regresión") ? "badge-brecha-Regresión" :
                                  brecha.tipo_brecha && brecha.tipo_brecha.includes("Ausencia") ? "badge-brecha-Ausencia" : "";

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${brecha.estandar || '-'}</strong></td>
                    <td>${brecha.disposicion_ley || '-'}</td>
                    <td class="${tipoClass}">${brecha.tipo_brecha || '-'}</td>
                    <td>${brecha.gravedad || '-'}</td>
                    <td>${brecha.argumentacion || '-'}</td>
                `;
                tbodyBrechas.appendChild(tr);
            });
        }
    }

    // === TAB: ARGUMENTACIÓN ===
    if (data.argumentacion && Array.isArray(data.argumentacion)) {
        const argContainer = document.getElementById('list-argumentos');
        argContainer.innerHTML = "";

        data.argumentacion.forEach((arg, index) => {
            const urgenciaClass = `badge-urgencia-${arg.urgencia ? arg.urgencia.replace(/\s+/g, '') : 'Media'}`;

            const card = document.createElement('div');
            card.className = 'argument-card';
            card.innerHTML = `
                <h4>Argumento #${index + 1}</h4>
                <div>
                    <span class="arg-badge ${urgenciaClass}">Urgencia: ${arg.urgencia || 'N/A'}</span>
                    <span class="arg-badge badge-urgencia-Baja">Litigio: ${arg.potencial_litigio || 'N/A'}</span>
                </div>
                <p><strong>Hallazgo:</strong> ${arg.hallazgo || '-'}</p>
                <p><strong>Norma Vulnerada:</strong> ${arg.norma_vulnerada || '-'}</p>
                <p><strong>Tipo de Violación:</strong> ${arg.tipo_violacion || '-'}</p>
                <p><strong>Doctrina Aplicable:</strong> ${arg.doctrina_aplicable || '-'}</p>
                <div style="margin-top: 1rem; padding-left: 1rem; border-left: 3px solid var(--accent-color);">
                    <p><strong>Argumento Central:</strong><br>${arg.argumento_central || '-'}</p>
                </div>
                <div style="margin-top: 1rem; background-color: var(--bg-color); padding: 0.8rem; border-radius: 4px;">
                    <p><strong>Propuesta de Reforma / Remedio:</strong><br>${arg.propuesta_reforma || '-'}</p>
                    <p><small>Remediabilidad: ${arg.remediabilidad || '-'}</small></p>
                </div>
            `;
            argContainer.appendChild(card);
        });
    }

    // === CONCLUSIÓN ===
    if (data.conclusion) {
        document.getElementById('res-conclusion').textContent = data.conclusion;
    }
}

// Helper para el acordeón
function toggleAccordion(element) {
    const body = element.nextElementSibling;
    const icon = element.querySelectorAll('span')[1];
    if (body.style.display === "block") {
        body.style.display = "none";
        icon.textContent = "▼";
    } else {
        body.style.display = "block";
        icon.textContent = "▲";
    }
}

// Protección contra atajos de teclado de copia (Complementa el user-select: none y oncontextmenu en HTML)
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C' || e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        alert("La copia y descarga directa está deshabilitada en esta herramienta por derechos de autor.");
    }
});
