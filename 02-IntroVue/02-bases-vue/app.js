// Objeto de VUE!!!
// console.log(Vue)

const app = Vue.createApp({
  // Estamos usando OPCIONES!!!!
  // Cada cosa es una opcion, por eso es la option API: tamplate, data, methods, computed, etc
  // cada parte es una opcion!!!

  // podemos crear el template a mostrar
  // template: `
  //   <h1>Hola mundo</h1>
  //   <p>Desde app.js</p>
  //   <!-- Reprsentación declarativa -->
  //    <p>{{1+1}}</p>
  //   `,

  // Función que maneja nuestro estado y este es reactivo
  data: () => ({
    message: 'Mi variable de mensaje :)',
  }),
})

app.mount('#myApp')