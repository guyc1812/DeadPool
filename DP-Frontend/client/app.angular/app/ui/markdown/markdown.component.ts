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
    codePlace.css("margin-bottom","0");
    this.http.getDoc(this.category, this.id).subscribe(data => {
      let text = data['text'];
      let response = JSON.parse(data['response']);
      if (text === 'error') {
        console.error('get doc error: ' + this.category + '/' + this.id);
      } else if (text === 'ok'&&response!==null) {
        this.loading = false;
        codePlace.css("margin-bottom","200px");
        codePlace.append(response['content']);
      }else {
        console.error('System Error');
      }
    },error=>{
      this.loading = true;
      console.error('System Error');
    });
  }

}
