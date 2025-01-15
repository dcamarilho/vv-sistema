import { useState, useEffect } from 'react';

export interface Pedido {
  id: string;
  clienteNome: string;
  valor: number;
  status: 'Pendente' | 'Em processamento' | 'Enviado' | 'Entregue' | 'Cancelado';
  data: string;
}

export function usePedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    // Simula carregamento inicial de pedidos
    setPedidos([
      { id: '1', clienteNome: 'João Silva', valor: 150.00, status: 'Pendente', data: '2023-06-01' },
      { id: '2', clienteNome: 'Maria Santos', valor: 200.00, status: 'Em processamento', data: '2023-06-02' },
      { id: '3', clienteNome: 'Pedro Oliveira', valor: 100.00, status: 'Enviado', data: '2023-06-03' },
    ]);
  }, []);

  const adicionarPedido = (novoPedido: Omit<Pedido, 'id'>) => {
    setPedidos(prev => [...prev, { ...novoPedido, id: Date.now().toString() }]);
  };

  const atualizarPedido = (id: string, dadosAtualizados: Partial<Pedido>) => {
    setPedidos(prev => prev.map(pedido => 
      pedido.id === id ? { ...pedido, ...dadosAtualizados } : pedido
    ));
  };

  const removerPedido = (id: string) => {
    setPedidos(prev => prev.filter(pedido => pedido.id !== id));
  };

  return { pedidos, adicionarPedido, atualizarPedido, removerPedido };
}

