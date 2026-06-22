import { extractVideoId, fetchVideoMetrics } from './api.js';
import { changeLanguage } from './i18n.js';

// --- ELEMENTOS DEL DOM ---
const languageSelect = document.getElementById('language-select');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const analyticsSection = document.getElementById('analytics-section');
const apiConfigBtn = document.getElementById('api-config-btn');

const metaThumbnail = document.getElementById('meta-thumbnail');
const metaTitle = document.getElementById('meta-title');
const metaAuthor = document.getElementById('meta-author');
const metaDescription = document.getElementById('meta-description');

const metricViews = document.getElementById('metric-views');
const metricLikes = document.getElementById('metric-likes');
const metricComments = document.getElementById('metric-comments');

let performanceChart = null;

// --- GESTIÓN DE CREDENCIALES ---
function getApiKey() {
    return localStorage.getItem('htrend_api_key') || '';
}

apiConfigBtn.addEventListener('click', () => {
    const currentKey = getApiKey();
    const newKey = prompt('Introduce tu YouTube Data API v3 Key (Se guardará localmente de forma segura):', currentKey);
    if (newKey !== null) {
        localStorage.setItem('htrend_api_key', newKey.trim());
        alert('API Key actualizada correctamente.');
    }
});

// --- UTILERÍAS ---
function formatNumber(num) {
    return new Intl.NumberFormat(navigator.language).format(num);
}

// --- RENDERIZADO DE GRÁFICOS ---
function renderChart(metrics) {
    const ctx = document.getElementById('analytics-chart').getContext('2d');
    
    if (performanceChart) {
        performanceChart.destroy();
    }

    performanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Visualizaciones (Base Logarítmica)', 'Me Gusta', 'Comentarios'],
            datasets: [{
                label: 'Volumen de Métricas',
                data: [Math.log10(metrics.views || 1) * 10, metrics.likes, metrics.comments],
                backgroundColor: [
                    'rgba(6, 182, 212, 0.2)',  // Cyan
                    'rgba(59, 130, 246, 0.2)', // Blue
                    'rgba(16, 185, 129, 0.2)'  // Emerald
                ],
                borderColor: [
                    'rgb(6, 182, 212)',
                    'rgb(59, 130, 246)',
                    'rgb(16, 185, 129)'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (context.dataIndex === 0) return `Vistas reales: ${formatNumber(metrics.views)}`;
                            return `Cantidad: ${formatNumber(context.raw)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: 'rgb(148, 163, 184)' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: 'rgb(148, 163, 184)' }
                }
            }
        }
    });
}


searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const url = searchInput.value.trim();
    const videoId = extractVideoId(url);
    const apiKey = getApiKey();

    if (!videoId) {
        alert('Por favor, introduce una URL de YouTube válida (Video o Short).');
        return;
    }

    if (!apiKey) {
        alert('Se requiere una API Key. Configúrala en el botón de la barra superior.');
        return;
    }

    try {
        searchInput.disabled = true;
        
        const data = await fetchVideoMetrics(videoId, apiKey);

        metaThumbnail.innerHTML = `<img src="${data.thumbnail}" alt="${data.title}" class="w-full h-full object-cover">`;
        metaTitle.textContent = data.title;
        metaAuthor.textContent = data.channelTitle;
        metaDescription.textContent = data.description || 'Sin descripción disponible.';

        metricViews.textContent = formatNumber(data.metrics.views);
        metricLikes.textContent = formatNumber(data.metrics.likes);
        metricComments.textContent = formatNumber(data.metrics.comments);

        renderChart(data.metrics);
        analyticsSection.classList.remove('hidden');

    } catch (error) {
        if (error.message === 'VIDEO_NOT_FOUND') {
            alert('No se encontró el video. Verifica que no sea privado o que el enlace sea correcto.');
        } else if (error.message === 'API_RESPONSE_ERROR') {
            alert('Error en la cuota o validez de tu API Key de YouTube.');
        } else {
            alert('Ocurrió un error inesperado al procesar las métricas.');
        }
    } finally {
        searchInput.disabled = false;
    }
});

languageSelect.addEventListener('change', (e) => {
    changeLanguage(e.target.value);
});
    
// Inicialización por defecto al cargar la app
const savedLocale = localStorage.getItem('htrend_locale') || 'es';
languageSelect.value = savedLocale;
changeLanguage(savedLocale);