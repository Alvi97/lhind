import { CarRental } from '../models/car-rental.model';

export const carRental: CarRental[] = [{
  id:1,
  userId:1,
  name: 'Toyota Corolla',
  pickUpDateTime: new Date('2025-01-30T10:00:00'),
  dropOffDateTime: new Date('2025-02-02T15:00:00'),
  pickUpLocation: 'Los Angeles International Airport',
  dropOffLocation: 'San Francisco Downtown',
  totalPrice: 300.0,
},{
  id:2,
  userId:1,
  name: 'Toyota ',
  pickUpDateTime: new Date('2025-01-30T10:00:00'),
  dropOffDateTime: new Date('2025-02-02T15:00:00'),
  pickUpLocation: 'Los Angeles International Airport',
  dropOffLocation: 'San Francisco Downtown',
  totalPrice: 300.0,
},
{
  id:3,
  userId:1,
  name: 'BMW',
  pickUpDateTime: new Date('2025-01-30T10:00:00'),
  dropOffDateTime: new Date('2025-02-02T15:00:00'),
  pickUpLocation: 'Los Angeles International Airport',
  dropOffLocation: 'San Francisco Downtown',
  totalPrice: 300.0,
}];