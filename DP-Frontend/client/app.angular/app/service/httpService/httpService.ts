import {Injectable} from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class HttpService {

  data: any;
  headers: HttpHeaders;

  avengers:any = {

    javaBasic     : "Stark",
    designPattern : "Rogers",
    devOps        : "",
    frontend      : "",

  };

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  }

  // get sider list
  getSiderList(category:string){
    let avenger = this.avengers[`${category}`];
    return this.http.get(`/api/DP/siderList?category=${avenger}`);
  }

  // get doc
  getDoc(category:string,nav:string){
    let avenger = this.avengers[`${category}`];
    return this.http.get(`/api/DP/doc?category=${avenger}&nav=${nav}`);
  }

  // add docs
  postDocs(category:string){
    let avenger = this.avengers[`${category}`];
    let body = `category=${avenger}`;
    return this.http.post(`/api/DP/docs`,body,{headers:this.headers});
  }

  // add doc-Hello
  postDocHello(category:string){
    let avenger = this.avengers[`${category}`];
    let body = `category=${avenger}`;
    return this.http.post(`/api/DP/docHello`,body,{headers:this.headers});
  }

  // update doc
  putDoc(category:string,title:string,path:string,nav:string){
    let avenger = this.avengers[`${category}`];
    return this.http.put(`/api/DP/doc?category=${avenger}&title=${title}&path=${path}&nav=${nav}`,null);
  }

  // update docs
  putDocs(category:string){
    let avenger = this.avengers[`${category}`];
    return this.http.put(`/api/DP/docs?category=${avenger}`,null);
  }

  // add doc-Hello
  putDocHello(category:string){
    let avenger = this.avengers[`${category}`];
    let body = `category=${avenger}`;
    return this.http.put(`/api/DP/docHello`,body,{headers:this.headers});
  }

  // delete doc
  deleteDoc(category:string,nav:string){
    let avenger = this.avengers[`${category}`];
    return this.http.delete(`/api/DP/doc?category=${avenger}&nav=${nav}`,{headers:this.headers});
  }

  // delete docs
  deleteDocs(category:string){
    let avenger = this.avengers[`${category}`];
    return this.http.delete(`/api/DP/doc?category=${avenger}`,{headers:this.headers});
  }

  getRepoInfo(group:string){
    return this.http.get(`/api/${group}/repoInfos`);
  }

}
