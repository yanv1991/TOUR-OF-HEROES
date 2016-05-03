import {Component}        from '@angular/core';
import {JSONP_PROVIDERS}  from '@angular/http';
import {Observable}       from 'rxjs/Observable';
import {WikipediaService} from './wikipedia.service';
import {Subject}          from 'rxjs/Subject';
@Component({
  selector: 'my-wiki',
  template: `
    <h1>Wikipedia Demo</h1>
    <p><i>Fetches after each keystroke</i></p>
    <input #term (keyup)="search(term.value)"/>
    <ul>
      <li *ngFor="let item of items | async">{{item}}</li>
    </ul>
  `,
  providers:[JSONP_PROVIDERS, WikipediaService]
})
/*export class WikiComponent {
  constructor (private _wikipediaService: WikipediaService) {}
  items: Observable<string[]>;
  search (term: string) {
    this.items = this._wikipediaService.search(term);
  }
}*/

/* //Smart search component */
export class WikiComponent {
  constructor(private _wikipediaService: WikipediaService) { }
  private _searchTermStream = new Subject<string>();
  search(term: string) { this._searchTermStream.next(term); }
  items: Observable<string[]> = this._searchTermStream
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap((term: string) => this._wikipediaService.search(term));
}