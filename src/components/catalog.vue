<script lang="ts" setup>
defineProps({
  category: {
    type: String,
    default: '默认分类'
  }
})
</script>

<template>
  <span class="category">{{ category }}</span>
</template>

<style lang="scss" scoped>
.category {
  display: inline-block;
  flex-shrink: 0;
  flex-grow: 0;
  background-color: orange;
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
}
</style>
