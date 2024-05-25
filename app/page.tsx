"use client";
import { Button, Box, Text } from "@chakra-ui/react";

export default function Home() {
  const clickHandler = () => console.log("click");
  return (
    <>
      <Box p={4}>
        <Text fontSize="xl" color="red.500">
          Welcome to Chakra UI
        </Text>
        <Button colorScheme="blue" onClick={clickHandler}>
          Click Me
        </Button>
      </Box>
    </>
  );
}
