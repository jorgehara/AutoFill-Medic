// Evento que se dispara cuando se hace clic en el botón "Rellenar" en el popup
document.getElementById("fillForm").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    let numAfiliado = document.getElementById("numAfiliado").value;
    let diagnostico = document.getElementById("diagnostico").value;

    // Enviar mensaje al script de contenido para rellenar el formulario
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: fillForm,
        args: [numAfiliado, diagnostico]
    });
});

// Función que se ejecuta en el contexto de la página web para rellenar el formulario
function fillForm(numAfiliado, diagnostico) {
    try {
        // 1️⃣ Escribir el número de afiliado
        let inputAfiliado = document.getElementById("pe-n_afiliado");
        if (inputAfiliado) {
            inputAfiliado.value = numAfiliado;
            inputAfiliado.dispatchEvent(new Event("input", { bubbles: true }));
            console.log("paso 1: Número de afiliado ingresado");

            // 2️⃣ Simular la tecla TAB
            setTimeout(() => {
                let tabEvent = new KeyboardEvent("keydown", { key: "Tab", keyCode: 9, bubbles: true });
                inputAfiliado.dispatchEvent(tabEvent);
                console.log("paso 2: TAB simulado");
            }, 500); // Esperar 500ms antes de presionar TAB
            
            // 3️⃣ Esperar y hacer clic en el botón de búsqueda de diagnóstico
            setTimeout(() => {
                let searchButton = document.getElementById("pe-btn-bsq-diagnostico");
                if (searchButton) {
                    searchButton.click();
                    console.log("paso 3: Botón de búsqueda de diagnóstico clickeado");

                    // 4️⃣ Esperar y seleccionar el diagnóstico
                    setTimeout(() => {
                        let inputDiagnostico = document.getElementById("bsq_avz_diagnostico_valor");
                        if (inputDiagnostico) {
                            inputDiagnostico.value = diagnostico;
                            inputDiagnostico.dispatchEvent(new Event("input", { bubbles: true }));

                            // Buscar el botón de búsqueda dentro del modal
                            let modalSearchButton = document.querySelector("#modal-busqueda-diagnostico button[type='submit']");
                            if (modalSearchButton) {
                                modalSearchButton.click();
                                console.log("paso 4: Diagnóstico ingresado y búsqueda iniciada");

                                // 5️⃣ Esperar y seleccionar el primer resultado de la lista
                                setTimeout(() => {
                                    let results = document.querySelectorAll("#modal-busqueda-diagnostico td");
                                    if (results.length > 0) {
                                        results[0].click();
                                        console.log("paso 5: Primer resultado de la lista seleccionado");
                                    } else {
                                        console.error("No se encontró ningún resultado en la lista");
                                    }

                                    // 6️⃣ Simular un tabulador y luego ENTER
                                    setTimeout(() => {
                                        let tabEvent = new KeyboardEvent("keydown", { key: "Tab", keyCode: 9, bubbles: true });
                                        document.activeElement.dispatchEvent(tabEvent);
                                        console.log("paso 6: TAB simulado");

                                        setTimeout(() => {
                                            let enterEvent = new KeyboardEvent("keydown", { key: "Enter", keyCode: 13, bubbles: true });
                                            document.activeElement.dispatchEvent(enterEvent);
                                            console.log("paso 7: ENTER simulado");
                                        }, 500);
                                    }, 500);
                                }, 500); // Esperar 500ms antes de seleccionar el primer resultado
                            } else {
                                console.error("Botón de búsqueda en el modal no encontrado");
                            }
                        } else {
                            console.error("Input de diagnóstico no encontrado");
                        }
                    }, 500); // Esperar 500ms antes de escribir el diagnóstico
                } else {
                    console.error("Botón de búsqueda de diagnóstico no encontrado");
                }
            }, 2000); // Esperar 2s después de TAB para que el sistema complete los datos
        } else {
            console.error("Input de afiliado no encontrado");
        }
    } catch (error) {
        console.error("Error en fillForm:", error);
    }
}