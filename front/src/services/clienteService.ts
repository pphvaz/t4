import { Cliente, ClienteFormData } from '../types/Cliente';

const API_URL = 'http://localhost:32831';

export const clienteService = {
    // Método GET para buscar todos os clientes
    async getAll(): Promise<Cliente[]> {
        const response = await fetch(`${API_URL}/cliente/clientes`);
        console.log('GET /cliente/clientes - Status:', response.status);
        const data = await response.json();
        console.log('Dados recebidos:', data);
        return data;
    },

    // Método GET para buscar um cliente por ID
    async getById(id: number): Promise<Cliente> {
        const response = await fetch(`${API_URL}/cliente/${id}`);
        console.log(`GET /cliente/${id} - Status:`, response.status);
        const data = await response.json();
        console.log('Dados recebidos:', data);
        return data;
    },

    // Método POST para criar um novo cliente
    async create(cliente: ClienteFormData): Promise<void> {
        console.log('POST /cliente/cadastrar - Dados enviados:', cliente);
        const response = await fetch(`${API_URL}/cliente/cadastrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
        });
        console.log('POST /cliente/cadastrar - Status:', response.status);
    },

    // Método PUT para atualizar um cliente
    async update(id: number, cliente: ClienteFormData): Promise<void> {
        const clienteComId = { ...cliente, id };
        console.log('PUT /cliente/atualizar - Dados enviados:', clienteComId);
        const response = await fetch(`${API_URL}/cliente/atualizar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteComId),
        });
        console.log('PUT /cliente/atualizar - Status:', response.status);
    },

    // Método DELETE para excluir um cliente
    async delete(id: number): Promise<void> {
        console.log('DELETE /cliente/excluir - ID:', id);
        const response = await fetch(`${API_URL}/cliente/excluir`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        console.log('DELETE /cliente/excluir - Status:', response.status);
    }
}; 