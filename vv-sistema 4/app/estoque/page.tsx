import DashboardLayout from '../dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Estoque() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Gestão de Estoque</h1>
      <Card className="p-6">
        <div className="mb-4">
          <Input placeholder="Buscar produto" className="w-full mb-2" />
          <Button>Adicionar Novo Produto</Button>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Produto</th>
              <th className="text-left">Quantidade</th>
              <th className="text-left">Preço</th>
              <th className="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* Implementar lógica para listar produtos */}
          </tbody>
        </table>
      </Card>
    </DashboardLayout>
  )
}

