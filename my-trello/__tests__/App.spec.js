import { mount } from '@vue/test-utils';
import store from '@/store'
import Component from '@/App.vue'

describe('Testing App component', () => {
    it('is a Vue instance', () => {
      const wrapper = mount(Component, { store })
      expect(wrapper.isVueInstance).toBeTruthy()
    })
})