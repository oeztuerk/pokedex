import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PokemonService {
  //private variable name
  private name: string;

  constructor() {}
  //Setter
  selectPokemon(name: string){
    this.name = name;
  }

  //Getter
  getPokemon(){
    return this.name;
  }

}
