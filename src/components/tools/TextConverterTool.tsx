'use client'

import { useState } from 'react'
import { Type, Copy, Check, RotateCcw, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

const TextConverterTool = () => {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [copied, setCopied] = useState(false)

  const convertToUpper = () => {
    setOutputText(inputText.toUpperCase())
  }

  const convertToLower = () => {
    setOutputText(inputText.toLowerCase())
  }

  const capitalizeWords = () => {
    setOutputText(inputText.replace(/\b\w/g, char => char.toUpperCase()))
  }

  const removeExtraSpaces = () => {
    setOutputText(inputText.replace(/\s+/g, ' ').trim())
  }

  const reverseText = () => {
    setOutputText(inputText.split('').reverse().join(''))
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const clearAll = () => {
    setInputText('')
    setOutputText('')
    setCopied(false)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground dark:text-white mb-2 flex items-center justify-center gap-3">
          <Type className="text-blue-500" />
          Text Converter Tool
        </h3>
        <p className="text-gray-600 dark:text-gray-400">Convert and transform your text instantly</p>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Input Text
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Conversion Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <button
          onClick={convertToUpper}
          disabled={!inputText}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <AlignLeft size={16} />
          UPPERCASE
        </button>
        <button
          onClick={convertToLower}
          disabled={!inputText}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <AlignCenter size={16} />
          lowercase
        </button>
        <button
          onClick={capitalizeWords}
          disabled={!inputText}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <AlignRight size={16} />
          Capitalize
        </button>
        <button
          onClick={removeExtraSpaces}
          disabled={!inputText}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Type size={16} />
          Remove Spaces
        </button>
        <button
          onClick={reverseText}
          disabled={!inputText}
          className="px-4 py-2 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <RotateCcw size={16} />
          Reverse
        </button>
      </div>

      {/* Output Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Output Text
          </label>
          <div className="flex gap-2">
            {outputText && (
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
            {(inputText || outputText) && (
              <button
                onClick={clearAll}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <RotateCcw size={16} />
                Clear
              </button>
            )}
          </div>
        </div>
        <textarea
          value={outputText}
          readOnly
          placeholder="Converted text will appear here..."
          className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
        />
      </div>

      {/* Character Count */}
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>Input: {inputText.length} characters</span>
        <span>Output: {outputText.length} characters</span>
      </div>
    </div>
  )
}

export default TextConverterTool
