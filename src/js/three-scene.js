
// Particle field scene using Three.js (CDN import)
import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js'

export default function initThree(container) {
  console.log('[three-scene] initThree called', { container })
  if (!container) return

  // quick WebGL availability check
  const canvasTest = document.createElement('canvas')
  const gl = canvasTest.getContext('webgl2') || canvasTest.getContext('webgl')
  if (!gl) {
    console.warn('[three-scene] WebGL not available in this browser')
    container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#9aa0ad">WebGL no soportado</div>'
    return
  }

  // size based on container
  const width = container.clientWidth || 520
  const height = container.clientHeight || 380

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
  camera.position.set(0, 0, 6)

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  try { renderer.outputColorSpace = THREE.SRGBColorSpace } catch (e) { /* ignore if not available */ }

  // keep renderer background transparent so underlying CSS shows
  try { renderer.setClearColor(0x000000, 0) } catch (e) { /* ignore */ }

  // attach canvas
  container.innerHTML = ''
  container.appendChild(renderer.domElement)
  console.log('[three-scene] renderer attached', { width, height })

  // Lights
  const ambient = new THREE.AmbientLight(0x99ccff, 0.12)
  scene.add(ambient)
  const point = new THREE.PointLight(0x7b61ff, 0.8, 20)
  point.position.set(5, 5, 6)
  scene.add(point)

  // Particle system parameters
  const COUNT = 2200
  const positions = new Float32Array(COUNT * 3)
  const colors = new Float32Array(COUNT * 3)
  const sizes = new Float32Array(COUNT)

  // base positions (on a noisy sphere / shell) and color gradient
  for (let i = 0; i < COUNT; i++) {
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = Math.random() * Math.PI * 2
    const r = 1.2 + Math.random() * 1.6
    const x = Math.sin(phi) * Math.cos(theta) * r
    const y = Math.sin(phi) * Math.sin(theta) * r
    const z = Math.cos(phi) * r
    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    // colors: mix cyan -> purple depending on z (normalized t in [0,1])
    const t = (z + 2) / 4
    // cyan  ~ (0,1,0.94), purple ~ (0.48,0.38,1)
    const rC = 0 * (1 - t) + 0.48 * t
    const gC = 1.0 * (1 - t) + 0.38 * t
    const bC = 0.94 * (1 - t) + 1.0 * t
    colors[i * 3] = rC
    colors[i * 3 + 1] = gC
    colors[i * 3 + 2] = bC

    sizes[i] = 3 + Math.random() * 6
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  // create a soft circular sprite texture for particles
  const sprite = document.createElement('canvas')
  sprite.width = 64
  sprite.height = 64
  const ctx = sprite.getContext('2d')
  const grd = ctx.createRadialGradient(32, 32, 2, 32, 32, 32)
  grd.addColorStop(0, 'rgba(255,255,255,1)')
  grd.addColorStop(0.18, 'rgba(0,255,240,0.95)')
  grd.addColorStop(0.45, 'rgba(123,97,255,0.6)')
  grd.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, 64, 64)
  const spriteTex = new THREE.CanvasTexture(sprite)
  spriteTex.needsUpdate = true

  const material = new THREE.PointsMaterial({
    size: 6,
    map: spriteTex,
    alphaTest: 0.01,
    transparent: true,
    depthWrite: false,
    vertexColors: true,
    blending: THREE.AdditiveBlending
  })

  const points = new THREE.Points(geometry, material)
  scene.add(points)

  // store a copy of base positions for gentle motion
  const basePositions = new Float32Array(positions.slice())

  // Interaction state
  const pointer = { x: 0, y: 0 }
  let isPointerDown = false

  const onPointerMove = (e) => {
    const rect = container.getBoundingClientRect()
    pointer.x = (e.clientX - rect.left) / rect.width - 0.5
    pointer.y = (e.clientY - rect.top) / rect.height - 0.5
  }
  container.addEventListener('pointermove', onPointerMove)
  container.addEventListener('pointerdown', () => { isPointerDown = true })
  container.addEventListener('pointerup', () => { isPointerDown = false })

  // Resize handling
  const onResize = () => {
    const w = container.clientWidth
    const h = container.clientHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }
  window.addEventListener('resize', onResize)

  // animation loop
  let t0 = performance.now()
  function animate(t) {
    const time = (t - t0) * 0.001
    const pos = geometry.attributes.position.array
    const count = COUNT

    // gentle per-particle movement + pointer repulsion
    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const iy = ix + 1
      const iz = ix + 2

      const bx = basePositions[ix]
      const by = basePositions[iy]
      const bz = basePositions[iz]

      // oscillation
      const noise = 0.04 * Math.sin(time * 1.2 + i)
      pos[ix] = bx + noise + pointer.x * 0.2 * (i % 7 === 0 ? 1 : 0)
      pos[iy] = by + 0.04 * Math.cos(time * 1.1 + i * 0.3) + pointer.y * 0.2 * (i % 11 === 0 ? 1 : 0)
      pos[iz] = bz + 0.03 * Math.sin(time * 1.7 + i * 0.5)
    }

    geometry.attributes.position.needsUpdate = true

    // rotate the whole field slowly
    points.rotation.y += 0.002
    points.rotation.x += 0.001

    // subtle camera float
    camera.position.z = 5.6 + Math.sin(time * 0.6) * 0.05

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)

  console.log('[three-scene] animation started')

  return {
    dispose() {
      container.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      container.innerHTML = ''
    }
  }
}
