<template>
    <div>
      <UiDialog v-model:open="open">
          <UiDialogContent :title="title" :description="description">
              <template #content>
                  <form @submit.prevent="handleSubmit" class="grid gap-5">
                    <UiVeeInput v-model="form.name" name="Name" label="Name" placeholder="John Doe"/>
                    <UiVeeInput v-model="form.title" name="Title" label="Title" placeholder="Software Engineer" />
                    <UiVeeInput v-model="form.email" name="Email" label="Email" placeholder="Email" />
                    <UiVeeMultiSelect v-model="form.sex" name="Sex" label="Sex" :options="['Male', 'Female']" placeholder="Sex"/>
                    <UiButton type="submit" variant="default" class="w-full">
                        {{ buttonText }}
                    </UiButton>
                  </form>
              </template>
          </UiDialogContent>
      </UiDialog>
    </div>
  </template>
  
<script lang="ts" setup>
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import type { Employee } from "~/types/employee";

const props = defineProps<{employee?: Employee}>()

const isEditing = computed(() => !!props.employee)

const title = computed(() => isEditing.value ? 'Edit Employee' : 'Add Employee')
const description = computed(() => isEditing.value ? 'Edit the employee details' : 'Add a new employee')
const buttonText = computed(() => isEditing.value ? 'Update Employee' : 'Add Employee')
const open = defineModel({default: false})

// Setup Firebase
const firebaseConfig = useRuntimeConfig().public;
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const currenUserID = ref("")
const userID = currenUserID.value || "defaultUser"
const filepath = `collections/${userID}/employees`;

const form = ref({
    name: '',
    title: '',
    email: '',
    sex: ''
})

const handleSubmit = async () => {
    try {
        const genAlhaNumericId = Math.random().toString(36).substring(2) 
        await setDoc(doc(db, filepath, genAlhaNumericId), form.value)
        useToast().toast({
            description: 'Employee added successfully!',
            variant: 'success',
            icon: 'lucide:badge-check'
        })
        open.value = false
    }
    catch (error) {
        useToast().toast({
            description: 'An error occurred while adding the employee',
            variant: 'destructive',
            icon: 'lucide:badge-x'
        })
    }
}
</script>

<style>

</style>