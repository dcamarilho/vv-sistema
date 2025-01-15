import { useState, useEffect } from 'react';

export interface Funcionario {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  dataContratacao: string;
}

export function useFuncionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  useEffect(() => {
    // Simula carregamento inicial de funcionários
    setFuncionarios([
      { id: '1', nome: 'João Silva', cargo: 'Gerente', email: 'joao@empresa.com', telefone: '(11) 1111-1111', dataContratacao: '2022-01-01' },
      { id: '2', nome: 'Maria Santos', cargo: 'Vendedor', email: 'maria@empresa.com', telefone: '(11) 2222-2222', dataContratacao: '2022-02-15' },
      { id: '3', nome: 'Pedro Oliveira', cargo: 'Atendente', email: 'pedro@empresa.com', telefone: '(11) 3333-3333', dataContratacao: '2022-03-30' },
    ]);
  }, []);

  const adicionarFuncionario = (novoFuncionario: Omit<Funcionario, 'id'>) => {
    setFuncionarios(prev => [...prev, { ...novoFuncionario, id: Date.now().toString() }]);
  };

  const atualizarFuncionario = (id: string, dadosAtualizados: Partial<Funcionario>) => {
    setFuncionarios(prev => prev.map(funcionario => 
      funcionario.id === id ? { ...funcionario, ...dadosAtualizados } : funcionario
    ));
  };

  const removerFuncionario = (id: string) => {
    setFuncionarios(prev => prev.filter(funcionario => funcionario.id !== id));
  };

  return { funcionarios, adicionarFuncionario, atualizarFuncionario, removerFuncionario };
}

