export interface Hotel{
  id:number;
  userId:1;
  name: string;
  location: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
}

export class HotelData {
  public id: number;
  public userId: number;
  public name: string;
  public location: string;
  public checkIn: Date;
  public checkOut: Date;
  public totalPrice: number;

  public constructor() {
    this.id = 0;
    this.userId = 1;
    this.name = '';
    this.location = '';
    this.checkIn = new Date();
    this.checkOut = new Date();
    this.totalPrice = 0;
  }
}
