'use client'

import { useState } from 'react'
import DashboardLayout from '../dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useClientes, Cliente } from '@/hooks/useClientes'

export default function Clientes() {
  const { clientes, adicionarCliente, atualizarCliente, removerCliente } = useClientes();
  const [novoCliente, setNovoCliente] = useState<Omit<Cliente, 'id'>>({ 
    nome: '', 
    email: '', 
    telefone: '', 
    tipo: 'Pessoa Física' 
  });
  const [busca, setBusca] = useState('');

  const handleAdicionarCliente = () => {
    adicionarCliente(novoCliente);
    setNovoCliente({ nome: '', email: '', telefone: '', tipo: 'Pessoa Física' });
  };

  const clientesFiltrados = clientes.filter(cliente => 
    cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
    cliente.email.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Gestão de Clientes</h1>
      <Card className="p-6">
        <div className="mb-4">
          <Input 
            placeholder="Buscar cliente" 
            className="w-full mb-2" 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <div className="flex space-x-2 mb-2">
            <Input 
              placeholder="Nome" 
              value={novoCliente.nome}
              onChange={(e) => setNovoCliente({...novoCliente, nome: e.target.value})}
            />
            <Input 
              placeholder="Email" 
              value={novoCliente.email}
              onChange={(e) => setNovoCliente({...novoCliente, email: e.target.value})}
            />
            <Input 
              placeholder="Telefone" 
              value={novoCliente.telefone}
              onChange={(e) => setNovoCliente({...novoCliente, telefone: e.target.value})}
            />
            <Select 
              value={novoCliente.tipo}
              onChange={(e) => setNovoCliente({...novoCliente, tipo: e.target.value as Cliente['tipo']})}
            >
              <option value="Pessoa Física">Pessoa Física</option>
              <option value="Pessoa Jurídica">Pessoa Jurídica</option>
            </Select>
            <Button onClick={handleAdicionarCliente}>Adicionar Cliente</Button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Nome</th>
              <th className="text-left">Email</th>
              <th className="text-left">Telefone</th>
              <th className="text-left">Tipo</th>
              <th className="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.tipo}</td>
                <td>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-2"
                    onClick={() => {
                      const novoTipo = cliente.tipo === 'Pessoa Física' ? 'Pessoa Jurídica' : 'Pessoa Física';
                      atualizarCliente(cliente.id, { tipo: novoTipo });
                    }}
                  >
                    Alterar Tipo
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removerCliente(cliente.id)}
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

