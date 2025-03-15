<template>
  <div class="flex justify-between items-center px-4 mb-10 py-7">
    <h1>IManager</h1>
    <div class="flex items-center gap-4">
      <h1>{{ currentUser }}</h1>
      <UiButton variant="destructive">Logout</UiButton>
      <UiButton>Toggle Theme</UiButton>
      
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { User } from '~/types/user';

const account = useState<User>('account')
const currentUser = computed(() => account.value?.username || 'Guest')
</script>


