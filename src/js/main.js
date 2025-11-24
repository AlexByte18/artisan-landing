import './finisher-header.es5.min.js'
import './banner.js'
import './cards.js'
import AOS from 'aos';
import 'aos/dist/aos.css';
import initThree from './three-scene'
import initAtom from './atom'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('three-hero')

  if (container) {
    try {
      const threeHandle = initThree(container)
      if (threeHandle) {
        container.dataset.threeInitialized = 'true'
      }
    } catch (e) {
      console.warn('three init failed:', e)
      container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#9aa0ad">3D not available</div>'
    }
  }

  const atomContainer = document.getElementById('atomContainer')
  if (atomContainer) {
    try {
      initAtom(atomContainer)
    } catch (e) {
      console.warn('atom init failed:', e)
    }
  }
})

AOS.init({
  duration: 800,
  once: true,
  offset: 100,
});
