"use client";
import ReservationRequests from "@/app/components/ReservationRequests";
import styles from "../../components/RadioInputs.module.css";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import UserRentalRequests from "@/app/components/UserRentalRequests";
import UserReservationRequests from "@/app/components/UserReservationRequests";

const page = () => {
  const [reservation, setReservation] = useState(false);
  const [rental, setRental] = useState(true);
  const handleChecked = () => {
    setReservation(!reservation);
    setRental(!rental);
  };
  return (
    <>
      <Box my={2}>
        <div className={styles.radioInputs}>
          <label>
            <input
              className={styles.radioInput}
              type="radio"
              name="engine"
              checked={rental}
              onChange={handleChecked}
            />
            <span className={styles.radioTile}>
              <span className={styles.radioIcon}></span>
              <span className={styles.radioLabel}>rentals</span>
            </span>
          </label>

          <label>
            <input
              className={styles.radioInput}
              type="radio"
              name="engine"
              checked={reservation}
              onChange={handleChecked}
            />
            <span className={styles.radioTile}>
              <span className={styles.radioIcon}></span>
              <span className={styles.radioLabel}>Reservations</span>
            </span>
          </label>
        </div>
      </Box>
      <div className="flex justify-center w-full">
        <div className="md:w-[850px] w-full">
          <Card size="lg">
            <CardHeader>
              <Heading size="md"> Requests</Heading>
            </CardHeader>
            <CardBody p={{ sm: 0, md: 4 }}>
              {reservation && <UserReservationRequests />}

              {rental && <UserRentalRequests />}
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default page;
