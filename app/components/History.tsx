"use client";
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
import React, { useEffect, useState } from "react";
import { RentedCar, Reservation } from "../interfaces";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UseCurrentUser } from "../hooks/useCurrentUser";

interface Props {
  userId: number;
  use_for: string;
}

const History = ({ use_for, userId }: Props) => {
  const [reservedCars, setReservedCars] = useState<Reservation[]>([]);
  const [rentedCars, setRentedCars] = useState<RentedCar[]>([]);
  // const [somethingReserved, setSomethingReserved] = useState(0);
  // const [somethingRented, setSomethingRented] = useState(0);
  const [error, setError] = useState("");
  const router = useRouter();
  const user = UseCurrentUser();

  const handleClick = (id: number) => {
    router.push(`/rental/requests/reservation/${id}`);
  };

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const rentedCars = await axios.get(`/apis/rentedCars`);
        const reservedCars = await axios.get(`/apis/reservedCars`);
        setRentedCars(rentedCars.data);
        setReservedCars(reservedCars.data);
      } catch (err) {
        setError("Something went wrong");
      }
    };

    fetchRentals();
  }, []);
  if (error) {
    return <p>{error}</p>;
  }

  if (!reservedCars.length)
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
  if (user)
    return (
      <>
        <Grid gap={6}>
          <>
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>{use_for == "rental" ? "Client" : "Rental"}</Th>
                    <Th>Car</Th>
                    <Hide below="md">
                      <Th>Date</Th>
                    </Hide>
                    <Th>Days</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {rentedCars.map((reservation) =>
                    reservation.status == "COMPLETE" &&
                    reservation.client.user.id == +user.id ? (
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
                                use_for == "rental"
                                  ? reservation.client.user.name
                                  : reservation.car.rental.user.name ||
                                    "https://bit.ly/dan-abramov"
                              }
                              alt={reservation.client.user.name}
                            />
                            <Text>
                              {use_for == "rental"
                                ? reservation.client.user.name
                                : reservation.car.rental.user.name}
                            </Text>
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
                                reservation.createdAt
                              ).toLocaleDateString()}
                            </p>
                            {new Date(
                              reservation.createdAt
                            ).toLocaleTimeString()}
                          </Td>
                        </Hide>
                        <Td>{reservation.days}</Td>
                      </Tr>
                    ) : null
                  )}

                  {/*================ reservation ==============*/}

                  {reservedCars.map((reservation) =>
                    reservation.status == "COMPLETE" &&
                    reservation.client.user.id == +user.id ? (
                      //setSomethingReserved(somethingReserved + 1),
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
                                "https://bit.ly/dan-abramov"
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
                            {new Date(
                              reservation.rental_date
                            ).toLocaleTimeString()}
                          </Td>
                        </Hide>
                        <Td>{reservation.days}</Td>
                      </Tr>
                    ) : null
                  )}
                </Tbody>
              </Table>
            </Box>
          </>
        </Grid>
      </>
    );
};

export default History;
