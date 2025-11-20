// Import our custom CSS
import '../scss/custom.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

new FinisherHeader({
  "count": 9,
  "size": {
    "min": 1300,
    "max": 1500,
    "pulse": 0
  },
  "speed": {
    "x": {
      "min": 0.1,
      "max": 0.6
    },
    "y": {
      "min": 0.1,
      "max": 0.6
    }
  },
  "colors": {
    "background": "#000000",
    "particles": [
      "#0a23d7",
      "#00094e",
      // "#1c6df5"
    ]
  },
  "blending": "none",
  "opacity": {
    "center": 0.5,
    "edge": 0.05
  },
  "skew": -3,
  "shapes": [
    "c"
  ]
});

// Initialize interactive 3D scene
import initThree from './three-scene'
import initAtom from './atom'

document.addEventListener('DOMContentLoaded', () => {
  // Initialize 3D scene
  const container = document.getElementById('three-hero')
  console.log('[main] DOMContentLoaded — #three-hero ->', container)

  if (container) {
    try {
      console.log('[main] Attempting to initialize 3D scene...')
      const threeHandle = initThree(container)
      if (threeHandle) {
        container.dataset.threeInitialized = 'true'
        console.log('[main] 3D scene initialized')
      }
    } catch (e) {
      console.warn('[main] three init failed:', e)
      container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#9aa0ad">3D no disponible</div>'
    }
  }

  // Initialize atom interactive section
  const atomContainer = document.getElementById('atomContainer')
  if (atomContainer) {
    try {
      console.log('[main] Initializing atom...')
      initAtom(atomContainer)
      console.log('[main] Atom initialized')
    } catch (e) {
      console.warn('[main] atom init failed:', e)
    }
  }
})


