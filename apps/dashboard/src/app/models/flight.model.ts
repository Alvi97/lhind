export interface Flight{
  id:number;
  userId:1;
  tripId:number;
  name: string;
  from: string;
  to:string;
  departureTime:string;
  departureDate: Date;
  arrivalTime:string;
  arrivalDate: Date;
  totalPrice: number;
}

export class FlightData {
  public id: number;
  public tripId:number
  public userId: number;
  public name: string;
  public from: string;
  public to: string;
  public departureTime: string;
  public departureDate: Date;
  public arrivalTime: string;
  public arrivalDate: Date;
  public totalPrice: number;

  public constructor() {
    this.id = 0;
    this.userId = 1;
    this.tripId = 2;
    this.name = '';
    this.from = '';
    this.to = '';
    this.departureTime = '';
    this.departureDate = new Date();
    this.arrivalTime = '';
    this.arrivalDate = new Date();
    this.totalPrice = 0;
  }
}
