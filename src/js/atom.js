// Atom interactive module
// Controls rotation and tilt of atom orbits based on mouse movement

export default function initAtom(container) {
  if (!container) return

  const orbits = container.querySelectorAll('.orbit')
  if (orbits.length === 0) return

  let mouseX = 0
  let mouseY = 0
  let targetRotX = 0
  let targetRotY = 0
  let currentRotX = 0
  let currentRotY = 0

  const onMouseMove = (e) => {
    const rect = container.getBoundingClientRect()
    // Normalize to -1 to 1
    mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1

    // Calculate target rotation based on mouse position
    targetRotY = mouseX * 15 // tilt Y (left-right)
    targetRotX = -mouseY * 15 // tilt X (up-down)
  }

  const onMouseLeave = () => {
    targetRotX = 0
    targetRotY = 0
  }

  container.addEventListener('mousemove', onMouseMove)
  container.addEventListener('mouseleave', onMouseLeave)

  // Animation loop: smoothly interpolate rotation
  function animate() {
    // Smooth lerp to target rotation
    const easing = 0.08
    currentRotX += (targetRotX - currentRotX) * easing
    currentRotY += (targetRotY - currentRotY) * easing

    // Apply rotation to all orbits
    orbits.forEach((orbit) => {
      orbit.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`
    })

    requestAnimationFrame(animate)
  }

  animate()

  return {
    dispose() {
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mouseleave', onMouseLeave)
    }
  }
}
