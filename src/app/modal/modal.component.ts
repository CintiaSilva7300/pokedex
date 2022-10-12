import { Pokemons } from './../models/poke';
import { PokeService } from './../service/poke.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() termoPesquisa: any = '';

  pokemons: any;
  pokeFiltrados: any;

  constructor(private pokeService: PokeService) {
    this.getter();
  }

  ngOnInit(): void {
  }

  getter() {
    this.pokeService.getPokemons().subscribe(
      (data: Pokemons) => {
        this.pokemons = data;
        this.pokemons = this.pokemons;
        console.log("A variavel que preenchemos ", this.pokemons);
      }
    )
  }

  filtrarNome() {
    if (this.termoPesquisa.length > 2) { //filtrar apartir do segundo digito
      this.pokemons = this.pokemons.filter((m: any) => m.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase()))
    }else {
      this.pokeService.getPokemons().subscribe((pokemons: Pokemons[]) => {
        this.pokemons = pokemons;
      })
    }
  }

  // pegarPorId(id: any){
  //   this.pokeFiltrados = this.pokemons.filter((p: any) => p.Pokemons == id)
  //   console.log("Itens selecionados ", this.pokeFiltrados)
  // }
}
