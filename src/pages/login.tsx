/* eslint-disable react-hooks/rules-of-hooks */
import { Input, Button, Box, Container, Text, Stack } from "@chakra-ui/react";
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
  return (
    <div>
      <Container mt={"10vh"} maxW="2xl" bg="blue.600" padding={10} borderRadius={20}>
        <Text fontSize="3xl" textAlign={'center'}> Login </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
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

          </Stack>
          <Button type="submit">Sign Up</Button>
        </form>
      </Container>
    </div>
  );
};

export default registration;
