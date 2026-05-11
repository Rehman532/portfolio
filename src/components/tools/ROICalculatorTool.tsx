'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, DollarSign, Calculator, Copy, Target } from 'lucide-react'

interface ROIResult {
  roi: number
  roiPercentage: number
  annualizedROI: number
  totalReturn: number
  netProfit: number
  paybackPeriod: number
}

export default function ROICalculatorTool() {
  const [initialInvestment, setInitialInvestment] = useState('')
  const [finalValue, setFinalValue] = useState('')
  const [investmentPeriod, setInvestmentPeriod] = useState('')
  const [periodType, setPeriodType] = useState<'years' | 'months' | 'days'>('years')
  const [results, setResults] = useState<ROIResult>({
    roi: 0,
    roiPercentage: 0,
    annualizedROI: 0,
    totalReturn: 0,
    netProfit: 0,
    paybackPeriod: 0
  })

  const calculateROI = () => {
    const initial = parseFloat(initialInvestment) || 0
    const final = parseFloat(finalValue) || 0
    const period = parseFloat(investmentPeriod) || 0

    if (initial <= 0 || period <= 0) {
      setResults({
        roi: 0,
        roiPercentage: 0,
        annualizedROI: 0,
        totalReturn: 0,
        netProfit: 0,
        paybackPeriod: 0
      })
      return
    }

    const netProfit = final - initial
    const roi = (netProfit / initial) * 100
    const totalReturn = final / initial

    // Convert period to years for annualized calculation
    let years = period
    if (periodType === 'months') {
      years = period / 12
    } else if (periodType === 'days') {
      years = period / 365
    }

    // Calculate annualized ROI
    let annualizedROI = 0
    if (years > 0 && totalReturn > 0) {
      annualizedROI = (Math.pow(totalReturn, 1 / years) - 1) * 100
    }

    // Calculate payback period (if profitable)
    let paybackPeriod = 0
    if (roi > 0) {
      paybackPeriod = period / (roi / 100 + 1)
    }

    setResults({
      roi,
      roiPercentage: roi,
      annualizedROI,
      totalReturn,
      netProfit,
      paybackPeriod
    })
  }

  useEffect(() => {
    calculateROI()
  }, [initialInvestment, finalValue, investmentPeriod, periodType])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const resetCalculator = () => {
    setInitialInvestment('')
    setFinalValue('')
    setInvestmentPeriod('')
    setPeriodType('years')
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const getROIStatus = (roi: number) => {
    if (roi > 20) return { text: 'Excellent', color: 'text-green-600 dark:text-green-400' }
    if (roi > 10) return { text: 'Good', color: 'text-blue-600 dark:text-blue-400' }
    if (roi > 0) return { text: 'Positive', color: 'text-yellow-600 dark:text-yellow-400' }
    if (roi === 0) return { text: 'Break Even', color: 'text-gray-600 dark:text-gray-400' }
    return { text: 'Negative', color: 'text-red-600 dark:text-red-400' }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <Target size={20} />
          ROI Calculator
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Initial Investment ($)
            </label>
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              placeholder="Enter initial investment..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Final Value ($)
            </label>
            <input
              type="number"
              value={finalValue}
              onChange={(e) => setFinalValue(e.target.value)}
              placeholder="Enter final value..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Investment Period
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={investmentPeriod}
                onChange={(e) => setInvestmentPeriod(e.target.value)}
                placeholder="Enter period..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
              <select
                value={periodType}
                onChange={(e) => setPeriodType(e.target.value as 'years' | 'months' | 'days')}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
                <option value="days">Days</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {results.roi !== 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={20} className="text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">ROI</span>
            </div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {results.roiPercentage.toFixed(2)}%
            </div>
            <div className={`text-sm mt-1 ${getROIStatus(results.roi).color}`}>
              {getROIStatus(results.roi).text}
            </div>
            <button
              onClick={() => copyToClipboard(results.roiPercentage.toFixed(2) + '%')}
              className="mt-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <Calculator size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Annualized ROI</span>
            </div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {results.annualizedROI.toFixed(2)}%
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Per year
            </div>
            <button
              onClick={() => copyToClipboard(results.annualizedROI.toFixed(2) + '%')}
              className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={20} className="text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Net Profit</span>
            </div>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {formatCurrency(results.netProfit)}
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300 mt-1">
              Total gain/loss
            </div>
            <button
              onClick={() => copyToClipboard(formatCurrency(results.netProfit))}
              className="mt-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2 mb-2">
              <Target size={20} className="text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Total Return</span>
            </div>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {results.totalReturn.toFixed(2)}x
            </div>
            <div className="text-sm text-orange-700 dark:text-orange-300 mt-1">
              Investment multiple
            </div>
          </div>

          {results.paybackPeriod > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={20} className="text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Payback Period</span>
              </div>
              <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                {results.paybackPeriod.toFixed(1)} {periodType}
              </div>
              <div className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                Time to recover investment
              </div>
            </div>
          )}
        </div>
      )}

      {/* Investment Analysis */}
      {parseFloat(initialInvestment) > 0 && parseFloat(finalValue) > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Investment Analysis
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Investment Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Initial Investment:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(parseFloat(initialInvestment) || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Final Value:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(parseFloat(finalValue) || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Investment Period:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {investmentPeriod} {periodType}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Performance Metrics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">ROI Status:</span>
                  <span className={`font-medium ${getROIStatus(results.roi).color}`}>
                    {getROIStatus(results.roi).text}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Annualized Return:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {results.annualizedROI.toFixed(2)}% per year
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Investment Multiple:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {results.totalReturn.toFixed(2)}x
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Investment Tips */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
          💡 Investment Tips
        </h3>
        <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
          <li>• ROI doesn't account for investment risk or time value of money</li>
          <li>• Annualized ROI helps compare investments with different time periods</li>
          <li>• Consider inflation when evaluating long-term returns</li>
          <li>• Diversification can reduce risk while maintaining returns</li>
          <li>• Past performance doesn't guarantee future results</li>
          <li>• Factor in taxes, fees, and transaction costs for accurate returns</li>
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
