import React, { useState, useEffect } from 'react';
import { Cliente } from '../types/Cliente';
import { clienteService } from '../services/clienteService';

interface ClienteDetailProps {
    clienteId: number;
    onBack: () => void;
}

export const ClienteDetail: React.FC<ClienteDetailProps> = ({ clienteId, onBack }) => {
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCliente = async () => {
            setLoading(true);
            const data = await clienteService.getById(clienteId);
            setCliente(data);
            setLoading(false);
        };

        loadCliente();
    }, [clienteId]);

    if (loading) {
        return (
            <div className="text-center py-8">
                <p>Carregando dados do cliente...</p>
            </div>
        );
    }

    if (!cliente) {
        return (
            <div className="text-center py-8">
                <p>Cliente não encontrado</p>
                <button
                    onClick={onBack}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                    Voltar
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Detalhes do Cliente</h2>
                <button
                    onClick={onBack}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Voltar à Lista
                </button>
            </div>

            <div className="bg-white border border-gray-300 rounded p-6">
                <h3 className="text-xl font-semibold mb-4">Informações Pessoais</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="font-medium">Nome:</label>
                        <p className="border border-gray-300 px-3 py-2 rounded bg-gray-50">
                            {cliente.nome}
                        </p>
                    </div>
                    <div>
                        <label className="font-medium">Email:</label>
                        <p className="border border-gray-300 px-3 py-2 rounded bg-gray-50">
                            {cliente.email}
                        </p>
                    </div>
                    {cliente.nomeSocial && (
                        <div>
                            <label className="font-medium">Nome Social:</label>
                            <p className="border border-gray-300 px-3 py-2 rounded bg-gray-50">
                                {cliente.nomeSocial}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {cliente.endereco && (
                <div className="bg-white border border-gray-300 rounded p-6">
                    <h3 className="text-xl font-semibold mb-4">Endereço</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="font-medium">Estado:</label>
                            <p className="border border-gray-300 px-3 py-2 rounded bg-gray-50">
                                {cliente.endereco.estado}
                            </p>
                        </div>
                        <div>
                            <label className="font-medium">Cidade:</label>
                            <p className="border border-gray-300 px-3 py-2 rounded bg-gray-50">
                                {cliente.endereco.cidade}
                            </p>
                        </div>
                        <div>
                            <label className="font-medium">Bairro:</label>
                            <p className="border border-gray-300 px-3 py-2 rounded bg-gray-50">
                                {cliente.endereco.bairro}
                            </p>
                        </div>
                        <div>
                            <label className="font-medium">Rua:</label>
                            <p className="border border-gray-300 px-3 py-2 rounded bg-gray-50">
                                {cliente.endereco.rua}
                            </p>
                        </div>
                        <div>
                            <label className="font-medium">Número:</label>
                            <p className="border border-gray-300 px-3 py-2 rounded bg-gray-50">
                                {cliente.endereco.numero}
                            </p>
                        </div>
                        <div>
                            <label className="font-medium">CEP:</label>
                            <p className="border border-gray-300 px-3 py-2 rounded bg-gray-50">
                                {cliente.endereco.codigoPostal}
                            </p>
                        </div>
                        {cliente.endereco.informacoesAdicionais && (
                            <div className="col-span-2">
                                <label className="font-medium">Informações Adicionais:</label>
                                <p className="border border-gray-300 px-3 py-2 rounded bg-gray-50">
                                    {cliente.endereco.informacoesAdicionais}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {cliente.telefones && cliente.telefones.length > 0 && (
                <div className="bg-white border border-gray-300 rounded p-6">
                    <h3 className="text-xl font-semibold mb-4">Telefones</h3>
                    <div className="space-y-2">
                        {cliente.telefones.map((telefone, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex-1">
                                    <label className="font-medium">DDD:</label>
                                    <p className="border border-gray-300 px-3 py-2 rounded bg-gray-50">
                                        {telefone.ddd}
                                    </p>
                                </div>
                                <div className="flex-1">
                                    <label className="font-medium">Número:</label>
                                    <p className="border border-gray-300 px-3 py-2 rounded bg-gray-50">
                                        {telefone.numero}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}; 