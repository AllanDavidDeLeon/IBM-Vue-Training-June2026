import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', () => {

    const currentUser = ref('')
    const isLoggedIn = ref(false)

    function login(name) {

        if (!name.value.trim()) return

        currentUser.value = name.value.trim()
        isLoggedIn.value = true
    }

    function logout() {
        currentUser.value = ''
        isLoggedIn.value = false
    }

    return { currentUser, isLoggedIn, login, logout }
})
