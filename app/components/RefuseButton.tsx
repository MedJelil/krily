"use client";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface props {
  id: number;
  used_for: string;
}

const RefuseBitton = ({ id, used_for }: props) => {
  const [isRefusing, setRefusing] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleReservation = async (reservatio_id: number) => {
    setRefusing(true);
    try {
      setRefusing(true);
      const result = await axios.put(`/apis/reservedCars/${reservatio_id}`, {
        status: "NOT_VERIFIED",
      });
      if (result) {
        const showToast = () =>
          toast({
            title: "Request refused.",
            description: "We've refuse this request for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        showToast();
        // router.push(`/rental/requests/reservation/${reservatio_id}`);
        onClose();
        setRefusing(false);
      }
    } catch (error) {
      if (error) {
        const showToast = () =>
          toast({
            title: "Error",
            description: "unexpected error",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        showToast();
        onClose();
        setRefusing(false);
      }
    }
  };
  const handleRental = async (rental_id: number) => {
    setRefusing(true);
    try {
      setRefusing(true);
      const result = await axios.put(`/apis/rentedCars/${rental_id}`, {
        status: "NOT_VERIFIED",
      });
      if (result) {
        const showToast = () =>
          toast({
            title: "Request refused.",
            description: "We've refuse this request for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        // router.push(`/rental/requests/rental/${rental_id}`);
        showToast();
        onClose();
        setRefusing(false);
      }
    } catch (error) {
      if (error) {
        const showToast = () =>
          toast({
            title: "Error",
            description: "unexpected error",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        onClose();
        showToast();
        setRefusing(false);
      }
    }
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen} disabled={isRefusing}>
        {isRefusing ? <Spinner /> : "Refuse"}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Refuse
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={
                  used_for == "reservation"
                    ? () => handleReservation(id)
                    : () => handleRental(id)
                }
                ml={3}
                disabled={isRefusing}
              >
                {isRefusing ? <Spinner /> : "Refuse"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default RefuseBitton;
