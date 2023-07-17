import React from "react";
import { Input, Button, Text, Stack, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "../interfaces/validation";
import axios from "axios";
import useAuth from "../store/useAuth";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

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
    userSelect: "none",
  };
  const placeholderColor = '#ADBAC7'
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <InputGroup alignItems="center">
          <InputRightElement display={'flex'} alignItems={'baseline'} pointerEvents="none" fontSize={150}>
              <AiOutlineUser />
            </InputRightElement>
            <Input
            variant={'flushed'}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="Email"
              _placeholder={{ color: placeholderColor}}
              sx={inputStyles}
            />
          </InputGroup>
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

          <InputGroup alignItems="center">
            <InputRightElement pointerEvents="none" fontSize={150}>
              <AiOutlineLock />
            </InputRightElement>
            <Input
            variant={'flushed'}
              {...register("password", {
                required: "Password is required",
              })}
              type="password"
              placeholder="Password"
              _placeholder={{ color: placeholderColor }}
              sx={inputStyles}
            />
          </InputGroup>
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

        <Button mt={5} type="submit">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Login;
