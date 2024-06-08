import {
  TableContainer,
  Table,
  Image,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
} from "@chakra-ui/react";
import React from "react";

const RequestRow = () => {
  return (
    <TableContainer>
      <Table variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            <Th>user</Th>
            <Th>car</Th>
            <Th>date</Th>
            <Th>days</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td p={1}>
                <Image
                  borderRadius="full"
                  boxSize="50px"
                  src="https://bit.ly/dan-abramov"
                  alt="Dan Abramov"
                />
                {/* <p>danial</p> */}
            </Td>
            <Td p={1}> corolla 20023 </Td>
            <Td p={1}></Td>
            <Td  p={1}></Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default RequestRow;
