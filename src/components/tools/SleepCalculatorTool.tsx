'use client'

import { useState, useEffect } from 'react'
import { Moon, Clock, Copy, Sun } from 'lucide-react'

interface SleepTime {
  bedtime: string
  wakeTime: string
  duration: number
}

export default function SleepCalculatorTool() {
  const [desiredWakeTime, setDesiredWakeTime] = useState('07:00')
  const [sleepCycles, setSleepCycles] = useState(6)
  const [results, setResults] = useState<SleepTime[]>([])

  const calculateSleepTimes = () => {
    const [hours, minutes] = desiredWakeTime.split(':').map(Number)
    const wakeTimeInMinutes = hours * 60 + minutes

    const sleepCycleDuration = 90 // 90 minutes per sleep cycle
    const fallAsleepTime = 15 // 15 minutes to fall asleep

    const times: SleepTime[] = []

    for (let i = 1; i <= sleepCycles; i++) {
      const bedtimeInMinutes = wakeTimeInMinutes - (i * sleepCycleDuration) - fallAsleepTime
      let adjustedBedtime = bedtimeInMinutes

      // Handle negative values (cross midnight)
      if (adjustedBedtime < 0) {
        adjustedBedtime += 24 * 60
      }

      const bedtimeHours = Math.floor(adjustedBedtime / 60) % 24
      const bedtimeMinutes = adjustedBedtime % 60

      const bedtimeString = `${bedtimeHours.toString().padStart(2, '0')}:${bedtimeMinutes.toString().padStart(2, '0')}`
      const duration = i * sleepCycleDuration

      times.push({
        bedtime: bedtimeString,
        wakeTime: desiredWakeTime,
        duration: duration
      })
    }

    setResults(times)
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const resetCalculator = () => {
    setDesiredWakeTime('07:00')
    setSleepCycles(6)
    setResults([])
  }

  const getSleepQuality = (cycles: number) => {
    if (cycles >= 5 && cycles <= 6) return { text: 'Optimal', color: 'text-green-600 dark:text-green-400' }
    if (cycles === 4 || cycles === 7) return { text: 'Good', color: 'text-blue-600 dark:text-blue-400' }
    if (cycles === 3 || cycles === 8) return { text: 'Fair', color: 'text-yellow-600 dark:text-yellow-400' }
    return { text: 'Poor', color: 'text-red-600 dark:text-red-400' }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <Moon size={20} />
          Sleep Calculator
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Desired Wake Time
            </label>
            <input
              type="time"
              value={desiredWakeTime}
              onChange={(e) => setDesiredWakeTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Sleep Cycles
            </label>
            <input
              type="number"
              value={sleepCycles}
              onChange={(e) => setSleepCycles(parseInt(e.target.value) || 6)}
              min="3"
              max="10"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <button
          onClick={calculateSleepTimes}
          className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Calculate Bedtimes
        </button>
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
            <Clock size={20} />
            Recommended Bedtimes
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((sleepTime, index) => {
              const quality = getSleepQuality(index + 1)
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {index + 1} Sleep Cycles
                    </h4>
                    <span className={`text-sm font-medium ${quality.color}`}>
                      {quality.text}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Bedtime:</span>
                      <span className="font-mono font-medium text-gray-900 dark:text-white">
                        {sleepTime.bedtime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Wake at:</span>
                      <span className="font-mono font-medium text-gray-900 dark:text-white">
                        {sleepTime.wakeTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatDuration(sleepTime.duration)}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => copyToClipboard(`Bedtime: ${sleepTime.bedtime} (${formatDuration(sleepTime.duration)} sleep)`)}
                    className="w-full mt-3 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center justify-center gap-1"
                  >
                    <Copy size={14} />
                    Copy Bedtime
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Sleep Information */}
      <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4">
          Sleep Science Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Sleep Cycles</h4>
            <ul className="space-y-1 text-purple-700 dark:text-purple-300">
              <li>• Each cycle lasts ~90 minutes</li>
              <li>• 5-6 cycles per night is optimal</li>
              <li>• Takes ~15 minutes to fall asleep</li>
              <li>• Waking between cycles feels best</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Sleep Quality</h4>
            <ul className="space-y-1 text-purple-700 dark:text-purple-300">
              <li>• <span className="text-green-600 dark:text-green-400 font-medium">5-6 cycles:</span> Optimal rest</li>
              <li>• <span className="text-blue-600 dark:text-blue-400 font-medium">4-7 cycles:</span> Good rest</li>
              <li>• <span className="text-yellow-600 dark:text-yellow-400 font-medium">3-8 cycles:</span> Fair rest</li>
              <li>• <span className="text-red-600 dark:text-red-400 font-medium">1-2 cycles:</span> Poor rest</li>
            </ul>
          </div>
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
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3 flex items-center gap-2">
          <Sun size={20} />
          Better Sleep Tips
        </h3>
        <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
          <li>• Maintain consistent sleep schedule, even on weekends</li>
          <li>• Avoid screens 1 hour before bedtime</li>
          <li>• Keep bedroom cool, dark, and quiet</li>
          <li>• Avoid caffeine and heavy meals before bed</li>
          <li>• Exercise regularly but not close to bedtime</li>
          <li>• Use relaxation techniques if you have trouble sleeping</li>
        </ul>
      </div>
    </div>
  )
}
