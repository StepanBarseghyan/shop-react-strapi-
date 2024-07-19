import * as yup from "yup";
import { Field } from ".";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const registrationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

const loginFields: Field[] = [
  { name: "email", placeholder: "Email", type: "text" },
  { name: "password", placeholder: "Password", type: "password" },
];

const registrationFields: Field[] = [
  { name: "username", placeholder: "Username", type: "text" },
  { name: "email", placeholder: "Email", type: "text" },
  { name: "password", placeholder: "Password", type: "password" },
  {
    name: "confirmPassword",
    placeholder: "Confirm Password",
    type: "password",
  },
];

export { loginSchema, registrationSchema, loginFields, registrationFields };
