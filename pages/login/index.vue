<template>
  <div>
    <div class="min-h-screen flex items-center justify-center">
        <form class="p-8 rounded shadow-md space-y-4 w-full max-w-md">
            <h1 class="text-2xl font-bold text-center">Log In</h1>
            <UiVeeInput label="Username" placeholder="Username" />
            <UiVeeInput label="Password" type="password" />

            <UiButton type="submit" class="w-full flex justify-center">Log In</UiButton>
            <p class="text-center mt-4">
                Don't have an account? <a href="/signup" class="text-blue-500">Sign up</a>
            </p>
        </form>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>