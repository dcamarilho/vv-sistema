import { useState, useEffect } from 'react';

export interface TransacaoCashback {
  id: string;
  clienteId: string;
  clienteNome: string;
  valor: number;
  data: string;
  status: 'Pendente' | 'Aprovado' | 'Rejeitado';
}

export function useCashback() {
  const [transacoes, setTransacoes] = useState<TransacaoCashback[]>([]);

  useEffect(() => {
    // Simula carregamento inicial de transações de cashback
    setTransacoes([
      { id: '1', clienteId: '1', clienteNome: 'João Silva', valor: 50.00, data: '2023-06-01', status: 'Aprovado' },
      { id: '2', clienteId: '2', clienteNome: 'Empresa XYZ', valor: 100.00, data: '2023-06-02', status: 'Pendente' },
      { id: '3', clienteId: '3', clienteNome: 'Maria Santos', valor: 75.00, data: '2023-06-03', status: 'Aprovado' },
    ]);
  }, []);

  const adicionarTransacao = (novaTransacao: Omit<TransacaoCashback, 'id'>) => {
    setTransacoes(prev => [...prev, { ...novaTransacao, id: Date.now().toString() }]);
  };

  const atualizarTransacao = (id: string, dadosAtualizados: Partial<TransacaoCashback>) => {
    setTransacoes(prev => prev.map(transacao => 
      transacao.id === id ? { ...transacao, ...dadosAtualizados } : transacao
    ));
  };

  const removerTransacao = (id: string) => {
    setTransacoes(prev => prev.filter(transacao => transacao.id !== id));
  };

  return { transacoes, adicionarTransacao, atualizarTransacao, removerTransacao };
}

