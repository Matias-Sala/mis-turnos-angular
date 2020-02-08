export class TurnoDto {

    constructor(
        public pacienteId: number,
        public usuarioId: number,
        public ordenPrestacion: number,
        public turnoId: number
    ) { }

}
