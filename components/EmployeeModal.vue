<template>
    <div>
      <UiDialog v-model:open="open">
          <UiDialogContent :title="title" :description="description">
              <template #content>
                  <form @submit.prevent="handleSubmit" class="grid gap-5">
                    <UiVeeInput v-model="form.name" name="Name" label="Name" placeholder="John Doe" required/>
                    <UiVeeInput v-model="form.title" name="Title" label="Title" placeholder="Software Engineer" required/>
                    <UiVeeInput v-model="form.email" name="Email" label="Email" placeholder="Email" required/>
                    <UiVeeMultiSelect v-model="form.sex" name="Sex" label="Sex" :options="['Male', 'Female']" placeholder="Sex"required/>
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
import { ref, computed, watch } from "vue";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import type { Account } from "~/types/account";
import type { Employee } from "~/types/employee";

const props = defineProps<{ employee?: Employee }>();
const isEditing = computed(() => !!props.employee);

// Modal Info
const title = computed(() => (isEditing.value ? "Edit Employee" : "Add Employee"));
const description = computed(() => (isEditing.value ? "Edit the employee details" : "Add a new employee"));
const buttonText = computed(() => (isEditing.value ? "Update Employee" : "Add Employee"));

// Modal State
const open = defineModel({ default: false });

// Setup Firebase
const firebaseConfig = useRuntimeConfig().public;
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Get User
const account = useState<Account>("account");
const currentUser = computed(() => account.value || null);
const currenUserID = computed(() => currentUser.value?.uid);
const userID = currenUserID.value || "defaultUser";
// File Path
const filepath = `collections/${userID}/employees`;

const emit = defineEmits<{
  (e: "employeeUpdated"): void;
}>();

const form = ref({
  name: "",
  title: "",
  email: "",
  sex: ""
});

// Watch for changes in employee prop to handle form state
watch(
  () => props.employee,
  (newEmployee) => {
    if (newEmployee) {
      form.value = {
        name: newEmployee.name,
        title: newEmployee.title,
        email: newEmployee.email,
        sex: newEmployee.sex
      };
    } else {
      form.value = {
        name: "",
        title: "",
        email: "",
        sex: ""
      };
    }
  },
  { immediate: true }
);

// Also clear the form when the dialog is opened and there is no employee
watch(
  () => open.value,
  (newValue) => {
    if (newValue && !props.employee) {
      form.value = {
        name: "",
        title: "",
        email: "",
        sex: ""
      };
    }
  }
);

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      const employeeRef = doc(db, filepath, props.employee?.id!);
      await updateDoc(employeeRef, form.value);
      useToast().toast({
        description: "Update successfully!",
        variant: "success",
        icon: "lucide:badge-check"
      });
    } else {
      const genAlphaNumericId = Math.random().toString(36).substring(2);
      await setDoc(doc(db, filepath, genAlphaNumericId), form.value);
      useToast().toast({
        description: "Employee added successfully!",
        variant: "success",
        icon: "lucide:badge-check"
      });
    }
    emit("employeeUpdated");
    open.value = false;
  } catch (error) {
    useToast().toast({
      description: "An error occurred while adding the employee",
      variant: "destructive",
      icon: "lucide:badge-x"
    });
  }
};
</script>

<style>

</style>