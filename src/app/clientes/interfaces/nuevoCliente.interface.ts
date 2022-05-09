export interface NuevoCliente {
    data: Data;
}

export interface Data {
    nombres:         string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    domicilio:       string;
    email:           string;
    id:              string;
}
