<script lang="ts" setup>
import catalog from '@/components/catalog.vue'
import { Fabulous, Follow } from '@nutui/icons-vue'

import { fmtTime } from '@/utils'

import { Idea } from '@/types'

const props = defineProps<{
  idea: Idea
}>()

const goDetail = () => {}
</script>

<template>
  <div class="message-box" @click="goDetail">
    <div class="first-line">
      <catalog :category="idea.catalog" />
      <div class="subject">
        {{ idea.subject }}
      </div>
    </div>
    <p class="detail">
      {{ idea.detail }}
    </p>
    <nut-divider />
    <div>
      <div class="btm-line">
        <div class="name-time">
          <nut-avatar size="small">
            <img :src="idea.creatorAvatar" />
          </nut-avatar>
          <span class="name">{{ idea.creatorName }}</span>
          <span class="line"> | </span>
          <span>{{ fmtTime(idea.createTime) }}</span>
        </div>
        <div class="like-favorite">
          <Fabulous />
          <span>{{ idea.likeCount }}</span>
          <Follow />
          <span>{{ idea.collectCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message-box {
  padding: 10px 20px;
  border-radius: 15px;
  box-shadow: 0 0 10px #ccc;
  margin-bottom: 15px;
}
.first-line {
  display: flex;
  align-items: center;
  .subject {
    margin-left: 10px;
  }
}
.detail {
  margin: 15px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
.btm-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .name {
    margin-left: 10px;
  }
  .name-time {
    display: flex;
    align-items: center;
    .line {
      margin: 0 10px;
    }
  }
  .like-favorite {
    display: flex;
    align-items: center;
    span {
      margin: 0 10px;
    }
    & > span:first-of-type {
      margin-right: 20px;
    }
  }
}
</style>
