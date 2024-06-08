import {
  Box,
  Image,
  Text,
  VStack,
  Container,
  Heading,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { CarData } from "../rental/cars/edit/[id]/page";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import PopupForm from "./PopupForm";
import RentalPopup from "./RentalPopup";

interface Props {
  car: CarData;
  showed_for: string;
}

const CarDetails = ({ car, showed_for }: Props) => {
  return (
    <Container maxW="container.lg" mt={10}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
        <HStack justifyContent={"space-between"} alignItems={"center"}> 
          <Heading mb={4} alignItems={"center"}>
            <span className="capitalize">{car.model} </span>
          </Heading>
          {showed_for == "rental" && <HStack alignItems={"center"}>
            <EditButton link={`/rental/cars/edit/${car.id}`} />
            <DeleteButton id={car.id} />
          </HStack>}
          {showed_for == "user" && <HStack alignItems={"center"}>
            <PopupForm carId={car.id} />
            <RentalPopup carId={car.id} />
          </HStack>}
        </HStack>
        <Box
          mx="auto"
          width={{ base: "100%", sm: "80%", md: "60%", lg: "50%" }}
          mb={4}
        >
          <Image
            src={car.main_image_url}
            alt={`${car.model} image`}
            objectFit="cover"
            width="100%"
            height="auto"
            borderRadius="lg"
          />
        </Box>
        <VStack align="center" spacing={4}>
          <HStack justifyContent={"space-between"} gap={2}>
            <Text>Brand: {car.brand}</Text>
            <Text>Color: {car.color}</Text>
            <Text>Year: {car.year}</Text>
          </HStack>
          <HStack justifyContent={"space-between"} gap={2}>
            <Text>Daily Price: ${car.daily_price.toFixed(2)}</Text>
            <Text>Gear Box: {car.gearBox}</Text>
            <Text>Fuel: {car.fuel}</Text>
          </HStack>
          <HStack justifyContent={"space-between"} gap={2}>
            <Text>Silenders: {car.silenders}</Text>
           {showed_for == "rental" && <Box>
              Status:{" "}
              <Text
                display={"inline"}
                bg={
                  car.status == "BLOCKED"
                    ? "red"
                    : car.status == "IN_PROGRESS"
                    ? "yellowgreen"
                    : car.status == "NOT_VERIFIED"
                    ? "gray"
                    : "blue"
                }
                borderRadius="lg"
                p={1}
              >
                {car.status}
              </Text>
            </Box>}
          </HStack>
          <SimpleGrid columns={2} spacing={4}>
            {car.image1_url && (
              <Box>
                <Image
                  src={car.image1_url}
                  alt="Image 1"
                  objectFit="cover"
                  width="100%"
                  height="auto"
                />
              </Box>
            )}
            {car.image2_url && (
              <Box>
                <Image
                  src={car.image2_url}
                  alt="Image 2"
                  objectFit="cover"
                  width="100%"
                  height="auto"
                />
              </Box>
            )}
          </SimpleGrid>
        </VStack>
      </Box>
    </Container>
  );
};

export default CarDetails;
