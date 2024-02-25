<template>
  <form @submit.prevent="performAction">
    <div class="mb-4 grid gap-4 sm:grid-cols-2">
      <TodoInput
        label="Name"
        id="name"
        v-model="todo.todo"
        placeholder=" task name"
        required
      />
      <TodoTextBox
      label="Completed"
      v-model="todo.completed"
      />
      <TodoNumberInput
        label="UserId"

        v-model="todo.userId"
        required
      />
    </div>
    <button
      type="submit"
      class="inline-flex items-center rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      {{ props.todoId ? 'Update' : 'Add' }} Task
    </button>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todo'
import TodoInput from './Form/TodoInput.vue'
import TodoTextBox from './Form/TodoTextBox.vue'
import TodoNumberInput from './Form/TodoNumberInput.vue'
import { alert } from "../utils/alertUtils";

const emit = defineEmits(['close-modal'])
const props = defineProps({
  todoId: {
    type: Number,
    default: null
  }
})
const tasksStore = useTodoStore()
const todo = ref({
  todo: '',
  completed: false,
  userId: 0
})


const performAction = () => {
  if (props.todoId) {
    updateTask()
  } else {
    addTask()
  }
}
const addTask = () => {
  console.log(todo.value);
const todos={
  todo:todo.value.todo,
  completed:todo.value.completed,
  userId:todo.value.userId
}
console.log(todos.completed);
  tasksStore.createTodo(todos)
  resetTodo()
  emit('close-modal')
  alert.success_center('task added successfully');
}

const updateTask = () => {
  tasksStore.updateTodo( ...todo.value ,props.todoId )
  resetTodo()
  emit('close-modal')
}

const resetTodo = () => {
  todo.value = {}
}

onMounted(() => {
  
  if (props.todoId) {
    console.log(props.todoId)
    var id=props.todoId
    console.log(id)
    // const fetchedTodo=ref([])
    const fetchedTodo = tasksStore.getTodoById(id)
    console.log(fetchedTodo)
    todo.value =  fetchedTodo
    // todo.value.completed =  fetchedTodo.value.completed
    // todo.value.userId =  fetchedTodo.value.userId
    console.log(todo.value)

  }
})
</script>

<style lang="scss" scoped></style>
