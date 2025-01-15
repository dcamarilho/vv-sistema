'use client'

import { useState } from 'react'
import DashboardLayout from '../dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { usePedidos, Pedido } from '@/hooks/usePedidos'

export default function Pedidos() {
  const { pedidos, adicionarPedido, atualizarPedido, removerPedido } = usePedidos();
  const [novoPedido, setNovoPedido] = useState<Omit<Pedido, 'id'>>({ 
    clienteNome: '', 
    valor: 0, 
    status: 'Pendente', 
    data: new Date().toISOString().split('T')[0] 
  });
  const [busca, setBusca] = useState('');

  const handleAdicionarPedido = () => {
    adicionarPedido(novoPedido);
    setNovoPedido({ 
      clienteNome: '', 
      valor: 0, 
      status: 'Pendente', 
      data: new Date().toISOString().split('T')[0] 
    });
  };

  const pedidosFiltrados = pedidos.filter(pedido => 
    pedido.clienteNome.toLowerCase().includes(busca.toLowerCase()) ||
    pedido.id.includes(busca)
  );

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Gestão de Pedidos</h1>
      <Card className="p-6">
        <div className="mb-4">
          <Input 
            placeholder="Buscar pedido" 
            className="w-full mb-2" 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <div className="flex space-x-2 mb-2">
            <Input 
              placeholder="Nome do cliente" 
              value={novoPedido.clienteNome}
              onChange={(e) => setNovoPedido({...novoPedido, clienteNome: e.target.value})}
            />
            <Input 
              type="number" 
              placeholder="Valor" 
              value={novoPedido.valor}
              onChange={(e) => setNovoPedido({...novoPedido, valor: parseFloat(e.target.value)})}
            />
            <Select 
              value={novoPedido.status}
              onChange={(e) => setNovoPedido({...novoPedido, status: e.target.value as Pedido['status']})}
            >
              <option value="Pendente">Pendente</option>
              <option value="Em processamento">Em processamento</option>
              <option value="Enviado">Enviado</option>
              <option value="Entregue">Entregue</option>
              <option value="Cancelado">Cancelado</option>
            </Select>
            <Button onClick={handleAdicionarPedido}>Novo Pedido</Button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Nº do Pedido</th>
              <th className="text-left">Cliente</th>
              <th className="text-left">Valor</th>
              <th className="text-left">Status</th>
              <th className="text-left">Data</th>
              <th className="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.clienteNome}</td>
                <td>R$ {pedido.valor.toFixed(2)}</td>
                <td>{pedido.status}</td>
                <td>{pedido.data}</td>
                <td>
                  <Select 
                    value={pedido.status}
                    onChange={(e) => atualizarPedido(pedido.id, { status: e.target.value as Pedido['status'] })}
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Em processamento">Em processamento</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Entregue">Entregue</option>
                    <option value="Cancelado">Cancelado</option>
                  </Select>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    className="ml-2"
                    onClick={() => removerPedido(pedido.id)}
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

