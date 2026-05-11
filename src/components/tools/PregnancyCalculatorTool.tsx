'use client'

import { useState, useEffect } from 'react'
import { Baby, Calendar, Copy, Heart, Activity } from 'lucide-react'

interface PregnancyData {
  dueDate: string
  currentWeek: number
  currentTrimester: number
  daysRemaining: number
  conceptionDate: string
  weeksRemaining: number
  fetalSize: string
  fetalWeight: string
  trimesterInfo: {
    name: string
    weeks: string
    description: string
  }
}

export default function PregnancyCalculatorTool() {
  const [lastPeriodDate, setLastPeriodDate] = useState('')
  const [cycleLength, setCycleLength] = useState('28')
  const [results, setResults] = useState<PregnancyData>({
    dueDate: '',
    currentWeek: 0,
    currentTrimester: 0,
    daysRemaining: 0,
    conceptionDate: '',
    weeksRemaining: 0,
    fetalSize: '',
    fetalWeight: '',
    trimesterInfo: {
      name: '',
      weeks: '',
      description: ''
    }
  })

  const calculatePregnancy = () => {
    if (!lastPeriodDate) {
      return
    }

    const lastPeriod = new Date(lastPeriodDate)
    const cycleLengthDays = parseInt(cycleLength) || 28
    const today = new Date()

    // Calculate due date (280 days from LMP + adjustment for cycle length)
    const dueDate = new Date(lastPeriod)
    dueDate.setDate(dueDate.getDate() + 280 + (cycleLengthDays - 28))

    // Calculate conception date (approximately 14 days after LMP, adjusted for cycle length)
    const conceptionDate = new Date(lastPeriod)
    conceptionDate.setDate(conceptionDate.getDate() + 14 + (cycleLengthDays - 28))

    // Calculate current week of pregnancy
    const daysSinceLMP = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24))
    const currentWeek = Math.floor(daysSinceLMP / 7) + 1
    const daysRemaining = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    const weeksRemaining = Math.floor(daysRemaining / 7)

    // Determine trimester
    let currentTrimester = 1
    if (currentWeek > 13 && currentWeek <= 27) {
      currentTrimester = 2
    } else if (currentWeek > 27) {
      currentTrimester = 3
    }

    // Get fetal development info
    const fetalInfo = getFetalDevelopment(currentWeek)
    const trimesterInfo = getTrimesterInfo(currentTrimester)

    setResults({
      dueDate: dueDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      currentWeek: Math.min(currentWeek, 42),
      currentTrimester,
      daysRemaining: Math.max(0, daysRemaining),
      conceptionDate: conceptionDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      weeksRemaining: Math.max(0, weeksRemaining),
      fetalSize: fetalInfo.size,
      fetalWeight: fetalInfo.weight,
      trimesterInfo
    })
  }

  const getFetalDevelopment = (week: number) => {
    const developmentData = {
      1: { size: '0.1 mm', weight: '< 1 gram' },
      4: { size: '5 mm', weight: '< 1 gram' },
      8: { size: '1.6 cm', weight: '1 gram' },
      12: { size: '5.4 cm', weight: '14 grams' },
      16: { size: '11.6 cm', weight: '100 grams' },
      20: { size: '16.4 cm', weight: '300 grams' },
      24: { size: '21.6 cm', weight: '600 grams' },
      28: { size: '26.7 cm', weight: '1100 grams' },
      32: { size: '30.9 cm', weight: '1700 grams' },
      36: { size: '34.6 cm', weight: '2500 grams' },
      40: { size: '37.6 cm', weight: '3400 grams' }
    }

    // Find closest week
    const weeks = Object.keys(developmentData).map(Number).sort((a, b) => a - b)
    const closestWeek = weeks.reduce((prev, curr) => 
      Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev
    )

    return developmentData[closestWeek as keyof typeof developmentData]
  }

  const getTrimesterInfo = (trimester: number) => {
    const trimesterData = {
      1: {
        name: 'First Trimester',
        weeks: 'Weeks 1-13',
        description: 'Rapid development, organ formation, early symptoms common'
      },
      2: {
        name: 'Second Trimester',
        weeks: 'Weeks 14-27',
        description: 'Growth spurt, movement begins, mother feels better'
      },
      3: {
        name: 'Third Trimester',
        weeks: 'Weeks 28-40+',
        description: 'Final growth, preparation for birth, increased discomfort'
      }
    }

    return trimesterData[trimester as keyof typeof trimesterData]
  }

  useEffect(() => {
    calculatePregnancy()
  }, [lastPeriodDate, cycleLength])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const resetCalculator = () => {
    setLastPeriodDate('')
    setCycleLength('28')
  }

  const getTrimesterColor = (trimester: number) => {
    switch (trimester) {
      case 1: return 'text-pink-600 dark:text-pink-400'
      case 2: return 'text-purple-600 dark:text-purple-400'
      case 3: return 'text-blue-600 dark:text-blue-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-lg border border-pink-200 dark:border-pink-800">
        <h3 className="text-lg font-semibold text-pink-900 dark:text-pink-100 mb-4 flex items-center gap-2">
          <Baby size={20} />
          Pregnancy Calculator
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First Day of Last Period
            </label>
            <input
              type="date"
              value={lastPeriodDate}
              onChange={(e) => setLastPeriodDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Average Cycle Length (days)
            </label>
            <input
              type="number"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              placeholder="28"
              min="20"
              max="45"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      {results.dueDate && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={20} className="text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Due Date</span>
            </div>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {results.dueDate}
            </div>
            <button
              onClick={() => copyToClipboard(results.dueDate)}
              className="mt-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Current Week</span>
            </div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              Week {results.currentWeek}
            </div>
            <div className={`text-sm mt-1 ${getTrimesterColor(results.currentTrimester)}`}>
              {results.trimesterInfo.name}
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <Heart size={20} className="text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Baby Size</span>
            </div>
            <div className="text-lg font-bold text-green-900 dark:text-green-100">
              {results.fetalSize}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">
              {results.fetalWeight}
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={20} className="text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Time Remaining</span>
            </div>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {results.weeksRemaining} weeks
            </div>
            <div className="text-sm text-orange-700 dark:text-orange-300">
              {results.daysRemaining} days
            </div>
          </div>
        </div>
      )}

      {/* Pregnancy Timeline */}
      {results.currentWeek > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Pregnancy Timeline
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                {results.trimesterInfo.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {results.trimesterInfo.weeks}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {results.trimesterInfo.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Dates</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Conception:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {results.conceptionDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Due Date:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {results.dueDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Progress</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Pregnancy Progress:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {Math.round((results.currentWeek / 40) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((results.currentWeek / 40) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pregnancy Tips */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
          💡 Pregnancy Tips
        </h3>
        <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
          <li>• This calculator provides estimates - consult healthcare provider for accurate dates</li>
          <li>• Due dates are estimates - only 5% of babies born on their due date</li>
          <li>• Regular prenatal care is essential for monitoring health</li>
          <li>• Healthy nutrition and exercise support fetal development</li>
          <li>• Track symptoms and contact provider with concerns</li>
          <li>• Prepare for birth and postpartum care in advance</li>
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
