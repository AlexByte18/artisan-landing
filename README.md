# Artisan Landing

Landing page construida con Vite, Sass y Bootstrap.

Stack
-----
- Vite (dev server / build)
- Sass (SCSS) para estilos
- Bootstrap 5 + Popper.js

Requisitos
----------
- Node.js 16+ (se recomienda la última LTS)
- npm / yarn / pnpm

Instalación
-----------
1. Clona el repositorio:

	git clone https://github.com/AlexByte18/artisan-landing
	cd artisan-landing

2. Instala dependencias:

	npm install

Ejecución en desarrollo
-----------------------
Para arrancar el servidor de desarrollo con hot-reload:

	npm run start

Build de producción
--------------------
Genera los archivos estáticos optimizados en la carpeta `dist`:

	npm run build

Estructura mínima del proyecto
------------------------------
- `index.html` — punto de entrada
- `src/js/` — scripts JavaScript
- `src/scss/` — estilos SCSS
- `package.json` — dependencias y scripts

Configuración del editor y estilo de código
-------------------------------------------
Para evitar diferencias de indentación (2 espacios vs 4 espacios) y mantener consistencia, el proyecto incluye:

- `.editorconfig` configurado para usar espacios y `indent_size = 2`.
- `.vscode/settings.json` (opcional) con ajustes recomendados para Visual Studio Code.

Buenas prácticas
----------------
- No ignores los lockfiles (`package-lock.json`, `yarn.lock`) salvo que tengas una razón específica. Mantenerlos en el repositorio ayuda a reproducibilidad.
- Añade reglas adicionales a `.gitignore` si integras contenedores, despliegues o stores de paquetes.

Contribuir
---------
Si encuentras errores o quieres mejorar algo, crea un issue o un pull request. Sigue estas reglas básicas:

- Crea una rama con nombre descriptivo: `feature/nombre` o `fix/descripcion`
- Añade cambios claros y atomic commits
- Incluye capturas o pasos para reproducir si aplicable

Licencia
--------
Por defecto este repositorio no especifica una licencia. Añade un archivo `LICENSE` si quieres publicar bajo una licencia concreta.

Contacto
--------
Si necesitas ayuda con la configuración del proyecto o integración con CI/CD, coméntamelo y te ayudo.
