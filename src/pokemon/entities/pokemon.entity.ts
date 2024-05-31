import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {
    
    //#region name
    @Prop({
        unique:true,
        index:true
    })
    name: string;
    //#endregion

    //#region no
    @Prop({
        unique:true,
        index:true
    })
    no: number;
    //#endregion
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
