import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable, of} from 'rxjs';
import {concatMap, mergeMap, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // ofObservable: Observable<number>=of(1,2,3,4);
  // http: HttpClient = inject(HttpClient);
  // constructor(){
  //   this.ofObservable.pipe(mergeMap((value:number)=>{
  //     return this.http.get(`https://jsonplaceholder.typicode.com/todos/${value}`);
  //   })).subscribe((result)=>{
  //     console.log("Result", result);
  //   })
  // }


  // ofObservable: Observable<number>=of(1,2,3,4);
  // http: HttpClient = inject(HttpClient);
  // constructor(){
  //   this.ofObservable.pipe(switchMap((value:number)=>{
  //     return this.http.get(`https://jsonplaceholder.typicode.com/todos/${value}`);
  //   })).subscribe((result)=>{
  //     console.log("Result", result);
  //   })
  // }


  ofObservable: Observable<number>=of(1,2,3,4);
  http: HttpClient = inject(HttpClient);
  constructor(){
    this.ofObservable.pipe(concatMap((value:number)=>{
      return this.http.get(`https://jsonplaceholder.typicode.com/todos/${value}`);
    })).subscribe((result)=>{
      console.log("Result", result);
    })
  }
}
