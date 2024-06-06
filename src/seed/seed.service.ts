import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { FetchAdapter } from 'src/common/adapters/fetch.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http:FetchAdapter) { }

  async excecuteSeed() {
    await this.pokemonModel.deleteMany({});

    const response = await this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=100`);
    const data = await response as PokeResponse;
    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.map(result => {
      let pokemon = { name: result.name, no: this.extractIdFromUrl(result.url) };
      pokemonToInsert.push(pokemon);
    });
    await this.saveData(pokemonToInsert);
    return `Seed excecuted`;
  }

  private extractIdFromUrl(url: string): number {
    const parts = url.split('/');
    // console.log(parts[parts.length - 2]); // El ID está antes del último '/' - Ejemplo: "url": "https://pokeapi.co/api/v2/pokemon/1/"

    return parseInt(parts[parts.length - 2], 10);
  }

  async saveData(data: any) {
    await this.pokemonModel.insertMany(data);
  }

}
