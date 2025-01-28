import {mount} from 'svelte'
import './app.css'
import App from './app.svelte'

const lms = mount(App, {
  target: document.getElementById('app')
})

export default lms
