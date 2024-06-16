"use client";
import { Button, Box, Text, useToast } from "@chakra-ui/react";
import EditButton from "./components/EditButton";
import DeleteButton from "./components/DeleteButton";
import CarsGrid from "./components/CarsGrid";
import PopupForm from "./components/PopupForm";
import RequestRow from "./components/ReservationRequests";
import ReservationRequests from "./components/ReservationRequests";
import Profile from "./components/Profile";



export default function Home() {
  const toast = useToast()
  const clickHandler = () =>  toast({
    title: 'Account created.',
    description: "We've created your account for you.",
    status: 'success',
    duration: 9000,
    isClosable: true,
  });
  return (
    <>
      <Box p={4}>
        <Text fontSize="xl" color="red.500">
          Welcome to Chakra UI
        </Text>
        <Button colorScheme="blue" onClick={clickHandler}>
          Click Me
        </Button>
        {/* <DeleteButton onClick={console.log("...")}/> */}
      </Box>
      {/* <CarsGrid showed_for="user"/> */}
      {/* <ReservationRequests /> */}
      {/* <Profile /> */}

    </>
  );
}
