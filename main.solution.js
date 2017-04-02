/**
 * Created by rcomadelperier on 02/04/2017.
 */

const Observable = Rx.Observable;

const myObservable1 = new Observable(observer => {

    observer.next(20);
    observer.next(40);
    observer.next(60);
    observer.next(80);
    observer.next(100);
    observer.complete();

});

const myObservable2 = new Observable(observer => {

    observer.next(1);
    observer.next(1);
    observer.complete();

});

const myMergedObservable = Observable.merge(myObservable1, myObservable2).filter(x => x > 50);

myMergedObservable.subscribe(
    item => console.info(item),
    error => console.error(error),
    () => console.log('This is the end')
);