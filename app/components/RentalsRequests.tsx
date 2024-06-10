import {
  Image,
  Hide,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Rental } from "../interfaces";
import Link from "next/link";

const RentalsRequests = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await axios.get(`/apis/rentedCars`);
        setRentals(response.data);
      } catch (err) {
        // setError(err.message);
      }
    };

    fetchRentals();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!rentals.length) {
    return <p>Loading...</p>;
  }

  return (
    <Grid gap={6}>
      <Grid display={"flex"} flexDirection={"row"} gap={6}>
        <GridItem w="100%" h="10">
          User
        </GridItem>
        <GridItem w="100%" h="10">
          Car
        </GridItem>

        <GridItem w="100%" h="10">
          Days{" "}
        </GridItem>
      </Grid>
      {rentals.map((rental) => (
        <Link href={`/rental/requests/rental/${rental.id}`}>
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
                  src={rental.user.image_url || "https://bit.ly/dan-abramov"}
                  alt={rental.user.name}
                />
                <p>{rental.user.name}</p>
              </GridItem>
              <GridItem w="100%" h="10">
                {rental.car.brand} {rental.car.model} {rental.car.year}
              </GridItem>

              <GridItem w="100%" h="10">
                {rental.days}
              </GridItem>
            </Grid>
          </Grid>
        </Link>
      ))}
    </Grid>
  );
};

export default RentalsRequests;
