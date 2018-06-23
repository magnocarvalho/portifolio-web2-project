import { IDefault, Inject } from './IDefault';
import * as mongoose from 'mongoose';

export interface IUsuarioPhotos extends IDefault{

    id: string;
    nome?: string;
    photos?: any;
    
}

let schema = {
    
    nome: { type: String }, //Nome Completo
    photos: { type: Array} // arry com as fotos do album
    
};


Inject(schema);
export const photosMasterSchema = new mongoose.Schema(schema);
export const photosModel = mongoose.model<IUsuarioPhotos>('Photos', photosMasterSchema, 'photos', false);