<template>
  <div>
    <div class="min-h-screen flex items-center justify-center">
        <form @submit.prevent="handleLogin" class="p-8 rounded shadow-md space-y-4 w-full max-w-md">
            <h1 class="text-2xl font-bold text-center">Log In</h1>
            <UiVeeInput v-model="form.username" label="Username" placeholder="Username" required/>
            <UiVeeInput v-model="form.password" label="Password" type="password" required/>

            <UiButton type="submit" class="w-full flex justify-center">Log In</UiButton>
            <p class="text-center mt-4">
                Don't have an account? <a href="/signup" class="text-blue-500">Sign up</a>
            </p>
        </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const firebaseConfig = useRuntimeConfig().public;
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const router = useRouter()

const form = ref({
  username: '',
  password: ''
})
const handleLogin = async () => {
  if(form.value.username === '' || form.value.password === '') {
    alert('Please fill in all fields!')
    return
  }
  const collecTionName = 'accounts'
  const querySnapshot = await getDocs(collection(db, collecTionName))
  querySnapshot.forEach((doc) => {
    if(doc.data().username === form.value.username && doc.data().password === form.value.password) {
      alert('Login successful!')
      router.push('/')
    }
    else {
      alert('Invalid username or password!')
    }
  })
}

</script>

<style>

</style>