import React, { useState } from "react";
import { Input, Button, Text, Stack, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { LockIcon, StarIcon, EmailIcon,UnlockIcon } from '@chakra-ui/icons'

import useAuth from "../store/useAuth";
import { schemaReg } from "../interfaces/validation";
import "../styles/auth.scss";
import { RepeatClockIcon } from "@chakra-ui/icons";

const Registration = () => {
  type FormData = yup.InferType<typeof schemaReg>;
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schemaReg) });
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const onSubmit = async (data: FormData) => {
    setError("");
    await signUp(data);
  };
  const placeholderColor = "#ADBAC7";
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const inputStyles = {
    variant: "flushed",
    sx: {
      "&:focus, &:active": { boxShadow: "none" },
      "&::selection": { background: "none" },
      userSelect: "none",
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" fontSize={30} opacity={0.5}>
            <StarIcon color="gray.300" />
          </InputLeftElement>
          <Input {...register("username")} placeholder="Имя" _placeholder={{ color: placeholderColor }} {...inputStyles} />
        </InputGroup>
        <AnimatePresence>
          {errors?.username && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
              <Text color="white" fontSize="sm" mt={1}>{errors.username.message}</Text>
            </motion.div>
          )}
        </AnimatePresence>
        <InputGroup>
          <InputLeftElement pointerEvents="none" fontSize={30} opacity={0.5}>
            <RepeatClockIcon color="gray.300" />
          </InputLeftElement>
          <Input {...register("age")} type="number" placeholder="Возраст" _placeholder={{ color: placeholderColor }} {...inputStyles} />
        </InputGroup>
        <AnimatePresence>
          {errors?.age && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
              <Text color="white" fontSize="sm" mt={1}>{errors.age.message}</Text>
            </motion.div>
          )}
        </AnimatePresence>
        <InputGroup>
          <InputLeftElement pointerEvents="none" fontSize={30} opacity={0.5}>
            <EmailIcon color="gray.300" />
          </InputLeftElement>
          <Input {...register("email", { required: "Обязательное поле", pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Некорректный формат email" } })}
            placeholder="Email" _placeholder={{ color: placeholderColor }} {...inputStyles} />
        </InputGroup>
        <AnimatePresence>
          {errors?.email && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
              <Text color="white" fontSize="sm" mt={1}>{errors.email.message}</Text>
            </motion.div>
          )}
        </AnimatePresence>
        <InputGroup>
          <InputLeftElement pointerEvents="none" fontSize={30} opacity={0.5}>
            <LockIcon />
          </InputLeftElement>
          <Input {...register("password")} placeholder="Пароль" _placeholder={{ color: placeholderColor }} {...inputStyles} />
        </InputGroup>
        <AnimatePresence>
          {errors?.password && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
              <Text color="white" fontSize="sm" mt={1}>{errors.password.message}</Text>
            </motion.div>
          )}
        </AnimatePresence>
        <InputGroup>
          <InputLeftElement pointerEvents="none" fontSize={30} opacity={0.5}>
            <UnlockIcon color="gray.300" />
          </InputLeftElement>
          <Input {...register("confirmPassword")} placeholder="Подтвердите пароль" _placeholder={{ color: placeholderColor }} {...inputStyles} />
        </InputGroup>
        <AnimatePresence>
          {errors?.confirmPassword && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
              <Text color="white" fontSize="sm" mt={1}>{errors.confirmPassword.message}</Text>
            </motion.div>
          )}
        </AnimatePresence>
        {password !== confirmPassword && (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
              <Text color="white" fontSize="sm" mt={1}>Пароли не совпадают!</Text>
            </motion.div>
          </AnimatePresence>
        )}
      </Stack>
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
            <Text color="white" fontSize="sm" mt={2}>{error}</Text>
          </motion.div>
        )}
      </AnimatePresence>
      <Button mt={5} type="submit" float="right" colorScheme="teal">Зарегистрироваться</Button>
    </form>
  );
};

export default Registration;
