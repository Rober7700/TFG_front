export class Prenda {
    id: number;
    tipo: TipoPrenda;
    talla: string;
    color: string;
    descripcion: string;
    precio: number;
    foto: string;
    createAt: string;
}

export enum TipoPrenda {
    ROPA, ZAPATO, JOYA, BOLSO, CINTURON
  }