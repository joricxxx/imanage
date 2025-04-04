<template>
  <div>
    <Header />
    <div class="grid grid-cols-1 gap-5 md:flex md:items-center md:justify-between">
      <div class="flex flex-col">
        <h1 class="font-semibold">Your Employee</h1>
        <p class="text-sm text-muted-foreground">
          A list of all the employee in your account including their name, title, email and role.
        </p>
      </div>
      <div>
        <UiButton size="sm" @click="openAddDialog">Add Employee</UiButton>
        <!-- Add Employee Modal -->
      </div>
    </div>
    <div class="mt-10 grid overflow-x-auto">
      <UiTable class="w-full table-auto">
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead class="pl-0 font-semibold text-foreground">Name</UiTableHead>
            <UiTableHead class="pl-0 font-semibold text-foreground">Title</UiTableHead>
            <UiTableHead class="pl-0 font-semibold text-foreground">Email</UiTableHead>
            <UiTableHead class="pl-0 font-semibold text-foreground">Sex</UiTableHead>
            <UiTableHead class="pl-0">
              <span class="sr-only">Actions</span>
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody v-model="isEmptyCollection">
          <template  v-for="e in employees" :key="e.id">
            <UiTableRow>
              <UiTableCell class="pl-0 font-medium">{{ e.name }} </UiTableCell>
              <UiTableCell class="pl-0 text-muted-foreground">{{ e.title }}</UiTableCell>
              <UiTableCell class="pl-0 text-muted-foreground">{{ e.email }}</UiTableCell>
              <UiTableCell class="pl-0 text-muted-foreground">{{ e.sex }}</UiTableCell>
              <UiTableCell class="pl-0 flex space-x-2 justify-end">
                <UiButton @click="setEdit(e)" size="sm" variant="secondary">Edit</UiButton>
                <DeleteDialogue :employee="e" @employee-deleted="fetchEmployees" />
              </UiTableCell>
            </UiTableRow>
          </template>
        </UiTableBody>
      </UiTable>
    </div>
    <EmployeeModal v-model="dialog" :employee="editItem" @employee-updated="fetchEmployees"/>
  </div>
</template>

<script lang="ts" setup>
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, onMounted, computed } from "vue";
import type { Account } from "~/types/account";
import type { Employee } from "~/types/employee";

definePageMeta({
    middleware: ["auth"],
});

const firebaseConfig = useRuntimeConfig().public;
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const account = useState<Account>('account');
const currentUser = computed(() => account.value || null);
const userID = currentUser.value?.uid || "default";

const collectionName = `collections/${userID}/employees`;
const employees = ref<Employee[]>([]);
const isEmptyCollection = ref();

const dialog = ref(false);
const editItem = ref<Employee>();

// Fetch employees from Firestore
const fetchEmployees = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    employees.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Employee[];
    isEmptyCollection.value = employees.value.length === 0;
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

const setEdit = (employee: Employee) => {
  editItem.value = employee;
  dialog.value = true;
};

const openAddDialog = () => {
  editItem.value = undefined; // reset editItem to show add employee form
  dialog.value = true;
};

const remove = async (employee: Employee) => {
  const res = confirm("Are you sure you want to delete this employee?");
  if (res) {
    await deleteDoc(doc(db, collectionName, employee.id!));
    fetchEmployees();
  }
};

onMounted(() => {
  fetchEmployees();
});
</script>
