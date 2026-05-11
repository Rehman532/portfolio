'use client'

import { useState, useEffect } from 'react'
import { Percent, DollarSign, Tag, Copy } from 'lucide-react'

export default function DiscountCalculatorTool() {
  const [originalPrice, setOriginalPrice] = useState('')
  const [discountPercentage, setDiscountPercentage] = useState('')
  const [results, setResults] = useState({
    discountAmount: 0,
    finalPrice: 0,
    youSave: 0
  })

  useEffect(() => {
    const price = parseFloat(originalPrice) || 0
    const discount = parseFloat(discountPercentage) || 0
    const discountAmount = price * (discount / 100)
    const finalPrice = price - discountAmount

    setResults({
      discountAmount,
      finalPrice,
      youSave: discountAmount
    })
  }, [originalPrice, discountPercentage])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const resetCalculator = () => {
    setOriginalPrice('')
    setDiscountPercentage('')
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Original Price ($)
          </label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Discount Percentage (%)
          </label>
          <input
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Quick Discounts */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Quick Discount Select
        </label>
        <div className="flex flex-wrap gap-2">
          {[5, 10, 15, 20, 25, 30, 40, 50].map(discount => (
            <button
              key={discount}
              onClick={() => setDiscountPercentage(discount.toString())}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                discountPercentage === discount.toString()
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {discount}% OFF
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <Tag size={20} className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Original Price</span>
          </div>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            ${parseFloat(originalPrice || '0').toFixed(2)}
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-2">
            <Percent size={20} className="text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">You Save</span>
          </div>
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">
            ${results.discountAmount.toFixed(2)}
          </div>
          <button
            onClick={() => copyToClipboard(results.discountAmount.toFixed(2))}
            className="mt-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1"
          >
            <Copy size={14} />
            Copy
          </button>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={20} className="text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Final Price</span>
          </div>
          <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
            ${results.finalPrice.toFixed(2)}
          </div>
          <button
            onClick={() => copyToClipboard(results.finalPrice.toFixed(2))}
            className="mt-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1"
          >
            <Copy size={14} />
            Copy
          </button>
        </div>
      </div>

      {/* Visual Discount Display */}
      {parseFloat(originalPrice) > 0 && parseFloat(discountPercentage) > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Discount Breakdown
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Original Price:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                ${parseFloat(originalPrice).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Discount ({discountPercentage}%):</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                -${results.discountAmount.toFixed(2)}
              </span>
            </div>
            <div className="border-t pt-3 flex justify-between items-center">
              <span className="font-semibold text-gray-900 dark:text-white">Final Price:</span>
              <span className="font-bold text-lg text-purple-600 dark:text-purple-400">
                ${results.finalPrice.toFixed(2)}
              </span>
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
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
          💡 Shopping Tips
        </h3>
        <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
          <li>• Always check for coupon codes before making a purchase</li>
          <li>• Compare prices across different retailers</li>
          <li>• Look for seasonal sales and clearance events</li>
          <li>• Consider buying in bulk for better discounts</li>
          <li>• Sign up for newsletters to get exclusive discounts</li>
        </ul>
      </div>
    </div>
  )
}
