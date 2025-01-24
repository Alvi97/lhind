import { Hotel } from '../models/hotel.model';

export const hotels: Hotel[] = [
  {
    id: 1,
    userId: 1,
    tripId:1,
    name: 'Grand Hotel',
    location: 'Paris',
    checkIn: new Date('2025-03-01'),
    checkOut: new Date('2025-03-05'),
    totalPrice: 800,
  },
  {
    id: 2,
    userId: 1,
    tripId:2,
    name: 'Beach Resort',
    location: 'Maldives',
    checkIn: new Date('2025-03-10'),
    checkOut: new Date('2025-03-15'),
    totalPrice: 2000,
  },
  {
    id: 3,
    userId: 1,
    tripId:3,
    name: 'Mountain Inn',
    location: 'Switzerland',
    checkIn: new Date('2025-03-20'),
    checkOut: new Date('2025-03-25'),
    totalPrice: 1500,
  },
];
