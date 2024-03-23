'use client'

import { useState } from 'react'

const GPTPromptPage = () => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const payload = {
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }

      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (data.completion && data.completion.choices.length > 0) {
        setResponse(data.completion.choices[0].message.content)
      } else {
        setResponse("No response from GPT.")
      }
    } catch (error) {
      console.error('Error fetching response:', error)
      setResponse('Failed to fetch response from OpenAI.')
    }
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <textarea
          className="p-2 border rounded shadow-sm text-gray-800"
          rows={4}
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={handlePromptChange}
        ></textarea>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Get Response
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 border rounded shadow-sm">
          <p className="text-gray-800">{response}</p>
        </div>
      )}
    </div>
  )
}

export default GPTPromptPage
