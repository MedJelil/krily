import { Button, Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

interface Props {
  id: number;
  used_for: string;
}

const AcceptButton = ({ id, used_for }: Props) => {
  const toast = useToast();
  const [renting, setRenting] = useState(false);
  const [reserving, setReserving] = useState(false);

  const handleReservation = async (id: number) => {
    try {
      setReserving(true);
      const result = await axios.put(`/apis/reservedCars/${id}`, {
        status: "VERIFIED",
      });
      if (result) {
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
      if (result) {
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
