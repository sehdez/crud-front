export interface Clientes {
    data: Data;
}

export interface Data {
    clientesTotales: number;
    clientes:        Cliente[];
}

export interface Cliente {
    nombres:         string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    domicilio:       string;
    email:           string;
    id:              string;
}
