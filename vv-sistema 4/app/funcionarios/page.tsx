import DashboardLayout from '../dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Funcionarios() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Gestão de Funcionários</h1>
      <Card className="p-6">
        <div className="mb-4">
          <Input placeholder="Buscar funcionário" className="w-full mb-2" />
          <Button>Adicionar Novo Funcionário</Button>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Nome</th>
              <th className="text-left">Cargo</th>
              <th className="text-left">Departamento</th>
              <th className="text-left">Status</th>
              <th className="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* Implementar lógica para listar funcionários */}
          </tbody>
        </table>
      </Card>
    </DashboardLayout>
  )
}

