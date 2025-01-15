import { useState, useEffect } from 'react';

export interface Estatisticas {
  vendasTotais: number;
  clientesAtivos: number;
  ticketMedio: number;
  produtosMaisVendidos: { nome: string; quantidade: number }[];
}

export function useEstatisticas() {
  const [estatisticas, setEstatisticas] = useState<Estatisticas>({
    vendasTotais: 0,
    clientesAtivos: 0,
    ticketMedio: 0,
    produtosMaisVendidos: [],
  });

  useEffect(() => {
    // Simula carregamento de estatísticas
    setEstatisticas({
      vendasTotais: 150000,
      clientesAtivos: 500,
      ticketMedio: 300,
      produtosMaisVendidos: [
        { nome: 'Produto A', quantidade: 100 },
        { nome: 'Produto B', quantidade: 80 },
        { nome: 'Produto C', quantidade: 60 },
        { nome: 'Produto D', quantidade: 40 },
        { nome: 'Produto E', quantidade: 20 },
      ],
    });
  }, []);

  return estatisticas;
}

