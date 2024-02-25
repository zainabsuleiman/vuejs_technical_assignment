<template>
  <div class="sm:col-span-2">
    <label
      :for="id"
      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >{{label}}</label
    >
    <input
      :id="id"
      type="checkbox"
      :name="name"
      :value="modelValue"
      :checked="false ?? true"
      @input="updateModelValue"
      class="block  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue:{type:Boolean,default:true},
  id: String,
    label: String,
    name: String,
    value: Boolean,
   
  
})

const emit = defineEmits(['update:modelValue'])

const updateModelValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>
