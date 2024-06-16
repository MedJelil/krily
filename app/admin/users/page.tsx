"use client";
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
import Rentals from "@/app/components/Rentals";
import Clients from "@/app/components/Clients";

const page = () => {
  const [clients, setClients] = useState(false);
  const [rentals, setRentals] = useState(true);
  const handleChecked = () => {
    setClients(!clients);
    setRentals(!rentals);
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
              checked={rentals}
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
              checked={clients}
              onChange={handleChecked}
            />
            <span className={styles.radioTile}>
              <span className={styles.radioIcon}></span>
              <span className={styles.radioLabel}>Clients</span>
            </span>
          </label>
        </div>
      </Box>
      <div className="flex justify-center w-full">
        <div className="md:w-[850px] w-full">
          <Card size="lg">
            <CardHeader>
              <Heading size="md"> Users</Heading>
            </CardHeader>
            <CardBody p={{ base: 0, md: 4 }}>
              {clients && <Clients />}

              {rentals && <Rentals />}
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default page;
