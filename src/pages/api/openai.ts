import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  try {
    const { messages, model = 'gpt-3.5-turbo' } = req.body

    if (!messages || messages.length === 0) {
      return res.status(400).json({ message: 'Messages are required.' })
    }

    const chatCompletion = await openai.chat.completions.create({
      messages: messages,
      model: model,
    })

    res.status(200).json({ completion: chatCompletion })
  } catch (error) {
    console.error('OpenAI API error:', error)
    res.status(500).json({ message: 'Error communicating with OpenAI API' })
  }
}
