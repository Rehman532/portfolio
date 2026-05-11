'use client'

import { useState, useEffect } from 'react'
import { Shuffle, Copy, Dice1, Hash, FileText } from 'lucide-react'

export default function RandomGeneratorTool() {
  const [minValue, setMinValue] = useState('1')
  const [maxValue, setMaxValue] = useState('100')
  const [count, setCount] = useState('1')
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([])
  const [generatedString, setGeneratedString] = useState('')
  const [stringLength, setStringLength] = useState('10')
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)

  const generateRandomNumbers = () => {
    const min = parseInt(minValue) || 1
    const max = parseInt(maxValue) || 100
    const numCount = parseInt(count) || 1
    const numbers: number[] = []

    for (let i = 0; i < numCount; i++) {
      numbers.push(Math.floor(Math.random() * (max - min + 1)) + min)
    }

    setGeneratedNumbers(numbers)
  }

  const generateRandomString = () => {
    const length = parseInt(stringLength) || 10
    let charset = ''
    
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (includeNumbers) charset += '0123456789'
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    if (charset === '') {
      charset = 'abcdefghijklmnopqrstuvwxyz'
    }

    let result = ''
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    setGeneratedString(result)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const copyNumbersToClipboard = () => {
    navigator.clipboard.writeText(generatedNumbers.join(', '))
  }

  const resetAll = () => {
    setGeneratedNumbers([])
    setGeneratedString('')
    setMinValue('1')
    setMaxValue('100')
    setCount('1')
    setStringLength('10')
  }

  return (
    <div className="space-y-6">
      {/* Random Number Generator */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <Dice1 size={20} />
          Random Number Generator
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Min Value
            </label>
            <input
              type="number"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Max Value
            </label>
            <input
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Count
            </label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={generateRandomNumbers}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Shuffle size={16} />
              Generate
            </button>
          </div>
        </div>

        {generatedNumbers.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Generated Numbers:</h4>
              <button
                onClick={copyNumbersToClipboard}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
              >
                <Copy size={14} />
                Copy All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {generatedNumbers.map((num, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-md font-mono"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Random String Generator */}
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
          <Hash size={20} />
          Random String Generator
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              String Length
            </label>
            <input
              type="number"
              value={stringLength}
              onChange={(e) => setStringLength(e.target.value)}
              min="1"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={generateRandomString}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Shuffle size={16} />
              Generate String
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="rounded text-green-500 focus:ring-green-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Uppercase (A-Z)</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="rounded text-green-500 focus:ring-green-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Lowercase (a-z)</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="rounded text-green-500 focus:ring-green-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Numbers (0-9)</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="rounded text-green-500 focus:ring-green-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Symbols (!@#$%)</span>
          </label>
        </div>

        {generatedString && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Generated String:</h4>
              <button
                onClick={() => copyToClipboard(generatedString)}
                className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1"
              >
                <Copy size={14} />
                Copy
              </button>
            </div>
            <div className="font-mono text-lg text-gray-800 dark:text-gray-200 break-all">
              {generatedString}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={resetAll}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          Reset All
        </button>
      </div>

      {/* Tips Section */}
      <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
          💡 Random Generation Tips
        </h3>
        <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
          <li>• Use random numbers for lottery picks, gaming, or statistical sampling</li>
          <li>• Generate random strings for secure passwords or unique identifiers</li>
          <li>• Combine uppercase, lowercase, numbers, and symbols for stronger passwords</li>
          <li>• Use longer strings for better security (12+ characters recommended)</li>
          <li>• Generate multiple numbers for statistical analysis or testing</li>
        </ul>
      </div>
    </div>
  )
}
