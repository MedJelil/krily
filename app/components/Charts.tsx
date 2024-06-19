"use server"
import { HStack } from '@chakra-ui/react'
import React from 'react'
import FirstChart from './FirstChart'
import SecondChart from './SecondChart'

const Charts = () => {
  return (
    <HStack m={5}>
        <FirstChart />
        
        {/* <SecondChart /> */}
    </HStack>
  )
}

export default Charts