import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  //Used only in this class
  private speciesUrl: string;
  private evolutionUrl: string;

  //Globally used 
  evolutionLoaded: boolean;
  attributesLoaded: boolean;
  name: string;
  sprite: string;
  url: string;
  evolvesTo: string;
  evolvesFrom: string;
  
  abilities: any[];
  types: any[];
  stats: any[];
  moves: any[];
  order: number;

  constructor(
    private pokemonService: PokemonService,
    private restService: RestService
  ) {}

  async ngOnInit() {
    this.name = this.pokemonService.getPokemon();
    //Gets all attributes of the pokemon
    this.url = 'https://pokeapi.co/api/v2/pokemon/' + this.name;
    //Link to gather possible evolutions
    this.speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/' + this.name;
    //Initialize attributes first, evolution stats next
    await this.initAttributes()
      .then(() => this.initEvolvedFrom())
      .then(() => this.initEvolvedTo());
  }

  /*
  * Declares sprite and attribute variables 
  */
  async initAttributes() {
    new Promise(resolve => {
      this.restService.getData(this.url).subscribe((data: any[]) => {
        this.abilities = data['abilities'];
        this.types = data['types'];
        this.stats = data['stats'];
        this.order = data['order'];
        this.moves = data['moves'];
        this.sprite = data['sprites']['front_default'];
        resolve(); //Notifies upcoming function
        this.attributesLoaded = true; //Notifies data loaded so loading spinner can disappear
        
      });
    });
  }

  async initEvolvedFrom() {
    return new Promise(resolve => {
      this.restService.getData(this.speciesUrl).subscribe((data: any[]) => {
        if (data['evolves_from_species']){ // Null safety for name
          this.evolvesFrom = data['evolves_from_species']['name'];
        }
        this.evolutionUrl = data['evolution_chain']['url'];
        resolve(); //Notifies upcoming function
      });
    });
  }

  async initEvolvedTo() {
    if (this.evolutionUrl) {
      return new Promise(resolve => {
        this.restService.getData(this.evolutionUrl).subscribe((data: any[]) => {
          //Path to gather evolving information
          this.evolvesTo = data['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];
        });
        resolve();
        this.evolutionLoaded = true; //Notifies data loaded so loading spinner can disappear
      });
    }
  }
}
