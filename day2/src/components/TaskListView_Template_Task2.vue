<!--
=============================================================
  DAY 2 ASSIGNMENT — TaskListView.vue (Parent Component)
  This file renders a list of TaskCard components.
=============================================================
-->
<script setup>
import { useTaskStore } from '@/stores/taskStore'
import TaskCard from './TaskCard_Template_Task2.vue'

const store = useTaskStore()

function handleComplete(id) {
  const task = store.tasks.find(t => t.id === id)
  if (task) task.done = !task.done
}

function handleDelete(id) {
  store.tasks = store.tasks.filter(t => t.id !== id)
}
</script>

<template>
  <div class="task-list-view">
    <h1>My Tasks</h1>

    <!-- TODO 4: Render a <TaskCard> for each task using v-for
         - Pass :task="task" as a prop
         - Listen @complete="handleComplete"
         - Listen @delete="handleDelete"
         - Fill the "meta" named slot with the due date
    -->
      <TaskCard
        v-for="task in store.tasks"
        :key="task.id"
        :task="task"
        @complete="handleComplete"
        @delete="handleDelete"
      >
      <template #meta>
        Due: {{ task.dueDate }}
      </template>
    </TaskCard>
    <p class="empty" v-if="store.tasks.length === 0">No tasks yet. Add one above!</p>
  </div>
</template>

<style scoped>
.task-list-view {
  max-width: 520px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}
h1 { color: #1B2A4A; margin-bottom: 24px; }
</style>
