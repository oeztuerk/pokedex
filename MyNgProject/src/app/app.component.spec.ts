  import { TestBed, async, getTestBed,  } from '@angular/core/testing';
  import { AppComponent } from './app.component';
  import {TopBarComponent} from './top-bar/top-bar.component';
  import {PokemonService} from './pokemon.service';

  
  /*
  * Tests if app created successfully and
  * checks for the top bar.
  */
  describe('InitAndRenderTopBar', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          AppComponent
        ],
      }).compileComponents();
    }));

    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy(); 
    });

    it('should render top bar', () => {
      const fixture = TestBed.createComponent(TopBarComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('a h1').textContent).toContain('My Pokedex');
    });

  });
  /*
  * Tests setter and getter methods 
  */
  describe('PokemonService', () => {
    let injector: TestBed;
    let service: PokemonService;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [PokemonService]
      });
      injector = getTestBed();
      service = TestBed.inject(PokemonService);
    });

    it('Check setter and getter', () => {
      service.selectPokemon('bulbasaur');
      expect(service.getPokemon()).toEqual('bulbasaur');
    });

  });
  