"use client";
import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ReactNode, use } from "react";
import { FaCar } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import { BiGitPullRequest } from "react-icons/bi";
import { ImUsers } from "react-icons/im";

interface StatsCardProps {
  title: string;
  stat: string;
  link: string;
  icon: ReactNode;
}

function StatsCard(props: StatsCardProps) {
  const { title, stat, icon, link } = props;
  const router = useRouter();
  function handleClick(link: string): void {
    router.push(link);
  }

  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.100", "gray.500")}
      rounded={"lg"}
      cursor={"pointer"}
      onClick={() => handleClick(link)}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics({ use_for }: { use_for: string }) {
  // const user = UseCurrentUser();

  const { colorMode, toggleColorMode } = useColorMode();
  const color = colorMode === "dark" ? "blue.500" : "red.500";
  const adminLinks = [
    {
      title: "Cars",
      link: "/admin/cars",
      icon: <FaCar size={"3em"} className="text-red-500" />,
    },
    {
      title: "Requests",
      link: "/admin/requests",
      icon: <BiGitPullRequest size={"3em"} className="text-blue-500 " />,
    },
    {
      title: "Users",
      link: "/admin/users",
      icon: <ImUsers size={"3em"} className=" text-green-500" />,
    },
  ];

  const rentalLinks = [
    {
      title: "Cars",
      link: "/rental/cars",
      icon: <FaCar size={"3em"} className="text-red-500" />,
    },
    {
      title: "Requests",
      link: "/rental/requests",
      icon: <BiGitPullRequest size={"3em"} className="text-blue-500 " />,
    },
    {
      title: "Add car",
      link: "/rental/cars/new",
      icon: <CgAdd size={"3em"} className=" text-green-500" />,
    },
  ];
  // if (user)
  return (
    <div className=" md:mx-16 mx-2">
      <Box maxW="1/3" mx={"auto"} pt={5}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 5, lg: 8 }}>
          {(use_for == "rental" ? rentalLinks : adminLinks).map((link) => (
            <StatsCard
              title={link.title}
              stat={"5,000"}
              icon={link.icon}
              link={link.link}
            />
          ))}
        </SimpleGrid>
      </Box>
    </div>
  );
}
