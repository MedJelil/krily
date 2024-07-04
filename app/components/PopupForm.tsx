"use client";
import {
  Alert,
  AlertIcon,
  Box,
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
  StackDivider,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

const reservedCarSchema = z.object({
  rental_date: z.string().min(1, "you must enter the reservation date"),

  days: z
    .number()
    .int()
    .min(
      1,
      "Days must be at least 1 to indicate the car is reserved for at least one day."
    ),
});

type ReservationData = z.infer<typeof reservedCarSchema>;

interface Reservation {
  rental_date: Date | string;
  end_reservation_date: Date | string;
}

interface Props {
  carId: number;
  clientId?: number;
}
const PopupForm = ({ carId, clientId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reservedCar, setReservedCar] = useState<Reservation[]>([]);
  const [rentedCar, setRentedCar] = useState<Reservation[]>([]);

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const router = useRouter();

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

  const onSubmit = async (data: FieldValues) => {
    const selectedDate = new Date(data.rental_date);
    const now = new Date();

    if (selectedDate < now) {
      const showToast = () =>
        toast({
          title: "you can't reserve car for past date",
          description: "",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      showToast();
      return;
    }

    if (
      !isAvailable(formatDateTime(data.rental_date)) ||
      !isAvailable(end_reservation_date(data.rental_date, data.days)) ||
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
        const result = await axios.post("/apis/reservedCars", {
          ...data,
          rental_date: formatDateTime(data.rental_date),
          end_reservation_date: end_reservation_date(
            data.rental_date,
            data.days
          ),
          clientId: clientId,
          carId: carId,
        });
        if (result) {
          const showToast = () =>
            toast({
              title: "car reserved",
              description: "your reservation has been reserved",
              status: "success",
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

  const isAvailable = (selectedDate: string): boolean => {
    if (reservedCar.length === 0) return true;
    const selectedDateObj = new Date(selectedDate);
    for (var i = 0; i < allBusyTime.length; i++) {
      const reservationDateObj = new Date(allBusyTime[i].rental_date);
      const endReservationDateObj = new Date(
        allBusyTime[i].end_reservation_date
      );
      if (
        selectedDateObj >= reservationDateObj &&
        selectedDateObj < endReservationDateObj
      )
        return false;
    }
    return true;
  };

  return (
    <>
      <Button onClick={onOpen}>reserve</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm your reservation</ModalHeader>
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
              <FormControl>
                <FormLabel>Reservation date</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  {...register("rental_date")}
                />
                {errors.rental_date && (
                  <p className="text-red-500">{errors.rental_date.message}</p>
                )}
              </FormControl>

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

export default PopupForm;
