import { Component, OnInit } from '@angular/core';
import { PokemonService  } from '../pokemon.service';
import { RestService  } from '../rest.service';
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class ProductListComponent implements OnInit {
  //Private variable
  //Lazy loading should be implemented for such a huge request count (not requested in the task)
  private url = 'https://pokeapi.co/api/v2/pokemon?limit=964'; 
  //Global variables
  loaded: boolean;
  pokemons: any[];
  
  constructor(private pokemonService: PokemonService, private restService: RestService) {}

  ngOnInit() {
    this.initPokemonList();
  }

  /*
  * Initialize pokemon list 
  */
  async initPokemonList(){
    new Promise(resolve => {
      this.restService.getData(this.url).subscribe((data: any[]) => {
        this.pokemons = data['results']; //Save pokemon object to pokemons variable
        resolve();//Notifies data loaded so loading spinner can disappear
        this.loaded = true;
      });
    });
  }

  /*
  * Triggers event to set pokemon name
  */
  selectPokemon(name: string) {
    this.pokemonService.selectPokemon(name);
  }
}
