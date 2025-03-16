import { object, string } from "yup";

export const employeeSchema = object({
  name: string().required(),
  title: string().required(),
  email: string().email().required(),
  sex: string().required(),
});
