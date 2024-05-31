// pages/cars.tsx
// "use client"
// import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';
import {
  Box,
  Image,
  SimpleGrid,
  Text,
  VStack,
  Container,
} from '@chakra-ui/react';
import Link from 'next/link';


const prisma = new PrismaClient();

const Cars = async () => {
    const cars = await prisma.car.findMany();
    return (
      <Container maxW="container.xl" mt={10}>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
          {cars.map((car) => (
            <Link key={car.id} href={`/rental/cars/details/${car.id}`}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                cursor="pointer"
                _hover={{ boxShadow: 'lg' }}
              >
                <Box width="100%" height="auto">
                  <Image
                    src={car.main_image_url}
                    alt={`${car.model} image`}
                    objectFit="cover"
                    width="100%"
                    height="auto"
                    borderRadius="lg"
                  />
                </Box>
                <VStack mt={4} align="start">
                  <Text fontWeight="bold" fontSize="xl">{car.model}</Text>
                  <Text>Brand: {car.brand}</Text>
                  <Text>Gear: {car.gearBox}</Text>
                  <Text>Year: {car.year}</Text>
                  <Text>Daily Price: ${car.daily_price.toFixed(2)}</Text>
                </VStack>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    );
};

export default Cars;
