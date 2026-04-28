import { TomTomConfig } from '@tomtom-org/maps-sdk/core'
import { TomTomMap } from '@tomtom-org/maps-sdk/map'
import './style.css'

// const TOMTOM_KEY = import.meta.env.VITE_TOMTOM_KEY
const TOMTOM_KEY = "YetNDBbkZPqPTe4hkCgacRbdUqQGSMCu"

// (Set your own API key when working in your own environment)
TomTomConfig.instance.put({ apiKey: TOMTOM_KEY });

new TomTomMap({
    mapLibre: {
        container: 'sdk-map',
        center: [-72.8156, 10.8414],
        zoom: 8,
    },
});
