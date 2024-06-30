"use client";
import React, { useEffect, useRef, useState } from "react";
import CountDownCard from "./CountDownCard";
import styles from "./CountDownTimer.module.css";

interface Props {
  date: string;
  days: number;
}
const Countdown = ({ date, days }: Props) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const end_reservation_date = (dateTime: string, days: number): Date => {
    const date = new Date(dateTime);
    date.setDate(date.getDate() + days);
    return date;
  };

  const end_date = end_reservation_date(date, days);
  const targetDate = end_date;

  const [countdown, setCountdown] = useState<number[]>([]);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const timeDifference = targetDate.getTime() - now.getTime();

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setCountdown([days, hours, minutes, seconds]);
      } else {
        setCountdown([]);
        clearInterval(intervalId);
      }
    };

    const intervalId = setInterval(updateCountdown, 1000); // Update every second
    updateCountdown(); // Initial call to display countdown immediately

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [targetDate]);

  return (
    // <div className="w-full">
    <div className={styles.countdownContainer}>
      <CountDownCard label="days" number={countdown[0]} />
      <CountDownCard label="hours" number={countdown[1]} />
      <CountDownCard label="minutes" number={countdown[2]} />
      <CountDownCard label="seconds" number={countdown[3]} />
    </div>
    // </div>
  );
};

export default Countdown;

// import React, { useState, useEffect } from "react";

// interface Props {
//   date: string;
//   days: number;
// }
// const Countdown = ({ date, days }: Props) => {
//   const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);

//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
//     const day = String(date.getDate()).padStart(2, "0");
//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");

//     return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
//   };

//   const end_reservation_date = (dateTime: string, days: number): Date => {
//     const date = new Date(dateTime);
//     date.setDate(date.getDate() + days);
//     return date;
//   };

//   const end_date = end_reservation_date(date, 10);
//   const targetDate = end_date;

//   const [countdown, setCountdown] = useState<string>("");

//   useEffect(() => {
//     const updateCountdown = () => {
//       const now = new Date();
//       const timeDifference = targetDate.getTime() - now.getTime();

//       if (timeDifference > 0) {
//         const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//         const hours = Math.floor(
//           (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//         );
//         const minutes = Math.floor(
//           (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
//         );
//         const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

//         setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
//       } else {
//         setCountdown("The countdown has ended.");
//         clearInterval(intervalId);
//       }
//     };

//     const intervalId = setInterval(updateCountdown, 1000); // Update every second
//     updateCountdown(); // Initial call to display countdown immediately

//     return () => clearInterval(intervalId); // Cleanup interval on component unmount
//   }, [targetDate]);

//   return (
//     <div>
//       <h1>Countdown to {targetDate.toDateString()}</h1>
//       <div>{countdown}</div>
//     </div>
//   );
// };

// export default Countdown;
