/**
 * Created by rcomadelperier on 02/04/2017.
 */

const Observable = Rx.Observable;

const myObservable = new Observable(observer => {

    observer.next('a');
    observer.next('b');
    observer.next('c');
    observer.next('d');
    observer.error('This is an error');
    observer.complete();

});

myObservable.subscribe(
    item => console.info(item),
    error => console.error(error),
    () => console.log('This is the end')
);