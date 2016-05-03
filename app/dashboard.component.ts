import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']

})
export class DashboardComponent implements OnInit {
	heroes: Hero[] = [];
	errorMessage: string;
	constructor(private _router: Router, private _heroService: HeroService) { }
	ngOnInit() {
		this._heroService.getHeroes()
			.subscribe(
			heroes => this.heroes = heroes.slice(1, 5),
			error => this.errorMessage = <any>error);
	}
	gotoDetail(hero: Hero) {
	  let link = ['HeroDetail', { id: hero.id }];
	  this._router.navigate(link);
	}
}

