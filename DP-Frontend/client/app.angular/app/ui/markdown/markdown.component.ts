import {Component, Input} from '@angular/core';
import {HttpService} from "../../service/httpService/httpService";
import * as $ from 'jquery';

@Component({
  selector: 'markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css'],
})

export class MarkDownComponent {

  @Input()
  category: string;

  @Input()
  id: string;

  loading: boolean;

  constructor(private http: HttpService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.loading = true;
    let codePlace = $('#markdown');
    codePlace.html("");
    this.http.getDoc(this.category, this.id).subscribe(data => {
      let text = data['text'];
      let response = JSON.parse(data['response']);
      if (text === 'error') {
        console.error('get doc error: ' + this.category + '/' + this.id);
      } else if (text === 'ok') {
        this.loading = false;
        codePlace.append(response['content']);
      }
    });
  }

}
