'use client'

import { useState } from 'react'
import { Code2, Copy, Check, Download, AlertCircle, CheckCircle } from 'lucide-react'

const JSONFormatterTool = () => {
  const [inputJSON, setInputJSON] = useState('')
  const [outputJSON, setOutputJSON] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const formatJSON = () => {
    if (!inputJSON.trim()) {
      setOutputJSON('')
      setIsValid(null)
      setErrorMessage('')
      return
    }

    try {
      const parsed = JSON.parse(inputJSON)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutputJSON(formatted)
      setIsValid(true)
      setErrorMessage('')
    } catch (error) {
      setIsValid(false)
      setErrorMessage(error instanceof Error ? error.message : 'Invalid JSON')
      setOutputJSON('')
    }
  }

  const minifyJSON = () => {
    if (!inputJSON.trim()) {
      setOutputJSON('')
      setIsValid(null)
      setErrorMessage('')
      return
    }

    try {
      const parsed = JSON.parse(inputJSON)
      const minified = JSON.stringify(parsed)
      setOutputJSON(minified)
      setIsValid(true)
      setErrorMessage('')
    } catch (error) {
      setIsValid(false)
      setErrorMessage(error instanceof Error ? error.message : 'Invalid JSON')
      setOutputJSON('')
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputJSON)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy JSON: ', err)
    }
  }

  const downloadJSON = () => {
    if (!outputJSON) return

    const blob = new Blob([outputJSON], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `formatted-json-${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setInputJSON('')
    setOutputJSON('')
    setIsValid(null)
    setErrorMessage('')
    setCopied(false)
  }

  const loadSampleJSON = () => {
    const sample = {
      "name": "John Doe",
      "age": 30,
      "city": "New York",
      "skills": ["JavaScript", "React", "Node.js"],
      "address": {
        "street": "123 Main St",
        "zipCode": "10001"
      },
      "active": true
    }
    setInputJSON(JSON.stringify(sample))
    setOutputJSON('')
    setIsValid(null)
    setErrorMessage('')
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground dark:text-white mb-2 flex items-center justify-center gap-3">
          <Code2 className="text-indigo-500" />
          JSON Formatter & Validator
        </h3>
        <p className="text-gray-600 dark:text-gray-400">Format, validate, and beautify JSON code</p>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            JSON Input
          </label>
          <button
            onClick={loadSampleJSON}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Load Sample
          </button>
        </div>
        <textarea
          value={inputJSON}
          onChange={(e) => setInputJSON(e.target.value)}
          placeholder='{"key": "value"} or paste your JSON here...'
          className="w-full h-48 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm resize-none"
        />
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Characters: {inputJSON.length}
          </span>
          {isValid !== null && (
            <div className="flex items-center gap-2">
              {isValid ? (
                <>
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-green-600 dark:text-green-400 font-medium">Valid JSON</span>
                </>
              ) : (
                <>
                  <AlertCircle size={16} className="text-red-500" />
                  <span className="text-red-600 dark:text-red-400 font-medium">Invalid JSON</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-red-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-900 dark:text-red-300 mb-1">JSON Error:</h4>
              <p className="text-sm text-red-800 dark:text-red-200">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={formatJSON}
          disabled={!inputJSON.trim()}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-indigo-500/25"
        >
          <Code2 size={20} />
          Format JSON
        </button>
        <button
          onClick={minifyJSON}
          disabled={!inputJSON.trim()}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-purple-500/25"
        >
          <Code2 size={20} />
          Minify JSON
        </button>
      </div>

      {/* Output Section */}
      {outputJSON && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Formatted JSON Output
            </label>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={downloadJSON}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
          <textarea
            value={outputJSON}
            readOnly
            className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm resize-none"
          />
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Characters: {outputJSON.length} | Lines: {outputJSON.split('\n').length}
          </div>
        </div>
      )}

      {/* Clear Button */}
      {(inputJSON || outputJSON) && (
        <button
          onClick={clearAll}
          className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition-colors duration-200"
        >
          Clear All
        </button>
      )}

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">💡 Tips:</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Use the Format button to beautify JSON with proper indentation</li>
          <li>• Use the Minify button to remove unnecessary whitespace</li>
          <li>• The validator will check for syntax errors and highlight issues</li>
          <li>• Copy or download the formatted JSON for use in your projects</li>
        </ul>
      </div>
    </div>
  )
}

export default JSONFormatterTool
