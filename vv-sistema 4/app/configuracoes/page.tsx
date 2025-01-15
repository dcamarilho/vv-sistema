import DashboardLayout from '../dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

export default function Configuracoes() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Configurações do Sistema</h1>
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Nome da Empresa</label>
            <Input placeholder="Nome da Empresa" />
          </div>
          <div>
            <label className="block mb-2">Email de Contato</label>
            <Input type="email" placeholder="Email de Contato" />
          </div>
          <div className="flex items-center justify-between">
            <span>Ativar Notificações por Email</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span>Ativar Integração com WhatsApp</span>
            <Switch />
          </div>
          <Button>Salvar Configurações</Button>
        </div>
      </Card>
    </DashboardLayout>
  )
}

