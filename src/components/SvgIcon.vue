<template>
  <svg aria-hidden="true" :width="width" :height="height">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  width: {
    type: String
  },
  height: {
    type: String
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
