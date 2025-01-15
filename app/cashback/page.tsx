'use client'

import { useState } from 'react'
import DashboardLayout from '../dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useCashback, TransacaoCashback } from '@/hooks/useCashback'

export default function Cashback() {
  const { transacoes, adicionarTransacao, atualizarTransacao, removerTransacao } = useCashback();
  const [novaTransacao, setNovaTransacao] = useState<Omit<TransacaoCashback, 'id'>>({ 
    clienteId: '', 
    clienteNome: '', 
    valor: 0, 
    data: new Date().toISOString().split('T')[0],
    status: 'Pendente'
  });
  const [busca, setBusca] = useState('');

  const handleAdicionarTransacao = () => {
    adicionarTransacao(novaTransacao);
    setNovaTransacao({ 
      clienteId: '', 
      clienteNome: '', 
      valor: 0, 
      data: new Date().toISOString().split('T')[0],
      status: 'Pendente'
    });
  };

  const transacoesFiltradas = transacoes.filter(transacao => 
    transacao.clienteNome.toLowerCase().includes(busca.toLowerCase()) ||
    transacao.id.includes(busca)
  );

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Gestão de Cashback</h1>
      <Card className="p-6">
        <div className="mb-4">
          <Input 
            placeholder="Buscar transação" 
            className="w-full mb-2" 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <div className="flex space-x-2 mb-2">
            <Input 
              placeholder="ID do Cliente" 
              value={novaTransacao.clienteId}
              onChange={(e) => setNovaTransacao({...novaTransacao, clienteId: e.target.value})}
            />
            <Input 
              placeholder="Nome do Cliente" 
              value={novaTransacao.clienteNome}
              onChange={(e) => setNovaTransacao({...novaTransacao, clienteNome: e.target.value})}
            />
            <Input 
              type="number" 
              placeholder="Valor" 
              value={novaTransacao.valor}
              onChange={(e) => setNovaTransacao({...novaTransacao, valor: parseFloat(e.target.value)})}
            />
            <Button onClick={handleAdicionarTransacao}>Nova Transação de Cashback</Button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">Cliente</th>
              <th className="text-left">Valor</th>
              <th className="text-left">Data</th>
              <th className="text-left">Status</th>
              <th className="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {transacoesFiltradas.map((transacao) => (
              <tr key={transacao.id}>
                <td>{transacao.id}</td>
                <td>{transacao.clienteNome}</td>
                <td>R$ {transacao.valor.toFixed(2)}</td>
                <td>{transacao.data}</td>
                <td>{transacao.status}</td>
                <td>
                  <Select 
                    value={transacao.status}
                    onChange={(e) => atualizarTransacao(transacao.id, { status: e.target.value as TransacaoCashback['status'] })}
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Rejeitado">Rejeitado</option>
                  </Select>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    className="ml-2"
                    onClick={() => removerTransacao(transacao.id)}
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

