import {Component, Input, ViewEncapsulation} from '@angular/core';

import * as $ from 'jquery';
import {HttpService} from "../../service/httpService/httpService";


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

  constructor(private http: HttpService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.http.getDoc(this.category, this.id).subscribe(data => {
      let res = JSON.parse(data['response']);
      let codePlace = $('#markdown');
      codePlace.html("");
      codePlace.append(res['content']);
    });
  }

}
