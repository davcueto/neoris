import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {

  constructor(private http: HttpClient) { }

  public GETListPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`https://bp-pokemons.herokuapp.com/?idAuthor=1`);
  }

  public POSTCrearPokemon(body: any) {
    return this.http.post(`https://bp-pokemons.herokuapp.com/?idAuthor=1`, body);
  }

  public PUTActualizarPokemon(id: any, body: any) {
    return this.http.put(`https://bp-pokemons.herokuapp.com/${id}`, body);
  }

  public DELETEEliminarPokemon(id: any) {
    return this.http.delete(`https://bp-pokemons.herokuapp.com/${id}`);
  }

}
