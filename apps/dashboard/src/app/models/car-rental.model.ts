export interface CarRental{
  id:number;
  userId:1;
  name: string;
  pickUpDateTime: Date;
  dropOffDateTime: Date;
  pickUpLocation: string;
  dropOffLocation: string;
  totalPrice: number;
}

export class CarRentalData {
  public id:number;
  public userId:number;
  public name: string;
  public pickUpDateTime: Date;
  public dropOffDateTime: Date;
  public pickUpLocation: string;
  public dropOffLocation: string;
  public totalPrice: string;

  public constructor() {
    this.id = 0;
    this.userId = 1;
    this.name = '';
    this.pickUpDateTime = new Date();
    this.dropOffDateTime = new Date();
    this.pickUpLocation = '';
    this.dropOffLocation = '';
    this.totalPrice = '';

  }
}