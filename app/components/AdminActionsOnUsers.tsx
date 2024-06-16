import {
    Wrap,
    WrapItem,
    Button,
    useToast,
    Spinner,
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
  } from "@chakra-ui/react";
  import axios from "axios";
  import { useRouter } from "next/navigation";
  import React, { useRef, useState } from "react";
  
  interface Props {
    id: number;
    user: string;
  }
  
  const AdminActions = ({ id, user }: Props) => {
    const [isVerifing, setVerifing] = useState(false);
    const [isBlocking, setBlockig] = useState(false);
    const router = useRouter();
    const toast = useToast();
    const cancelRef = useRef<HTMLButtonElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const applyAction = async (action: string) => {
      try {
        action == "VERIFIED" ? setVerifing(true) : setBlockig(true);
        const result = await axios.put(`/apis/${user}s/${id}`, { status: action });
        if (result) {
          const showToast = () =>
            toast({
              title: `User ${action} succesfuly.`,
              description: `We've ${action} the car for you.`,
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          showToast();
          router.push("/admin/users");
        }
      } catch (error) {
        setVerifing(false);
        setBlockig(false);
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
          onClose();

        }
      }
    };
  

  
    return (
      <Wrap spacing={4} display={"flex"} alignItems={"center"} justifyContent={"center"}>
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
  