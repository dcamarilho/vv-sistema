import { useState, useEffect } from 'react';

export interface Configuracoes {
  nomeEmpresa: string;
  emailContato: string;
  telefoneContato: string;
  enderecoEmpresa: string;
  taxaCashback: number;
  limiteMaximoCashback: number;
}

export function useConfiguracoes() {
  const [configuracoes, setConfiguracoes] = useState<Configuracoes>({
    nomeEmpresa: '',
    emailContato: '',
    telefoneContato: '',
    enderecoEmpresa: '',
    taxaCashback: 0,
    limiteMaximoCashback: 0,
  });

  useEffect(() => {
    // Simula carregamento de configurações
    setConfiguracoes({
      nomeEmpresa: 'Minha Empresa',
      emailContato: 'contato@minhaempresa.com',
      telefoneContato: '(11) 1234-5678',
      enderecoEmpresa: 'Rua Exemplo, 123 - São Paulo, SP',
      taxaCashback: 5,
      limiteMaximoCashback: 1000,
    });
  }, []);

  const atualizarConfiguracoes = (novasConfiguracoes: Partial<Configuracoes>) => {
    setConfiguracoes(prev => ({ ...prev, ...novasConfiguracoes }));
  };

  return { configuracoes, atualizarConfiguracoes };
}

