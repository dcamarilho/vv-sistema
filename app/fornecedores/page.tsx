'use client'

import { useState } from 'react'
import DashboardLayout from '../dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFornecedores, Fornecedor } from '@/hooks/useFornecedores'

export default function Fornecedores() {
  const { fornecedores, adicionarFornecedor, atualizarFornecedor, removerFornecedor } = useFornecedores();
  const [novoFornecedor, setNovoFornecedor] = useState<Omit<Fornecedor, 'id'>>({ 
    nome: '', 
    cnpj: '', 
    email: '', 
    telefone: '', 
    categoria: '' 
  });
  const [busca, setBusca] = useState('');

  const handleAdicionarFornecedor = () => {
    adicionarFornecedor(novoFornecedor);
    setNovoFornecedor({ nome: '', cnpj: '', email: '', telefone: '', categoria: '' });
  };

  const fornecedoresFiltrados = fornecedores.filter(fornecedor => 
    fornecedor.nome.toLowerCase().includes(busca.toLowerCase()) ||
    fornecedor.cnpj.includes(busca)
  );

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Gestão de Fornecedores</h1>
      <Card className="p-6">
        <div className="mb-4">
          <Input 
            placeholder="Buscar fornecedor" 
            className="w-full mb-2" 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Input 
              placeholder="Nome" 
              value={novoFornecedor.nome}
              onChange={(e) => setNovoFornecedor({...novoFornecedor, nome: e.target.value})}
            />
            <Input 
              placeholder="CNPJ" 
              value={novoFornecedor.cnpj}
              onChange={(e) => setNovoFornecedor({...novoFornecedor, cnpj: e.target.value})}
            />
            <Input 
              placeholder="Email" 
              value={novoFornecedor.email}
              onChange={(e) => setNovoFornecedor({...novoFornecedor, email: e.target.value})}
            />
            <Input 
              placeholder="Telefone" 
              value={novoFornecedor.telefone}
              onChange={(e) => setNovoFornecedor({...novoFornecedor, telefone: e.target.value})}
            />
            <Input 
              placeholder="Categoria" 
              value={novoFornecedor.categoria}
              onChange={(e) => setNovoFornecedor({...novoFornecedor, categoria: e.target.value})}
            />
            <Button onClick={handleAdicionarFornecedor}>Adicionar Fornecedor</Button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Nome</th>
              <th className="text-left">CNPJ</th>
              <th className="text-left">Email</th>
              <th className="text-left">Telefone</th>
              <th className="text-left">Categoria</th>
              <th className="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {fornecedoresFiltrados.map((fornecedor) => (
              <tr key={fornecedor.id}>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.cnpj}</td>
                <td>{fornecedor.email}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.categoria}</td>
                <td>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-2"
                    onClick={() => {
                      const novaCategoria = prompt('Nova categoria:', fornecedor.categoria);
                      if (novaCategoria) {
                        atualizarFornecedor(fornecedor.id, { categoria: novaCategoria });
                      }
                    }}
                  >
                    Editar Categoria
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removerFornecedor(fornecedor.id)}
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

