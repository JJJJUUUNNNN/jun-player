import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'virtual:svg-icons-register'
import svgIcon from '@/components/SvgIcon/index.vue'

createApp(App).component('svg-icon', svgIcon).mount('#app')
