# Trabajando con SFC

Veremos como crear aplicaciones de mayor envergadura y trabajar con componentes [SFC](https://vuejs.org/api/sfc-spec.html#sfc-syntax-specification) usando Vite para Vue

- [Trabajando con SFC](#trabajando-con-sfc)
  - [Iniciando el proyecto](#iniciando-el-proyecto)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Ejecutando nuestra app](#ejecutando-nuestra-app)
    - [Project Setup](#project-setup)
    - [Compile and Hot-Reload for Development](#compile-and-hot-reload-for-development)
    - [Compile and Minify for Production](#compile-and-minify-for-production)
    - [Run Unit Tests with Vitest](#run-unit-tests-with-vitest)
    - [Lint with ESLint](#lint-with-eslint)
  - [Estructura de un fichero vue SFC](#estructura-de-un-fichero-vue-sfc)
  - [Primer componente](#primer-componente)

## Iniciando el proyecto

Vamos a usar la [plantilla oficial](https://vuejs.org/guide/quick-start.html#with-build-tools) basada en Vite. Debemos tener la extensión Volar instalada

```bash
$ npm init vue@latest
```

Nos dará a elegir una plantilla de Vue.js

```bash
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add Cypress for both Unit and End-to-End testing? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
```

Finalmente:

```bash
> cd <your-project-name>
> npm install
> npm run dev
```

En mi caso vamos a usar JS con Pinia, ESlint y Prettier.

## Estructura del proyecto

La estructura del proyecto es la siguiente:

- src: carpeta donde se encuentra el código de nuestra app
  - assets: carpeta donde se encuentran los assets o recurso estáticos de nuestra app
  - components: carpeta donde se encuentran los componentes de nuestra app. Puede tener recursos propios por cada componente o test de dichos componentes
  - views: carpeta donde se encuentran las vistas de nuestra app (opcional)
  - App.vue: archivo principal de nuestra app (como solo hay uno, no se necesita views)
  - main.js: código de inicialización de nuestra app
- test: carpeta donde se encuentran los tests de nuestra app (opcional)

## Ejecutando nuestra app

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Estructura de un fichero vue SFC

Un SFC o [Single File Component](https://vuejs.org/api/sfc-spec.html#sfc-syntax-specification) es una forma de encapsular los elementos de componente en base a su estructura, lógica y presentación.

- templete: plantilla de la vista con el DOM
- script: código de nuestro componente siguiendo Options API o Composition API
- style: estilo de nuestro componente, puede ser scooped lo cual este estilo solo se aplica al componente en cuestión

## Primer componente

Se crea un componente, es importante indicar su nombre, name. El nombre nos sirve para poder localizarlo con las Vue Developer Tools
Se importa en el destino el componente. Se incluye en el objeto components y se usa según el nombre con el que se ha importado.

```js
<template>
  <p>Init</p>
  <MyCounter />
</template>

<script>
import MyCounter from '@/components/MyCounter.vue'

export default {
  name: 'App',

  components: {
    MyCounter,
  },
}
</script>
```