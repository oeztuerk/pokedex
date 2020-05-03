import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './pokemon-list/pokemon-list.component';
import { ProductDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonService } from './pokemon.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'pokemons/:pokemon', component: ProductDetailsComponent },
    ])
  ],
 declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductDetailsComponent,
  ],
  bootstrap: [AppComponent],
  providers: [PokemonService]
})
export class AppModule {}