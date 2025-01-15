import DashboardLayout from './dashboard-layout'
import { Card } from '@/components/ui/card'

export default function Home() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2">Itens com Estoque Baixo</h2>
          {/* Implementar lógica para exibir itens com estoque baixo */}
        </Card>
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2">Problemas no Relatório de Turno</h2>
          {/* Implementar lógica para exibir problemas no relatório de turno */}
        </Card>
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2">Funcionários Online</h2>
          {/* Implementar lógica para exibir funcionários online */}
        </Card>
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2">Próximos Turnos</h2>
          {/* Implementar lógica para exibir próximos turnos */}
        </Card>
        <Card className="p-4 md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-2">Lembretes Burocráticos</h2>
          {/* Implementar lógica para exibir lembretes burocráticos */}
        </Card>
      </div>
    </DashboardLayout>
  )
}

