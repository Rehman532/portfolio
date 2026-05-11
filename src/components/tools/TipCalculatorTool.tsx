'use client'

import { useState, useEffect } from 'react'
import { Calculator, DollarSign, Users, Copy } from 'lucide-react'

export default function TipCalculatorTool() {
  const [billAmount, setBillAmount] = useState('')
  const [tipPercentage, setTipPercentage] = useState(15)
  const [numberOfPeople, setNumberOfPeople] = useState(1)
  const [results, setResults] = useState({
    tipAmount: 0,
    totalAmount: 0,
    amountPerPerson: 0
  })

  useEffect(() => {
    const bill = parseFloat(billAmount) || 0
    const tip = bill * (tipPercentage / 100)
    const total = bill + tip
    const perPerson = total / numberOfPeople

    setResults({
      tipAmount: tip,
      totalAmount: total,
      amountPerPerson: perPerson
    })
  }, [billAmount, tipPercentage, numberOfPeople])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const resetCalculator = () => {
    setBillAmount('')
    setTipPercentage(15)
    setNumberOfPeople(1)
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bill Amount ($)
          </label>
          <input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tip Percentage: {tipPercentage}%
          </label>
          <input
            type="range"
            min="0"
            max="50"
            value={tipPercentage}
            onChange={(e) => setTipPercentage(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of People
          </label>
          <input
            type="number"
            min="1"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(parseInt(e.target.value) || 1)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Quick Tip Percentages */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Quick Select
        </label>
        <div className="flex flex-wrap gap-2">
          {[10, 15, 18, 20, 22, 25].map(percentage => (
            <button
              key={percentage}
              onClick={() => setTipPercentage(percentage)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                tipPercentage === percentage
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {percentage}%
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={20} className="text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Tip Amount</span>
          </div>
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">
            ${results.tipAmount.toFixed(2)}
          </div>
          <button
            onClick={() => copyToClipboard(results.tipAmount.toFixed(2))}
            className="mt-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1"
          >
            <Copy size={14} />
            Copy
          </button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <Calculator size={20} className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Amount</span>
          </div>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            ${results.totalAmount.toFixed(2)}
          </div>
          <button
            onClick={() => copyToClipboard(results.totalAmount.toFixed(2))}
            className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
          >
            <Copy size={14} />
            Copy
          </button>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-2">
            <Users size={20} className="text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Per Person</span>
          </div>
          <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
            ${results.amountPerPerson.toFixed(2)}
          </div>
          <button
            onClick={() => copyToClipboard(results.amountPerPerson.toFixed(2))}
            className="mt-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1"
          >
            <Copy size={14} />
            Copy
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={resetCalculator}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          Reset Calculator
        </button>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          💡 Tipping Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
          <div>
            <h4 className="font-medium mb-2">Standard Tipping:</h4>
            <ul className="space-y-1">
              <li>• Restaurant: 15-20%</li>
              <li>• Food Delivery: 10-15%</li>
              <li>• Taxi: 10-15%</li>
              <li>• Hair Salon: 15-20%</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Service Quality:</h4>
            <ul className="space-y-1">
              <li>• Excellent: 20%+</li>
              <li>• Good: 15-20%</li>
              <li>• Average: 10-15%</li>
              <li>• Poor: 0-10%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
