export interface User {
  id: number;
  name: string;
  phoneNumber: string;
  password: string;
  roleId: number;
}
export interface Admin {
  id: number;
  roleId: number;
  user: User;
}
export interface Client {
  id: number;
  user: User;
  status: string;
  image_url: string;
  permis: string;
  identity: string;
  createdAt: string | Date; // ISO 8601 date string
  updatedAt: string | Date; // ISO 8601 date string
}

export interface Rental {
  id: number;
  user: User;
  status: string;
  location: string;
  image_url: string;
  createdAt: string | Date; // ISO 8601 date string
  updatedAt: string | Date; // ISO 8601 date string
}

export interface RentedCar {
  id: number;
  days: number;
  status: string;
  clientId: number;
  carId: number;
  createdAt: string | Date; // ISO 8601 date string
  updatedAt: string | Date; // ISO 8601 date string
  client: Client;
  rental: Rental;
  car: Car;
}

export interface Reservation {
  id: number;
  rental_date: string; // ISO 8601 date string
  end_reservation_date: string; // ISO 8601 date string
  days: number;
  status: string;
  clientId: number;
  carId: number;
  createdAt: string | Date; // ISO 8601 date string
  updatedAt: string | Date; // ISO 8601 date string
  client: Client;
  rental: Rental;
  car: Car;
}

export interface Car {
  id: number;
  model: string;
  brand: string;
  gearBox: "auto" | "manual";
  fuel: string;
  status: string;
  main_image_url: string;
  image1_url: string;
  image2_url: string;
  silenders: number;
  color: string;
  year: number;
  daily_price: number;
  rentalId: number;
  createdAt: string | Date; // ISO 8601 date string
  updatedAt: string | Date; // ISO 8601 date string
  rental: Rental;
}

export interface HistoryInterface {
  id: number;
  rental_date: string | Date; // ISO 8601 date string
  days: number;
  clientId: number;
  carId: number;
  createdAt: string | Date; // ISO 8601 date string
  updatedAt: string | Date; // ISO 8601 date string
  client: Client;
  car: Car;
}

export interface CurrentInterface {
  id: number;
  rental_date: string | Date; // ISO 8601 date string
  days: number;
  clientId: number;
  carId: number;
  createdAt: string | Date; // ISO 8601 date string
  updatedAt: string | Date; // ISO 8601 date string
  client: Client;
  car: Car;
}
