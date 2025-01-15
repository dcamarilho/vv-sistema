import { useState, useEffect } from 'react';

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  tipo: 'Pessoa Física' | 'Pessoa Jurídica';
}

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    // Simula carregamento inicial de clientes
    setClientes([
      { id: '1', nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 99999-9999', tipo: 'Pessoa Física' },
      { id: '2', nome: 'Empresa XYZ', email: 'contato@xyz.com', telefone: '(11) 88888-8888', tipo: 'Pessoa Jurídica' },
      { id: '3', nome: 'Maria Santos', email: 'maria@email.com', telefone: '(11) 77777-7777', tipo: 'Pessoa Física' },
    ]);
  }, []);

  const adicionarCliente = (novoCliente: Omit<Cliente, 'id'>) => {
    setClientes(prev => [...prev, { ...novoCliente, id: Date.now().toString() }]);
  };

  const atualizarCliente = (id: string, dadosAtualizados: Partial<Cliente>) => {
    setClientes(prev => prev.map(cliente => 
      cliente.id === id ? { ...cliente, ...dadosAtualizados } : cliente
    ));
  };

  const removerCliente = (id: string) => {
    setClientes(prev => prev.filter(cliente => cliente.id !== id));
  };

  return { clientes, adicionarCliente, atualizarCliente, removerCliente };
}

