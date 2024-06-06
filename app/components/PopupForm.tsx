import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Box
} from "@chakra-ui/react";
import React from "react";

const PopupForm = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Box
            tabIndex={0}
            role="button"
            aria-label="Some box"
            p={5}
            w="120px"
            bg="gray.300"
          >
            click
          </Box>
        </PopoverTrigger>
        <PopoverContent bg="tomato" color="white">
          <PopoverHeader fontWeight="semibold">Customization</PopoverHeader>
          <PopoverArrow bg="pink.500" />
          <PopoverCloseButton bg="purple.500" />
          <PopoverBody>
            Tadaa!! The arrow color and background color is customized. Check
            the props for each component.
            
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PopupForm;
