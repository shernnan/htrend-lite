/**
 * Htrend Lite - Carga dinámica de idiomas (i18n)
 */

export async function changeLanguage(locale) {
    try {
        // Petición asíncrona al JSON correspondiente alojado en la carpeta pública
        const response = await fetch(`./locales/${locale}.json`);
        if (!response.ok) throw new Error(`No se pudo cargar el idioma: ${locale}`);
        
        const translations = await response.json();

        // Buscar todos los elementos del DOM que requieren traducción
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                // Si es un input, cambiamos el placeholder; si no, cambiamos el texto interno
                if (element.tagName === 'INPUT') {
                    element.placeholder = translations[key];
                } else {
                    element.textContent = translations[key];
                }
            }
        });

        // Guardar la preferencia del usuario en el navegador
        localStorage.setItem('htrend_locale', locale);

    } catch (error) {
        console.error("Error al aplicar el idioma:", error);
    }
}