<template>
    <div class="flex justify-center">
      <UiAlertDialog>
        <UiAlertDialogTrigger as-child>
          <UiButton variant="destructive">Logout</UiButton>
        </UiAlertDialogTrigger>
        <UiAlertDialogContent>
          <div class="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
            <div
              class="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
              aria-hidden="true"
            >
              <Icon name="lucide:circle-alert" class="size-4 opacity-80" />
            </div>
            <UiAlertDialogHeader>
              <UiAlertDialogTitle>Are you sure?</UiAlertDialogTitle>
              <UiAlertDialogDescription>
                Are you sure you want to logout?
              </UiAlertDialogDescription>
            </UiAlertDialogHeader>
          </div>
          <UiAlertDialogFooter>
            <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
            <UiAlertDialogAction @click="handleLogout" >Confirm</UiAlertDialogAction>
          </UiAlertDialogFooter>
        </UiAlertDialogContent>
      </UiAlertDialog>
    </div>
  </template>
<script lang="ts" setup>
const router = useRouter()
const userState = useState('account')
const userCookie = useCookie('account')

const handleLogout = () => {
  userState.value = null;
  userCookie.value = null;
  router.push('/login');

}
</script>
  