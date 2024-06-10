import {
  TableContainer,
  Table,
  Image,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Hide,
  HStack,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Reservation } from "../interfaces";
import Link from "next/link";

const ReservationRequests = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`/apis/reservedCars`);
        setReservations(response.data);
      } catch (err) {
        // setError(err.message);
      }
    };

    fetchReservations();
  }, []);
  if (reservations)
    return (
      <>
        <Grid gap={6}>
          <Grid display={"flex"} flexDirection={"row"} gap={6}>
            <GridItem w="100%" h="10">
              User
            </GridItem>
            <GridItem w="100%" h="10">
              Car
            </GridItem>
            <GridItem w="100%" h="10">
              Date{" "}
            </GridItem>
            <GridItem w="100%" h="10">
              Days{" "}
            </GridItem>
          </Grid>
          {reservations.map((reservation) => (
            <Link href={`/rental/requests/reservation/${reservation.id}`}>
              <Grid gap={6} alignItems={"center"}>
                <Grid display={"flex"} flexDirection={"row"} gap={6}>
                  <GridItem
                    w="100%"
                    h="10"
                    textAlign="center"
                    alignItems={"center"}
                    display={"flex"}
                    gap={1}
                  >
                    <Image
                      borderRadius="full"
                      boxSize="50px"
                      src={
                        reservation.user.image_url ||
                        "https://bit.ly/dan-abramov"
                      }
                      alt={reservation.user.name}
                    />
                    <p>{reservation.user.name}</p>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    {reservation.car.brand} {reservation.car.model}{" "}
                    {reservation.car.year}
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <p>
                      {new Date(reservation.rental_date).toLocaleDateString()}
                    </p>
                    {new Date(reservation.rental_date).toLocaleTimeString()}
                  </GridItem>
                  <GridItem w="100%" h="10">
                    {reservation.days}
                  </GridItem>
                </Grid>
              </Grid>
            </Link>
          ))}
        </Grid>
      </>
    );
};

export default ReservationRequests;
