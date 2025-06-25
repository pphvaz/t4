import React, { useState, useEffect } from 'react';
import { Cliente, ClienteFormData } from '../types/Cliente';

interface ClienteFormProps {
    cliente?: Cliente;
    onSubmit: (data: ClienteFormData) => void;
    onCancel: () => void;
}

export const ClienteForm: React.FC<ClienteFormProps> = ({ cliente, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<ClienteFormData>({
        nome: '',
        email: '',
        endereco: {
            estado: '',
            cidade: '',
            bairro: '',
            rua: '',
            numero: '',
            codigoPostal: ''
        },
        telefones: [{ ddd: '', numero: '' }]
    });

    useEffect(() => {
        if (cliente) {
            setFormData({
                nome: cliente.nome,
                email: cliente.email,
                endereco: cliente.endereco || {
                    estado: '',
                    cidade: '',
                    bairro: '',
                    rua: '',
                    numero: '',
                    codigoPostal: ''
                },
                telefones: cliente.telefones && cliente.telefones.length > 0 
                    ? cliente.telefones 
                    : [{ ddd: '', numero: '' }]
            });
        }
    }, [cliente]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    // Funções para telefones
    const addTelefone = () => {
        setFormData(prev => ({
            ...prev,
            telefones: [...prev.telefones, { ddd: '', numero: '' }]
        }));
    };

    const removeTelefone = (index: number) => {
        if (formData.telefones.length > 1) {
            setFormData(prev => ({
                ...prev,
                telefones: prev.telefones.filter((_, i) => i !== index)
            }));
        }
    };

    const updateTelefone = (index: number, field: 'ddd' | 'numero', value: string) => {
        setFormData(prev => ({
            ...prev,
            telefones: prev.telefones.map((telefone, i) => 
                i === index ? { ...telefone, [field]: value } : telefone
            )
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Pessoais */}
            <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-semibold mb-4">Informações Pessoais</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nome:</label>
                        <input
                            type="text"
                            value={formData.nome}
                            onChange={(e) => setFormData({...formData, nome: e.target.value})}
                            required
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email:</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                    </div>
                </div>
            </div>

            {/* Endereço */}
            <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-semibold mb-4">Endereço</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Estado:</label>
                        <input
                            type="text"
                            value={formData.endereco.estado}
                            onChange={(e) => setFormData({
                                ...formData, 
                                endereco: {...formData.endereco, estado: e.target.value}
                            })}
                            required
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Cidade:</label>
                        <input
                            type="text"
                            value={formData.endereco.cidade}
                            onChange={(e) => setFormData({
                                ...formData, 
                                endereco: {...formData.endereco, cidade: e.target.value}
                            })}
                            required
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Bairro:</label>
                        <input
                            type="text"
                            value={formData.endereco.bairro}
                            onChange={(e) => setFormData({
                                ...formData, 
                                endereco: {...formData.endereco, bairro: e.target.value}
                            })}
                            required
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Rua:</label>
                        <input
                            type="text"
                            value={formData.endereco.rua}
                            onChange={(e) => setFormData({
                                ...formData, 
                                endereco: {...formData.endereco, rua: e.target.value}
                            })}
                            required
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Número:</label>
                        <input
                            type="text"
                            value={formData.endereco.numero}
                            onChange={(e) => setFormData({
                                ...formData, 
                                endereco: {...formData.endereco, numero: e.target.value}
                            })}
                            required
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">CEP:</label>
                        <input
                            type="text"
                            value={formData.endereco.codigoPostal}
                            onChange={(e) => setFormData({
                                ...formData, 
                                endereco: {...formData.endereco, codigoPostal: e.target.value}
                            })}
                            required
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                    </div>
                </div>
            </div>

            {/* Telefones */}
            <div className="bg-gray-50 p-4 rounded">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Telefones</h3>
                    <button
                        type="button"
                        onClick={addTelefone}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                    >
                        + Adicionar Telefone
                    </button>
                </div>
                
                {formData.telefones.map((telefone, index) => (
                    <div key={index} className="border border-gray-300 rounded p-4 mb-4">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium">Telefone {index + 1}</h4>
                            {formData.telefones.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeTelefone(index)}
                                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                                >
                                    Remover
                                </button>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">DDD:</label>
                                <input
                                    type="text"
                                    value={telefone.ddd}
                                    onChange={(e) => updateTelefone(index, 'ddd', e.target.value)}
                                    required
                                    maxLength={2}
                                    className="w-full border border-gray-300 px-3 py-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Número:</label>
                                <input
                                    type="text"
                                    value={telefone.numero}
                                    onChange={(e) => updateTelefone(index, 'numero', e.target.value)}
                                    required
                                    className="w-full border border-gray-300 px-3 py-2 rounded"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botões de ação */}
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    {cliente ? 'Atualizar' : 'Criar'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}; 