import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type UserInput = string | { value: string }

function normalizeUserName(user: UserInput) {
  return typeof user === 'string' ? user.trim() : user.value.trim()
}

export const useUserStore = defineStore('user', () => {
  const currentUser = ref('')
  const isLoggedIn = computed(() => currentUser.value.length > 0)

  function login(user: UserInput) {
    currentUser.value = normalizeUserName(user)
  }

  function logout() {
    currentUser.value = ''
  }

  return { currentUser, isLoggedIn, login, logout }
})