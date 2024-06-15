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

const CancelBitton = ({ id, used_for }: props) => {
  const [isRefusing, setRefusing] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleReservation = async (reservatio_id: number) => {
    setRefusing(true);
    try {
      setRefusing(true);
      const result = await axios.delete(`/apis/reservedCars/${reservatio_id}`);
      if (result) {
        const showToast = () =>
          toast({
            title: "Request Canceld.",
            description: "We've Cancel and delete this request for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        showToast();
        router.push(`/user/requests`);
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
      const result = await axios.delete(`/apis/rentedCars/${rental_id}`);
      if (result) {
        const showToast = () =>
          toast({
            title: "Request Canceld.",
            description: "We've Cancel and delete this request for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        router.push(`/user/requests/`);
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
        {isRefusing ? <Spinner /> : "Cancel"}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancel
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
                {isRefusing ? <Spinner /> : "Cancel"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default CancelBitton;
