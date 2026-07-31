# ⛪ Calendario Parroquial Interactivo e Imprimible (Estilo Adviento)

Un calendario interactivo e imprimible para la comunidad parroquial católica, inspirado en el formato visual de adviento (*aDEViento* y *AdventJS*). Permite descubrir jornadas de salud, entrega de donaciones, actividades de jóvenes y catequesis vacacional a través de ventanas 3D interactivas.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-v6-646CFF?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

---

## ✨ Características

- 🎁 **Ventanas 3D Interactivas**: Giro de puerta en 3D (`perspective-1000`) para descubrir los detalles de cada evento.
- 🖨️ **Fichas Imprimibles (`@media print`)**: Formato automático de impresión en tarjetas de 2 columnas listas para recortar y distribuir en la parroquia.
- 📅 **Gestión de Eventos**: Filtros por mes (Julio, Agosto) y por categoría (Niños, Caridad, Salud, Juventud, Familia, Liturgia).
- ➕ **Creación de Eventos en Vivo**: Formulario modal para agregar nuevos eventos con guardado automático en `localStorage`.
- 📱 **Diseño Parroquial Moderno**: Paleta de colores marfil, pergamino, azul mariano y dorado sacramental.

---

## 📅 Eventos Iniciales Agendados

1. **28 de Julio**:
   - *Jornada de Niños*: Entrega de pañales, insumos y merienda comunitaria.
   - *Jornada Médica San Julián Capilla*: Consulta general y despistaje de salud.
2. **31 de Julio**:
   - *Cierre de Actividad de Mamá Carolina* (`@ecodap`).
   - *Atención Jóvenes Parroquia Manantial*: Encuentro de fraternidad y escucha.
3. **04 de Agosto**:
   - *Jornada de Niños de Agosto*: Martes y Jueves (4 a 12 años, de 09:00 AM a 04:00 PM).

---

## 🚀 Instalación y Ejecución

```bash
# Clonar el repositorio
git clone https://github.com/cegh2001/calendar-parroquial.git
cd calendar-parroquial

# Con pnpm
pnpm install
pnpm dev

# O con npm
npm install
npm run dev
```

---

## 🛠️ Tecnologías

- **React 19** + **TypeScript**
- **Vite 6**
- **TailwindCSS v4** + **CSS 3D Transformations**
- **Lucide Icons**
