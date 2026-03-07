'use client'

import { useState } from 'react'
import { Copy, Check, Download, Upload, RotateCcw, FileText, Hash, Calculator, Clock, Link, Scissors, Binary, FileCode } from 'lucide-react'

const Base64ConverterTool = () => {
  const [inputText, setInputText] = useState('')
  const [encodedText, setEncodedText] = useState('')
  const [decodedText, setDecodedText] = useState('')
  const [activeTab, setActiveTab] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState('')

  const encodeBase64 = (text: string) => {
    try {
      return btoa(unescape(encodeURIComponent(text)))
    } catch (error) {
      return 'Error: Unable to encode text'
    }
  }

  const decodeBase64 = (base64: string) => {
    try {
      return decodeURIComponent(escape(atob(base64)))
    } catch (error) {
      return 'Error: Invalid Base64 string'
    }
  }

  const handleEncode = () => {
    const encoded = encodeBase64(inputText)
    setEncodedText(encoded)
  }

  const handleDecode = () => {
    const decoded = decodeBase64(inputText)
    setDecodedText(decoded)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        if (activeTab === 'encode') {
          setInputText(content)
          const encoded = encodeBase64(content)
          setEncodedText(encoded)
        } else {
          setInputText(content)
          const decoded = decodeBase64(content)
          setDecodedText(decoded)
        }
      }
      reader.readAsText(file)
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setInputText('')
    setEncodedText('')
    setDecodedText('')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Base64 Converter</h2>
        <p className="text-gray-600 dark:text-gray-400">Encode and decode text to/from Base64 format</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
        <div className="flex">
          <button
            onClick={() => setActiveTab('encode')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'encode'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Binary size={16} className="inline mr-2" />
            Encode
          </button>
          <button
            onClick={() => setActiveTab('decode')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'decode'
                ? 'bg-green-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <FileCode size={16} className="inline mr-2" />
            Decode
          </button>
        </div>
      </div>

      {/* File Upload */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Or Upload a File</h3>
          <label className="cursor-pointer">
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".txt,.json,.xml,.csv,.html,.css,.js"
            />
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Click to upload a file or drag and drop
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                TXT, JSON, XML, CSV, HTML, CSS, JS files supported
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {activeTab === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
        </h3>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={activeTab === 'encode' ? 'Enter text to encode to Base64...' : 'Enter Base64 string to decode...'}
          className="w-full h-32 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none"
        />
        <div className="flex gap-3 mt-4">
          <button
            onClick={activeTab === 'encode' ? handleEncode : handleDecode}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {activeTab === 'encode' ? <Binary size={16} /> : <FileCode size={16} />}
            {activeTab === 'encode' ? 'Encode' : 'Decode'}
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Output Section */}
      {(activeTab === 'encode' ? encodedText : decodedText) && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {activeTab === 'encode' ? 'Encoded Base64' : 'Decoded Text'}
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <pre className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap break-all">
              {activeTab === 'encode' ? encodedText : decodedText}
            </pre>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => copyToClipboard(activeTab === 'encode' ? encodedText : decodedText, 'result')}
              className="flex-1 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {copied === 'result' ? <Check size={16} /> : <Copy size={16} />}
              {copied === 'result' ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={() => downloadFile(activeTab === 'encode' ? encodedText : decodedText, 
                activeTab === 'encode' ? 'encoded.txt' : 'decoded.txt')}
              className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-all duration-300 flex items-center gap-2"
            >
              <Download size={16} />
              Download
            </button>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="bg-purple-50 dark:bg-gray-800 rounded-xl p-6 border border-purple-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
              <Binary size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Bidirectional</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Encode and decode Base64 strings</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
              <Upload size={16} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">File Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Upload and process text files</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
              <Copy size={16} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Easy Copy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Copy results with one click</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
              <Download size={16} className="text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Download</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Save results as text files</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Base64ConverterTool
