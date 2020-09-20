import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex'
import List from '@/components/List.vue'
import Draggable from 'vuedraggable'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Testing List component', () => {
    let actions
    let store
    let wrapper
    beforeEach(() => {
        actions = {
            removelist: jest.fn()
        }
        store = new Vuex.Store({
            state: {},
            actions
        })

        wrapper = shallowMount(List, {
            store,
            localVue,
            propsData: {
                title: 'List Title',
                listIndex: 2,
                cards: [{body: 'Card Text'}]
            }
        })
    })

    it('calls Action[removelist] when「x」button is clicked?', () => {
        global.confirm = jest.fn(() => true)
        const closeBtn = wrapper.find('.deletelist')
        closeBtn.trigger('click')
        global.confirm
        expect(actions.removelist).toHaveBeenCalledWith(expect.any(Object), { listIndex: 2 })
    })

    it('not calls Action[removelist] when「x」button is clicked?', () => {
        global.confirm = jest.fn(() => false)
        const closeBtn = wrapper.find('.deletelist')
        closeBtn.trigger('click')
        global.confirm
        expect(actions.removelist).not.toHaveBeenCalled()

    })

    it('totalCardInList is correct value?', () => {
        const propsData = { cards: [
            { body: 'English' },
            { body: 'Mathematics' },
            { body: 'Three' }
        ]};
        expect(List.computed.totalCardInList.call(propsData)).toBe(3)

        // test patern.2 こちらは少し実行速度遅い??
        // wrapper.setProps({ cards: [
        //     { body: 'English' },
        //     { body: 'Mathematics' },
        //     { body: 'Three' }
        // ]})
        // expect(wrapper.vm.totalCardInList).toBe(3)
    })

    it('emit change test', () => {
        wrapper.findComponent(Draggable).vm.$emit('end')
        expect(wrapper.emitted().change).toBeTruthy()
    })
})