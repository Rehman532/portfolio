'use client'

import { useState, useEffect } from 'react'
import { ArrowRightLeft, Copy, History } from 'lucide-react'

const romanNumerals = [
  { value: 1000, numeral: 'M' },
  { value: 900, numeral: 'CM' },
  { value: 500, numeral: 'D' },
  { value: 400, numeral: 'CD' },
  { value: 100, numeral: 'C' },
  { value: 90, numeral: 'XC' },
  { value: 50, numeral: 'L' },
  { value: 40, numeral: 'XL' },
  { value: 10, numeral: 'X' },
  { value: 9, numeral: 'IX' },
  { value: 5, numeral: 'V' },
  { value: 4, numeral: 'IV' },
  { value: 1, numeral: 'I' }
]

export default function RomanNumeralTool() {
  const [numberInput, setNumberInput] = useState('')
  const [romanInput, setRomanInput] = useState('')
  const [romanResult, setRomanResult] = useState('')
  const [numberResult, setNumberResult] = useState('')
  const [error, setError] = useState('')

  const numberToRoman = (num: number): string => {
    if (num <= 0 || num > 3999) {
      return 'Invalid number (must be 1-3999)'
    }

    let result = ''
    let remaining = num

    for (const { value, numeral } of romanNumerals) {
      while (remaining >= value) {
        result += numeral
        remaining -= value
      }
    }

    return result
  }

  const romanToNumber = (roman: string): number => {
    const romanUpper = roman.toUpperCase()
    const romanValues: { [key: string]: number } = {
      'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
    }

    let result = 0
    let i = 0

    while (i < romanUpper.length) {
      if (i + 1 < romanUpper.length && romanValues[romanUpper[i]] < romanValues[romanUpper[i + 1]]) {
        result += romanValues[romanUpper[i + 1]] - romanValues[romanUpper[i]]
        i += 2
      } else {
        result += romanValues[romanUpper[i]]
        i += 1
      }
    }

    return result
  }

  const isValidRoman = (roman: string): boolean => {
    const romanUpper = roman.toUpperCase()
    const validChars = /^[IVXLCDM]+$/
    return validChars.test(romanUpper)
  }

  const handleNumberToRoman = () => {
    const num = parseInt(numberInput)
    setError('')
    
    if (isNaN(num) || num <= 0 || num > 3999) {
      setError('Please enter a valid number between 1 and 3999')
      setRomanResult('')
      return
    }

    const roman = numberToRoman(num)
    setRomanResult(roman)
  }

  const handleRomanToNumber = () => {
    setError('')
    
    if (!isValidRoman(romanInput)) {
      setError('Please enter a valid Roman numeral')
      setNumberResult('')
      return
    }

    const num = romanToNumber(romanInput)
    setNumberResult(num.toString())
  }

  const swapValues = () => {
    setNumberInput(numberResult)
    setRomanInput(romanResult)
    setRomanResult('')
    setNumberResult('')
    setError('')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const clearAll = () => {
    setNumberInput('')
    setRomanInput('')
    setRomanResult('')
    setNumberResult('')
    setError('')
  }

  return (
    <div className="space-y-6">
      {/* Number to Roman Converter */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <ArrowRightLeft size={20} />
          Number to Roman Numeral
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Number (1-3999)
            </label>
            <input
              type="number"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              placeholder="Enter number..."
              min="1"
              max="3999"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleNumberToRoman}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Convert to Roman
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Roman Result
            </label>
            <div className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg min-h-[48px] flex items-center justify-between">
              <span className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                {romanResult || 'Result will appear here'}
              </span>
              {romanResult && (
                <button
                  onClick={() => copyToClipboard(romanResult)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <Copy size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Roman to Number Converter */}
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
          <ArrowRightRight size={20} />
          Roman Numeral to Number
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Roman Numeral
            </label>
            <input
              type="text"
              value={romanInput}
              onChange={(e) => setRomanInput(e.target.value.toUpperCase())}
              placeholder="Enter Roman numeral..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white font-mono uppercase"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleRomanToNumber}
              className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              Convert to Number
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number Result
            </label>
            <div className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg min-h-[48px] flex items-center justify-between">
              <span className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                {numberResult || 'Result will appear here'}
              </span>
              {numberResult && (
                <button
                  onClick={() => copyToClipboard(numberResult)}
                  className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                >
                  <Copy size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-red-800 dark:text-red-200 font-medium">
            ⚠️ {error}
          </p>
        </div>
      )}

      {/* Swap Button */}
      {(romanResult || numberResult) && (
        <div className="flex justify-center">
          <button
            onClick={swapValues}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium flex items-center gap-2"
          >
            <ArrowRightLeft size={18} />
            Swap Values
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={clearAll}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Reference Section */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4 flex items-center gap-2">
          <History size={20} />
          Roman Numeral Reference
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-sm">
          {romanNumerals.map(({ value, numeral }) => (
            <div key={value} className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 text-center">
              <div className="font-bold text-gray-900 dark:text-white">{value}</div>
              <div className="font-mono text-lg text-gray-700 dark:text-gray-300">{numeral}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-yellow-800 dark:text-yellow-200">
          <p className="font-medium mb-2">Rules:</p>
          <ul className="space-y-1">
            <li>• Symbols are added to make numbers (VI = 5 + 1 = 6)</li>
            <li>• Smaller symbol before larger means subtraction (IV = 5 - 1 = 4)</li>
            <li>• Maximum value is 3999 (MMMCMXCIX)</li>
            <li>• No symbol should repeat more than 3 times in a row</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
