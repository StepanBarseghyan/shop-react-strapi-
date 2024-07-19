import { SubmitHandler } from "react-hook-form";
import BaseForm from "../../components/BaseForm";
import { loginFields, loginSchema } from "../../components/BaseForm/schemas";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

type FormData = {
  email: string;
  username: string;
  confirmPassword: string;
  password: string;
};
const SignIn = () => {
  const handleSubmit: SubmitHandler<FormData> = (fields) => {
    console.log(fields);
  };
  return (
    <section className={styles.signin}>
      <div className={styles.form__container}>
        <h1 className={styles.form__title}>Sign In</h1>
        <BaseForm
          schema={loginSchema}
          fields={loginFields}
          buttonText="Login"
          onSubmit={handleSubmit}
        />
        <span className={styles.have__account}>
          Don't have an account?
          <Link className={styles.link} to={"/auth/signup"}>
            Create your account now
          </Link>
        </span>
      </div>
    </section>
  );
};

export default SignIn;
