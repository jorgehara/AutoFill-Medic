// Evento que se dispara cuando se hace clic en el botón "Limpiar" en el popup
document.getElementById("clearForm").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Enviar mensaje al script de contenido para limpiar el formulario
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: clearForm
    });
});

// Función que se ejecuta en el contexto de la página web para limpiar el formulario
function clearForm() {
    try {
        // Vaciar todo el formulario por completo antes de rellenar
        document.querySelector("#pe-btn-cancelar-orden").click();
        setTimeout(() => {
            document.querySelector("#pe-btn-confirmar-cancelar-orden").click();
            console.log("Formulario vaciado");
        }, 500); // Esperar 500ms antes de confirmar la limpieza del formulario
    } catch (error) {
        console.error("Error en clearForm:", error);
    }
}