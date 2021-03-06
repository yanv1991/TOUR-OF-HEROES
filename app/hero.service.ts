import {Injectable}     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {Hero}           from './hero';
@Injectable()
export class HeroService {
	constructor(private http: Http) { }
	private _heroesUrl = 'app/heroes.json'; // URL to JSON file
	//private _heroesUrl = 'app/heroes';  // URL to web api
	getHeroes(): Observable<Hero[]> {
		return this.http.get(this._heroesUrl)
			.map(this.extractData)
			.catch(this.handleError);

		/* Promise version
		return this.http.get(this._heroesUrl)
			.toPromise()
			.then(this.extractData)
			.catch(this.handleError);
		*/
	}

	//TODO: temporaly getHero, this should retrieve it from the api
	getHero(id: number) {
		return new Observable(observable => {
            this.http.get(this._heroesUrl)
                .map(response => {
					var heroes: Hero[] = <any> this.extractData(response);
					return heroes.filter(hero => hero.id === id)[0];
                })
                .catch(this.handleError)
                .subscribe(res => {
                    observable.next(res);
                });
        });
	}

	addHero(newHero: Hero): Observable<Hero> {
		let body = JSON.stringify(newHero);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this._heroesUrl, body, options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	private extractData(res: Response) {
		if (res.status < 200 || res.status >= 300) {
			throw new Error('Bad response status: ' + res.status);
		}
		let body = res.json();
		return body.data || {};
	}
	private handleError(error: any) {
		// In a real world app, we might send the error to remote logging infrastructure
		let errMsg = error.message || 'Server error';
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}
}
