export class Prenda {
    id: number;
    tipo: TipoPrenda;
    talla: string;
    color: string;
    nombre: string;
    descripcion: string;
    precioOriginal: number;
    precioConDescuento: number;
    fotos: string[];
    vendido: boolean;
    escaparate: boolean;
    createAt: string;
}

export enum TipoPrenda {
    BOLSO, CHAQUETA, CINTURON, FALDA, JERSEY, JOYA, PANTALONES, TOP, VESTIDO, ZAPATO
  }