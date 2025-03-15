export interface Employee {
  id: string;
  name: string;
  title: string;
  email: string;
  role: "Admin" | "Member" | "Viewer";
}
