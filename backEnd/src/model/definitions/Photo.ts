import { IDefault, Inject } from './IDefault';
import * as mongoose from 'mongoose';

export interface IUsuarioPhotos extends IDefault{

    id: string;
    nome?: string;
    photos?: any;
    userID?: string;
    
}

let schema = {
    
    nome: { type: String }, //Nome Completo
    photos: { type: String}, // arry com as fotos do album
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' } 
};


Inject(schema);
export const photosMasterSchema = new mongoose.Schema(schema);
export const photosModel = mongoose.model<IUsuarioPhotos>('Photos', photosMasterSchema, 'photos', false);