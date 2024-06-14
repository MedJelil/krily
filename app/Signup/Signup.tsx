"use client";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { clientSchema, rentalSchema } from "./page";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("client");
  const toast = useToast();

  const schema = userType === "client" ? clientSchema : rentalSchema;

  type RentalFormData = z.infer<typeof rentalSchema>;
  type ClientFormData = z.infer<typeof clientSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RentalFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const url = userType === "client" ? "/apis/clients" : "/apis/rentals";
      const result = await axios.post(url, data);
      if (result) {
        const showToast = () =>
          toast({
            title: "Car updated succesfuly.",
            description: "We've update your car for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        router.push(`/rental/cars/details/${carData.id}`);
        showToast();
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        w={{ base: "sm", md: "lg" }}
        py={12}
        px={6}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <RadioGroup
              defaultValue="client"
              display={"flex"}
              justifyContent={"center"}
              mb={3}
              onChange={(value) => setUserType(value)}
            >
              <Stack spacing={5} direction="row">
                <Radio colorScheme="red" value="client">
                  Client
                </Radio>
                <Radio colorScheme="green" value="rental">
                  Rental
                </Radio>
              </Stack>
            </RadioGroup>

            <Stack spacing={4}>
              <Box>
                <FormControl id="name" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" {...register("name")} />
                  {errors.name && (
                    <Text color="red.500">{errors.name.message}</Text>
                  )}
                </FormControl>
              </Box>
              <FormControl id="phoneNumber" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input type="text" {...register("phoneNumber")} />
                {errors.phoneNumber && (
                  <Text color="red.500">{errors.phoneNumber.message}</Text>
                )}
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <Text color="red.500">{errors.password.message}</Text>
                )}
              </FormControl>
              {userType === "rental" && (
                <FormControl id="location" isRequired>
                  <FormLabel>Location</FormLabel>
                  <Input type="text" {...register("location")} />
                  {errors.location && (
                    <Text color="red.500">{errors.location.message}</Text>
                  )}
                </FormControl>
              )}
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user? <Link color={"blue.400"}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
