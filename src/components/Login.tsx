import React from "react";
import { Input, Button, Text, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "../interfaces/validation";
import axios from "axios";
import useAuth from "../store/useAuth";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });
  type FormData = yup.InferType<typeof schemaLogin>;
  const { logIn }: any = useAuth();

  const onSubmit = async (data: FormData) => {
    try {
      await logIn(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Отдельная переменная для стилей
  const inputStyles = {
    "&:focus": {
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
    },
    "&::selection": {
      background: "none",
    },
    userSelect: "none", // Предотвращает выделение при нажатии
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Input
          mt={5}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Invalid email format",
            },
          })}
          placeholder="Email"
          _placeholder={{ color: "black" }} // Добавлено свойство для изменения цвета плейсхолдера
          sx={inputStyles} // Используем переменную стилей
        />
        <AnimatePresence>
          {errors.email && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <Text fontSize="sm" mt={1} fontWeight="bold">
                {errors.email.message}
              </Text>
            </motion.div>
          )}
        </AnimatePresence>

        <Input
          {...register("password", {
            required: "Password is required",
          })}
          type="password"
          placeholder="Password"
          _placeholder={{ color: "black" }} // Добавлено свойство для изменения цвета плейсхолдера
          sx={inputStyles} // Используем переменную стилей
        />
        <AnimatePresence>
          {errors.password && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <Text fontSize="sm" mt={1} fontWeight="bold">
                {errors.password.message}
              </Text>
            </motion.div>
          )}
        </AnimatePresence>
      </Stack>

        <Button mt={5} type="submit">Log In</Button>
      </form>
    </div>
  );
};

export default Login;
