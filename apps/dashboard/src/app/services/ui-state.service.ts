import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  constructor() { }

  private closePanelSubject = new Subject<void>();
  closePanel$ = this.closePanelSubject.asObservable();

  public triggerClosePanel(): void {
    this.closePanelSubject.next();
  }

}
