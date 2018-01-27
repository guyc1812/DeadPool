import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})

export class MarkDownComponent {

  id:string;

  constructor(private route: ActivatedRoute){}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('[mark component]\t\t '+this.id);
  }


}
