import { CarRental } from '../models/car-rental.model';
import { Flight, FlightData } from '../models/flight.model';

export const flights: FlightData[] = [
  {
    id: 1,
    userId: 1,
    name: 'Flight to New York',
    from: 'London',
    to: 'New York',
    departureTime: '08:00 AM',
    departureDate: new Date('2025-03-01'),
    arrivalTime: '12:00 PM',
    arrivalDate: new Date('2025-03-01'),
    totalPrice: 500,
  },
  {
    id: 2,
    userId: 1,
    name: 'Flight to Paris',
    from: 'Berlin',
    to: 'Paris',
    departureTime: '02:00 PM',
    departureDate: new Date('2025-03-05'),
    arrivalTime: '04:00 PM',
    arrivalDate: new Date('2025-03-05'),
    totalPrice: 150,
  },
  {
    id: 3,
    userId: 1,
    name: 'Flight to Tokyo',
    from: 'San Francisco',
    to: 'Tokyo',
    departureTime: '11:00 PM',
    departureDate: new Date('2025-03-10'),
    arrivalTime: '07:00 AM',
    arrivalDate: new Date('2025-03-11'),
    totalPrice: 1000,
  },
];
