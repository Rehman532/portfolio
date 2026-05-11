'use client'

import { useState, useEffect } from 'react'
import { Coffee, AlertTriangle, Copy, Clock, TrendingUp } from 'lucide-react'

interface Beverage {
  name: string
  caffeine: number // mg per serving
  servingSize: string
  category: string
}

interface CaffeineResult {
  totalCaffeine: number
  safeLevel: 'safe' | 'moderate' | 'high' | 'dangerous'
  recommendations: string[]
  timeToMetabolize: number
  equivalentBeverages: { name: string; servings: number }[]
}

const beverages: Beverage[] = [
  // Coffee
  { name: 'Brewed Coffee', caffeine: 95, servingSize: '8 oz', category: 'Coffee' },
  { name: 'Espresso', caffeine: 64, servingSize: '1 oz', category: 'Coffee' },
  { name: 'Instant Coffee', caffeine: 63, servingSize: '8 oz', category: 'Coffee' },
  { name: 'Cold Brew', caffeine: 150, servingSize: '12 oz', category: 'Coffee' },
  { name: 'Decaf Coffee', caffeine: 2, servingSize: '8 oz', category: 'Coffee' },
  
  // Tea
  { name: 'Black Tea', caffeine: 47, servingSize: '8 oz', category: 'Tea' },
  { name: 'Green Tea', caffeine: 28, servingSize: '8 oz', category: 'Tea' },
  { name: 'White Tea', caffeine: 15, servingSize: '8 oz', category: 'Tea' },
  { name: 'Oolong Tea', caffeine: 38, servingSize: '8 oz', category: 'Tea' },
  { name: 'Herbal Tea', caffeine: 0, servingSize: '8 oz', category: 'Tea' },
  { name: 'Iced Tea', caffeine: 25, servingSize: '8 oz', category: 'Tea' },
  
  // Energy Drinks
  { name: 'Red Bull', caffeine: 80, servingSize: '8.4 oz', category: 'Energy' },
  { name: 'Monster Energy', caffeine: 160, servingSize: '16 oz', category: 'Energy' },
  { name: '5-Hour Energy', caffeine: 200, servingSize: '2 oz', category: 'Energy' },
  { name: 'Rockstar', caffeine: 160, servingSize: '16 oz', category: 'Energy' },
  
  // Soft Drinks
  { name: 'Coca-Cola', caffeine: 34, servingSize: '12 oz', category: 'Soft Drink' },
  { name: 'Pepsi', caffeine: 38, servingSize: '12 oz', category: 'Soft Drink' },
  { name: 'Diet Coke', caffeine: 46, servingSize: '12 oz', category: 'Soft Drink' },
  { name: 'Mountain Dew', caffeine: 54, servingSize: '12 oz', category: 'Soft Drink' },
  { name: 'Dr Pepper', caffeine: 41, servingSize: '12 oz', category: 'Soft Drink' },
  
  // Other
  { name: 'Dark Chocolate', caffeine: 12, servingSize: '1 oz', category: 'Other' },
  { name: 'Milk Chocolate', caffeine: 6, servingSize: '1 oz', category: 'Other' },
  { name: 'Energy Gum', caffeine: 100, servingSize: '2 pieces', category: 'Other' },
  { name: 'Caffeine Pills', caffeine: 200, servingSize: '1 tablet', category: 'Other' }
]

export default function CaffeineCalculatorTool() {
  const [weight, setWeight] = useState('')
  const [selectedBeverages, setSelectedBeverages] = useState<{ name: string; servings: number }[]>([])
  const [customCaffeine, setCustomCaffeine] = useState('')
  const [results, setResults] = useState<CaffeineResult>({
    totalCaffeine: 0,
    safeLevel: 'safe',
    recommendations: [],
    timeToMetabolize: 0,
    equivalentBeverages: []
  })

  const calculateCaffeine = () => {
    const weightKg = parseFloat(weight) || 70 // Default 70kg
    const customMg = parseFloat(customCaffeine) || 0
    
    // Calculate total caffeine from selected beverages
    const beverageCaffeine = selectedBeverages.reduce((total, selected) => {
      const beverage = beverages.find(b => b.name === selected.name)
      return total + (beverage?.caffeine || 0) * selected.servings
    }, 0)
    
    const totalCaffeine = beverageCaffeine + customMg

    // Determine safe level (FDA recommends 400mg per day for adults)
    let safeLevel: 'safe' | 'moderate' | 'high' | 'dangerous'
    let recommendations: string[] = []

    if (totalCaffeine <= 100) {
      safeLevel = 'safe'
      recommendations = ['Caffeine level is within safe limits', 'You can consume more if needed']
    } else if (totalCaffeine <= 200) {
      safeLevel = 'moderate'
      recommendations = ['Moderate caffeine intake', 'Consider timing your consumption', 'Monitor for side effects']
    } else if (totalCaffeine <= 400) {
      safeLevel = 'high'
      recommendations = ['High caffeine intake - be cautious', 'Avoid additional caffeine today', 'Monitor for anxiety or sleep issues']
    } else {
      safeLevel = 'dangerous'
      recommendations = ['Dangerous caffeine level - stop consumption', 'Seek medical attention if symptoms occur', 'Stay hydrated and rest']
    }

    // Calculate time to metabolize (average 5-6 hours to eliminate half)
    const timeToMetabolize = Math.ceil(totalCaffeine / 50) // Rough estimate: 50mg per hour

    // Calculate equivalent beverages
    const equivalentBeverages = [
      { name: 'Cups of Coffee', servings: Math.round(totalCaffeine / 95 * 10) / 10 },
      { name: 'Cans of Coke', servings: Math.round(totalCaffeine / 34 * 10) / 10 },
      { name: 'Energy Drinks', servings: Math.round(totalCaffeine / 80 * 10) / 10 }
    ]

    setResults({
      totalCaffeine,
      safeLevel,
      recommendations,
      timeToMetabolize,
      equivalentBeverages
    })
  }

  useEffect(() => {
    calculateCaffeine()
  }, [weight, selectedBeverages, customCaffeine])

  const updateBeverageServings = (beverageName: string, servings: number) => {
    setSelectedBeverages(prev => {
      const existing = prev.find(b => b.name === beverageName)
      if (existing) {
        if (servings === 0) {
          return prev.filter(b => b.name !== beverageName)
        }
        return prev.map(b => b.name === beverageName ? { ...b, servings } : b)
      } else if (servings > 0) {
        return [...prev, { name: beverageName, servings }]
      }
      return prev
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const resetCalculator = () => {
    setWeight('')
    setSelectedBeverages([])
    setCustomCaffeine('')
  }

  const getSafeLevelColor = (level: string) => {
    switch (level) {
      case 'safe': return 'text-green-600 dark:text-green-400'
      case 'moderate': return 'text-yellow-600 dark:text-yellow-400'
      case 'high': return 'text-orange-600 dark:text-orange-400'
      case 'dangerous': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getSafeLevelIcon = (level: string) => {
    switch (level) {
      case 'safe': return '✅'
      case 'moderate': return '⚠️'
      case 'high': return '🔶'
      case 'dangerous': return '🚨'
      default: return 'ℹ️'
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-brown-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4 flex items-center gap-2">
          <Coffee size={20} />
          Caffeine Calculator
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Body Weight (kg) - Optional
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight..."
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Custom Caffeine (mg) - Optional
            </label>
            <input
              type="number"
              value={customCaffeine}
              onChange={(e) => setCustomCaffeine(e.target.value)}
              placeholder="Enter custom caffeine amount..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Beverage Selection */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
          Select Beverages
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {beverages.map((beverage) => (
            <div key={beverage.name} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  {beverage.name}
                </h4>
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                  <span>{beverage.servingSize}</span>
                  <span>{beverage.caffeine}mg caffeine</span>
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  {beverage.category}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateBeverageServings(beverage.name, Math.max(0, (selectedBeverages.find(b => b.name === beverage.name)?.servings || 0) - 0.5))}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  -
                </button>
                <input
                  type="number"
                  value={selectedBeverages.find(b => b.name === beverage.name)?.servings || ''}
                  onChange={(e) => updateBeverageServings(beverage.name, parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  step="0.5"
                  min="0"
                  className="w-16 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={() => updateBeverageServings(beverage.name, (selectedBeverages.find(b => b.name === beverage.name)?.servings || 0) + 0.5)}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results Section */}
      {results.totalCaffeine > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2 mb-2">
              <Coffee size={20} className="text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Total Caffeine</span>
            </div>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {results.totalCaffeine}mg
            </div>
            <button
              onClick={() => copyToClipboard(results.totalCaffeine.toString() + 'mg')}
              className="mt-2 text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 flex items-center gap-1"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={20} className="text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Safety Level</span>
            </div>
            <div className={`text-2xl font-bold ${getSafeLevelColor(results.safeLevel)}`}>
              {getSafeLevelIcon(results.safeLevel)} {results.safeLevel.toUpperCase()}
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={20} className="text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Metabolism Time</span>
            </div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {results.timeToMetabolize}h
            </div>
            <div className="text-sm text-green-700 dark:text-green-300 mt-1">
              To eliminate half
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Equivalents</span>
            </div>
            <div className="space-y-1">
              {results.equivalentBeverages.map((equiv, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium text-blue-900 dark:text-blue-100">
                    {equiv.servings}
                  </span>
                  <span className="text-blue-700 dark:text-blue-300 ml-1">
                    {equiv.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {results.recommendations.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
            Recommendations
          </h3>
          <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
            {results.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Caffeine Facts */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          ☕ Caffeine Facts
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>• FDA recommends maximum 400mg caffeine per day for healthy adults</li>
          <li>• Caffeine half-life is typically 5-6 hours in healthy adults</li>
          <li>• Individual sensitivity varies based on genetics and tolerance</li>
          <li>• Avoid caffeine 6 hours before bedtime for better sleep</li>
          <li>• Pregnant women should limit to 200mg or less per day</li>
          <li>• Children and adolescents should avoid high caffeine intake</li>
        </ul>
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
    </div>
  )
}
