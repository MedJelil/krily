"use client";
import { Button, Box, Text, useToast } from "@chakra-ui/react";
import EditButton from "./components/EditButton";
import DeleteButton from "./components/DeleteButton";
import CarsGrid from "./components/CarsGrid";
import PopupForm from "./components/PopupForm";
import RequestRow from "./components/ReservationRequests";
import ReservationRequests from "./components/ReservationRequests";
import Profile from "./components/Profile";
import SearchBar from "./components/SearchBar";
import { UseCurrentUser } from "./hooks/useCurrentUser";



export default function Home() {

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // Handle the search logic here
  };
  const toast = useToast()
  const clickHandler = () =>  toast({
    title: 'Account created.',
    description: "We've created your account for you.",
    status: 'success',
    duration: 9000,
    isClosable: true,
  });
  const user = UseCurrentUser();
  return (
    <>
      <Box p={4}>
        <Text fontSize="xl" color="red.500">
          Welcome to Chakra UI
        </Text>
        <Button colorScheme="blue" onClick={clickHandler}>
          Click Me
        </Button>
        <p>{`user ${user?.name} number ${user?.phoneNumber}`}</p>
        {/* <DeleteButton onClick={console.log("...")}/> */}
      </Box>
      {/* <CarsGrid showed_for="user"/> */}
      {/* <ReservationRequests /> */}
      {/* <Profile /> */}

      <Box p={4}>
      <SearchBar onSearch={handleSearch} />
      {/* Other components and content */}
    </Box>

    </>
  );
}
