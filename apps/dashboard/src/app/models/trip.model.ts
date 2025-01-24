export interface Trip{
  id: number;
  userId:number;
  name: string;
  duration: number;
  setForApproval:false;
  startDate: Date;
  endDate: Date;
}

export class TripData {
  public id:number;
  public userId:number;
  public name: string;
  public duration: string;
  public setForApproval:boolean;
  public startDate: Date;
  public endDate: Date;

  public constructor() {
    this.id = 0;
    this.name = '';
    this.duration = ''
    this.setForApproval=false;
    this.startDate = new Date();
    this.endDate = new Date();
  }
}
