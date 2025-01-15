import DashboardLayout from '../dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Fornecedores() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Gestão de Fornecedores</h1>
      <Card className="p-6">
        <div className="mb-4">
          <Input placeholder="Buscar fornecedor" className="w-full mb-2" />
          <Button>Adicionar Novo Fornecedor</Button>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Nome</th>
              <th className="text-left">Contato</th>
              <th className="text-left">Produtos</th>
              <th className="text-left">Status</th>
              <th className="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* Implementar lógica para listar fornecedores */}
          </tbody>
        </table>
      </Card>
    </DashboardLayout>
  )
}

