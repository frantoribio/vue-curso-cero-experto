import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import Indecision from '@/components/Indecision.vue'

// Suite para describir
// https://vitest.dev/guide/mocking.html 
describe('Component -> Indecision', () => {
  let wrapper
  let clgSpy

  beforeEach(() => {
    wrapper = shallowMount(Indecision)
    clgSpy = vi.spyOn(console, 'log') // Vamos a espiar el console.log
  })

  afterEach(() => {
    // Limpiamos todos los mocks!!
    vi.resetAllMocks()
  })

  // cada una de las pruebas o test
  test('Debe hacer match con el snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot() // snapshot es una imagen de la vista y podemos usar .element tambien o html()
  })

  test('Renders properly', () => {
    // Montamos el componente y le pasamos las propiedades
    wrapper = shallowMount(Indecision, { props: { titulo: 'Test' } })
    expect(wrapper.props().titulo).toBe('Test')
    expect(wrapper.text()).toContain('Test') // Comprobamos que el texto contiene el titulo
  })

  test('Escribir en el input no debe disparar nada', async () => {
    // De esta manera espiamos a funciones locales
    const getAnswerSpy = vi.spyOn(wrapper.vm, 'getAnswer')
    const { isValidQuestion } = wrapper.vm

    const input = wrapper.find('input')
    await input.setValue('testing')
    expect(clgSpy).toHaveBeenCalledTimes(1) // Comprobamos que se ha llamado una vez... Es una chapuza si tenemos una variable usar el console log ;)
    expect(getAnswerSpy).not.toHaveBeenCalled() // Comprobamos que no se ha llamado a la funcion getAnswer
    expect(isValidQuestion).toBe(false) // Comprobamos que la pregunta no es valida
  })

  test('Al escribir ? debe disparar el getAnswer', async () => {
    // Simulamos el comprtamiento al ser llamdo para evitar que llame a fetch que no existe en node
    const getAnswerSpy = vi.spyOn(wrapper.vm, 'getAnswer').mockImplementation(() => null)

    const input = wrapper.find('input')
    await input.setValue('testing?')
    expect(getAnswerSpy).toHaveBeenCalled()
  })

  test('Pruebas getAnswer', async () => {
    // Aw puede poner el fn sin mockImplementation
    // eslint-disable-next-line no-undef
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            answer: 'yes',
            forced: false,
            image: 'https://yesno.wtf/assets/yes/2.gif',
          }),
      })
    )
    // Llamamos directamente a getAnswer y comprobamos los cambios
    await wrapper.vm.getAnswer()
    expect(wrapper.vm.answer).toBe('Sí')
    expect(wrapper.vm.image).toBe('https://yesno.wtf/assets/yes/2.gif')
  })

  test('Pruebas getAnswer - Fallo API', async () => {
    global.fetch = vi.fn().mockImplementation(() => Promise.reject('API es down'))
    // Llamamos directamente a getAnswer y comprobamos los cambios
    await wrapper.vm.getAnswer()
    const img = wrapper.find('img')
    expect(img.exists()).toBe(false)
    expect(wrapper.vm.answer).toBe('No se pudo cargar de la API la respuesta')
  })

  test('Emite el evento question-response', async () => {
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            answer: 'yes',
            forced: false,
            image: 'https://yesno.wtf/assets/yes/2.gif',
          }),
      })
    )
    // Llamamos directamente a getAnswer y comprobamos los cambios
    await wrapper.vm.getAnswer()
    expect(wrapper.vm.answer).toBe('Sí')
    // se emite el evento question-response con el objeto que se le pasa
    expect(wrapper.emitted()['question-response']).toBeTruthy()
    console.log(wrapper.emitted())
  })
})
