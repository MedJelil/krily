"use client";
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UseCurrentUser } from "../hooks/useCurrentUser";

const reservedCarSchema = z.object({
  days: z
    .number()
    .int()
    .min(
      1,
      "Days must be at least 1 to indicate the car is reserved for at least one day."
    ),
});

type ReservationData = z.infer<typeof reservedCarSchema>;

interface Props {
  carId: number;
  clientId: number;
}

interface Reservation {
  rental_date: Date | string;
  end_reservation_date: Date | string;
}

const RentalPopup = ({ carId, clientId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reservedCar, setReservedCar] = useState<Reservation[]>([]);
  const [rentedCar, setRentedCar] = useState<Reservation[]>([]);

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const router = useRouter();
  const user = UseCurrentUser();

  const formatDateTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    return date.toISOString();
  };
  const end_reservation_date = (dateTime: string, days: number): string => {
    const date = new Date(dateTime);
    date.setDate(date.getDate() + days);
    return date.toISOString();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ReservationData>({
    resolver: zodResolver(reservedCarSchema),
  });

  const isAvailable = (selectedDate: string): boolean => {
    if (reservedCar.length === 0) return true;
    const selectedDateObj = new Date(selectedDate);
    for (var i = 0; i < reservedCar.length; i++) {
      const reservationDateObj = new Date(reservedCar[i].rental_date);
      const endReservationDateObj = new Date(
        reservedCar[i].end_reservation_date
      );
      if (
        selectedDateObj >= reservationDateObj &&
        selectedDateObj < endReservationDateObj
      )
        return false;
    }
    return true;
  };

  const onSubmit = async (data: FieldValues) => {
    if (
      !isAvailable(new Date().toString()) ||
      !isAvailable(end_reservation_date(new Date().toString(), data.days)) ||
      rentedCar
    ) {
      const showToast = () =>
        toast({
          title: "this car is not available at this time",
          description: "",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      showToast();
    } else {
      try {
        const result = await axios.post("/apis/rentedCars", {
          ...data,
          clientId: clientId,
          carId: carId,
        });
        if (result) {
          const showToast = () =>
            toast({
              title: "request sent",
              description: "your reservation has been reserved please wait ",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          router.push("/user/requests");
          showToast();
        }
      } catch (error) {
        const showToast = () =>
          toast({
            title: "error loading",
            description: "something went wrong",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        showToast();
      }
    }
    // console.log({
    //   ...data,
    //   rental_date: formatDateTime(data.rental_date),
    //   end_reservation_date: end_reservation_date(data.rental_date, data.days),
    //   userId: 1,
    //   carId: carId,
    // });
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          `/apis/currentReservationsByCar/${carId}`
        ); // Modify the URL as needed
        setReservedCar(response.data); // Axios wraps the response data in a `data` object
      } catch (err) {
        // setError(err.message);
      }
    };

    const fetchRentedCars = async () => {
      try {
        const response = await axios.get(
          `/apis/currentRentedcarsByCar/${carId}`
        ); // Modify the URL as needed
        setRentedCar(response.data); // Axios wraps the response data in a `data` object
      } catch (err) {
        // setError(err.message);
      }
    };

    fetchRentedCars();

    fetchCars();
  }, []);

  const allBusyTime = rentedCar.concat(reservedCar);

  return (
    <>
      <Button onClick={onOpen}>rent</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm your renting</ModalHeader>
          <ModalCloseButton />
          {allBusyTime && (
            <Stack spacing={3}>
              <Heading as="h4" size="md" ml={6}>
                This car busy at :
              </Heading>
              {allBusyTime.map((reservation) => (
                <Alert status="warning">
                  <AlertIcon />
                  {new Date(reservation.rental_date).toLocaleDateString()}{" "}
                  {new Date(reservation.rental_date).toLocaleTimeString()} to{" "}
                  {new Date(
                    reservation.end_reservation_date
                  ).toLocaleDateString()}{" "}
                  {new Date(
                    reservation.end_reservation_date
                  ).toLocaleTimeString()}
                </Alert>
              ))}
            </Stack>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Days</FormLabel>
                <Input
                  type="number"
                  placeholder="Days"
                  {...register("days", { valueAsNumber: true })}
                />
                {errors.days && (
                  <p className="text-red-500">{errors.days.message}</p>
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RentalPopup;
