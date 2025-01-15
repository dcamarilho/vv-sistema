import Link from 'next/link'
import { Home, Package, ShoppingCart, Users, DollarSign, Truck, BarChart2, Settings, UserCheck, MessageSquare, Radio } from 'lucide-react'

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Package, label: 'Estoque', href: '/estoque' },
  { icon: ShoppingCart, label: 'Pedidos', href: '/pedidos' },
  { icon: Users, label: 'Clientes', href: '/clientes' },
  { icon: DollarSign, label: 'Cashback', href: '/cashback' },
  { icon: Truck, label: 'Fornecedores', href: '/fornecedores' },
  { icon: BarChart2, label: 'Estatísticas', href: '/estatisticas' },
  { icon: Settings, label: 'Configurações', href: '/configuracoes' },
  { icon: UserCheck, label: 'Funcionários', href: '/funcionarios' },
  { icon: MessageSquare, label: 'ChatGPT', href: '/chatgpt' },
  { icon: Radio, label: 'RFID', href: '/rfid' },
]

export function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white h-screen">
      <div className="p-5">
        <h1 className="text-2xl font-bold">VV Sistema</h1>
      </div>
      <nav className="flex-1">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href} className="flex items-center px-5 py-3 hover:bg-gray-700">
                <item.icon className="mr-3" size={20} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

