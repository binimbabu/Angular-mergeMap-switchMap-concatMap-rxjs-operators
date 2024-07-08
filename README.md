Mergemap


Mergemap has to retun another observable. In mergemap if we want to return number or string we have to convert into another observable. Mergemap are used when we are handling an asynchronous data.


ofObservable: Observable<number>=of(1,2,3,4);
http: HttpClient = inject(HttpClient);
constructor(){
this.ofObservable.pipe(mergeMap((value:number)=>{
return this.http.get(`https://jsonplaceholder.typicode.com/todos/${value}`);
})).subscribe((result)=>{
console.log("Result", result);
})
}


http api calls will be called 4 times since ofObservable is initallized to ‘of(1,2,3,4)’ (sequence of request in the order 1, 2 , 3, 4). 
Http get is itself an observable so returns observable (sequence in different order of ids 1,2,3,4  depends on the time it takes to complete) in mergeMap.Http get call will resolve the api and pass the observable value to main subscribe. 


Output

Result 
    1. Object
        1. completed: false
        2. id: 1
        3. title: "delectus aut autem"
        4. userId: 1
        5. [[Prototype]]: Object
Result 
    1. Object
        1. completed: false
        2. id: 3
        3. title: "fugiat veniam minus"
        4. userId: 1
        5. [[Prototype]]: Object
Result 
    1. Object
        1. completed: true
        2. id: 4
        3. title: "et porro tempora"
        4. userId: 1
        5. [[Prototype]]: Object
Result 
    1. Object
        1. completed: false
        2. id: 2
        3. title: "quis ut nam facilis et officia qui"
        4. userId: 1

Id is not coming in the order 1,2,3,4 because mereMap will come data sequentially, depends on which api hits first (time taken to execute the api for each ‘value’)that will be coming as api response here the id order in which output came is 1,4,3,2 not the order of ‘ofObservable’ as 1,2 ,3 4.
Mergemap will call the apis and sent the response based on the order of time used to execute each api response.


SwitchMap

switch map will take only latest observable ( or last emitted observable value)  if there are more than one api calls in switchMap. Example is shown below : -


ofObservable: Observable<number>=of(1,2,3,4);
http: HttpClient = inject(HttpClient);
constructor(){
this.ofObservable.pipe(switchMap((value:number)=>{
return this.http.get(`https://jsonplaceholder.typicode.com/todos/${value}`);
})).subscribe((result)=>{
console.log("Result", result);
})
}


Output

Result {userId: 1, id: 4, title: 'et porro tempora', completed: true}


Switchmap works in the way that the first id = 1 api calls come and before it get executed id =2 comes so id = 1 gets cancelled. Meanwhile id=3 api call comes and id=2 api calls doesnt execute. Additionally, id =4 api call comes so id =3 api call gets cancelled and id = 4 executes and hence the output with the result id = 4 api call only comes and gets executed. The execution time executed for each api calls depends on the time used for executing each api calls with different ids.



ConcatMap

concatMap works if the request order is 1,2,3,4 and in this order itself the http calls should be executed then we use concatMap.



ofObservable: Observable<number>=of(1,2,3,4);
http: HttpClient = inject(HttpClient);
constructor(){
this.ofObservable.pipe(concatMap((value:number)=>{
return this.http.get(`https://jsonplaceholder.typicode.com/todos/${value}`);
})).subscribe((result)=>{
console.log("Result", result);
})
}



Output


Result {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
Result {userId: 1, id: 2, title: 'quis ut nam facilis et officia qui', completed: false}
Result {userId: 1, id: 3, title: 'fugiat veniam minus', completed: false}
Result {userId: 1, id: 4, title: 'et porro tempora', completed: true}

 
Since using concatMap the order of id is 1,2,3,4. Hence the output as above. The request sequence will not change as 1,2,3,4 for the response sequence when concatMap is used.
That is id = 1 is executed even if its passed or failed then id =2 is executed then id =3 and then id =4 since the ‘value’ variable used uses the order of request value from ofObservable on the order 1,2,3,4.