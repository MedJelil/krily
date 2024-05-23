import { Button, Box, Text } from "@chakra-ui/react";


export default function Home() {
  return (
    <>
     <Box p={4}>
      <Text fontSize="xl" color="red.500">Welcome to Chakra UI</Text>
      <Button colorScheme="blue">Click Me</Button>
    </Box>
    </>
  );
}
