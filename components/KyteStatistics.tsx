import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function KyteStatistics() {
  // Estes dados seriam obtidos de uma API ou banco de dados na implementação real
  const kyteData = {
    totalUsers: 1000,
    activeUsers: 750,
    averageOrderValue: 150,
    totalOrders: 5000,
    customerRetentionRate: 85,
    netPromoterScore: 72,
  }

  return (
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
  )
}

