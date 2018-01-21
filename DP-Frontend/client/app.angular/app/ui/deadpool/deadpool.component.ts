import {Component} from '@angular/core';

@Component({
  selector: 'deadpool',
  templateUrl: './deadpool.component.html',
  styleUrls: ['./deadpool.component.scss']
})

export class DeadpoolComponent {

  shine: number = 0;
  inter:any;

  ngOnInit(){
    // this.shineFunc();
  }

  shineFunc(){

    this.inter = setInterval(()=>{
      this.shine = Math.floor((Math.random() * 400) + 1);
    },300)

  }

  ngOnDestroy(){
    clearInterval(this.inter);
  }



}
