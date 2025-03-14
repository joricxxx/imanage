<template>
    <div>
      <div class="min-h-screen flex items-center justify-center">
          <form class="p-8 rounded shadow-md space-y-4 w-full max-w-md">
              <h1 class="text-2xl font-bold text-center">Sign Up</h1>
              <UiVeeInput label="Username" placeholder="Username" />
              <UiVeeInput label="Email" placeholder="Email" type="email" />
              <UiVeeInput label="Password" type="password" />
              <UiVeeInput label="Confirm Password" type="password" />
  
              <UiButton type="submit" class="w-full flex justify-center">Sign Up</UiButton>
              <p class="text-center mt-4">
                  Already have an account? <a href="/login" class="text-blue-500">Log in</a>
              </p>
          </form>
      </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>