'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '../dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VolumeX, Volume2 } from 'lucide-react'

const RFID_SERVICE_URL = 'http://localhost:3001'

export default function RFID() {
  const [readerType, setReaderType] = useState<'yanpode' | 'chafon'>('yanpode')
  const [connected, setConnected] = useState(false)
  const [reading, setReading] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [writeData, setWriteData] = useState('')
  const [muted, setMuted] = useState(false)

  const connectReader = async () => {
    const response = await fetch(`${RFID_SERVICE_URL}/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ readerType }),
    })
    const result = await response.json()
    if (result.success) {
      setConnected(true)
    } else {
      alert(result.message)
    }
  }

  const disconnectReader = async () => {
    const response = await fetch(`${RFID_SERVICE_URL}/disconnect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ readerType }),
    })
    const result = await response.json()
    if (result.success) {
      setConnected(false)
      setReading(false)
    } else {
      alert(result.message)
    }
  }

  const startReading = async () => {
    const response = await fetch(`${RFID_SERVICE_URL}/startReading`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ readerType }),
    })
    const result = await response.json()
    if (result.success) {
      setReading(true)
    } else {
      alert(result.message)
    }
  }

  const stopReading = async () => {
    const response = await fetch(`${RFID_SERVICE_URL}/stopReading`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ readerType }),
    })
    const result = await response.json()
    if (result.success) {
      setReading(false)
    } else {
      alert(result.message)
    }
  }

  const writeTag = async () => {
    const response = await fetch(`${RFID_SERVICE_URL}/write-tag`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ readerType, data: writeData }),
    })
    const result = await response.json()
    alert(result.message)
  }

  const toggleMute = async () => {
    const response = await fetch(`${RFID_SERVICE_URL}/toggleMute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ readerType }),
    })
    const result = await response.json()
    if (result.success) {
      setMuted(result.isMuted)
    } else {
      alert(result.message)
    }
  }

  useEffect(() => {
    if (reading) {
      const eventSource = new EventSource(`${RFID_SERVICE_URL}/tags?readerType=${readerType}`)
      eventSource.onmessage = (event) => {
        const newTags = JSON.parse(event.data)
        setTags((prevTags) => [...new Set([...prevTags, ...newTags.map((tag: any) => tag.id)])])
      }
      return () => eventSource.close()
    }
  }, [reading, readerType])

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Controle RFID</h1>
      <Card className="p-6">
        <Tabs defaultValue="yanpode">
          <TabsList className="mb-4">
            <TabsTrigger value="yanpode">Yanpode (UHF)</TabsTrigger>
            <TabsTrigger value="chafon">Chafon (Armário)</TabsTrigger>
          </TabsList>

          <TabsContent value="yanpode">
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Button onClick={connectReader} disabled={connected}>Conectar</Button>
                <Button onClick={disconnectReader} disabled={!connected}>Desconectar</Button>
              </div>
              <div className="flex space-x-2">
                <Button onClick={startReading} disabled={!connected || reading}>Iniciar Leitura</Button>
                <Button onClick={stopReading} disabled={!connected || !reading}>Parar Leitura</Button>
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Dados para escrever"
                  value={writeData}
                  onChange={(e) => setWriteData(e.target.value)}
                />
                <Button onClick={writeTag} disabled={!connected || !writeData}>Escrever Tag</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chafon">
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Button onClick={connectReader} disabled={connected}>Conectar</Button>
                <Button onClick={disconnectReader} disabled={!connected}>Desconectar</Button>
              </div>
              <div className="flex space-x-2">
                <Button onClick={startReading} disabled={!connected || reading}>Iniciar Leitura</Button>
                <Button onClick={stopReading} disabled={!connected || !reading}>Parar Leitura</Button>
              </div>
              <Button onClick={toggleMute} disabled={!connected}>
                {muted ? <Volume2 className="mr-2 h-4 w-4" /> : <VolumeX className="mr-2 h-4 w-4" />}
                {muted ? 'Ativar Som' : 'Mudo'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Tags Lidas:</h3>
          <ul className="list-disc pl-5 max-h-40 overflow-y-auto">
            {tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
      </Card>
    </DashboardLayout>
  )
}

