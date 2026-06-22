import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type TaskNameInput = string | { value: string }

function normalizeTaskName(name: TaskNameInput) {
  return typeof name === 'string' ? name.trim() : name.value.trim()
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Array<{ id: number; name: string; done: boolean }>>([])
  const nextId = ref(1)

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

  return { tasks, totalCount, doneCount, pendingCount, addTask, toggleTask, removeTask }
})