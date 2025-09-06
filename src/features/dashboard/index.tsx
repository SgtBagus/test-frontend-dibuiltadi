import PageContainer from '@/components/layout/PageContainer'
import toast from '@/helper/toast'

import { GoogleGenAI } from '@google/genai'
import { Button, CircularProgress, TextField } from '@mui/material'
import { useState } from 'react'

export default function Dashboard() {
  const [text, setText] = useState('')
  const [aiValue, setAiValue] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const AIGenerate = async () => {
    try {
      setIsLoading(true)
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string })

      const { text: aiRespond } = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-05-20',
        config: {
          temperature: 0.8,
          topP: 0.9
        },
        contents: [
          {
            role: 'user',
            parts: [
              {
                text
              }
            ]
          }
        ]
      })

      setAiValue(aiRespond)
    } catch (err) {
      toast.error(err as string)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageContainer title='Profile'>
      <div className='flex flex-col gap-4 p-2'>
        <div className='flex flex-col gap-2'>
          <TextField onChange={({ target: { value } }) => setText(value)} />
          <Button onClick={() => AIGenerate()}>Kirim</Button>
        </div>
        <div className='rounded border p-2'>{isLoading ? <CircularProgress /> : aiValue}</div>
      </div>
    </PageContainer>
  )
}
