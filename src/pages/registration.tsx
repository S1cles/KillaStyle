/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useRef, useState } from "react";
import { theme1, theme2 } from "../helpers/themes";
import { Input, Button, Box, Container, Text, Stack, Switch } from "@chakra-ui/react";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../interfaces/validation";
import * as yup from "yup";



const registration = () => {
  type FormData = yup.InferType<typeof schema>;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: FormData) => console.log(data);
  const password = watch("Password");
  const confirmPassword = watch("ConfirmPassword");
  const isTheme1 = false;
  const theme = isTheme1 ? theme1 : theme2;
  return (
    <div>
      <Container  mt={"10vh"} maxW="2xl" bg={theme.colors.primary[1]} padding={10} borderRadius={20}>
        
        <Text fontSize="3xl" textAlign={'center'}> Registration</Text>
        <Switch margin={'0 auto'}  colorScheme='teal' size='lg' />

        <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Input {...register("Name")} placeholder="Name" />
          {errors?.Name && <p>{errors.Name.message}</p>}
          <Input {...register("Age")} type="number" placeholder="Age" />
          {errors?.Age && <p>{errors.Age.message}</p>}
          <Input
            {...register("Email", {
              required: "required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            placeholder="Email"
          />
          <p>{errors.Email?.message}</p>
          <Input {...register("Password")} placeholder="Password" />
          <p>{errors.Password?.message}</p>
          <Input
            {...register("ConfirmPassword")}
            placeholder="Confirm Password"
          />
          <p>{errors.ConfirmPassword?.message}</p>
          {password !== confirmPassword && <p>Passwords do not match!</p>}
          </Stack>
          <Button type="submit">Sign Up</Button>
        </form>
      </Container>
    </div>
  );
};

export default registration;
