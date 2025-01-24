import { Observable } from 'rxjs';

export interface ExpenseCard{
  icon:string;
  name:string;
  ident:string;
  expenseData:Observable<any>
}