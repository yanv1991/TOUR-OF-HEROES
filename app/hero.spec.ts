import { Hero } from './hero';
describe('Hero', () => {
  it('has name', () => {
  	let hero = new Hero('Super Cat', 'Really Smart', 1);
    expect(hero.name).toEqual('Super Cat');
  });
  it('has id', () => {
	let hero = new Hero('Super Cat', 'Really Smart', 1);
    expect(hero.id).toEqual(1);
  });
});
