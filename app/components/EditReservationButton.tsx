"use client";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Reservation } from "../interfaces";

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

interface Props {
  id: number;
}
const PopupForm = ({ id }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reservedCar, setReservedCar] = useState<Reservation>();
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
    try {
      const result = await axios.put(`/apis/reservedCars/${id}`, {
        ...data,
        rental_date: formatDateTime(data.rental_date),
        end_reservation_date: end_reservation_date(data.rental_date, data.days),
      });
      if (result) {
        const showToast = () =>
          toast({
            title: "reservation updated",
            description: "your reservation has been updated",
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
    // console.log({
    //   ...data,
    //   rental_date: formatDateTime(data.rental_date),
    //   end_reservation_date: end_reservation_date(data.rental_date, data.days)

    // });
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`/apis/reservedCars/${id}`);
        setReservedCar(response.data);
      } catch (err) {
        // setError(err.message);
      }
    };

    fetchCar();
  }, []);

  return (
    <>
      <Button onClick={onOpen} colorScheme="orange">
        Edit
      </Button>

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Reservation date</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  defaultValue={reservedCar?.rental_date.substring(0, 16)}
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
                  defaultValue={reservedCar?.days}
                  {...register("days", { valueAsNumber: true })}
                />
                {errors.days && (
                  <p className="text-red-500">{errors.days.message}</p>
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Edit
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
