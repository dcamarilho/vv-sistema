'use client'

import { useState } from 'react'
import DashboardLayout from '../dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Progress } from "@/components/ui/progress"

// Dados de exemplo para os gráficos
const salesData = [
  { name: 'Jan', vendas: 4000 },
  { name: 'Fev', vendas: 3000 },
  { name: 'Mar', vendas: 2000 },
  { name: 'Abr', vendas: 2780 },
  { name: 'Mai', vendas: 1890 },
  { name: 'Jun', vendas: 2390 },
  { name: 'Jul', vendas: 3490 },
]

const kyteData = {
  totalUsers: 1000,
  activeUsers: 750,
  averageOrderValue: 150,
  totalOrders: 5000,
  customerRetentionRate: 85,
  netPromoterScore: 72,
}

export default function Estatisticas() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('mensal')

  const gerarRelatorio = () => {
    console.log(`Gerando relatório ${periodoSelecionado}`)
    // Implementar lógica para gerar e baixar o relatório
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Estatísticas e Análises</h1>
      <Tabs defaultValue="geral">
        <TabsList className="mb-4">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="kyte">Kyte</TabsTrigger>
          <TabsTrigger value="vendas">Vendas</TabsTrigger>
          <TabsTrigger value="estoque">Estoque</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="cashback">Cashback</TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Visão Geral</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="vendas" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="kyte">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kyteData.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {kyteData.activeUsers} ativos ({(kyteData.activeUsers / kyteData.totalUsers * 100).toFixed(1)}%)
                </p>
                <Progress value={kyteData.activeUsers / kyteData.totalUsers * 100} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Valor Médio do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {kyteData.averageOrderValue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  {kyteData.totalOrders} pedidos totais
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Retenção de Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kyteData.customerRetentionRate}%</div>
                <Progress value={kyteData.customerRetentionRate} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Promoter Score (NPS)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kyteData.netPromoterScore}</div>
                <Progress value={kyteData.netPromoterScore} max={100} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vendas">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Estatísticas de Vendas</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="vendas" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="estoque">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Estatísticas de Estoque</h2>
            {/* Adicionar gráficos e métricas específicas de estoque aqui */}
          </Card>
        </TabsContent>

        <TabsContent value="clientes">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Estatísticas de Clientes</h2>
            {/* Adicionar gráficos e métricas específicas de clientes aqui */}
          </Card>
        </TabsContent>

        <TabsContent value="cashback">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Estatísticas de Cashback</h2>
            {/* Adicionar gráficos e métricas específicas de cashback aqui */}
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-6 p-6">
        <div className="flex items-center space-x-4">
          <Select
            value={periodoSelecionado}
            onValueChange={setPeriodoSelecionado}
          >
            <option value="diario">Diário</option>
            <option value="semanal">Semanal</option>
            <option value="mensal">Mensal</option>
            <option value="anual">Anual</option>
          </Select>
          <Button onClick={gerarRelatorio}>Gerar Relatório</Button>
        </div>
      </Card>
    </DashboardLayout>
  )
}

