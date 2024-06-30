import { Button, Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  id: number;
  used_for: string;
  clientId: number;
  carId: number;
  rental_date: string;
  days: number;
}

const AcceptButton = ({
  id,
  used_for,
  clientId,
  carId,
  rental_date,
  days,
}: Props) => {
  const toast = useToast();
  const [renting, setRenting] = useState(false);
  const [reserving, setReserving] = useState(false);
  const router = useRouter();

  const handleReservation = async (id: number) => {
    try {
      setReserving(true);
      const result = await axios.put(`/apis/reservedCars/${id}`, {
        status: "VERIFIED",
      });
      const currentAding = await axios.post(`/apis/current`, {
        carId: carId,
        clientId: clientId,
        days: days,
        rental_date: rental_date,
      });
      const historyAding = await axios.post(`/apis/history`, {
        carId: carId,
        clientId: clientId,
        days: days,
        rental_date: rental_date,
      });
      if (result && historyAding && currentAding) {
        const showToast = () =>
          toast({
            title: "Accepted succesfuly.",
            description: "reservation accepted.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        showToast();
        setReserving(false);
        router.push("/rental/requests");
      }
    } catch (error) {
      const showToast = () =>
        toast({
          title: "Error",
          description: "unexpected error",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      showToast();
    }
  };

  const handleRental = async (id: number) => {
    try {
      setRenting(true);
      const result = await axios.put(`/apis/rentedCars/${id}`, {
        status: "VERIFIED",
      });
      const historyAding = await axios.post(`/apis/history`, {
        carId: carId,
        clientId: clientId,
        days: days,
        rental_date: rental_date,
      });
      const currentAding = await axios.post(`/apis/current`, {
        carId: carId,
        clientId: clientId,
        days: days,
        rental_date: rental_date,
      });
      if (result && historyAding && currentAding) {
        const showToast = () =>
          toast({
            title: "Accepted succesfuly.",
            description: "Rental accepted.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        showToast();
        setRenting(false);
        router.push("/rental/requests");
      }
    } catch (error) {}
  };
  return used_for == "reservation" ? (
    <Button onClick={() => handleReservation(id)}>
      {" "}
      {reserving ? <Spinner /> : "Accept"}{" "}
    </Button>
  ) : (
    <Button onClick={() => handleRental(id)}>
      {" "}
      {renting ? <Spinner /> : "Accept"}{" "}
    </Button>
  );
};

export default AcceptButton;
