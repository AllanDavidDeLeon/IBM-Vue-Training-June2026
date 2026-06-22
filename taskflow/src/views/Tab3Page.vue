<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Settings</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list inset>
        <ion-item>
          <ion-label>Dark mode</ion-label>
          <ion-toggle :checked="isDarkMode" @ionChange="handleThemeToggle" />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
} from '@ionic/vue'

const isDarkMode = ref(document.documentElement.classList.contains('ion-palette-dark'))

function handleThemeToggle(event: CustomEvent) {
  const enabled = event.detail.checked
  isDarkMode.value = enabled
  document.documentElement.classList.toggle('ion-palette-dark', enabled)
  document.body.classList.toggle('ion-palette-dark', enabled)
}
</script>
