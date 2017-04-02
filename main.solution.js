/**
 * Created by rcomadelperier on 02/04/2017.
 */

const Observable = Rx.Observable;

const myInput = document.getElementById('myInput');
const myResults = document.getElementById('results');

const http$ = function(input){
    const url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${input}%2C%20fr%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys;`;
    return new Observable(observable => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
                observable.next(JSON.parse(xhr.responseText));
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    });
};

const inputs$ = Observable.fromEvent(myInput, 'keyup')
    .map(ev => ev.target.value)
    //.flatMap(input => http$(input)) switchMap is like a flatMap Latest (remove older requests responses)
    .switchMap(input => http$(input))
    .map(response => response.query.results)
    .map(item => JSON.stringify(item, null, 2));

inputs$.subscribe(
    item => myResults.innerHTML = item,
    error => console.error(error),
    () => console.log('This is the end')
);