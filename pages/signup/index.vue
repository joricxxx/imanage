<template>
    <div>
      <div class="min-h-screen flex items-center justify-center">
          <form @submit.prevent="handleSignUp" class="p-8 rounded shadow-md space-y-4 w-full max-w-md">
              <h1 class="text-2xl font-bold text-center">Sign Up</h1>
              <UiVeeInput v-model="form.username" label="Username" placeholder="Username" />
              <UiVeeInput v-model="form.email" label="Email" placeholder="Email" type="email" />
              <UiVeeInput v-model="form.password" label="Password" type="password" />
              <UiVeeInput v-model="form.confirmPassword" label="Confirm Password" type="password" />
  
              <UiButton type="submit" class="w-full flex justify-center">Sign Up</UiButton>
              <p class="text-center mt-4">
                  Already have an account? <a href="/login" class="text-blue-500">Log in</a>
              </p>
          </form>
      </div>
    </div>
</template>

// filepath: c:\Storage\Codev\Github\Nuxt Framework\i-manage\pages\signup\index.vue
<script lang="ts" setup>
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { ref } from 'vue'

// Get the firebase config from runtime config under the 'firebase' key
const firebaseConfig = useRuntimeConfig().public;

if (!firebaseConfig || !firebaseConfig.apiKey) {
  throw new Error('Firebase configuration is missing or incomplete');
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleSignUp = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('Passwords do not match!')
    return
  }

  // Note: This will be the name of the collection in Firestore
  const collecTionName = 'accounts'
  const genAlhaNumericId = Math.random().toString(36).substring(2)
  try {
    await setDoc(doc(db, collecTionName, genAlhaNumericId), {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      uid: genAlhaNumericId
    })
    alert('Account created successfully!')
  } catch (error) {
    console.error('Error creating account:', error)
    alert('Failed to create account. Please try again.')
  }
}
</script>

<style>

</style>