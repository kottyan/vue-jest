import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex'
import Board from '@/components/Board.vue'
import Draggable from 'vuedraggable'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Testing Board component', () => {
    let store
    let getters
    let actions
    let wrapper

    beforeEach(() => {
        getters = {
          totalCardCount: () => 2
        }

        actions = {
          updateList: jest.fn()
        }

        store = new Vuex.Store({
            state: {},
            actions,
            getters
        })

        wrapper = mount(Board, {
            store,
            localVue
        })
    })

    it('totalCardCount is correct value?', () => {
        expect(wrapper.vm.totalCardCount).toBe(2)
    })

    it('movingList is correct called?', () => {
        wrapper.findComponent(Draggable).vm.$emit('end')
        expect(actions.updateList).toHaveBeenCalled()
    })

    it('movingCard is correct called?', () => {
        wrapper.vm.movingCard();
        expect(actions.updateList).toHaveBeenCalled()
    })
})