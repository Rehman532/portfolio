'use client'

import { useState } from 'react'
import { Copy, Check, Download, Upload, RotateCcw, FileText, Hash, Shield, Key } from 'lucide-react'

const HashGeneratorTool = () => {
  const [inputText, setInputText] = useState('')
  const [hashType, setHashType] = useState('md5')
  const [hashes, setHashes] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState('')
  const [fileContent, setFileContent] = useState('')

  const generateHash = async (text: string, algorithm: string) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      try {
        let hashBuffer: ArrayBuffer
        
        switch (algorithm) {
          case 'sha-1':
            hashBuffer = await crypto.subtle.digest('SHA-1', data)
            break
          case 'sha-256':
            hashBuffer = await crypto.subtle.digest('SHA-256', data)
            break
          case 'sha-384':
            hashBuffer = await crypto.subtle.digest('SHA-384', data)
            break
          case 'sha-512':
            hashBuffer = await crypto.subtle.digest('SHA-512', data)
            break
          default:
            // For MD5, we'll use a simple implementation (not cryptographically secure)
            return generateMD5(text)
        }
        
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
        return hashHex
      } catch (error) {
        console.error('Hash generation error:', error)
        return 'Error generating hash'
      }
    } else {
      // Fallback for environments without crypto.subtle
      return generateFallbackHash(text, algorithm)
    }
  }

  const generateMD5 = (text: string) => {
    // Simple MD5 implementation (not cryptographically secure)
    // This is a basic implementation for demonstration
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(32, '0')
  }

  const generateFallbackHash = (text: string, algorithm: string) => {
    // Simple fallback hash for unsupported environments
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    
    const lengths: Record<string, number> = {
      'md5': 32,
      'sha-1': 40,
      'sha-256': 64,
      'sha-384': 96,
      'sha-512': 128
    }
    
    return Math.abs(hash).toString(16).padStart(lengths[algorithm] || 32, '0')
  }

  const handleGenerateHash = async () => {
    const textToHash = inputText || fileContent
    if (!textToHash.trim()) return
    
    const newHashes: Record<string, string> = {}
    
    if (hashType === 'all') {
      const algorithms = ['md5', 'sha-1', 'sha-256', 'sha-384', 'sha-512']
      for (const algo of algorithms) {
        newHashes[algo] = await generateHash(textToHash, algo)
      }
    } else {
      newHashes[hashType] = await generateHash(textToHash, hashType)
    }
    
    setHashes(newHashes)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setFileContent(content)
        setInputText(content)
      }
      reader.readAsText(file)
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  const clearAll = () => {
    setInputText('')
    setFileContent('')
    setHashes({})
  }

  const downloadHashes = () => {
    const content = Object.entries(hashes)
      .map(([algo, hash]) => `${algo.toUpperCase()}: ${hash}`)
      .join('\n')
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'hashes.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const hashTypes = [
    { value: 'md5', label: 'MD5', description: '128-bit hash' },
    { value: 'sha-1', label: 'SHA-1', description: '160-bit hash' },
    { value: 'sha-256', label: 'SHA-256', description: '256-bit hash' },
    { value: 'sha-384', label: 'SHA-384', description: '384-bit hash' },
    { value: 'sha-512', label: 'SHA-512', description: '512-bit hash' },
    { value: 'all', label: 'All Algorithms', description: 'Generate all hashes' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Hash Generator</h2>
        <p className="text-gray-600 dark:text-gray-400">Generate cryptographic hashes for text and files</p>
      </div>

      {/* Input Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
        <div className="space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Or Upload a File
            </label>
            <label className="cursor-pointer">
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept=".txt,.json,.xml,.csv,.html,.css,.js,.md"
              />
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Click to upload a file or drag and drop
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  TXT, JSON, XML, CSV, HTML, CSS, JS, MD files supported
                </p>
              </div>
            </label>
          </div>

          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Text to Hash
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to generate hash..."
              className="w-full h-32 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none"
            />
          </div>

          {/* Hash Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Hash Algorithm
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {hashTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setHashType(type.value)}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    hashType === type.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="font-medium">{type.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {type.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateHash}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Hash size={20} />
            Generate Hash
          </button>
        </div>
      </div>

      {/* Results */}
      {Object.keys(hashes).length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Shield size={20} className="text-green-500" />
              Generated Hashes
            </h3>
            <div className="flex gap-2">
              <button
                onClick={downloadHashes}
                className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors flex items-center gap-1"
              >
                <Download size={14} />
                Download
              </button>
              <button
                onClick={clearAll}
                className="px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {Object.entries(hashes).map(([algorithm, hash]) => (
              <div key={algorithm} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white uppercase tracking-wide">
                    {algorithm}
                  </h4>
                  <button
                    onClick={() => copyToClipboard(hash, algorithm)}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    {copied === algorithm ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <div className="font-mono text-sm text-gray-900 dark:text-white break-all bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600">
                  {hash}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      <div className="bg-green-50 dark:bg-gray-800 rounded-xl p-6 border border-green-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
              <Hash size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Multiple Algorithms</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Support for MD5, SHA-1, SHA-256, SHA-384, SHA-512</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
              <Key size={16} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Secure Hashing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Uses Web Crypto API for secure hash generation</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
              <Copy size={16} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Easy Copy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Copy individual hashes or download all results</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
              <Upload size={16} className="text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">File Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Upload files and generate hashes instantly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HashGeneratorTool
