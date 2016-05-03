import { Component, OnInit } from '@angular/core';
import {HeroService} from './hero.service';
import {Hero} from './hero';
@Component({
  selector: 'little-tour',
  templateUrl: 'app/add-hero.component.html' 
})
export class AddHeroComponent {
	powers = ['Really Smart', 'Super Flexible',
		'Super Hot', 'Weather Changer'];
	submitted = false;
	hero = new Hero("");

	constructor(private _heroService: HeroService) {}
	addHero() {
		if (!this.hero) {
			return;
		}
		this._heroService.addHero(this.hero);
	}

	// TODO: Remove this when we're done
	get diagnostic() { return JSON.stringify(this.hero); }
}