import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {


  async excecuteSeed() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`);
    const data = await response.json() as PokeResponse;

    const extractedData = data.results.map(result => {
      const id = this.extractIdFromUrl(result.url);
      return { name: result.name, id: id };
    });

    return extractedData;
  }

  private extractIdFromUrl(url: string): number {
    const parts = url.split('/');
    // console.log(parts[parts.length - 2]); // El ID está antes del último '/' - Ejemplo: "url": "https://pokeapi.co/api/v2/pokemon/1/"
    
    return parseInt(parts[parts.length - 2], 10); 
  }


}
