import {
  Box,
  Image,
  Text,
  VStack,
  Container,
  Heading,
  SimpleGrid,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
// import { CarData } from "../rental/cars/edit/[id]/page";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import PopupForm from "./PopupForm";
import RentalPopup from "./RentalPopup";
import AdminActions from "./AdminActions";
import { Car } from "../interfaces";

interface Props {
  car: Car;
  showed_for: string;
  clientId?: number;
}

const statusColors: { [key: string]: string } = {
  BLOCKED: "red",
  IN_PROGRESS: "yellowgreen",
  NOT_VERIFIED: "gray",
  VERIFIED: "blue",
};

const CarDetails = ({ car, showed_for, clientId }: Props) => {
  return (
    <Container maxW="container.lg" mt={10}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <Heading mb={4} alignItems={"center"}>
            <span className="capitalize">
              {car.model} {car.year}
            </span>
          </Heading>
          {showed_for == "rental" && (
            <HStack alignItems={"center"}>
              <EditButton link={`/rental/cars/edit/${car.id}`} />
              <DeleteButton id={car.id} />
            </HStack>
          )}
          {showed_for == "user" && clientId && (
            <HStack alignItems={"center"}>
              <PopupForm carId={car.id} clientId={clientId} />
              <RentalPopup carId={car.id} clientId={clientId} />
            </HStack>
          )}
          {showed_for == "admin" && <AdminActions id={car.id} />}
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
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Attribute</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Brand</Td>
                <Td>{car.brand}</Td>
              </Tr>
              <Tr>
                <Td>Color</Td>
                <Td>{car.color}</Td>
              </Tr>

              <Tr>
                <Td>Gear Box</Td>
                <Td>{car.gearBox}</Td>
              </Tr>
              <Tr>
                <Td>Fuel</Td>
                <Td>{car.fuel}</Td>
              </Tr>
              <Tr>
                <Td>Silenders</Td>
                <Td>{car.silenders}</Td>
              </Tr>
              <Tr>
                <Td>Daily Price</Td>
                <Td>${car.daily_price.toFixed(2)}</Td>
              </Tr>
              {showed_for != "rental" && (
                <>
                  <Tr>
                    <Td>rental</Td>
                    <Td>{car.rental.user.name}</Td>
                  </Tr>
                  <Tr>
                    <Td>rental telephone</Td>
                    <Td>{car.rental.user.phoneNumber}</Td>
                  </Tr>
                  <Tr>
                    <Td>rental location</Td>
                    <Td>{car.rental.location}</Td>
                  </Tr>
                </>
              )}
              {showed_for == "rental" && (
                <Tr>
                  <Td>Status</Td>
                  <Td>
                    <Text
                      display={"inline"}
                      bg={statusColors[car.status]}
                      borderRadius="lg"
                      p={1}
                    >
                      {car.status}
                    </Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
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
