'use client'

import { useState, useEffect } from 'react'
import { Calculator, DollarSign, TrendingUp, Copy, Calendar } from 'lucide-react'

interface LoanDetails {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  payoffDate: string
}

interface AmortizationRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

export default function LoanCalculatorTool() {
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('')
  const [termType, setTermType] = useState<'years' | 'months'>('years')
  const [results, setResults] = useState<LoanDetails>({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    payoffDate: ''
  })
  const [amortization, setAmortization] = useState<AmortizationRow[]>([])

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount) || 0
    const annualRate = parseFloat(interestRate) || 0
    const termValue = parseFloat(loanTerm) || 0
    
    const months = termType === 'years' ? termValue * 12 : termValue
    const monthlyRate = annualRate / 100 / 12

    if (principal <= 0 || annualRate < 0 || months <= 0) {
      setResults({
        monthlyPayment: 0,
        totalPayment: 0,
        totalInterest: 0,
        payoffDate: ''
      })
      setAmortization([])
      return
    }

    // Calculate monthly payment
    let monthlyPayment = 0
    if (monthlyRate === 0) {
      monthlyPayment = principal / months
    } else {
      monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                       (Math.pow(1 + monthlyRate, months) - 1)
    }

    const totalPayment = monthlyPayment * months
    const totalInterest = totalPayment - principal

    // Calculate payoff date
    const startDate = new Date()
    const payoffDate = new Date(startDate)
    payoffDate.setMonth(payoffDate.getMonth() + months)

    // Generate amortization schedule
    const amortizationSchedule: AmortizationRow[] = []
    let remainingBalance = principal

    for (let month = 1; month <= Math.min(months, 12); month++) {
      const interestPayment = remainingBalance * monthlyRate
      const principalPayment = monthlyPayment - interestPayment
      remainingBalance -= principalPayment

      amortizationSchedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance)
      })
    }

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      payoffDate: payoffDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    })
    setAmortization(amortizationSchedule)
  }

  useEffect(() => {
    calculateLoan()
  }, [loanAmount, interestRate, loanTerm, termType])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const resetCalculator = () => {
    setLoanAmount('')
    setInterestRate('')
    setLoanTerm('')
    setTermType('years')
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <Calculator size={20} />
          Loan Calculator
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Loan Amount ($)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter interest rate..."
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Loan Term
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="Enter term..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
              <select
                value={termType}
                onChange={(e) => setTermType(e.target.value as 'years' | 'months')}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {results.monthlyPayment > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={20} className="text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Monthly Payment</span>
            </div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {formatCurrency(results.monthlyPayment)}
            </div>
            <button
              onClick={() => copyToClipboard(formatCurrency(results.monthlyPayment))}
              className="mt-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Payment</span>
            </div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {formatCurrency(results.totalPayment)}
            </div>
            <button
              onClick={() => copyToClipboard(formatCurrency(results.totalPayment))}
              className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={20} className="text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Interest</span>
            </div>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {formatCurrency(results.totalInterest)}
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300 mt-1">
              {((results.totalInterest / parseFloat(loanAmount || '1')) * 100).toFixed(1)}% of principal
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={20} className="text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Payoff Date</span>
            </div>
            <div className="text-lg font-bold text-orange-900 dark:text-orange-100">
              {results.payoffDate}
            </div>
          </div>
        </div>
      )}

      {/* Amortization Schedule */}
      {amortization.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Amortization Schedule (First 12 Months)
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Month</th>
                  <th className="text-right py-2 px-3 text-gray-700 dark:text-gray-300">Payment</th>
                  <th className="text-right py-2 px-3 text-gray-700 dark:text-gray-300">Principal</th>
                  <th className="text-right py-2 px-3 text-gray-700 dark:text-gray-300">Interest</th>
                  <th className="text-right py-2 px-3 text-gray-700 dark:text-gray-300">Balance</th>
                </tr>
              </thead>
              <tbody>
                {amortization.map((row) => (
                  <tr key={row.month} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-2 px-3 text-gray-900 dark:text-white">{row.month}</td>
                    <td className="text-right py-2 px-3 text-gray-900 dark:text-white">
                      {formatCurrency(row.payment)}
                    </td>
                    <td className="text-right py-2 px-3 text-gray-900 dark:text-white">
                      {formatCurrency(row.principal)}
                    </td>
                    <td className="text-right py-2 px-3 text-gray-900 dark:text-white">
                      {formatCurrency(row.interest)}
                    </td>
                    <td className="text-right py-2 px-3 text-gray-900 dark:text-white">
                      {formatCurrency(row.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Loan Tips */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
          💡 Loan Tips
        </h3>
        <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
          <li>• Compare interest rates from multiple lenders before committing</li>
          <li>• Consider making extra payments to reduce total interest</li>
          <li>• Shorter loan terms mean higher monthly payments but less total interest</li>
          <li>• Check your credit score to qualify for better rates</li>
          <li>• Factor in additional costs like insurance and taxes</li>
          <li>• Read the loan agreement carefully for hidden fees or penalties</li>
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
