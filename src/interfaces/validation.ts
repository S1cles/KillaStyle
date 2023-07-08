
import * as yup from "yup";

export const schema = yup
.object({
  Name: yup.string().required().min(2).max(30),
  Age: yup.number().required().positive().integer().min(16).max(90).transform((value) => Number.isNaN(value) ? null : value ),
  Email: yup.string().required().max(50),
  Password: yup.string().required().min(6).max(25),
  ConfirmPassword: yup.string().required().min(6).max(25)
})
.required();