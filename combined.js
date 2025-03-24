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

                                            // 8️⃣ Buscar el ícono del botón de búsqueda de práctica y hacer clic
                                            setTimeout(() => {
                                                let searchPracticeButton = document.getElementById("pe-btn-bsq-practica");
                                                if (searchPracticeButton) {
                                                    searchPracticeButton.click();
                                                    console.log("paso 8: Botón de búsqueda de práctica clickeado");

                                                    // 9️⃣ Seleccionar "AMBULATORIO" en el dropdown de modalidad
                                                    setTimeout(() => {
                                                        let modalidadDropdown = document.getElementById("bsq_modalidad_practica");
                                                        if (modalidadDropdown) {
                                                            modalidadDropdown.value = "1"; // Valor para "AMBULATORIO"
                                                            modalidadDropdown.dispatchEvent(new Event("change", { bubbles: true }));
                                                            console.log("paso 9: Modalidad 'AMBULATORIO' seleccionada");

                                                            // 🔟 Seleccionar "MEDICO DE CABECERA" en el dropdown de agrupador
                                                            setTimeout(() => {
                                                                let agrupadorDropdown = document.getElementById("bsq_agrupador_practica");
                                                                if (agrupadorDropdown) {
                                                                    agrupadorDropdown.value = "41"; // Valor para "MEDICO DE CABECERA"
                                                                    agrupadorDropdown.dispatchEvent(new Event("change", { bubbles: true }));
                                                                    console.log("paso 10: Agrupador 'MEDICO DE CABECERA' seleccionado");

                                                                    // 1️⃣1️⃣ Seleccionar "MEDICO CABECERA" en el dropdown de módulo
                                                                    setTimeout(() => {
                                                                        let moduloDropdown = document.getElementById("bsq_modulo_practica");
                                                                        if (moduloDropdown) {
                                                                            moduloDropdown.value = "1"; // Valor para "MEDICO CABECERA"
                                                                            moduloDropdown.dispatchEvent(new Event("change", { bubbles: true }));
                                                                            console.log("paso 11: Módulo 'MEDICO CABECERA' seleccionado");

                                                                        } else {
                                                                            console.error("Dropdown de módulo no encontrado");
                                                                        }
                                                                    }, 500); // Esperar 500ms antes de seleccionar el módulo
                                                                    // 1️⃣2️⃣ Buscar el input de descripción de práctica, escribir "pres" y simular ENTER
                                                                    setTimeout(() => {
                                                                        let descPracticaInput = document.getElementById("bsq_desc_practica");
                                                                        if (descPracticaInput) {
                                                                            descPracticaInput.value = "pres";
                                                                            descPracticaInput.dispatchEvent(new Event("input", { bubbles: true }));
                                                                            descPracticaInput.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", keyCode: 13, bubbles: true }));
                                                                            console.log("paso 12: 'pres' ingresado y ENTER simulado en el input de descripción de práctica");

                                                                            // 1️⃣3️⃣ Buscar y hacer clic en el botón de filtro de prácticas
                                                                            setTimeout(() => {
                                                                                let filterButton = document.querySelector("#pe-form-filtro-practicas > div:nth-child(3) > div.col-sm-offset-2.col-sm-2 > button");
                                                                                if (filterButton) {
                                                                                    filterButton.click();
                                                                                    console.log("paso 13: Botón de filtro de prácticas clickeado");

                                                                                    // 1️⃣4️⃣ Seleccionar la primera opción de la lista de prácticas
                                                                                    setTimeout(() => {
                                                                                        let firstOptionCheckbox = document.querySelector("#pe-listado-bsq-practicas > table > tbody > tr > td:nth-child(1) > input[type=checkbox]");
                                                                                        if (firstOptionCheckbox) {
                                                                                            firstOptionCheckbox.click();
                                                                                            console.log("paso 14: Primera opción de la lista de prácticas seleccionada");

                                                                                            // 1️⃣5️⃣ Hacer clic en el botón "Aceptar"
                                                                                            setTimeout(() => {
                                                                                                let acceptButton = document.querySelector("#pe-btn-agregar-practicas");
                                                                                                if (acceptButton) {
                                                                                                    acceptButton.click();
                                                                                                    console.log("paso 15: Botón 'Aceptar' clickeado");

                                                                                                    // 1️⃣6️⃣ Buscar el ícono que abrirá otro popup
                                                                                                    setTimeout(() => {
                                                                                                        let iconButton = document.querySelector("#pe-btn-form-427109");
                                                                                                        if (iconButton) {
                                                                                                            iconButton.click();
                                                                                                            console.log("paso 16: Ícono clickeado para abrir otro popup");

                                                                                                            // Aquí puedes agregar el código para rellenar el nuevo formulario
                                                                                                            // ...
                                                                                                        } else {
                                                                                                            console.error("Ícono no encontrado");
                                                                                                        }
                                                                                                    }, 500); // Esperar 500ms antes de hacer clic en el ícono
                                                                                                } else {
                                                                                                    console.error("Botón 'Aceptar' no encontrado");
                                                                                                }
                                                                                            }, 500); // Esperar 500ms antes de hacer clic en el botón "Aceptar"
                                                                                        } else {
                                                                                            console.error("Checkbox de la primera opción no encontrado");
                                                                                        }
                                                                                    }, 500); // Esperar 500ms antes de seleccionar la primera opción
                                                                                } else {
                                                                                    console.error("Botón de filtro de prácticas no encontrado");
                                                                                }
                                                                            }, 500); // Esperar 500ms antes de hacer clic en el botón de filtro de prácticas
                                                                        } else {
                                                                            console.error("Input de descripción de práctica no encontrado");
                                                                        }
                                                                    }, 500); // Esperar 500ms antes de escribir "pres" y simular ENTER
                                                                } else {
                                                                    console.error("Dropdown de agrupador no encontrado");
                                                                }
                                                            }, 500); // Esperar 500ms antes de seleccionar el agrupador
                                                        } else {
                                                            console.error("Dropdown de modalidad no encontrado");
                                                        }
                                                    }, 500); // Esperar 500ms antes de seleccionar la modalidad
                                                } else {
                                                    console.error("Botón de búsqueda de práctica no encontrado");
                                                }
                                            }, 500); // Esperar 500ms antes de hacer clic en el botón de búsqueda de práctica
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