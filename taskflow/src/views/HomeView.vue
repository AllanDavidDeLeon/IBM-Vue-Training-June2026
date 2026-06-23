<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="home-content">
        <ion-text class="home-text">I am him.</ion-text>
        <img class="home-image" src="https://th.bing.com/th?id=OIF.5HU%2f24XuXaXWyQSUBV5VCg&r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Him" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText } from '@ionic/vue';
</script>

<style scoped>
.home-content {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  text-align: center;
  padding: 24px;
}

.home-text {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.1;
}

.home-image {
  display: block;
  max-width: min(80vw, 320px);
  width: 100%;
  height: auto;
  object-fit: contain;
}
</style>