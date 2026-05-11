'use client'

import { useState, useEffect } from 'react'
import { Flame, Activity, Clock, Copy, TrendingUp } from 'lucide-react'

interface ActivityData {
  name: string
  mets: number
  category: string
}

interface BurnResult {
  caloriesBurned: number
  duration: number
  activities: { name: string; calories: number }[]
}

const activities: ActivityData[] = [
  // Light Activities
  { name: 'Sleeping', mets: 0.9, category: 'Rest' },
  { name: 'Watching TV', mets: 1.3, category: 'Rest' },
  { name: 'Reading', mets: 1.5, category: 'Rest' },
  { name: 'Cooking', mets: 2.0, category: 'Light' },
  { name: 'Walking (slow)', mets: 2.5, category: 'Light' },
  { name: 'Housework', mets: 3.0, category: 'Light' },
  { name: 'Gardening', mets: 3.5, category: 'Light' },
  
  // Moderate Activities
  { name: 'Walking (brisk)', mets: 4.0, category: 'Moderate' },
  { name: 'Cycling (light)', mets: 4.5, category: 'Moderate' },
  { name: 'Swimming (light)', mets: 5.0, category: 'Moderate' },
  { name: 'Dancing', mets: 5.5, category: 'Moderate' },
  { name: 'Yoga', mets: 2.5, category: 'Moderate' },
  { name: 'Weight Training', mets: 6.0, category: 'Moderate' },
  
  // Vigorous Activities
  { name: 'Running (slow)', mets: 7.0, category: 'Vigorous' },
  { name: 'Cycling (moderate)', mets: 7.5, category: 'Vigorous' },
  { name: 'Swimming (vigorous)', mets: 8.0, category: 'Vigorous' },
  { name: 'Running (moderate)', mets: 9.0, category: 'Vigorous' },
  { name: 'Jumping Rope', mets: 10.0, category: 'Vigorous' },
  { name: 'Running (fast)', mets: 12.0, category: 'Vigorous' },
  { name: 'HIIT Workout', mets: 13.0, category: 'Vigorous' },
  { name: 'Sprinting', mets: 15.0, category: 'Vigorous' }
]

export default function CalorieBurnerTool() {
  const [weight, setWeight] = useState('')
  const [duration, setDuration] = useState('')
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [results, setResults] = useState<BurnResult>({
    caloriesBurned: 0,
    duration: 0,
    activities: []
  })

  const calculateCaloriesBurned = () => {
    const weightKg = parseFloat(weight) || 0
    const durationMin = parseFloat(duration) || 0

    if (weightKg <= 0 || durationMin <= 0) {
      setResults({
        caloriesBurned: 0,
        duration: 0,
        activities: []
      })
      return
    }

    const activityResults = selectedActivities.map(activityName => {
      const activity = activities.find(a => a.name === activityName)
      if (!activity) return { name: activityName, calories: 0 }

      // METs formula: Calories = METs × Weight(kg) × Time(hours)
      const caloriesPerMinute = (activity.mets * weightKg) / 60
      const totalCalories = caloriesPerMinute * durationMin

      return {
        name: activityName,
        calories: totalCalories
      }
    })

    const totalCalories = activityResults.reduce((sum, activity) => sum + activity.calories, 0)

    setResults({
      caloriesBurned: totalCalories,
      duration: durationMin,
      activities: activityResults
    })
  }

  useEffect(() => {
    calculateCaloriesBurned()
  }, [weight, duration, selectedActivities])

  const toggleActivity = (activityName: string) => {
    setSelectedActivities(prev => 
      prev.includes(activityName)
        ? prev.filter(a => a !== activityName)
        : [...prev, activityName]
    )
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const resetCalculator = () => {
    setWeight('')
    setDuration('')
    setSelectedActivities([])
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Rest': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'Light': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'Vigorous': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getCaloriesPerHour = (activity: ActivityData, weightKg: number) => {
    return Math.round(activity.mets * weightKg)
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <Flame size={20} />
          Calorie Burn Calculator
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight..."
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter duration..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Activities Selection */}
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
          <Activity size={20} />
          Select Activities
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {activities.map((activity) => (
            <button
              key={activity.name}
              onClick={() => toggleActivity(activity.name)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedActivities.includes(activity.name)
                  ? 'border-green-500 bg-green-100 dark:bg-green-900/30'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-green-300'
              }`}
            >
              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white text-sm">
                  {activity.name}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(activity.category)}`}>
                    {activity.category}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {activity.mets} METs
                  </span>
                </div>
                {weight && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {getCaloriesPerHour(activity, parseFloat(weight) || 0)} cal/hr
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {selectedActivities.length > 0 && (
          <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-700">
            <div className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">
              Selected Activities ({selectedActivities.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedActivities.map(activity => (
                <span
                  key={activity}
                  className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-xs"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {results.caloriesBurned > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2 mb-2">
              <Flame size={20} className="text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Total Calories Burned</span>
            </div>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {Math.round(results.caloriesBurned)}
            </div>
            <button
              onClick={() => copyToClipboard(Math.round(results.caloriesBurned).toString())}
              className="mt-2 text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 flex items-center gap-1"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={20} className="text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Duration</span>
            </div>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {results.duration} min
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300 mt-1">
              {(results.duration / 60).toFixed(1)} hours
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Calories per Hour</span>
            </div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {Math.round((results.caloriesBurned / results.duration) * 60)}
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Average rate
            </div>
          </div>
        </div>
      )}

      {/* Activity Breakdown */}
      {results.activities.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Activity Breakdown
          </h3>
          
          <div className="space-y-3">
            {results.activities.map((activity, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {activity.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {results.duration} minutes
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                      {Math.round(activity.calories)} cal
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {((activity.calories / results.caloriesBurned) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exercise Tips */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
          💡 Exercise Tips
        </h3>
        <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
          <li>• METs (Metabolic Equivalent) measure energy expenditure</li>
          <li>• 1 MET = resting metabolic rate (sitting quietly)</li>
          <li>• Combine different activities for balanced fitness</li>
          <li>• Higher METs = more calories burned per minute</li>
          <li>• Consult healthcare provider before starting new exercise routines</li>
          <li>• Actual calories burned may vary based on individual factors</li>
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
