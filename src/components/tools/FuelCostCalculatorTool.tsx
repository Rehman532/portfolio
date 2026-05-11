'use client'

import { useState, useEffect } from 'react'
import { Car, Calculator, DollarSign, Copy, TrendingUp } from 'lucide-react'

export default function FuelCostCalculatorTool() {
  const [distance, setDistance] = useState('')
  const [fuelEfficiency, setFuelEfficiency] = useState('')
  const [fuelPrice, setFuelPrice] = useState('')
  const [results, setResults] = useState({
    totalFuel: 0,
    totalCost: 0,
    costPerMile: 0
  })

  useEffect(() => {
    const dist = parseFloat(distance) || 0
    const efficiency = parseFloat(fuelEfficiency) || 0
    const price = parseFloat(fuelPrice) || 0

    if (efficiency > 0) {
      const totalFuel = dist / efficiency
      const totalCost = totalFuel * price
      const costPerMile = totalCost / dist

      setResults({
        totalFuel,
        totalCost,
        costPerMile
      })
    }
  }, [distance, fuelEfficiency, fuelPrice])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const resetCalculator = () => {
    setDistance('')
    setFuelEfficiency('')
    setFuelPrice('')
    setResults({ totalFuel: 0, totalCost: 0, costPerMile: 0 })
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Distance (miles)
          </label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Enter distance..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Fuel Efficiency (miles/gallon)
          </label>
          <input
            type="number"
            value={fuelEfficiency}
            onChange={(e) => setFuelEfficiency(e.target.value)}
            placeholder="Enter fuel efficiency..."
            step="0.1"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Fuel Price ($/gallon)
          </label>
          <input
            type="number"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(e.target.value)}
            placeholder="Enter fuel price..."
            step="0.01"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Quick Presets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Quick Vehicle Presets
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            onClick={() => setFuelEfficiency('25')}
            className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
          >
            Sedan (25 mpg)
          </button>
          <button
            onClick={() => setFuelEfficiency('20')}
            className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
          >
            SUV (20 mpg)
          </button>
          <button
            onClick={() => setFuelEfficiency('30')}
            className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
          >
            Hybrid (30 mpg)
          </button>
          <button
            onClick={() => setFuelEfficiency('50')}
            className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
          >
            Electric (50 mpg)
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <Car size={20} className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Fuel Needed</span>
          </div>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            {results.totalFuel.toFixed(2)} gallons
          </div>
          <button
            onClick={() => copyToClipboard(results.totalFuel.toFixed(2))}
            className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
          >
            <Copy size={14} />
            Copy
          </button>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={20} className="text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Total Cost</span>
          </div>
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">
            ${results.totalCost.toFixed(2)}
          </div>
          <button
            onClick={() => copyToClipboard(results.totalCost.toFixed(2))}
            className="mt-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1"
          >
            <Copy size={14} />
            Copy
          </button>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} className="text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Cost per Mile</span>
          </div>
          <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
            ${results.costPerMile.toFixed(3)}
          </div>
          <button
            onClick={() => copyToClipboard(results.costPerMile.toFixed(3))}
            className="mt-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1"
          >
            <Copy size={14} />
            Copy
          </button>
        </div>
      </div>

      {/* Detailed Breakdown */}
      {parseFloat(distance) > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Trip Cost Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Trip Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Distance:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {parseFloat(distance).toLocaleString()} miles
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Fuel Efficiency:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {parseFloat(fuelEfficiency).toFixed(1)} mpg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Fuel Price:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${parseFloat(fuelPrice).toFixed(2)}/gallon
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Cost Analysis</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Fuel:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {results.totalFuel.toFixed(2)} gallons
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Cost:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${results.totalCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Cost per Mile:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${results.costPerMile.toFixed(3)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
          💡 Fuel Saving Tips
        </h3>
        <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
          <li>• Maintain steady speeds to improve fuel efficiency</li>
          <li>• Keep tires properly inflated for better mileage</li>
          <li>• Remove excess weight from your vehicle</li>
          <li>• Use cruise control on highways when possible</li>
          <li>• Plan routes to avoid traffic and reduce distance</li>
          <li>• Regular maintenance helps maintain optimal fuel efficiency</li>
        </ul>
      </div>
    </div>
  )
}
