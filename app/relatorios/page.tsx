import DashboardLayout from '../dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'

export default function Relatorios() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Relatórios e Análises</h1>
      <Card className="p-6">
        <div className="mb-4 flex space-x-2">
          <Select>
            <option>Vendas</option>
            <option>Estoque</option>
            <option>Clientes</option>
            <option>Cashback</option>
          </Select>
          <Button>Gerar Relatório</Button>
        </div>
        <div className="h-96 bg-gray-100">
          {/* Implementar lógica para exibir gráficos e dados do relatório */}
        </div>
      </Card>
    </DashboardLayout>
  )
}

