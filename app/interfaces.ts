
export interface User {
    id: number;
    name: string;
    phoneNumber: string;
    password: string;
    status: 'NOT_VERIFIED' | 'VERIFIED';
    image_url: string;
    permis: string;
    identity: string;
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
  }
  
  export interface Car {
    id: number;
    model: string;
    brand: string;
    gearBox: 'auto' | 'manual';
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
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
  }
  
  export interface Rental {
    id: number;
    days: number;
    status: string;
    userId: number;
    carId: number;
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
    user: User;
    car: Car;
  }

  export interface Reservation {
    id: number;
    rental_date: string; // ISO 8601 date string
    end_reservation_date: string; // ISO 8601 date string
    days: number;
    status: string;
    userId: number;
    carId: number;
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
    user: User;
    car: Car;
  }