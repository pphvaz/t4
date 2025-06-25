export interface Endereco {
    id?: number;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    codigoPostal: string;
    informacoesAdicionais?: string;
}

export interface Telefone {
    id?: number;
    numero: string;
    ddd: string;
}

export interface Cliente {
    id?: number;
    nome: string;
    nomeSocial?: string;
    email: string;
    endereco: Endereco;
    telefones: Telefone[];
}

export interface ClienteFormData {
    nome: string;
    nomeSocial?: string;
    email: string;
    endereco: Endereco;
    telefones: Telefone[];
} 