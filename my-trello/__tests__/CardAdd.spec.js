import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex'
import CardAdd from '@/components/CardAdd.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Testing CardAdd component', () => {
  let actions
  let store
  let wrapper
  beforeEach(() => {
      actions = {
          addCardToList: jest.fn()
      }
      store = new Vuex.Store({
          state: {},
          actions
      })
      wrapper = shallowMount(CardAdd, {
        store,
        localVue,
        propsData: {
            listIndex: 2
        }
      })
  })

  it('calls Action[addCardToList] when submit form', () => {
      wrapper.find('.text-input').setValue('Card Text')
      wrapper.find('form').trigger('submit.prevent')
      expect(actions.addCardToList).toHaveBeenCalledWith(expect.any(Object), { body: 'Card Text', listIndex: 2 })
  })

  it('classList is correct value?', () => {
        const data = { bodyExists: true, isEditing: true }
        expect(CardAdd.computed.classList.call(data)).toEqual(['addcard', 'active', 'addable'])
        const data2 = { bodyExists: true, isEditing: false }
        expect(CardAdd.computed.classList.call(data2)).toEqual(['addcard', 'addable'])
        const data3 = { bodyExists: false, isEditing: true }
        expect(CardAdd.computed.classList.call(data3)).toEqual(['addcard', 'active'])
        const data4 = { bodyExists: false, isEditing: false }
        expect(CardAdd.computed.classList.call(data4)).toEqual(['addcard'])
    })

    it('bodyExists is correct value?', () => {
        const data = { body: '' }
        expect(CardAdd.computed.bodyExists.call(data)).toBe(false)
        const data2 = { body: 'Card Text' }
        expect(CardAdd.computed.bodyExists.call(data2)).toBe(true)
    })

    it('startEditing is correct called?', () => {
        wrapper.find('.text-input').trigger('focusin')
        expect(wrapper.vm.isEditing).toBe(true)
    })

    it('finishEditing is correct called?', () => {
        wrapper.find('.text-input').trigger('focusout')
        expect(wrapper.vm.isEditing).toBe(false)
    })


})