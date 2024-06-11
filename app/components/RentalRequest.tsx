"use client"
import {
    Box,
    Image,
    Heading,
    Text,
    Stack,
    Table,
    Tbody,
    Tr,
    Td,
  } from "@chakra-ui/react";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import { Rental } from "@/app/interfaces";
  
  const RentalDetail = ({ params }: { params: { id: string } }) => {
    const  id  = +params.id;
    const [rental, setRental] = useState<Rental | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      
        const fetchRental = async () => {
          try {
            const response = await axios.get(`/apis/rentedCars/${id}`);
            setRental(response.data);
          } catch (err) {
            setError("Failed to fetch rental details.");
          }
        };
  
        fetchRental();
      
    }, []);
  
    if (error) {
      return <Text>{error}</Text>;
    }
  
    if (!rental) {
      return <Text>Loading...</Text>;
    }
  
    return (
      <Box p-4>
        <Stack direction="row" spacing={4} align="center">
          <Image
            borderRadius="full"
            boxSize="100px"
            src={rental.user.image_url || "https://bit.ly/dan-abramov"}
            alt={rental.user.name}
          />
        
          <Heading>{rental.user.name}</Heading>
        </Stack>
        <Box mt={4}>
          <Heading size="md">Car Details</Heading>
          <Text>{`${rental.car.brand} ${rental.car.model} (${rental.car.year})`}</Text>
          <Image
            borderRadius="md"
            boxSize="200px"
            src={rental.car.main_image_url}
            alt={rental.car.brand}
          />
        </Box>
        <Box mt={4}>
          <Heading size="md">Rental Details</Heading>
          <Table variant="simple" size="sm">
            <Tbody>
             
              <Tr>
                <Td>Days</Td>
                <Td>{rental.days}</Td>
              </Tr>
              <Tr>
                <Td>Status</Td>
                <Td>{rental.status}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>
    );
  };
  
  export default RentalDetail;
  