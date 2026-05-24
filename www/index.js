import { TomTomConfig } from '@tomtom-org/maps-sdk/core'
import { TomTomMap } from '@tomtom-org/maps-sdk/map'
import mapLibre from 'maplibre-gl'

const TOMTOM_KEY = import.meta.env.VITE_TOMTOM_KEY

TomTomConfig.instance.put({ apiKey: TOMTOM_KEY })

const inicial = [0, 0]
let posicion = inicial

const boton_agregar = document.createElement('button')
boton_agregar.id = "boton_agregar_id"
boton_agregar.innerHTML = `
<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`

boton_agregar.addEventListener('click', () => {
    alert('agregar')
})

doc.appendChild(boton_agregar)

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(actualizarPosicion, () => {}, {
        enableHighAccuracy: true,
    })
}

async function actualizarPosicion(p) {
    posicion = [p.coords.longitude, p.coords.latitude]

    let tomtom_map = new TomTomMap({
        mapLibre: {
            container: 'sdk-map',
            center: posicion,
            zoom: 16,
        },
    })

    let map = tomtom_map.mapLibreMap

    let ejemplos = []

    // Marcar posición actual
    ejemplos.push({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: posicion },
        properties: {
            name: 'Yo',
        },
    })

    // Marcar posiciones de ejemplo
    let n = 10
    for (let i = 0; i < n; i++) {
        let t = `${i + 1}`
        let d = [Math.cos(2 * Math.PI * i / n), Math.sin(2 * Math.PI * i / n)]
        let h = 1e-3
        let p = [posicion[0] + d[0] * h, posicion[1] + d[1] * h]

        ejemplos.push({
            type: 'Feature',
            geometry: { type: 'Point', coordinates: p },
            properties: {
                type: "derrumbe",
                name: `Derrumbe #${t}`,
            },
        })
    }

    map.on("load", async () => {
        const derrumbe_img = await map.loadImage("./static/derrumbe.png")
        map.addImage("derrumbe-marcador", derrumbe_img.data)

        // Usar GeoJSON, utilizando su posición y su tipo de elemento
        map.addSource("derrumbes", {
            "type": "geojson",
            "data": {"type": "FeatureCollection", "features": ejemplos}
        })

        // Configuración del grupo de elementos a mostrar
        map.addLayer({
            "id": "derrumbes",
            "type": "symbol",
            "source": "derrumbes",
            "layout": {
                "icon-image": "derrumbe-marcador",
                "text-field": ["get", "name"],
                "text-offset": [0, 1.25],
                "text-anchor": "top",
            }
        })
    })
}
