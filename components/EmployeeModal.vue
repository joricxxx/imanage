<template>
    <div>
      <UiDialog v-model:open="open">
          <UiDialogContent :title="title" :description="description">
              <template #content>
                  <form>
                      <fieldset class="grid gap-5">
                          <UiVeeInput name="Name" label="Name" placeholder="John Doe" />
                          <UiVeeInput name="Title" label="Title" placeholder="Software Engineer" />
                          <UiVeeInput name="Email" label="Email" placeholder="Email" />
                          <UiVeeInput name="Role" label="Role" placeholder="Role" />
                          <UiButton type="submit" variant="default" class="w-full">
                              {{ buttonText }}
                          </UiButton>
                      </fieldset>
                  </form>
              </template>
          </UiDialogContent>
      </UiDialog>
    </div>
  </template>
  
  <script lang="ts" setup>
  import type { Employee } from "~/types/employee";
  const props = defineProps<{employee?: Employee}>()
  
  const isEditing = computed(() => !!props.employee)
  
  const title = computed(() => isEditing.value ? 'Edit Employee' : 'Add Employee')
  const description = computed(() => isEditing.value ? 'Edit the employee details' : 'Add a new employee')
  const buttonText = computed(() => isEditing.value ? 'Update Employee' : 'Add Employee')
  const open = defineModel({default: false})
  </script>
  
  <style>
  
  </style>