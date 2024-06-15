import { Wrap, WrapItem, Button, useToast, Spinner, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

interface Props {
  id: number;
}

const AdminActions = ({ id }: Props) => {
  const [isVerifing, setVerifing] = useState(false);
  const [isBlocking, setBlockig] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const applyAction = async (action: string) => {
    try {
      const result = await axios.put(`/apis/cars/${id}`, { status: action });
      if (result) {
        const showToast = () =>
          toast({
            title: `Car ${action} succesfuly.`,
            description: `We've ${action} the car for you.`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        showToast();
      }
      router.push("/admin/cars");
    } catch (error) {
      if (error) {
        const showToast = () =>
          toast({
            title: "Error",
            description: "unexpected error",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        showToast();
      }
    }
  };

  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Wrap spacing={4} display={"flex"} alignItems={"center"}>
      <WrapItem>

      <>
      <Button
        colorScheme="red"
        onClick={onOpen}
        disabled={isBlocking}
        size={{ base: "sm", md: "md" }}
      >
        {isBlocking ? <Spinner /> : "Block"}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Block
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => applyAction("BLOCKED")}
                ml={3}
                disabled={isBlocking}
              >
                {isBlocking ? <Spinner /> : "Block"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
        {/* <Button
          colorScheme="red"
          size={{ base: "sm", md: "md" }}
          onClick={() => applyAction("BLOCKED")}
        >
          {isBlocking ? <Spinner /> : "Block"}
        </Button> */}
      </WrapItem>
      <WrapItem>
        <Button
          colorScheme="blue"
          size={{ base: "sm", md: "md" }}
          onClick={() => applyAction("VERIFIED")}
        >
          {isVerifing ? <Spinner /> : "Verify"}
        </Button>
      </WrapItem>
    </Wrap>
  );
};

export default AdminActions;
