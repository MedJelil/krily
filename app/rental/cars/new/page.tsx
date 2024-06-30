import CarForm from "@/app/components/CarForm";
import { auth } from "@/auth";
import prisma from "@/prisma/client";

const NewCar = async () => {
  const session = await auth();
  const user = session?.user;
  if (user) {
    const rental = await prisma.rental.findUnique({
      where: { userId: Number(user.id) },
      include: {
        user: true,
      },
    });
    if (rental) return <CarForm rentalId={rental.id} />;
  }
};

export default NewCar;
