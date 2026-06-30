import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Preferences } from '@capacitor/preferences'

export type Task = {
  id: number
  name: string
  done: boolean
  photoUrl: string
}

type TaskNameInput = string | { value: string }

function normalizeTaskName(name: TaskNameInput) {
  return typeof name === 'string' ? name.trim() : name.value.trim()
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const nextId = ref(1)
  const STORAGE_KEY = 'taskflow_tasks'

  const totalCount = computed(() => tasks.value.length)
  const doneCount = computed(() => tasks.value.filter(task => task.done).length)
  const pendingCount = computed(() => tasks.value.filter(task => !task.done).length)

  function addTask(name: TaskNameInput) {
    const trimmedName = normalizeTaskName(name)

    if (!trimmedName) return

    tasks.value.push({
      id: nextId.value++,
      name: trimmedName,
      done: false,
      photoUrl: '',
    })
  }

  function toggleTask(id: number) {
    const task = tasks.value.find(item => item.id === id)

    if (task) {
      task.done = !task.done
    }
  }

  function removeTask(id: number) {
    tasks.value = tasks.value.filter(task => task.id !== id)
  }

  function setTaskPhoto(id: number, photoUrl: string) {
    const task = tasks.value.find(item => item.id === id)

    if (task) {
      task.photoUrl = photoUrl
      saveTasks()
    }
  }

  function addPhotoToTask(id: number, photoUrl: string) {
    setTaskPhoto(id, photoUrl)
  }

  async function saveTasks() {
    await Preferences.set({
      key: STORAGE_KEY,
      value: JSON.stringify(tasks.value),
    })
  }

  async function loadTasks() {
    const { value } = await Preferences.get({ key: STORAGE_KEY })

    if (value) {
      tasks.value = JSON.parse(value)
      nextId.value = tasks.value.length > 0 ? Math.max(...tasks.value.map(task => task.id)) + 1 : 1
    }
  }

  return { tasks, nextId, totalCount, doneCount, pendingCount, addTask, toggleTask, removeTask, setTaskPhoto, addPhotoToTask, loadTasks }
})