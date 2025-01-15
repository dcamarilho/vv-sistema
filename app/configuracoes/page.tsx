'use client'

import { useState } from 'react'
import DashboardLayout from '../dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useConfiguracoes } from '@/hooks/useConfiguracoes'

export default function Configuracoes() {
  const { configuracoes, atualizarConfiguracoes } = useConfiguracoes();
  const [formState, setFormState] = useState(configuracoes);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    atualizarConfiguracoes(formState);
    alert('Configurações atualizadas com sucesso!');
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Configurações do Sistema</h1>
      <Card className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div>
              <label htmlFor="nomeEmpresa" className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
              <Input
                id="nomeEmpresa"
                name="nomeEmpresa"
                value={formState.nomeEmpresa}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="emailContato" className="block text-sm font-medium text-gray-700">Email de Contato</label>
              <Input
                id="emailContato"
                name="emailContato"
                type="email"
                value={formState.emailContato}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="telefoneContato" className="block text-sm font-medium text-gray-700">Telefone de Contato</label>
              <Input
                id="telefoneContato"
                name="telefoneContato"
                value={formState.telefoneContato}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="enderecoEmpresa" className="block text-sm font-medium text-gray-700">Endereço da Empresa</label>
              <Input
                id="enderecoEmpresa"
                name="enderecoEmpresa"
                value={formState.enderecoEmpresa}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="taxaCashback" className="block text-sm font-medium text-gray-700">Taxa de Cashback (%)</label>
              <Input
                id="taxaCashback"
                name="taxaCashback"
                type="number"
                value={formState.taxaCashback}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="limiteMaximoCashback" className="block text-sm font-medium text-gray-700">Limite Máximo de Cashback (R$)</label>
              <Input
                id="limiteMaximoCashback"
                name="limiteMaximoCashback"
                type="number"
                value={formState.limiteMaximoCashback}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Button type="submit" className="mt-4">Salvar Configurações</Button>
        </form>
      </Card>
    </DashboardLayout>
  )
}

