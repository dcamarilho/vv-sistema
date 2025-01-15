import { useState, useEffect } from 'react';

export interface Produto {
  id: string;
  nome: string;
  quantidade: number;
  preco: number;
}

export function useEstoque() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    // Simula carregamento inicial de produtos
    setProdutos([
      { id: '1', nome: 'Produto A', quantidade: 10, preco: 50.00 },
      { id: '2', nome: 'Produto B', quantidade: 15, preco: 30.00 },
      { id: '3', nome: 'Produto C', quantidade: 5, preco: 100.00 },
    ]);
  }, []);

  const adicionarProduto = (novoProduto: Omit<Produto, 'id'>) => {
    setProdutos(prev => [...prev, { ...novoProduto, id: Date.now().toString() }]);
  };

  const atualizarProduto = (id: string, dadosAtualizados: Partial<Produto>) => {
    setProdutos(prev => prev.map(produto => 
      produto.id === id ? { ...produto, ...dadosAtualizados } : produto
    ));
  };

  const removerProduto = (id: string) => {
    setProdutos(prev => prev.filter(produto => produto.id !== id));
  };

  return { produtos, adicionarProduto, atualizarProduto, removerProduto };
}

