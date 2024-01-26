export class StarshipCreateRequestDto {
  public readonly nombre: string;
  public readonly modelo: string;
  public readonly fabricante: string;
  public readonly costoEnCreditos: string;
  public readonly longitud: string;
  public readonly velocidadMaximaAtmosferica: string;
  public readonly tripulacion: string;
  public readonly pasajeros: string;
  public readonly capacidadCarga: string;
  public readonly consumibles: string;
  public readonly indiceDeHipervelocidad: string;
  public readonly MGLT: string;
  public readonly claseDeNave: string;
  public readonly pilotos: string[];
  public readonly peliculas: string[];
  public readonly url: string;

  constructor({
    name,
    modelo,
    fabricante,
    costoEnCreditos,
    longitud,
    velocidadMaximaAtmosferica,
    tripulacion,
    pasajeros,
    capacidadCarga,
    consumibles,
    indiceDeHipervelocidad,
    MGLT,
    claseDeNave,
    pilotos,
    peliculas,
    url
  }: {
    name: string,
    modelo: string,
    fabricante: string,
    costoEnCreditos: string,
    longitud: string,
    velocidadMaximaAtmosferica: string,
    tripulacion: string,
    pasajeros: string,
    capacidadCarga: string,
    consumibles: string,
    indiceDeHipervelocidad: string,
    MGLT: string,
    claseDeNave: string,
    pilotos: string[],
    peliculas: string[],
    url: string
  }) {
    this.nombre = name;
    this.modelo = modelo;
    this.fabricante = fabricante;
    this.costoEnCreditos = costoEnCreditos;
    this.longitud = longitud;
    this.velocidadMaximaAtmosferica = velocidadMaximaAtmosferica;
    this.tripulacion = tripulacion;
    this.pasajeros = pasajeros;
    this.capacidadCarga = capacidadCarga;
    this.consumibles = consumibles;
    this.indiceDeHipervelocidad = indiceDeHipervelocidad;
    this.MGLT = MGLT;
    this.claseDeNave = claseDeNave;
    this.pilotos = pilotos;
    this.peliculas = peliculas;
    this.url = url;
  }

}
