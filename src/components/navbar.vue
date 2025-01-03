<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
})

const clickBack = () => {}
</script>

<template>
  <nut-navbar :title="title" left-show @click-back="clickBack" />
</template>

<style scoped></style>
