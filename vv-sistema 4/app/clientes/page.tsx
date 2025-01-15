import DashboardLayout from '../dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Clientes() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Gestão de Clientes</h1>
      <Card className="p-6">
        <div className="mb-4">
          <Input placeholder="Buscar cliente" className="w-full mb-2" />
          <Button>Adicionar Novo Cliente</Button>
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
            {/* Implementar lógica para listar clientes */}
          </tbody>
        </table>
      </Card>
    </DashboardLayout>
  )
}

