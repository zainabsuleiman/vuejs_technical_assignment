<script setup>
import { computed } from 'vue'
import { mdiCheck, mdiClose, mdiCreditCardOutline } from '@mdi/js'
import CardBox from '@/components/CardBox.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import PillTag from '@/components/PillTag.vue'
import IconRounded from '@/components/IconRounded.vue'
import EditMenu from '@/components/DropdownEditMenu.vue'
const emit = defineEmits(['edit', 'delete'])
const props = defineProps({
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  business: {
    type: String,
    required: true
  },
  type: {
    type: Boolean,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  account: {
    type: String,
    required: true
  },
  completed: {
    type: String,
    required: true,
    default:'completed'
  },
  inProgress: {
    type: String,
    required: true,
    default:'inProgress'
  },
  typeName: {
    type: String,
    required: true,
    
  }
 
})

const icon = computed(() => {
  if (props.type === true) {
    return {
      icon: mdiCheck,
      type: 'success',
      typeName:'completed'
    }
  } else if (props.type === false) {
    return {
      icon: mdiClose,
      type: 'danger',
      typeName:'inProgress'
    }
  } 

  return {
    icon: mdiCreditCardOutline,
    type: 'info'
  }
})
const editTodo = (id) => {
  emit('edit', id)
}

const deleteTodo = (id) => {
  emit('delete', id)
}
</script>

<template>
  <CardBox class="mb-6 last:mb-0">
    <BaseLevel>
      <BaseLevel type="justify-start">
        
        <IconRounded :icon="icon.icon" :color="icon.type" class="md:mr-6" />
        <div class="text-center space-y-1 md:text-left md:mr-6">
          <p class="text-gray-500 dark:text-slate-400">
            <b>{{ date }}</b> User {{ business }}
          </p>
          <h4 class="text-xl">{{ amount }}</h4>
          
        </div>
      </BaseLevel>
      
      <div class="text-center md:text-right space-y-2">
        <EditMenu align="right" class="relative inline-flex">
          <li>
            <button class="font-medium text-sm text-green-500 dark:text-slate-300 hover:text-slate-800 hover:text-green-800 flex py-1 px-3" @click="editTodo(id)">Update</button>
          </li>
          
          <li>
            <button class="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" @click="deleteTodo(id)">Remove</button>
          </li>
        </EditMenu>
        <p class="text-sm text-gray-500">
          {{ name }}
        </p>
        <div>
          <PillTag :color="icon.type" :label="typeName" small />
        </div>
        
      </div>
    </BaseLevel>
  </CardBox>
</template>
