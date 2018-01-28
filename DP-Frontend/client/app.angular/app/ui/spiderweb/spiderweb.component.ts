import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'spiderWeb',
  templateUrl: './spiderweb.component.html',
  styleUrls: ['./spiderweb.component.css']
})

export class SpiderWebComponent {

  spiderShow:boolean;
  scrollStatus:string = 'void';

  constructor(){
    this.spiderShow = false;
  }

  ngOnInit(){
    setTimeout(()=>this.spiderShow=true,2000);
  }


  @HostListener('mousewheel', ['$event'])
  onWheel(e) {
    console.log(e.deltaY);
    if(e.deltaY>30){
      this.scrollStatus = 'scrollDown';
    }else if(e.deltaY<-30){
      this.scrollStatus = 'scrollUp'
    }
    setTimeout(()=>{
      this.scrollStatus = 'void';
      console.log(this.scrollStatus);
    },300);
  }




}
