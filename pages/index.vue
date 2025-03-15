<template>
  <div>
    <Header />
    <div class="grid grid-cols-1 gap-5 md:flex md:items-center md:justify-between">
      <div class="flex flex-col">
        <h1 class="font-semibold">Users</h1>
        <p class="text-sm text-muted-foreground">
          A list of all the employee in your account including their name, title, email and role.
        </p>
      </div>
      <div>
        <UiButton size="sm" @click="isAddingEmployee = true">Add Employee</UiButton>
        <!-- Add Employee Modal -->
        <EmployeeModal v-model="isAddingEmployee" :employee="editItem"/>
      </div>
    </div>
    <div class="mt-10 grid overflow-x-auto">
      <UiTable class="w-full table-auto">
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead class="pl-0 font-semibold text-foreground">Name</UiTableHead>
            <UiTableHead class="pl-0 font-semibold text-foreground">Title</UiTableHead>
            <UiTableHead class="pl-0 font-semibold text-foreground">Email</UiTableHead>
            <UiTableHead class="pl-0 font-semibold text-foreground">Role</UiTableHead>
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
              <UiTableCell class="pl-0 text-muted-foreground">{{ e.role }}</UiTableCell>
              <UiTableCell class="pl-0 text-right">
                <UiButton size="sm" variant="linkHover2">Edit</UiButton>
              </UiTableCell>
            </UiTableRow>
          </template>
        </UiTableBody>
      </UiTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { ref, onMounted } from "vue";
import type { Employee } from "~/types/employee";

// Define the Employee type

const firebaseConfig = useRuntimeConfig().public;
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const isAddingEmployee = ref(false);
const currenUserID = ref("");
const userID = currenUserID.value || "defaultUser";
const collectionName = `collections/${userID}/employees`;
const employees = ref<Employee[]>([]);
const isEmptyCollection = ref();

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

onMounted(() => {
  fetchEmployees();
});

</script>
