import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex'
import ListAdd from '@/components/ListAdd.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Testing ListAdd component', () => {
    let actions
    let store
    let wrapper
    beforeEach(() => {
        actions = {
            addlist: jest.fn()
        }
        store = new Vuex.Store({
            state: {},
            actions
        })

        wrapper = shallowMount(ListAdd, {
            store,
            localVue,
            propsData: {
                listIndex: 2
            }
        })
    })
    it('calls Action[addList] when submit form', () => {
        wrapper.find('.text-input').setValue('List Title')
        wrapper.find('form').trigger('submit.prevent')
        expect(actions.addlist).toHaveBeenCalledWith(expect.any(Object), { title: 'List Title' })
    })

    it('classList is correct value?', () => {
        const data = { titleExists: true, isEditing: true }
        expect(ListAdd.computed.classList.call(data)).toEqual(['addlist', 'active', 'addable'])
        const data2 = { titleExists: true, isEditing: false }
        expect(ListAdd.computed.classList.call(data2)).toEqual(['addlist', 'addable'])
        const data3 = { titleExists: false, isEditing: true }
        expect(ListAdd.computed.classList.call(data3)).toEqual(['addlist', 'active'])
        const data4 = { titleExists: false, isEditing: false }
        expect(ListAdd.computed.classList.call(data4)).toEqual(['addlist'])
    })

    it('titleExists is correct value?', () => {
        const data = { title: ''}
        expect(ListAdd.computed.titleExists.call(data)).toBe(false)
        const data2 = { title: 'List Title'}
        expect(ListAdd.computed.titleExists.call(data2)).toBe(true)
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