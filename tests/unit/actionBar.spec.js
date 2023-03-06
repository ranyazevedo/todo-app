import { mount } from '@vue/test-utils'
import ActionBar from '@/components/ActionBar.vue'


const wrapper = mount(ActionBar, {
  propsData: {
    listLength: 2,
    disableDeleteBt: false,
  }
})

test('renders list length', () => {
  const listLength = wrapper.get('[data-test="list-length"]')
  expect(listLength.text()).toBe('Total tasks: 2')
})

test('emits an event when clicked on add more task button', () => {
  const editButton = wrapper.get('[data-test="add-new-task"]')
  expect(editButton.isVisible()).toBe(true)
  wrapper.find('[data-test="add-new-task"]').trigger('click')
  expect(wrapper.emitted()).toHaveProperty('showAddModal')
})

test('emits an event when clicked on remove all tasks button', async () => {
  const editButton = wrapper.get('[data-test="remove-all-tasks"]')
  expect(editButton.isVisible()).toBe(true)
  wrapper.find('[data-test="remove-all-tasks"]').trigger('click')
  expect(wrapper.emitted()).toHaveProperty('removeList')
})