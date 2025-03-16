<template>
  <div class="">
    <span>
      <UiAlertDialog>
        <UiAlertDialogTrigger as-child>
          <UiButton size="sm" variant="destructive">Delete</UiButton>
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
                Are you sure you want to delete this employee?
              </UiAlertDialogDescription>
            </UiAlertDialogHeader>
          </div>
          <UiAlertDialogFooter>
            <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
            <UiAlertDialogAction @click="handleDelete">Confirm</UiAlertDialogAction>
          </UiAlertDialogFooter>
        </UiAlertDialogContent>
      </UiAlertDialog>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { initializeApp } from 'firebase/app';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { computed } from 'vue';
import type { Account } from '~/types/account';
import type { Employee } from '~/types/employee';

const props = defineProps<{ employee: Employee }>();
const emit = defineEmits<{
  (e: "employeeDeleted"): void;
}>();

const firebaseConfig = useRuntimeConfig().public;
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const account = useState<Account>('account');
const currentUser = computed(() => account.value || null);
const userID = currentUser.value?.uid || "default";
const collectionName = `collections/${userID}/employees`;

const handleDelete = async () => {
  try {
    await deleteDoc(doc(db, collectionName, props.employee.id!));
    // Emit an event to alert parent component to refresh the table
    emit("employeeDeleted");
    useToast().toast({
        description: "Delete Successful",
        variant: "success",
        icon: "lucide:badge-check"
      });
  } catch (error) {
    console.error("Error deleting employee:", error);
    useToast().toast({
        description: "Delete Failed",
        variant: "destructive",
        icon: "lucide:badge-x"
      });
  }
};
</script>