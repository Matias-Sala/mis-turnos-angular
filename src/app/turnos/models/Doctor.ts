import { Servicio } from './Servicio';

export class Doctor {
    constructor(public id: number, public nombre: string, public servicios: Servicio[]) { }
}
