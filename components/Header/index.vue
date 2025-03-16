<template>
  <div class="flex justify-between items-center px-4 mb-10 py-7">
    <h1>IManager</h1>
    <div class="flex items-center gap-4">
      <h1>{{ currentUser }}</h1>
      <LogoutDialogue />
      <UiButton>Toggle Theme</UiButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Account } from '~/types/account';

const account = useState<Account>('account')
const currentUser = computed(() => account.value?.username || 'Guest')

</script>


