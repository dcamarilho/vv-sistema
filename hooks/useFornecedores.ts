import { useState, useEffect } from 'react';

export interface Fornecedor {
  id: string;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  categoria: string;
}

export function useFornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  useEffect(() => {
    // Simula carregamento inicial de fornecedores
    setFornecedores([
      { id: '1', nome: 'Fornecedor A', cnpj: '00.000.000/0001-00', email: 'fornecedora@email.com', telefone: '(11) 1111-1111', categoria: 'Eletrônicos' },
      { id: '2', nome: 'Fornecedor B', cnpj: '11.111.111/0001-11', email: 'fornecedorb@email.com', telefone: '(22) 2222-2222', categoria: 'Alimentos' },
      { id: '3', nome: 'Fornecedor C', cnpj: '22.222.222/0001-22', email: 'fornecedorc@email.com', telefone: '(33) 3333-3333', categoria: 'Vestuário' },
    ]);
  }, []);

  const adicionarFornecedor = (novoFornecedor: Omit<Fornecedor, 'id'>) => {
    setFornecedores(prev => [...prev, { ...novoFornecedor, id: Date.now().toString() }]);
  };

  const atualizarFornecedor = (id: string, dadosAtualizados: Partial<Fornecedor>) => {
    setFornecedores(prev => prev.map(fornecedor => 
      fornecedor.id === id ? { ...fornecedor, ...dadosAtualizados } : fornecedor
    ));
  };

  const removerFornecedor = (id: string) => {
    setFornecedores(prev => prev.filter(fornecedor => fornecedor.id !== id));
  };

  return { fornecedores, adicionarFornecedor, atualizarFornecedor, removerFornecedor };
}

