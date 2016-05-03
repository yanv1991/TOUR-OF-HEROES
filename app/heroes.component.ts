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

	isHeroFormVisible: boolean;
	powers = ['Really Smart', 'Super Flexible',
		'Super Hot', 'Weather Changer'];
	submitted = false;
	hero = new Hero("", "Really Smart");

	constructor(private _router: Router, private _heroService: HeroService) {
	}

	getHeroes() {
		this._heroService.getHeroes()
							.subscribe(
							heroes => this.heroes = heroes,
							error => this.errorMessage = <any>error);
	}

	ngOnInit() {
		this.isHeroFormVisible = false;
		this.getHeroes();
	}

	onSelect(hero: Hero) { 
		this.selectedHero = hero; 
	}

	gotoDetail() {
		this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
	}

	showHeroForm() {
		this.isHeroFormVisible = true;
	}

	hideHeroForm() {
		this.isHeroFormVisible = false;
	}

	/* Hero form */
	addHero() {
		if (!this.hero) {
			return;
		}
		this._heroService.addHero(this.hero);
	}

	// TODO: Remove this when we're done
	get diagnostic() { return JSON.stringify(this.hero); }

}
 
