"use client";
import ReservationRequests from "@/app/components/ReservationRequests";
import styles from "../../components/RadioInputs.module.css";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import RentalsRequests from "@/app/components/RentalsRequests";

const page = () => {

  const [reservation, setReservation] = useState(false);
  const [rental, setRental] = useState(true);
  const handleChecked = () => {
    setReservation(!reservation);
    setRental(!rental);
  }
  return (
    <>
      <Box my={2}>
        <div className={styles.radioInputs}>
          <label>
            <input className={styles.radioInput} type="radio" name="engine" checked={rental} onChange={handleChecked}/>
            <span className={styles.radioTile}>
              <span className={styles.radioIcon}></span>
              <span className={styles.radioLabel}>rentals</span>
            </span>
          </label>

          <label>
            <input className={styles.radioInput} type="radio" name="engine" checked={reservation} onChange={handleChecked}/>
            <span className={styles.radioTile}>
              <span className={styles.radioIcon}></span>
              <span className={styles.radioLabel}>Reservations</span>
            </span>
          </label>

        </div>
      </Box>
      {reservation && <ReservationRequests />}
      {rental && <RentalsRequests />}
    </>
  );
};

export default page;
