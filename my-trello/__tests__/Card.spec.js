import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex'
import Card from '@/components/Card.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Testing Card component', () => {
    let actions
    let store
    let wrapper
    beforeEach(() => {
        actions = {
            removeCardFromList: jest.fn()
        }
        store = new Vuex.Store({
            state: {},
            actions
        })

        wrapper = shallowMount(Card, {
            store,
            localVue,
            propsData: {
                body: 'test',
                listIndex: 2,
                cardIndex: 4
            }
        })
    })

    it('calls Action[removeCardFromList] when 「x」button is clicked', () => {
        global.confirm = jest.fn(() => true)
        const closeBtn = wrapper.find('.close-button')
        closeBtn.trigger('click')
        global.confirm
        expect(actions.removeCardFromList).toHaveBeenCalledWith(expect.any(Object), { cardIndex: 4, listIndex: 2 })
    })

    it('not calls Action[removeCardFromList] when 「x」button is clicked', () => {
        global.confirm = jest.fn(() => false)
        const closeBtn = wrapper.find('.close-button')
        closeBtn.trigger('click')
        global.confirm
        expect(actions.removeCardFromList).not.toHaveBeenCalled()
    })
})