'use client'

import { useState } from 'react'
import DashboardLayout from '../dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFuncionarios, Funcionario } from '@/hooks/useFuncionarios'

export default function Funcionarios() {
  const { funcionarios, adicionarFuncionario, atualizarFuncionario, removerFuncionario } = useFuncionarios();
  const [novoFuncionario, setNovoFuncionario] = useState<Omit<Funcionario, 'id'>>({ 
    nome: '', 
    cargo: '', 
    email: '', 
    telefone: '', 
    dataContratacao: '' 
  });
  const [busca, setBusca] = useState('');

  const handleAdicionarFuncionario = () => {
    adicionarFuncionario(novoFuncionario);
    setNovoFuncionario({ nome: '', cargo: '', email: '', telefone: '', dataContratacao: '' });
  };

  const funcionariosFiltrados = funcionarios.filter(funcionario => 
    funcionario.nome.toLowerCase().includes(busca.toLowerCase()) ||
    funcionario.cargo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Gestão de Funcionários</h1>
      <Card className="p-6">
        <div className="mb-4">
          <Input 
            placeholder="Buscar funcionário" 
            className="w-full mb-2" 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Input 
              placeholder="Nome" 
              value={novoFuncionario.nome}
              onChange={(e) => setNovoFuncionario({...novoFuncionario, nome: e.target.value})}
            />
            <Input 
              placeholder="Cargo" 
              value={novoFuncionario.cargo}
              onChange={(e) => setNovoFuncionario({...novoFuncionario, cargo: e.target.value})}
            />
            <Input 
              placeholder="Email" 
              value={novoFuncionario.email}
              onChange={(e) => setNovoFuncionario({...novoFuncionario, email: e.target.value})}
            />
            <Input 
              placeholder="Telefone" 
              value={novoFuncionario.telefone}
              onChange={(e) => setNovoFuncionario({...novoFuncionario, telefone: e.target.value})}
            />
            <Input 
              type="date"
              placeholder="Data de Contratação" 
              value={novoFuncionario.dataContratacao}
              onChange={(e) => setNovoFuncionario({...novoFuncionario, dataContratacao: e.target.value})}
            />
            <Button onClick={handleAdicionarFuncionario}>Adicionar Funcionário</Button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Nome</th>
              <th className="text-left">Cargo</th>
              <th className="text-left">Email</th>
              <th className="text-left">Telefone</th>
              <th className="text-left">Data de Contratação</th>
              <th className="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionariosFiltrados.map((funcionario) => (
              <tr key={funcionario.id}>
                <td>{funcionario.nome}</td>
                <td>{funcionario.cargo}</td>
                <td>{funcionario.email}</td>
                <td>{funcionario.telefone}</td>
                <td>{funcionario.dataContratacao}</td>
                <td>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-2"
                    onClick={() => {
                      const novoCargo = prompt('Novo cargo:', funcionario.cargo);
                      if (novoCargo) {
                        atualizarFuncionario(funcionario.id, { cargo: novoCargo });
                      }
                    }}
                  >
                    Editar Cargo
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removerFuncionario(funcionario.id)}
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

