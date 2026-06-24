<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tasks" />
        </ion-buttons>
        <ion-title>Task Detail</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="detail-page">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Task Detail</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card v-if="task" class="detail-card">
        <ion-card-header>
          <ion-card-title>{{ task.name }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-text class="detail-line">Status: {{ task.done ? 'Completed' : 'Pending' }}</ion-text>
          <ion-button @click="addPhotoToTask">Add Photo</ion-button>
          <img v-if="task.photoUrl" class="task-photo" :src="task.photoUrl" alt="Task photo" />
        </ion-card-content>
      </ion-card>

      <ion-card v-else class="detail-card">
        <ion-card-content>
          <ion-text class="detail-line">Task not found.</ion-text>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonButton,
} from '@ionic/vue'
import { Camera, CameraResultType } from '@capacitor/camera'
import { useTaskStore } from '../store/taskStore'

const route = useRoute()
const taskStore = useTaskStore()

const task = computed<any>(() => taskStore.tasks.find(taskItem => taskItem.id === Number(route.params.id)))

async function addPhotoToTask() {
  if (!task.value) return

  try {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
    })

    task.value.photoUrl = photo.dataUrl ?? ''
  } catch {
  }
}
</script>

<style scoped>
.detail-page {
  --padding-top: 24px;
  --padding-start: 16px;
  --padding-end: 16px;
}

.detail-card {
  max-width: 520px;
  margin: 24px auto 0;
}

.detail-line {
  display: block;
  margin-bottom: 16px;
  font-size: 1.1rem;
}

.task-photo {
  display: block;
  width: 100%;
  max-width: 320px;
  margin-top: 16px;
  border-radius: 12px;
}
</style>
