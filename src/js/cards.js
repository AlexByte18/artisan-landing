
// Capturamos todas las cards con la clase spotlight
const cards = document.querySelectorAll('.spotlight-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Enviamos las coordenadas al CSS
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});


import VanillaTilt from 'vanilla-tilt';

// Inicializar en tus tarjetas de proyectos
// Asegúrate de que tus cards en HTML tengan la clase "tilt-card"
VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
    max: 10,           // Inclinación máxima (menos es más elegante)
    speed: 400,        // Velocidad de la transición
    glare: true,       // Efecto de brillo/reflejo
    "max-glare": 0.2,  // Opacidad del brillo
    scale: 1.02        // Pequeño zoom al hacer hover
});
