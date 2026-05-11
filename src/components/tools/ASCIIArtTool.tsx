'use client'

import { useState } from 'react'
import { Type, Copy, Download, Sparkles } from 'lucide-react'

const asciiFonts = {
  standard: {
    'A': '  _  \n / \\ \n/___\\\n     ',
    'B': ' ___ \n|   \\\n|___/\n     ',
    'C': ' ___ \n/   \\\n\\___/\n     ',
    'D': ' ___ \n|   \\\n|___/\n     ',
    'E': ' ___ \n|    \n|___ \n     ',
    'F': ' ___ \n|    \n|    \n     ',
    'G': ' ___ \n/   \\\n\\___/\n|    ',
    'H': ' _ _ \n| | |\n|_|_|\n     ',
    'I': ' _ \n| |\n|_|\n   ',
    'J': '  _ \n  | \n_|_|\n    ',
    'K': ' _ __\n|  _ \\\n|__|/\n     ',
    'L': ' _   \n| |  \n|___|\n     ',
    'M': ' _ __\n|  _ \\\n|__|/\n     ',
    'N': ' _ __\n|  _ \\\n|__|/\n     ',
    'O': ' ___ \n/   \\\n\\___/\n     ',
    'P': ' ___ \n|   \\\n|___/\n     ',
    'Q': ' ___ \n/   \\\n\\___/\n|    ',
    'R': ' ___ \n|   \\\n|___/\n|    ',
    'S': ' ___ \n/   \\\n\\___/\n     ',
    'T': ' ___ \n|   |\n|___|\n     ',
    'U': ' _ _ \n| | |\n|_|_|\n     ',
    'V': ' _ _ \n| | |\n|_|_|\n     ',
    'W': ' _ __\n|  _ \\\n|__|/\n     ',
    'X': ' _ __\n|  _ \\\n|__|/\n     ',
    'Y': ' _ __\n|  _ \\\n|__|/\n     ',
    'Z': ' ___ \n/   \\\n\\___/\n     ',
    ' ': '    \n    \n    \n    ',
    '!': ' _ \n| |\n|_|\n   ',
    '?': ' _ \n| |\n|_|\n   ',
    '0': ' ___ \n/   \\\n\\___/\n     ',
    '1': ' _ \n| |\n|_|\n   ',
    '2': ' ___ \n/   \\\n\\___/\n     ',
    '3': ' ___ \n/   \\\n\\___/\n     ',
    '4': ' ___ \n/   \\\n\\___/\n     ',
    '5': ' ___ \n/   \\\n\\___/\n     ',
    '6': ' ___ \n/   \\\n\\___/\n     ',
    '7': ' ___ \n/   \\\n\\___/\n     ',
    '8': ' ___ \n/   \\\n\\___/\n     ',
    '9': ' ___ \n/   \\\n\\___/\n     '
  },
  block: {
    'A': '█████\n█   █\n█████\n█   █\n█   █',
    'B': '████ \n█   █\n████ \n█   █\n████ ',
    'C': ' ████\n█    \n█    \n█    \n ████',
    'D': '████ \n█   █\n█   █\n█   █\n████ ',
    'E': '█████\n█    \n███  \n█    \n█████',
    'F': '█████\n█    \n███  \n█    \n█    ',
    'G': ' ████\n█    \n█  ██\n█   █\n ████',
    'H': '█   █\n█   █\n█████\n█   █\n█   █',
    'I': '█████\n  █  \n  █  \n  █  \n█████',
    'J': '  ███\n    █\n    █\n█   █\n ███ ',
    'K': '█   █\n█  █ \n███  \n█  █ \n█   █',
    'L': '█    \n█    \n█    \n█    \n█████',
    'M': '█   █\n██ ██\n█ █ █\n█   █\n█   █',
    'N': '█   █\n██  █\n█ █ █\n█  ██\n█   █',
    'O':' ███ \n█   █\n█   █\n█   █\n ███ ',
    'P': '████ \n█   █\n████ \n█    \n█    ',
    'Q': ' ███ \n█   █\n█   █\n█  ██\n ████',
    'R': '████ \n█   █\n████ \n█  █ \n█   █',
    'S': ' ████\n█    \n ███ \n    █\n████ ',
    'T': '█████\n  █  \n  █  \n  █  \n  █  ',
    'U': '█   █\n█   █\n█   █\n█   █\n ███ ',
    'V': '█   █\n█   █\n█   █\n █ █ \n  █  ',
    'W': '█   █\n█   █\n█ █ █\n██ ██\n█   █',
    'X': '█   █\n █ █ \n  █  \n █ █ \n█   █',
    'Y': '█   █\n █ █ \n  █  \n  █  \n  █  ',
    'Z': '█████\n   █ \n  █  \n █   \n█████',
    ' ': '     \n     \n     \n     \n     ',
    '!': '  █  \n  █  \n  █  \n     \n  █  ',
    '?': '████ \n    █\n   █ \n  █  \n  █  ',
    '0': ' ███ \n█   █\n█   █\n█   █\n ███ ',
    '1': '  █  \n ██  \n  █  \n  █  \n ███ ',
    '2': ' ███ \n█   █\n   █ \n  █  \n█████',
    '3': ' ███ \n█   █\n  ██ \n█   █\n ███ ',
    '4': '█   █\n█   █\n█████\n    █\n    █',
    '5': '█████\n█    \n████ \n    █\n ███ ',
    '6': ' ███ \n█    \n████ \n█   █\n ███ ',
    '7': '█████\n    █\n   █ \n  █  \n  █  ',
    '8': ' ███ \n█   █\n ███ \n█   █\n ███ ',
    '9': ' ███ \n█   █\n ████\n    █\n ███ '
  }
}

const asciiArt = [
  { name: 'Cat', art: '  /\\_/\\ \n ( o.o ) \n  > ^ <  \n /|   |\\\n (_|   |_)' },
  { name: 'Dog', art: '  / \\__\n (    @\\___\n /         O\n/   (_____/\n/_____/   U' },
  { name: 'Heart', art: '  ♥   ♥  \n ♥  ♥  ♥ \n♥       ♥\n ♥     ♥ \n   ♥ ♥   \n    ♥    ' },
  { name: 'Star', art: '    *    \n   ***   \n  *****  \n   ***   \n    *    ' },
  { name: 'Smiley', art: '  .-"-.\n /     \\\n|  o o |\n|   >  |\n|  _  |\n \\     /\n  \'-.-\'' },
  { name: 'Tree', art: '    *    \n   ***   \n  *****  \n    |    \n    |    \n   / \\   ' },
  { name: 'Coffee', art: '    ( (\n     ) )\n  ......\n  |    | |\n  |    | |\n  \\____/ /' },
  { name: 'Rocket', art: '     |\n    / \\\n   | O |\n   |   |\n  /|   |\\\n / |___| \\\n   |||||' }
]

export default function ASCIIArtTool() {
  const [text, setText] = useState('')
  const [selectedFont, setSelectedFont] = useState<'standard' | 'block'>('standard')
  const [generatedArt, setGeneratedArt] = useState('')
  const [selectedPreset, setSelectedPreset] = useState('')

  const generateTextArt = () => {
    const upperText = text.toUpperCase()
    const font = asciiFonts[selectedFont]
    
    if (!font) return
    
    const lines = ['', '', '', '', ''] // 5 lines for each character
    const chars = upperText.split('')
    
    chars.forEach(char => {
      const charArt = font[char] || font[' ']
      const charLines = charArt.split('\n')
      
      for (let i = 0; i < 5; i++) {
        lines[i] += (charLines[i] || '') + ' '
      }
    })
    
    setGeneratedArt(lines.join('\n'))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadArt = () => {
    const blob = new Blob([generatedArt || asciiArt.find(a => a.name === selectedPreset)?.art || ''], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ascii-art.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const resetTool = () => {
    setText('')
    setGeneratedArt('')
    setSelectedPreset('')
    setSelectedFont('standard')
  }

  return (
    <div className="space-y-6">
      {/* Text to ASCII */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <Type size={20} />
          Text to ASCII Art
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Text
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to convert..."
              maxLength={10}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Font Style
            </label>
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value as 'standard' | 'block')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            >
              <option value="standard">Standard</option>
              <option value="block">Block</option>
            </select>
          </div>

          <button
            onClick={generateTextArt}
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Generate ASCII Art
          </button>
        </div>
      </div>

      {/* Preset ASCII Art */}
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
          <Sparkles size={20} />
          Preset ASCII Art
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {asciiArt.map((item) => (
            <button
              key={item.name}
              onClick={() => setSelectedPreset(item.name)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPreset === item.name
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Display Area */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Generated ASCII Art
        </h3>
        
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-300 dark:border-gray-600 min-h-[200px]">
          <pre className="font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre">
            {generatedArt || (selectedPreset ? asciiArt.find(a => a.name === selectedPreset)?.art : 'ASCII art will appear here...')}
          </pre>
        </div>

        {(generatedArt || selectedPreset) && (
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => copyToClipboard(generatedArt || asciiArt.find(a => a.name === selectedPreset)?.art || '')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Copy size={16} />
              Copy
            </button>
            <button
              onClick={downloadArt}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Download size={16} />
              Download
            </button>
          </div>
        )}
      </div>

      <button
        onClick={resetTool}
        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
      >
        Reset Tool
      </button>

      {/* Tips Section */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
          💡 ASCII Art Tips
        </h3>
        <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
          <li>• Keep text short for better ASCII art results</li>
          <li>• Use monospace fonts for proper display</li>
          <li>• ASCII art works best in code blocks or pre tags</li>
          <li>• Different fonts create different visual effects</li>
          <li>• Preset designs are optimized for common use cases</li>
        </ul>
      </div>
    </div>
  )
}
