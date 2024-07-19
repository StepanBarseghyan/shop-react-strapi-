import React from "react";
import { Form, Input, Button } from "antd";
import { useForm, Controller, FieldError } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./styles.module.css";

export interface Field {
  name: string;
  placeholder: string;
  type: "text" | "password";
}

interface ReusableFormProps {
  schema: yup.ObjectSchema<any>;
  onSubmit: (data: any) => void;
  fields: Field[];
  buttonText: string;
}

const BaseForm: React.FC<ReusableFormProps> = ({
  schema,
  onSubmit,
  fields,
  buttonText,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
      {fields.map(({ name, placeholder, type }) => (
        <Form.Item
          className={styles.form__item}
          key={name}
          validateStatus={errors[name] ? "error" : ""}
          help={(errors[name] as FieldError)?.message}
        >
          <Controller
            name={name}
            control={control}
            render={({ field }) =>
              type === "password" ? (
                <Input.Password
                  {...field}
                  size="large"
                  variant="filled"
                  placeholder={placeholder}
                />
              ) : (
                <Input
                  {...field}
                  size="large"
                  variant="filled"
                  placeholder={placeholder}
                />
              )
            }
          />
        </Form.Item>
      ))}
      <Form.Item>
        <Button
          className={styles.submit__btn}
          type="primary"
          htmlType="submit"
          block
          size="large"
        >
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BaseForm;
