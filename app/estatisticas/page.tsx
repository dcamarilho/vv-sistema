'use client'

import DashboardLayout from '../dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEstatisticas } from '@/hooks/useEstatisticas'

export default function Estatisticas() {
  const estatisticas = useEstatisticas();

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Estatísticas e Análises</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {estatisticas.vendasTotais.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.clientesAtivos}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {estatisticas.ticketMedio.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Produtos Mais Vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Produto</th>
                <th className="text-left">Quantidade Vendida</th>
              </tr>
            </thead>
            <tbody>
              {estatisticas.produtosMaisVendidos.map((produto, index) => (
                <tr key={index}>
                  <td>{produto.nome}</td>
                  <td>{produto.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

