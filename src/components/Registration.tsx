import React from "react";
import { Input, Button, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaReg } from "../interfaces/validation";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../store/useAuth";
import "../styles/auth.scss";

const Registration = () => {
  type FormData = yup.InferType<typeof schemaReg>;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaReg),
  });
  const [error, setError] = React.useState("");

  const { signUp }: any = useAuth();
  const onSubmit = async (data: FormData) => {
    setError("");
    await signUp(data);
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Input
          mt={5}
          {...register("username")}
          placeholder="Name"
          _placeholder={{ color: "black" }} // Добавлено свойство для изменения цвета плейсхолдера
          sx={{
            "&:focus": {
              boxShadow: "none",
            },
            "&:active": {
              boxShadow: "none",
            },
            "&::selection": {
              background: "none",
            },
            userSelect: "none", // Убирает выделение при нажатии на поле
          }}
        />
        <AnimatePresence>
          {errors?.username && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <Text color="white" fontSize="sm" mt={1}>
                {errors.username.message}
              </Text>
            </motion.div>
          )}
        </AnimatePresence>
        <Input
          {...register("age")}
          type="number"
          placeholder="Age"
          _placeholder={{ color: "black" }} // Добавлено свойство для изменения цвета плейсхолдера
          sx={{
            "&:focus": {
              boxShadow: "none",
            },
            "&:active": {
              boxShadow: "none",
            },
            "&::selection": {
              background: "none",
            },
            userSelect: "none", // Убирает выделение при нажатии на поле
          }}
        />
        <AnimatePresence>
          {errors?.age && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <Text color="white" fontSize="sm" mt={1}>
                {errors.age.message}
              </Text>
            </motion.div>
          )}
        </AnimatePresence>
        <Input
          {...register("email", {
            required: "required",
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Entered value does not match email format",
            },
          })}
          placeholder="Email"
          _placeholder={{ color: "black" }} // Добавлено свойство для изменения цвета плейсхолдера
          sx={{
            "&:focus": {
              boxShadow: "none",
            },
            "&:active": {
              boxShadow: "none",
            },
            "&::selection": {
              background: "none",
            },
            userSelect: "none", // Убирает выделение при нажатии на поле
          }}
        />
        <AnimatePresence>
          {errors?.email && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <Text color="white" fontSize="sm" mt={1}>
                {errors.email.message}
              </Text>
            </motion.div>
          )}
        </AnimatePresence>
        <Input
          {...register("password")}
          placeholder="Password"
          _placeholder={{ color: "black" }} // Добавлено свойство для изменения цвета плейсхолдера
          sx={{
            "&:focus": {
              boxShadow: "none",
            },
            "&:active": {
              boxShadow: "none",
            },
            "&::selection": {
              background: "none",
            },
            userSelect: "none", // Убирает выделение при нажатии на поле
          }}
        />
        <AnimatePresence>
          {errors?.password && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <Text color="white" fontSize="sm" mt={1}>
                {errors.password.message}
              </Text>
            </motion.div>
          )}
        </AnimatePresence>
        <Input
          {...register("confirmPassword")}
          placeholder="Confirm Password"
          _placeholder={{ color: "black" }} // Добавлено свойство для изменения цвета плейсхолдера
          sx={{
            "&:focus": {
              boxShadow: "none",
            },
            "&:active": {
              boxShadow: "none",
            },
            "&::selection": {
              background: "none",
            },
            userSelect: "none", // Убирает выделение при нажатии на поле
          }}
        />
        <AnimatePresence>
          {errors?.confirmPassword && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <Text color="white" fontSize="sm" mt={1}>
                {errors.confirmPassword.message}
              </Text>
            </motion.div>
          )}
        </AnimatePresence>
        {password !== confirmPassword && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <Text color="white" fontSize="sm" mt={1}>
                Passwords do not match!
              </Text>
            </motion.div>
          
        </AnimatePresence>
        )}</Stack>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <Text color="white" fontSize="sm" mt={2}>
              {error}
            </Text>
          </motion.div>
        )}
      </AnimatePresence>
      <Button mt={5} type="submit" float={'right'} color={'black'}>Sign Up</Button>
    </form>
  );
};

export default Registration;
