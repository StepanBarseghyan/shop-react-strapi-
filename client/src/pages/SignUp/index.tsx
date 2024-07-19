import { SubmitHandler } from "react-hook-form";
import BaseForm from "../../components/BaseForm";
import {
  registrationFields,
  registrationSchema,
} from "../../components/BaseForm/schemas";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};
const SignUp = () => {
  const handleSubmit: SubmitHandler<FormData> = (fields) => {
    console.log(fields);
  };
  return (
    <section className={styles.signup}>
      <div className={styles.form__container}>
        <h1 className={styles.form__title}>Create an account</h1>
        <BaseForm
          schema={registrationSchema}
          fields={registrationFields}
          buttonText="Register"
          onSubmit={handleSubmit}
        />
        <span className={styles.have__account}>
          Already have an account?
          <Link className={styles.link} to={"/auth/signin"}>
            Sign in
          </Link>
        </span>
      </div>
    </section>
  );
};

export default SignUp;
