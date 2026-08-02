<a href="README.md">
  <img src="https://img.shields.io/badge/Language-English-blue?style=flat-square&logo=google-translate&logoColor=white" alt="English">
</a>
<a href="README-ES.md">
  <img src="https://img.shields.io/badge/Idioma-Español-red?style=flat-square&logo=google-translate&logoColor=white" alt="Español">
</a>

# Nicola Amoruso — Portfolio

Portafolio personal de **Nicola Amoruso**, Desarrollador Web Full Stack en Valencia, Venezuela, enfocado en **Backend e Inteligencia Artificial**.

Hecho con Next.js, TypeScript, Tailwind CSS y Framer Motion. Bilingüe (español / inglés).

## Características

- Scroll suave (Lenis) y animaciones con Framer Motion
- Tema claro / oscuro
- Español e inglés (`/es`, `/en`)
- Contenido en JSON (`contents/`, `dictionaries/`)

## Stack

- Next.js 16 · React 19 · TypeScript
- Tailwind CSS 4 · Framer Motion · Lenis
- Shadcn/UI · next-themes

## Empezar

```bash
git clone https://github.com/namoruso/portfolio_web.git
cd portfolio_web
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000). El locale por defecto redirige a `/es`.

| Comando       | Descripción                 |
| ------------- | --------------------------- |
| `pnpm dev`    | Servidor de desarrollo      |
| `pnpm build`  | Build de producción         |
| `pnpm start`  | Servir el build de prod     |
| `pnpm lint`   | Ejecutar ESLint             |

## Contenido

- `contents/en.json` / `contents/es.json` — about, proyectos, roadmap
- `contents/shared.json` — contacto, redes, stack
- `dictionaries/en.json` / `dictionaries/es.json` — textos de la UI

## Licencia

MIT. Ver [LICENSE](LICENSE).
