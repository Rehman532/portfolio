'use client'

import { useState } from 'react'
import { Copy, Check, Download, Upload, RotateCcw, FileText, Hash, Calculator, Clock } from 'lucide-react'

const TimeConverterTool = () => {
  const [timestamp, setTimestamp] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [copied, setCopied] = useState('')
  const [selectedTimezone, setSelectedTimezone] = useState('UTC')

  const timezones = [
    'UTC', 'EST', 'CST', 'MST', 'PST', 'IST', 'GMT', 'CET', 'JST', 'AEST'
  ]

  const formatDate = (date: Date, format: string) => {
    const options: Intl.DateTimeFormatOptions = {}
    
    switch(format) {
      case 'iso':
        return date.toISOString()
      case 'local':
        return date.toLocaleString()
      case 'date':
        return date.toLocaleDateString()
      case 'time':
        return date.toLocaleTimeString()
      case 'timestamp':
        return Math.floor(date.getTime() / 1000).toString()
      case 'milliseconds':
        return date.getTime().toString()
      default:
        return date.toISOString()
    }
  }

  const parseTimestamp = (input: string) => {
    const num = parseInt(input)
    if (isNaN(num)) return null
    
    // Check if it's in seconds or milliseconds
    const timestamp = num > 10000000000 ? num : num * 1000
    return new Date(timestamp)
  }

  const handleTimestampChange = (value: string) => {
    setTimestamp(value)
    if (value) {
      const date = parseTimestamp(value)
      if (date) {
        setCurrentTime(date)
      }
    }
  }

  const getCurrentTimestamp = () => {
    const now = new Date()
    setCurrentTime(now)
    setTimestamp(Math.floor(now.getTime() / 1000).toString())
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  const formatInTimezone = (date: Date, timezone: string) => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }
    return new Intl.DateTimeFormat('en-US', options).format(date)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Time Converter</h2>
        <p className="text-gray-600 dark:text-gray-400">Convert timestamps and format dates in multiple ways</p>
      </div>

      {/* Current Time */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Current Time</h3>
          <div className="text-3xl font-mono text-blue-600 dark:text-blue-400 mb-4">
            {currentTime.toLocaleString()}
          </div>
          <button
            onClick={getCurrentTimestamp}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <Clock size={16} />
            Get Current Time
          </button>
        </div>
      </div>

      {/* Timestamp Converter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calculator size={20} className="text-blue-500" />
          Timestamp Converter
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Timestamp (Unix timestamp)
            </label>
            <input
              type="text"
              value={timestamp}
              onChange={(e) => handleTimestampChange(e.target.value)}
              placeholder="e.g., 1640995200 or 1640995200000"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>
          
          {timestamp && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Converted Date:</p>
              <p className="text-lg font-mono text-gray-900 dark:text-white">
                {currentTime.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Multiple Formats */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FileText size={20} className="text-green-500" />
          Multiple Formats
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: 'ISO String', value: formatDate(currentTime, 'iso'), type: 'iso' },
            { label: 'Local String', value: formatDate(currentTime, 'local'), type: 'local' },
            { label: 'Date Only', value: formatDate(currentTime, 'date'), type: 'date' },
            { label: 'Time Only', value: formatDate(currentTime, 'time'), type: 'time' },
            { label: 'Unix Timestamp (s)', value: formatDate(currentTime, 'timestamp'), type: 'timestamp' },
            { label: 'Milliseconds', value: formatDate(currentTime, 'milliseconds'), type: 'milliseconds' }
          ].map((format) => (
            <div key={format.type} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {format.label}
                </span>
                <button
                  onClick={() => copyToClipboard(format.value, format.type)}
                  className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  {copied === format.type ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
              <p className="text-sm font-mono text-gray-900 dark:text-white break-all">
                {format.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Timezone Converter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Clock size={20} className="text-purple-500" />
          Timezone Converter
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Timezone
            </label>
            <select
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white"
            >
              {timezones.map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Time in {selectedTimezone}
              </span>
              <button
                onClick={() => copyToClipboard(formatInTimezone(currentTime, selectedTimezone), 'timezone')}
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {copied === 'timezone' ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <p className="text-lg font-mono text-gray-900 dark:text-white">
              {formatInTimezone(currentTime, selectedTimezone)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeConverterTool
