<script setup>
import { computed, ref, onMounted } from 'vue'
import { useMainStore } from '@/stores/main'
// import { useTodoStore } from '@/stores/todo'
import {
  
  mdiCircle,
  
} from '@mdi/js'
import * as chartConfig from '@/components/Charts/chart.config.js'

import SectionMain from '@/components/SectionMain.vue'

import CardBoxTransaction from '@/components/CardBoxTransaction.vue'
import CardBoxClient from '@/components/CardBoxClient.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'

import BaseModel from '@/components/BaseModal.vue'
import TodoForm from '@/components/TodoForm.vue'

import { useTodoStore } from '@/stores/todo'

const modalActive = ref(null)
const todoid = ref(null)

const tasksStore = useTodoStore()



const rows = computed(() => tasksStore.getTodoList)
console.log(rows);
const toggleModal = () => {
  modalActive.value = !modalActive.value
  if (!modalActive.value) {
    todoid.value = null
  }
}

const openEditModal = (id) => {
  todoid.value = id
  toggleModal()
}

const deleteTodo = (id) => {
  tasksStore.deleteTodo(id)
}

onMounted(() => {
  tasksStore.loadTodos()
})

const chartData = ref(null)

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData()
}


onMounted(() => {
  fillChartData()
  
})

const mainStore = useMainStore()
// const todoforce = useTodoStore()
const clientBarItems = computed(() => mainStore.clients.slice(0, 4))
const list_of_todos = computed(() => mainStore.todos)
// const todo = computed(() => mainStore.addtodo())

console.log(list_of_todos.value);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div
            class="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0"
          >
            <button
              type="button"
              id="createProductModalButton"
              data-modal-target="createProductModal"
              data-modal-toggle="createProductModal"
              class="flex items-center justify-center rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              @click="toggleModal"
            >
              Add Task
            </button>
          </div>
      <div class="grid grid-rows-1 lg:grid-cols-2 gap-6 mb-6">
      <div class="flex flex-row justify-between" >
      <SectionTitleLineWithButton :icon="mdiCircle" title="Completed" main>
      </SectionTitleLineWithButton></div>
      <div class="flex flex-row justify-between" >
      <SectionTitleLineWithButton :icon="mdiCircle" title="In Progress" :color="danger" main></SectionTitleLineWithButton></div>
      <div class="flex flex-row justify-between"></div>
    </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between" >
          <CardBoxTransaction
            v-for="(transaction, index) in list_of_todos"
            :v-if="transaction.completed"
            :key="index"
            :amount="transaction.userId"
            :date="transaction.date"
            :business="transaction.business"
            :type="transaction.type"
            :name="transaction.todo"
            :account="transaction.account"
            @edit="openEditModal(transaction.id)"
            @delete="deleteTodo(transaction.id)"
          />
        </div>
        <div class="flex flex-col justify-between">
          <CardBoxClient
            v-for="client in clientBarItems"
            :key="client.id"
            :name="client.name"
            :login="client.login"
            :date="client.created"
            :progress="client.progress"
          />
        </div>
      </div>

      

      

     

      

     

      <BaseModel :modalActive="modalActive" @close-modal="toggleModal">
      <TodoForm @close-modal="toggleModal" v-model:todoId="todoid" />
    </BaseModel>
    </SectionMain>
  </LayoutAuthenticated>
</template>
