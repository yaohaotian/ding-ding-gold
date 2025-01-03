import { createApp } from 'vue'
import App from './App.vue'

import {
  showToast,
  showNotify,
  showDialog,
  showImagePreview
} from '@nutui/nutui'

import './assets/main.css'
import '@nutui/nutui/dist/packages/toast/style/css'
import '@nutui/nutui/dist/packages/notify/style/css'
import '@nutui/nutui/dist/packages/dialog/style/css'
import '@nutui/nutui/dist/packages/imagepreview/style/css'

createApp(App).mount('#app')
