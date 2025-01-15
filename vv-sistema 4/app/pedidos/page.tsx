import DashboardLayout from '../dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Pedidos() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Gestão de Pedidos</h1>
      <Card className="p-6">
        <div className="mb-4">
          <Input placeholder="Buscar pedido" className="w-full mb-2" />
          <Button>Novo Pedido</Button>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Nº do Pedido</th>
              <th className="text-left">Cliente</th>
              <th className="text-left">Valor</th>
              <th className="text-left">Status</th>
              <th className="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* Implementar lógica para listar pedidos */}
          </tbody>
        </table>
      </Card>
    </DashboardLayout>
  )
}

