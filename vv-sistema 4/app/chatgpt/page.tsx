'use client'

import { useState } from 'react'
import DashboardLayout from '../dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ChatGPT() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error('Falha na comunicação com o ChatGPT')
      }

      const data = await response.json()
      const assistantMessage = { role: 'assistant' as const, content: data.message }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Erro ao comunicar com o ChatGPT:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Desculpe, ocorreu um erro. Por favor, tente novamente.' }])
    }
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">ChatGPT</h1>
      <Card className="p-6">
        <div className="h-96 overflow-y-auto mb-4 p-4 border rounded">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {message.content}
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1"
          />
          <Button type="submit">Enviar</Button>
        </form>
      </Card>
    </DashboardLayout>
  )
}

