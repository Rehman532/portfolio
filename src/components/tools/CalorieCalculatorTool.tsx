'use client'

import { useState, useEffect } from 'react'
import { Calculator, Flame, Copy, Activity } from 'lucide-react'

export default function CalorieCalculatorTool() {
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [activity, setActivity] = useState('moderate')
  const [results, setResults] = useState({
    bmr: 0,
    tdee: 0,
    weightLoss: 0,
    weightMaintenance: 0,
    weightGain: 0
  })

  useEffect(() => {
    const ageNum = parseInt(age) || 0
    const weightNum = parseFloat(weight) || 0
    const heightNum = parseFloat(height) || 0

    if (ageNum > 0 && weightNum > 0 && heightNum > 0) {
      let bmr = 0

      // Harris-Benedict Equation
      if (gender === 'male') {
        bmr = 88.362 + (13.397 * weightNum) + (4.799 * heightNum) - (5.677 * ageNum)
      } else {
        bmr = 447.593 + (9.247 * weightNum) + (3.098 * heightNum) - (4.330 * ageNum)
      }

      // Activity multipliers
      const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
      }

      const tdee = bmr * activityMultipliers[activity as keyof typeof activityMultipliers]

      setResults({
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        weightLoss: Math.round(tdee - 500), // 500 calorie deficit
        weightMaintenance: Math.round(tdee),
        weightGain: Math.round(tdee + 500) // 500 calorie surplus
      })
    }
  }, [age, gender, weight, height, activity])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const resetCalculator = () => {
    setAge('')
    setGender('male')
    setWeight('')
    setHeight('')
    setActivity('moderate')
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <Calculator size={20} />
          Calorie Calculator
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight..."
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Activity Level
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            >
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Light (1-3 days/week)</option>
              <option value="moderate">Moderate (3-5 days/week)</option>
              <option value="active">Active (6-7 days/week)</option>
              <option value="veryActive">Very Active (twice per day)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {results.bmr > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <Flame size={20} className="text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">BMR (Basal Metabolic Rate)</span>
            </div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {results.bmr} calories/day
            </div>
            <div className="text-sm text-green-700 dark:text-green-300 mt-1">
              Calories needed at complete rest
            </div>
            <button
              onClick={() => copyToClipboard(results.bmr.toString())}
              className="mt-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1"
            >
              <Copy size={14} />
              Copy BMR
            </button>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">TDEE (Total Daily Energy)</span>
            </div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {results.tdee} calories/day
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Calories needed with activity
            </div>
            <button
              onClick={() => copyToClipboard(results.tdee.toString())}
              className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
            >
              <Copy size={14} />
              Copy TDEE
            </button>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Weight Loss</h4>
            <div className="text-2xl font-bold text-red-900 dark:text-red-100">
              {results.weightLoss} calories/day
            </div>
            <div className="text-sm text-red-700 dark:text-red-300 mt-1">
              ~0.5 kg (1 lb) weight loss per week
            </div>
            <button
              onClick={() => copyToClipboard(results.weightLoss.toString())}
              className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center gap-1"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Weight Gain</h4>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {results.weightGain} calories/day
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300 mt-1">
              ~0.5 kg (1 lb) weight gain per week
            </div>
            <button
              onClick={() => copyToClipboard(results.weightGain.toString())}
              className="mt-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
          💡 Calorie Tips
        </h3>
        <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
          <li>• Consult a healthcare professional before making significant dietary changes</li>
          <li>• Focus on nutrient-dense foods rather than just calories</li>
          <li>• Combine calorie management with regular exercise</li>
          <li>• Track your progress and adjust as needed</li>
          <li>• Sustainable changes work better than extreme diets</li>
          <li>• Listen to your body's hunger and fullness signals</li>
        </ul>
      </div>

      <button
        onClick={resetCalculator}
        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
      >
        Reset Calculator
      </button>
    </div>
  )
}
