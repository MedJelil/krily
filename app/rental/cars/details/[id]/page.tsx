// pages/cars/[id].tsx
import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import {
  Box,
  Image,
  Text,
  VStack,
  Container,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

const prisma = new PrismaClient();


const CarDetail = async ({ params }: { params: { id: string } }) => {
  const car = await prisma.car.findUnique({
    where: { id: Number(params.id) },
  });
  if (!car) return;
  return (
    <Container maxW="container.lg" mt={10}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
        <Heading mb={4}>{car.model}</Heading>
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
        <VStack align="start" spacing={4}>
          <Text>Brand: {car.brand}</Text>
          <Text>Color: {car.color}</Text>
          <Text>Year: {car.year}</Text>
          <Text>Daily Price: ${car.daily_price.toFixed(2)}</Text>
          <Text>Gear Box: {car.gearBox}</Text>
          <Text>Fuel: {car.fuel}</Text>
          <Text>Silenders: {car.silenders}</Text>
          <Box>
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
          </Box>
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

export default CarDetail;
