<template>
    <div>
      <div class="min-h-screen flex items-center justify-center">
          <form @submit.prevent="handleSignUp" class="p-8 rounded shadow-md space-y-4 w-full max-w-md">
              <h1 class="text-2xl font-bold text-center">Sign Up</h1>
              <UiVeeInput v-model="username" label="Username" placeholder="Username" />
              <UiVeeInput v-model="email" label="Email" placeholder="Email" type="email" />
              <UiVeeInput v-model="password" label="Password" type="password" />
              <UiVeeInput v-model="confirmPassword" label="Confirm Password" type="password" />
  
              <UiButton type="submit" class="w-full flex justify-center">Sign Up</UiButton>
              <p class="text-center mt-4">
                  Already have an account? <a href="/login" class="text-blue-500">Log in</a>
              </p>
          </form>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { ref } from 'vue'
import { useToast } from '~/composables/useToast';

// Firebase Setup
const firebaseConfig = useRuntimeConfig().public;
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')



const handleSignUp = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }
  // Note: This will be the name of the collection in Firestore
  const collecTionName = 'accounts'
  const genAlhaNumericId = Math.random().toString(36).substring(2)
  try {
    await setDoc(doc(db, collecTionName, genAlhaNumericId), {
      username: username.value,
      email: email.value,
      password: password.value,
      uid: genAlhaNumericId
    })
    // Save the user to local storage
    useState('account').value = {
      username: username.value,
      email: email.value,
      password: password.value,
      uid: genAlhaNumericId
    }
    useToast().toast({
      description: 'Account created successfully!',
      variant: 'success',
      icon: 'lucide:badge-check'
    })
    await new Promise(resolve => setTimeout(resolve, 2000)) // This will wait for 2 seconds
    router.push('/')
  } catch (error) {
    useToast().toast({
      title: 'Error',
      description: 'Failed to create account. Please try again.',
      variant: 'destructive',
      icon: 'lucide:badge-x'
    })
  }
}
</script>

<style>

</style>