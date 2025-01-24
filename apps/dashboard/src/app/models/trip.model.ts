import { FinanceStatus, TripStatus } from '../utils/trip-data';

export interface Trip{
  id: number;
  userId:number;
  name: string;
  duration: number;
  setForApproval:false;
  startDate: Date;
  endDate: Date;
  note:string;
  status:TripStatus,
  financeStatus:FinanceStatus
}

export class TripData {
  public id:number;
  public userId:number;
  public name: string;
  public duration: string;
  public setForApproval:boolean;
  public startDate: Date;
  public endDate: Date;
  public note:string
  public status:string;
  public financeStatus:string

  public constructor() {
    this.id = 0;
    this.userId = 1;
    this.name = '';
    this.duration = ''
    this.setForApproval=false;
    this.startDate = new Date();
    this.endDate = new Date();
    this.note = ''
    this.status=''
    this.financeStatus=''
  }
}
