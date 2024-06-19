"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { logout } from "../lib/actions";
import { UseCurrentUser } from "../hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Admin, Client, Rental, User } from "../interfaces";
import { PiSignOutBold } from "react-icons/pi";

const Links = [
  { name: "Cars", link: "/user/cars" },
  { name: "Requests", link: "/user/requests" },
  { name: "History", link: "/user/history" },
];

const NavLink = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => (
  <Box
    px={2}
    py={1}
    rounded={"md"}
    cursor={"pointer"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    onClick={onClick}
  >
    {children}
  </Box>
);

export default function withAction() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = UseCurrentUser();
  const router = useRouter();

  const [user, setUser] = useState<Client>();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/apis/clients/${currentUser?.id}`);
        setUser(response.data); // Axios wraps the response data in a `data` object
      } catch (err) {
        setError("Something went wrong");
      }
    };

    fetchUser();
  }, []);

  const redirect = (link: string) => {
    router.push(link);
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {false && (
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
          )}
          <HStack spacing={8} alignItems={"center"}>
            <>
              <Box>Logo</Box>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((link) => (
                  <NavLink onClick={() => redirect(link.link)} key={link.name}>
                    {link.name}
                  </NavLink>
                ))}
              </HStack>
            </>
          </HStack>
          <Flex alignItems={"center"}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  ml={2}
                  src={
                    user?.image_url ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem rounded={10} onClick={() => router.push(`/profile`)}>
                  Profile
                </MenuItem>
                {user?.status == "VERIFIED" && (
                  <MenuItem rounded={10} bgColor={"#00B5D8"}>
                    Acount verified
                  </MenuItem>
                )}
                {user?.status == "IN_PROGRESS" && (
                  <MenuItem rounded={10} bgColor={"#A0AEC0"}>
                    Under verification...
                  </MenuItem>
                )}
                {user?.status == "BLOCKED" && (
                  <MenuItem rounded={10} bgColor={"#E53E3E"}>
                    Acount blocked
                  </MenuItem>
                )}
                {user?.status == "NOT_VERIFIED" && (
                  <MenuItem rounded={10} bgColor={"#F6E05E"}>
                    Verify your acount
                  </MenuItem>
                )}
                <MenuDivider />
                <form action={logout}>
                  <MenuItem rounded={10} type="submit">
                    Logout
                    <PiSignOutBold />
                  </MenuItem>
                </form>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink onClick={() => redirect(link.link)} key={link.name}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
