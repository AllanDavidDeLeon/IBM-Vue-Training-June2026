import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [
      { id: 1, name: 'Todo 1', done: false, dueDate: new Date().toLocaleString() },
      { id: 2, name: 'Todo 2', done: true, dueDate: new Date().toLocaleString() },
      { id: 3, name: 'Todo 3', done: false, dueDate: new Date().toLocaleString() }
    ]
  }),
  actions: {
    toggle(id) {
      const t = this.tasks.find(x => x.id === id)
      if (t) t.done = !t.done
    },
    remove(id) {
      this.tasks = this.tasks.filter(x => x.id !== id)
    }
  }
})