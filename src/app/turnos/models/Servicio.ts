import { Doctor } from './Doctor';

export class Servicio {
    constructor(public id: number, public nombre: string, public doctores: Doctor[]) { }
}
