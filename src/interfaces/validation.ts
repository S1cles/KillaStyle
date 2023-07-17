
import * as yup from "yup";

export const schemaReg = yup
.object({
  username: yup.string().required().min(2).max(30),
  age: yup.number().required().positive().integer().min(16).max(90).transform((value) => Number.isNaN(value) ? null : value ),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required().min(6).max(25),
  confirmPassword: yup.string().required().min(6).max(25)
})
.required();


export const schemaLogin = yup
.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required().min(6).max(25),
})
.required();