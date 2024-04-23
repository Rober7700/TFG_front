export class Prenda {
    id: number;
    tipo: TipoPrenda;
    talla: string;
    color: string;
    descripcion: string;
    precio: number;
    fotos: string[];
    vendido: boolean;
    createAt: string;
}

export enum TipoPrenda {
    ROPA, ZAPATO, JOYA, BOLSO, CINTURON
  }