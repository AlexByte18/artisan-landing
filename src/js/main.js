// Import our custom CSS
import '../scss/custom.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

new FinisherHeader({
  "count": 10,
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
      "#1c6df5"
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