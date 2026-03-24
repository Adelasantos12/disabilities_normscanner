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
