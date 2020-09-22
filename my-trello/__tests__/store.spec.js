import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'
import { state, mutations, actions, getters } from '@/store/index.js'

const localVue = createLocalVue()
localVue.use(Vuex)
let Store;

// memo: cavarageが100%ではない
describe('Testing Vuex Store', () => {
    beforeEach(() => {
      Store = new Vuex.Store(cloneDeep({ state, mutations, actions, getters }))
    })
    const context = { commit: jest.fn() }

    // mutations test
    it('mutation[addlist] behave correctly?', () => {
        const newList = {
          title: 'Trello'
        }
        mutations.addlist(Store.state, newList)
        expect(Store.state.lists).toEqual([
          {
            title: 'Backlog',
            cards: [
              { body: 'English' },
              { body: 'Mathematics' },
            ]
          },
          {
            title: 'Todo',
            cards: [
              { body: 'Science' }
            ]
          },
          {
            title: 'Doing',
            cards: []
          },
          {
            title: 'Trello',
            cards: []
          }
      ])
    })

    it('mutation[removelist] behave correctly?', () => {
        mutations.removelist(Store.state, { listIndex: 2 })
        expect(Store.state.lists).toEqual([
          {
            title: 'Backlog',
            cards: [
              { body: 'English' },
              { body: 'Mathematics' },
            ]
          },
          {
            title: 'Todo',
            cards: [
              { body: 'Science' }
            ]
          }
      ])
    })

    it('mutation[addCardToList] behave correctly?', () => {
        mutations.addCardToList(Store.state, { body: 'test', listIndex: 2 })
        expect(Store.state.lists).toEqual([
          {
            title: 'Backlog',
            cards: [
              { body: 'English' },
              { body: 'Mathematics' },
            ]
          },
          {
            title: 'Todo',
            cards: [
              { body: 'Science' }
            ]
          },
          {
            title: 'Doing',
            cards: [
              { body: 'test' }
            ]
          }
      ])
    })

    it('mutation[removeCardFromList] behave correctly?', () => {
        mutations.removeCardFromList(Store.state, { listIndex: 0, cardIndex: 1 })
        expect(Store.state.lists).toEqual([
          {
            title: 'Backlog',
            cards: [
              { body: 'English' }
            ]
          },
          {
            title: 'Todo',
            cards: [
              { body: 'Science' }
            ]
          },
          {
            title: 'Doing',
            cards: []
          }
      ])
    })

    it('mutation[updateList] behave correctly?', () => {
        mutations.updateList(Store.state, { lists: Store.state.lists })
        expect(Store.state.lists).toEqual([
          {
            title: 'Backlog',
            cards: [
              { body: 'English' },
              { body: 'Mathematics' }
            ]
          },
          {
            title: 'Todo',
            cards: [
              { body: 'Science' }
            ]
          },
          {
            title: 'Doing',
            cards: []
          }
      ])
    })

    // actions test
    it('actions[addlist] call mutations?', () => {
        actions.addlist(context, { title: 'Trello' })
        expect(context.commit).toHaveBeenCalledWith('addlist', {
          title: 'Trello'
        })
    })

    it('actions[removelist] call mutations?', () => {
      actions.removelist(context, { listIndex: 1 })
      expect(context.commit).toHaveBeenCalledWith('removelist', {
        listIndex: 1
      })
    })

    it('actions[addCardToList] call mutations?', () => {
      actions.addCardToList(context, { body: 'test' })
      expect(context.commit).toHaveBeenCalledWith('addCardToList', {
        body: 'test'
      })
    })

    it('actions[removeCardFromList] call mutations?', () => {
      actions.removeCardFromList(context, { listIndex: 1, cardIndex: 0 })
      expect(context.commit).toHaveBeenCalledWith('removeCardFromList', {
        listIndex: 1,
        cardIndex: 0
      })
    })

    it('actions[updateList] call mutations?', () => {
      const listsData = [
          {
            title: 'Backlog',
            cards: [
              { body: 'English' },
              { body: 'Mathematics' },
            ]
          },
          {
            title: 'Doing',
            cards: []
          },
          {
            title: 'Todo',
            cards: [
              { body: 'Science' }
            ]
          }
      ]
      actions.updateList(context, { lists: listsData })
      expect(context.commit).toHaveBeenCalledWith('updateList', {
        lists: listsData
      })
    })

    // getters test
    it('getters[totalCardCount] return corect value?', () => {
      var totalCardCountResult = getters.totalCardCount(Store.state)
      expect(totalCardCountResult).toBe(3)
    })
})