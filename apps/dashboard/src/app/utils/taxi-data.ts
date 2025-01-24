import { Taxi } from '../models/taxi.model';

export const taxiData: Taxi[] = [
  {
    id: 1,
    userId: 1,
    tripId:1  ,
    from: 'Airport',
    to: 'Hotel',
    time: '10:00 AM',
    date: new Date('2025-03-01'),
    totalPrice: 50,
  },
  {
    id: 2,
    userId: 1,
    tripId:1,
    from: 'Hotel',
    to: 'Beach',
    time: '03:00 PM',
    date: new Date('2025-03-02'),
    totalPrice: 30,
  },
  {
    id: 3,
    userId: 1,
    tripId:2,
    from: 'City Center',
    to: 'Train Station',
    time: '08:00 PM',
    date: new Date('2025-03-03'),
    totalPrice: 20,
  },
];
