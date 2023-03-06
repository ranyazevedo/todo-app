import { mount } from '@vue/test-utils'
import TodoList from '@/components//TodoList.vue'


const wrapper = mount(TodoList, {
  propsData: {
    data: [{
      "id": 1,
      "description": "Task 1",
          "color": "lightcoral",
          "priority": true,
          "date": "2023-03-08"
    }],
  }
})

test('renders item of the list', () => {
  const listItem = wrapper.get('[data-test="list-item"]')
  expect(listItem.text()).toBe('Priority Task 12023-03-08')
})

test('renders priority badge', () => {
  const listItemPriority = wrapper.get('[data-test="item-priority"]')
  expect(listItemPriority.isVisible()).toBe(true)
})

test('emits an event when clicked on edit button', () => {
  const editButton = wrapper.get('[data-test="task-edit"]')
  expect(editButton.isVisible()).toBe(true)
  wrapper.find('[data-test="task-edit"]').trigger('click')
  expect(wrapper.emitted()).toHaveProperty('openEditModal')
})

test('emits an event when clicked on remove button', () => {
  const editButton = wrapper.get('[data-test="task-remove"]')
  expect(editButton.isVisible()).toBe(true)
  wrapper.find('[data-test="task-remove"]').trigger('click')
  expect(wrapper.emitted()).toHaveProperty('remove')
})