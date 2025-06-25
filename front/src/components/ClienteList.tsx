import React from 'react';
import { Cliente } from '../types/Cliente';

interface ClienteListProps {
    clientes: Cliente[];
    onEdit: (cliente: Cliente) => void;
    onDelete: (id: number) => void;
    onViewDetails: (id: number) => void;
}

export const ClienteList: React.FC<ClienteListProps> = ({ clientes, onEdit, onDelete, onViewDetails }) => {
    const formatEndereco = (cliente: Cliente) => {
        if (cliente.endereco) {
            return `${cliente.endereco.rua}, ${cliente.endereco.numero} - ${cliente.endereco.cidade}`;
        }
        return 'Não informado';
    };

    return (
        <div>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Nome</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Telefones</th>
                        <th className="border border-gray-300 px-4 py-2">Endereço</th>
                        <th className="border border-gray-300 px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="border border-gray-300 px-4 py-2 text-center">
                                Nenhum cliente encontrado
                            </td>
                        </tr>
                    ) : (
                        clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td className="border border-gray-300 px-4 py-2">{cliente.nome}</td>
                                <td className="border border-gray-300 px-4 py-2">{cliente.email}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {cliente.telefones && cliente.telefones.length > 0 
                                        ? cliente.telefones.map(tel => `(${tel.ddd}) ${tel.numero}`).join(', ')
                                        : 'Não informado'
                                    }
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {formatEndereco(cliente)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => onViewDetails(cliente.id!)}
                                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Ver Detalhes
                                    </button>
                                    <button
                                        onClick={() => onEdit(cliente)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => onDelete(cliente.id!)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}; 