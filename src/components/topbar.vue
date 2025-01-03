<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqIdeaList, reqDepartmentList } from '@/api/sys'

import message from '@/components/message.vue'

interface Department {
  id?: string | number
  name?: string
  displayStyle?: string
  sortIndex?: number
  page?: number
  size?: number
  ideaList?: any[]
}

const curDepartId = ref<string | number>(0)
const departmentList = ref<Department[]>([])

onMounted(async () => {
  getDepartmentList()
})

const getDepartmentList = async () => {
  try {
    const result = await reqDepartmentList()
    departmentList.value = [
      { name: '全部', page: 1, size: 10, ideaList: [] },
      ...result.data.map((i) => {
        i = { ...i, catalog: i.name, page: 1, size: 10, ideaList: [] }
        return i
      })
    ]
    await getIdeaList(departmentList.value[0])
  } catch (error) {}
}

const getIdeaList = async (item: any) => {
  const { catalog, page, size } = item
  try {
    const result = await reqIdeaList({
      catalog,
      page,
      size
    })
    item.ideaList = [...item.ideaList, ...result.data.content]
  } catch (error) {}
}
</script>

<template>
  <nut-tabs v-model="curDepartId" @change="getIdeaList" background="#fff">
    <nut-tab-pane
      v-for="i in departmentList"
      :key="i.id"
      :title="i.name"
      :pane-key="i.id"
    >
      <message v-for="(x, index) in i.ideaList" :key="index" :idea="x" />
    </nut-tab-pane>
  </nut-tabs>
</template>
