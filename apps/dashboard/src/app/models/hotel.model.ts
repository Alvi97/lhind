export interface Hotel{
  id:number;
  userId:1;
  tripId:number;
  name: string;
  location: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
}

export class HotelData {
  public id: number;
  public userId: number;
  tripId:number;
  public name: string;
  public location: string;
  public checkIn: Date;
  public checkOut: Date;
  public totalPrice: number;

  public constructor() {
    this.id = 0;
    this.userId = 1;
    this.tripId = 2;
    this.name = '';
    this.location = '';
    this.checkIn = new Date();
    this.checkOut = new Date();
    this.totalPrice = 0;
  }
}
