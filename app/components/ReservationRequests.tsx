import {
  Table,
  Image,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Hide,
  Box,
  Grid,
  Text,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Reservation } from "../interfaces";
import { useRouter } from "next/navigation";

const ReservationRequests = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/rental/requests/reservation/${id}`);
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`/apis/reservedCars`);
        setReservations(response.data);
      } catch (err) {
        setError("Something went wrong");
      }
    };

    fetchReservations();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!reservations.length)
    return (
      <>
        <Stack>
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
        </Stack>
      </>
    );

  return (
    <>
      <Grid gap={6}>
        <>
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>User</Th>
                  <Th>Car</Th>
                  <Hide below="md">
                    <Th>Date</Th>
                  </Hide>
                  <Th>Days</Th>
                </Tr>
              </Thead>
              <Tbody>
                {reservations.map((reservation) => (
                  <Tr
                    key={reservation.id}
                    onClick={() => handleClick(reservation.id)}
                    _hover={{
                      textDecoration: "none",
                      bg: "gray.500",
                      cursor: "pointer",
                    }}
                    className=" ease-in-out cursor-pointer transform transition-colors duration-300"
                  >
                    <Td>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Image
                          borderRadius="full"
                          boxSize="50px"
                          src={
                            reservation.client.image_url ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                          }
                          alt={reservation.client.user.name}
                        />
                        <Text>{reservation.client.user.name}</Text>
                      </Box>
                    </Td>
                    <Td>
                      {reservation.car.brand} {reservation.car.model}
                      {reservation.car.year}
                    </Td>
                    <Hide below="md">
                      <Td>
                        <p>
                          {new Date(
                            reservation.rental_date
                          ).toLocaleDateString()}
                        </p>
                        {new Date(reservation.rental_date).toLocaleTimeString()}
                      </Td>
                    </Hide>
                    <Td>{reservation.days}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </>
      </Grid>
    </>
  );
};

export default ReservationRequests;
