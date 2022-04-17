import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {

  nameEvent = new EventEmitter<any>();
  checked = new EventEmitter<any>();
  applicationData = new EventEmitter<any>();
  submitData = new Subject();

  constructor(private httpClient: HttpClient) { }

  // notifyUrl = "https://formspree.io/f/mqknlppk";
  notifyUrl = "https://formspree.io/f/xyyopear";

  getNotify(requestData: string)
  {
    return this.httpClient.post(this.notifyUrl, requestData);
  }
}
