export interface Taxi{
  id:number;
  userId:1;
  tripId:number;
  from: string;
  to:string;
  time:string;
  date: Date;
  totalPrice: number;
}

export class TaxiData {
  public id: number;
  public userId: number;
  public tripId:number
  public from: string;
  public to: string;
  public time: string;
  public date: Date;
  public totalPrice: number;

  public constructor() {
    this.id = 0;
    this.userId = 1;
    this.tripId =1;
    this.from = '';
    this.to = '';
    this.time = '';
    this.date = new Date();
    this.totalPrice = 0;
  }
}
