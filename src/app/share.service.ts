import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private buttonClickSubject = new Subject<void>();

  buttonClicked$ = this.buttonClickSubject.asObservable();

  notifyButtonClick() {
    this.buttonClickSubject.next();
  }
}

