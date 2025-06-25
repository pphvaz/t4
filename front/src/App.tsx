import React, { useState, useEffect } from 'react';
import { Cliente, ClienteFormData } from './types/Cliente';
import { ClienteList } from './components/ClienteList';
import { ClienteForm } from './components/ClienteForm';
import { ClienteDetail } from './components/ClienteDetail';
import { clienteService } from './services/clienteService';

function App() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [selectedCliente, setSelectedCliente] = useState<Cliente | undefined>();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'list' | 'form' | 'detail'>('list');
    const [selectedClienteId, setSelectedClienteId] = useState<number | null>(null);

    // Função para carregar todos os clientes
    const loadClientes = async () => {
        setLoading(true);
        const data = await clienteService.getAll();
        setClientes(data);
        setLoading(false);
    };

    // Carregar clientes quando a página carrega
    useEffect(() => {
        loadClientes();
    }, []);

    // Função para criar um novo cliente
    const handleCreate = async (data: ClienteFormData) => {
        await clienteService.create(data);
        setIsFormVisible(false);
        setViewMode('list');
        loadClientes(); // Recarregar a lista
    };

    // Função para atualizar um cliente
    const handleUpdate = async (data: ClienteFormData) => {
        if (!selectedCliente) return;
        await clienteService.update(selectedCliente.id!, data);
        setSelectedCliente(undefined);
        setIsFormVisible(false);
        setViewMode('list');
        loadClientes(); // Recarregar a lista
    };

    // Função para excluir um cliente
    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
            await clienteService.delete(id);
            loadClientes(); // Recarregar a lista
        }
    };

    // Função para editar um cliente
    const handleEdit = (cliente: Cliente) => {
        setSelectedCliente(cliente);
        setIsFormVisible(true);
        setViewMode('form');
    };

    // Função para ver detalhes de um cliente
    const handleViewDetails = (id: number) => {
        setSelectedClienteId(id);
        setViewMode('detail');
    };

    // Função para voltar à lista
    const handleBackToList = () => {
        setViewMode('list');
        setSelectedClienteId(null);
        setSelectedCliente(undefined);
        setIsFormVisible(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Sistema de Gerenciamento de Clientes
                    </h1>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    {viewMode === 'detail' && selectedClienteId && (
                        <ClienteDetail
                            clienteId={selectedClienteId}
                            onBack={handleBackToList}
                        />
                    )}

                    {viewMode === 'form' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">
                                {selectedCliente ? 'Editar Cliente' : 'Novo Cliente'}
                            </h2>
                            <ClienteForm
                                cliente={selectedCliente}
                                onSubmit={selectedCliente ? handleUpdate : handleCreate}
                                onCancel={handleBackToList}
                            />
                        </div>
                    )}

                    {viewMode === 'list' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold">Lista de Clientes</h2>
                                <button
                                    onClick={() => {
                                        setIsFormVisible(true);
                                        setViewMode('form');
                                    }}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Novo Cliente
                                </button>
                            </div>

                            {loading ? (
                                <div className="text-center py-8">
                                    <p>Carregando clientes...</p>
                                </div>
                            ) : (
                                <ClienteList
                                    clientes={clientes}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onViewDetails={handleViewDetails}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App; 