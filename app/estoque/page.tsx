'use client'

import { useState } from 'react'
import DashboardLayout from '../dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEstoque, Produto } from '@/hooks/useEstoque'

export default function Estoque() {
  const { produtos, adicionarProduto, atualizarProduto, removerProduto } = useEstoque();
  const [novoProduto, setNovoProduto] = useState({ nome: '', quantidade: 0, preco: 0 });
  const [busca, setBusca] = useState('');

  const handleAdicionarProduto = () => {
    adicionarProduto(novoProduto);
    setNovoProduto({ nome: '', quantidade: 0, preco: 0 });
  };

  const produtosFiltrados = produtos.filter(produto => 
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Gestão de Estoque</h1>
      <Card className="p-6">
        <div className="mb-4">
          <Input 
            placeholder="Buscar produto" 
            className="w-full mb-2" 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <div className="flex space-x-2 mb-2">
            <Input 
              placeholder="Nome do produto" 
              value={novoProduto.nome}
              onChange={(e) => setNovoProduto({...novoProduto, nome: e.target.value})}
            />
            <Input 
              type="number" 
              placeholder="Quantidade" 
              value={novoProduto.quantidade}
              onChange={(e) => setNovoProduto({...novoProduto, quantidade: parseInt(e.target.value)})}
            />
            <Input 
              type="number" 
              placeholder="Preço" 
              value={novoProduto.preco}
              onChange={(e) => setNovoProduto({...novoProduto, preco: parseFloat(e.target.value)})}
            />
            <Button onClick={handleAdicionarProduto}>Adicionar Produto</Button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Produto</th>
              <th className="text-left">Quantidade</th>
              <th className="text-left">Preço</th>
              <th className="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.quantidade}</td>
                <td>R$ {produto.preco.toFixed(2)}</td>
                <td>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-2"
                    onClick={() => atualizarProduto(produto.id, { quantidade: produto.quantidade + 1 })}
                  >
                    +
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-2"
                    onClick={() => atualizarProduto(produto.id, { quantidade: Math.max(0, produto.quantidade - 1) })}
                  >
                    -
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removerProduto(produto.id)}
                  >
                    Remover
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </DashboardLayout>
  )
}

