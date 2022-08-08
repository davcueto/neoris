import { Component, OnInit } from '@angular/core';
import { PokemonServiceService } from './services/pokemon-service.service';
import { Pokemon } from './interfaces/pokemon';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  arrayTableHead = [
    {
      text: "Nombre"
    },
    {
      text: "Imagen"
    },
    {
      text: "Ataque"
    },
    {
      text: "Defensa"
    },
    {
      text: "Acciones"
    }
  ];
  arrayTableBody: Pokemon[] = [];
  arrayTableBodyCopy: Pokemon[] = [];
  objNewPokemon = {
    name: "",
    image: "",
    attack: 0,
    defense: 0,
    hp: 250,
    type: "normal",
    idAuthor: 1
  };
  idSelected = -1;
  showNuevoPokemon = false;
  disableBtnSave = true;
  isUpdate = false;
  namesearch = "";

  constructor(
    private service: PokemonServiceService
  ) { }

  ngOnInit(): void {
    this.GetListPokemon();
  }

  GetListPokemon() {
    this.service.GETListPokemon().subscribe({
      next: (response: Pokemon[]) => {
        this.arrayTableBody = response;
        this.arrayTableBodyCopy = response;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        //console.log("complete");
      }
    })
  }

  createPokemon() {
    this.service.POSTCrearPokemon(this.objNewPokemon).subscribe({
      next: (response) => {
        this.GetListPokemon();
        this.resetData();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        //console.log("complete");
      }
    })
  }

  updatePokemon() {
    this.service.PUTActualizarPokemon(this.idSelected, this.objNewPokemon).subscribe({
      next: (response) => {
        this.resetData();
        this.GetListPokemon();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        //console.log("complete");
      }
    })
  }

  handleGuardar() {
    if (this.validFields()) {
      if (this.isUpdate) {
        this.updatePokemon();
      } else {
        this.createPokemon();
      }
    } else {
      alert("Ingresa los campos de texto");
    }
  }

  validFields() {
    let isValid = true;
    if (this.objNewPokemon.name == "" || this.objNewPokemon.image == "") {
      isValid = false;
    }
    return isValid;
  }

  handleNuevoPokemon() {
    this.showNuevoPokemon = !this.showNuevoPokemon;
  }

  handleOnchange(event: any) {
    this.disableBtnSave = this.objNewPokemon.name == "" ? true : false;
  }

  handleEditarPokemon(element: any) {
    this.idSelected = element.id;
    this.objNewPokemon.name = element.name;
    this.objNewPokemon.image = element.image;
    this.objNewPokemon.attack = element.attack;
    this.objNewPokemon.defense = element.defense;
    this.showNuevoPokemon = true;
    this.disableBtnSave = false;
    this.isUpdate = true;
  }

  handleEliminarPokemon(element: any) {
    this.service.DELETEEliminarPokemon(element.id).subscribe({
      next: (response) => {
        this.GetListPokemon();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        //console.log("complete");
      }
    })
  }

  handleCancelar() {
    this.resetData();
  }

  resetData() {
    this.isUpdate = false;
    this.showNuevoPokemon = false;
    this.objNewPokemon.name = "";
    this.objNewPokemon.image = "";
    this.objNewPokemon.attack = 0;
    this.objNewPokemon.defense = 0;
  }

  handleSearch(event: any) {
    var result = this.arrayTableBodyCopy.filter(function(o: any) {
      return Object.keys(o).some(function(k) {
        return o[k].toString().toLowerCase().indexOf(event) != -1;
      })
    });
    this.arrayTableBody = result;
  }

}
