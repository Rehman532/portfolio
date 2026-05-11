'use client'

import { useState, useEffect } from 'react'
import { Clock, Copy, Globe } from 'lucide-react'

interface Timezone {
  name: string
  offset: string
  offsetMinutes: number
}

const timezones: Timezone[] = [
  { name: 'UTC', offset: 'UTC+0', offsetMinutes: 0 },
  { name: 'New York', offset: 'EST-5', offsetMinutes: -300 },
  { name: 'Los Angeles', offset: 'PST-8', offsetMinutes: -480 },
  { name: 'Chicago', offset: 'CST-6', offsetMinutes: -360 },
  { name: 'London', offset: 'GMT+0', offsetMinutes: 0 },
  { name: 'Paris', offset: 'CET+1', offsetMinutes: 60 },
  { name: 'Berlin', offset: 'CET+1', offsetMinutes: 60 },
  { name: 'Moscow', offset: 'MSK+3', offsetMinutes: 180 },
  { name: 'Dubai', offset: 'GST+4', offsetMinutes: 240 },
  { name: 'Mumbai', offset: 'IST+5:30', offsetMinutes: 330 },
  { name: 'Singapore', offset: 'SGT+8', offsetMinutes: 480 },
  { name: 'Hong Kong', offset: 'HKT+8', offsetMinutes: 480 },
  { name: 'Tokyo', offset: 'JST+9', offsetMinutes: 540 },
  { name: 'Sydney', offset: 'AEDT+11', offsetMinutes: 660 },
  { name: 'Auckland', offset: 'NZDT+13', offsetMinutes: 780 }
]

export default function TimezoneConverterTool() {
  const [selectedTimezone, setSelectedTimezone] = useState('UTC')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [convertedTimes, setConvertedTimes] = useState<{ timezone: string; time: string; offset: string }[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const selectedTz = timezones.find(tz => tz.name === selectedTimezone)
    if (selectedTz) {
      const times = timezones.map(tz => {
        const utcTime = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000)
        const tzTime = new Date(utcTime + (tz.offsetMinutes * 60000))
        return {
          timezone: tz.name,
          time: tzTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: true 
          }),
          offset: tz.offset
        }
      })
      setConvertedTimes(times)
    }
  }, [currentTime, selectedTimezone])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Timezone Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Your Timezone
        </label>
        <select
          value={selectedTimezone}
          onChange={(e) => setSelectedTimezone(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
        >
          {timezones.map(tz => (
            <option key={tz.name} value={tz.name}>
              {tz.name} ({tz.offset})
            </option>
          ))}
        </select>
      </div>

      {/* Current Time Display */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-3 mb-4">
          <Globe size={24} className="text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              Current Time in {selectedTimezone}
            </h3>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                hour12: true 
              })}
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Converted Times Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {convertedTimes.map((tz, index) => (
          <div
            key={tz.timezone}
            className={`p-4 rounded-lg border ${
              tz.timezone === selectedTimezone
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {tz.timezone}
              </h4>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {tz.offset}
              </span>
            </div>
            <div className="text-xl font-mono font-bold text-gray-800 dark:text-gray-200">
              {tz.time}
            </div>
            {tz.timezone === selectedTimezone && (
              <button
                onClick={() => copyToClipboard(tz.time)}
                className="mt-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1"
              >
                <Copy size={14} />
                Copy Time
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Time Difference Calculator */}
      <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
          <Clock size={20} />
          Quick Time Reference
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Major Cities:</h4>
            <ul className="space-y-1 text-purple-700 dark:text-purple-300">
              <li>• New York: {convertedTimes.find(t => t.timezone === 'New York')?.time}</li>
              <li>• London: {convertedTimes.find(t => t.timezone === 'London')?.time}</li>
              <li>• Tokyo: {convertedTimes.find(t => t.timezone === 'Tokyo')?.time}</li>
              <li>• Sydney: {convertedTimes.find(t => t.timezone === 'Sydney')?.time}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Business Hours:</h4>
            <ul className="space-y-1 text-purple-700 dark:text-purple-300">
              <li>• UTC: Standard for international business</li>
              <li>• EST: US East Coast business hours</li>
              <li>• PST: US West Coast business hours</li>
              <li>• CET: European business hours</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
          💡 Timezone Tips
        </h3>
        <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
          <li>• Schedule meetings using UTC to avoid confusion</li>
          <li>• Consider daylight saving time changes</li>
          <li>• Use 24-hour format for international communication</li>
          <li>• Always specify the timezone when sharing times</li>
          <li>• Check local business hours before scheduling</li>
        </ul>
      </div>
    </div>
  )
}
