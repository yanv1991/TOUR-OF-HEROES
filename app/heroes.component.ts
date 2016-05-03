import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router-deprecated';

import {Hero} from './hero';
import {HeroService} from './hero.service';
import {HeroDetailComponent} from './hero-detail.component';

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
	styleUrls: ['app/heroes.component.css'],
	directives: [HeroDetailComponent],

})
export class HeroesComponent implements OnInit {
	selectedHero: Hero;
	heroes: Hero[];
	errorMessage: string;

	constructor(private _router: Router, private _heroService: HeroService) {
	}

	getHeroes() {
		this._heroService.getHeroes()
							.subscribe(
							heroes => this.heroes = heroes,
							error => this.errorMessage = <any>error);
	}

	ngOnInit() {
		this.getHeroes();
	}

	onSelect(hero: Hero) { 
		this.selectedHero = hero; 
	}

	gotoDetail() {
		this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
	}

}
 
