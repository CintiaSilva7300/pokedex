import { Pokemons } from './../models/poke';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { API_PATH } from 'src/environments/environment';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeService {
   url = 'http://localhost:3000/pokemon';

  constructor(private http: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

   getPokemons(): Observable<any> {
   return this.http.get<Pokemons[]>(this.url);
  }

  getPokemonsById(id: number): Observable<Pokemons> {
    return this.http.get<Pokemons>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
        )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    return throwError(errorMessage);
  };
}
