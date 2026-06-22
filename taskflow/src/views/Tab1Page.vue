<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tasks</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="task-page">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tasks</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card class="login-card">
        <ion-card-content>
          <ion-item lines="full">
            <ion-input
              v-model="newUser"
              label="Username"
              label-placement="stacked"
              placeholder="Enter your name"
              @keyup.enter="handleUser"
            />
            <ion-button slot="end" @click="handleUser">Login</ion-button>
          </ion-item>
        </ion-card-content>
      </ion-card>

      <ion-text v-if="isLoggedIn" class="welcome">Welcome, {{ currentUser }}!</ion-text>

      <Tasks mode="all" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonItem, IonInput, IonButton, IonText } from '@ionic/vue'
import Tasks from '../components/Tasks.vue'
import { useUserStore } from '../store/userStore'

const userStore = useUserStore()
const { currentUser, isLoggedIn } = storeToRefs(userStore)
const { login } = userStore

const newUser = ref('')

function handleUser() {
  login(newUser)
  newUser.value = ''
}
</script>

<style scoped>
.login-card {
  margin: 16px 16px 12px;
}

.welcome {
  display: block;
  padding: 0 16px 12px;
}
</style>
