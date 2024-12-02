// Configuração do mapa e carregamento de dados
document.addEventListener("DOMContentLoaded", () => {
    carregarDados();
});

const centralLatLong = [-43.9397233, -19.9332786]; // Belo Horizonte, MG

function carregarDados() {
    fetch('assets/instituicoes.json')
        .then(response => response.json())
        .then(data => {
            montarMapa(data.locais);
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
        });
}

function montarMapa(locais) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRlbHRvbnAiLCJhIjoiY20zYjAyYWF1MWswZjJqcHB1ejk2Mjc2OCJ9.HA7SOXdoT7IrSCr-tE83aw';
    
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: centralLatLong,
        zoom: 12
    });

    locais.forEach(local => {
        const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
                <h5><a href="${local.url}" target="_blank">${local.descricao}</a></h5>
                <p>${local.endereco}</p>
                <p>${local.cidade}</p>
                <p>Telefone: ${local.telefone}</p>
            `);

        new mapboxgl.Marker({ color: local.cor })
            .setLngLat(local.latlong)
            .setPopup(popup)
            .addTo(map);
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userPopup = new mapboxgl.Popup({ offset: 25 }).setText('Você está aqui!');
            new mapboxgl.Marker({ color: 'yellow' })
                .setLngLat([position.coords.longitude, position.coords.latitude])
                .setPopup(userPopup)
                .addTo(map);
        });
    }
}