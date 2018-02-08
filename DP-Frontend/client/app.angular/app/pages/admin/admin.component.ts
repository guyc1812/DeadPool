import {Component} from '@angular/core';
import {HttpService} from "../../service/httpService/httpService";

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})

export class AdminComponent {

  repo: string;
  nav: string;

  isAlert: boolean = false;
  isSuccess: boolean = false;
  warningMessages = '';

  constructor(private http: HttpService) {
  }

  update(repo: string) {
    this.http.putDocs(repo).subscribe(data => {
      if (data['text'] === 'ok') {
        this.info('update done.')
      } else if (data['text'] === 'error') {
        this.warn('something error.')
      }
    })
  }

  add(repo: string) {
    this.http.postDocs(repo).subscribe(data => {
      if (data['text'] === 'ok') {
        this.info('update done.')
      } else if (data['text'] === 'error') {
        this.warn('something error.')
      }
    })
  }

  updateSingle() {
    this.http.putDoc(this.repo, this.nav).subscribe(data => {
      if (data['text'] === 'ok') {
        this.info('update done.')
      } else if (data['text'] === 'error') {
        this.warn('something error.')
      }
    })
  }

  info(message: string) {
    this.disappear();
    this.isAlert = false;
    this.isSuccess = true;
    this.warningMessages = message;
    setTimeout(() => {
      this.disappear()
    }, 5000);
  }

  warn(message: string) {
    this.disappear();
    this.isAlert = true;
    this.isSuccess = false;
    this.warningMessages = message;
    setTimeout(() => {
      this.disappear()
    }, 5000);
  }

  disappear() {
    this.isAlert = false;
    this.isSuccess = false;
  }

}
