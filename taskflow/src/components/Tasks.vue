<template>
  <section class="tasks-shell">
    <ion-card v-if="mode === 'all'" class="add-card">
      <ion-card-content>
        <div class="input-row">
          <ion-item class="task-input" lines="full">
            <ion-input
              v-model="newTaskName"
              label="New task"
              label-placement="stacked"
              placeholder="Add a task"
              @keyup.enter="handleAdd"
            />
          </ion-item>

          <ion-fab class="add-fab" horizontal="end">
            <ion-fab-button @click="handleAdd">
              <ion-icon :icon="add" />
            </ion-fab-button>
          </ion-fab>
        </div>
      </ion-card-content>
    </ion-card>

    <ion-list :inset="true" v-if="filteredTasks.length > 0">
      <ion-item v-for="task in filteredTasks" :key="task.id">
        <ion-checkbox slot="start" :checked="task.done" @ionChange="toggleTask(task.id)" />
        <ion-label :class="{ done: task.done }">{{ task.name }}</ion-label>
        <ion-button slot="end" fill="clear" @click="openTask(task.id)">
          View
        </ion-button>
        <ion-button slot="end" fill="clear" color="danger" @click="removeTask(task.id)">
          Remove
        </ion-button>
      </ion-item>
    </ion-list>

    <ion-text v-else class="empty-state">
      {{ emptyMessage }}
    </ion-text>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonButton,
  IonList,
  IonCheckbox,
  IonLabel,
  IonText,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInput,
} from '@ionic/vue'
import { add } from 'ionicons/icons'
import { useTaskStore } from '../store/taskStore'

type TaskViewMode = 'all' | 'completed'

const props = withDefaults(defineProps<{ mode?: TaskViewMode }>(), {
  mode: 'all',
})

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)
const { addTask, toggleTask, removeTask } = taskStore
const router = useRouter()

const newTaskName = ref('')

const filteredTasks = computed(() => {
  if (props.mode === 'completed') {
    return tasks.value.filter(task => task.done)
  }

  return tasks.value
})

const emptyMessage = computed(() => {
  if (props.mode === 'completed') {
    return 'No completed tasks yet.'
  }

  return 'No tasks yet. Add one above.'
})

function handleAdd() {
  addTask(newTaskName)
  newTaskName.value = ''
}

function openTask(id: number) {
  router.push(`/tabs/tasks/${id}`)
}
</script>

<style scoped>
.tasks-shell {
  width: 100%;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.task-input {
  flex: 1;
}

.add-fab {
  position: static;
  margin: 0;
}

.empty-state {
  display: block;
  padding: 12px 4px 20px;
  text-align: center;
}

.done {
  text-decoration: line-through;
  color: var(--ion-color-medium);
}
</style>
