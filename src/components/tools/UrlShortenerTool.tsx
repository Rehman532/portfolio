'use client'

import { useState } from 'react'
import { Copy, Check, Download, Upload, RotateCcw, FileText, Hash, Calculator, Clock, Link, Scissors } from 'lucide-react'

const UrlShortenerTool = () => {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortenedUrls, setShortenedUrls] = useState<Array<{original: string, short: string, code: string}>>([])
  const [copied, setCopied] = useState('')

  const generateShortCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const shortenUrl = () => {
    if (!originalUrl.trim()) return
    
    let urlToShorten = originalUrl.trim()
    
    // Add https:// if not present
    if (!urlToShorten.startsWith('http://') && !urlToShorten.startsWith('https://')) {
      urlToShorten = 'https://' + urlToShorten
    }
    
    if (!isValidUrl(urlToShorten)) {
      alert('Please enter a valid URL')
      return
    }
    
    const shortCode = generateShortCode()
    const shortUrl = `https://short.link/${shortCode}`
    
    const newEntry = {
      original: urlToShorten,
      short: shortUrl,
      code: shortCode
    }
    
    setShortenedUrls([newEntry, ...shortenedUrls])
    setOriginalUrl('')
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  const deleteUrl = (index: number) => {
    setShortenedUrls(shortenedUrls.filter((_, i) => i !== index))
  }

  const clearAll = () => {
    setShortenedUrls([])
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">URL Shortener</h2>
        <p className="text-gray-600 dark:text-gray-400">Create short, memorable links for long URLs</p>
      </div>

      {/* URL Input */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter URL to shorten
            </label>
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/very/long/url/that/needs/to/be/shortened"
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>
          <button
            onClick={shortenUrl}
            className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Scissors size={20} />
            Shorten URL
          </button>
        </div>
      </div>

      {/* Shortened URLs */}
      {shortenedUrls.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Link size={20} className="text-purple-500" />
              Shortened URLs
            </h3>
            <button
              onClick={clearAll}
              className="px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
            >
              Clear All
            </button>
          </div>
          
          <div className="space-y-4">
            {shortenedUrls.map((url, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Original URL
                    </label>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-900 dark:text-white truncate flex-1">
                        {url.original}
                      </p>
                      <button
                        onClick={() => copyToClipboard(url.original, `original-${index}`)}
                        className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                      >
                        {copied === `original-${index}` ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Short URL
                    </label>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-mono text-purple-600 dark:text-purple-400 truncate flex-1">
                        {url.short}
                      </p>
                      <button
                        onClick={() => copyToClipboard(url.short, `short-${index}`)}
                        className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                      >
                        {copied === `short-${index}` ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Code: {url.code}
                    </span>
                    <button
                      onClick={() => deleteUrl(index)}
                      className="text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 px-2 py-1 rounded transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-6 border border-blue-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
              <Link size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Instant Shortening</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Generate short URLs instantly with unique codes</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
              <Copy size={16} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Easy Copy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Copy both original and shortened URLs with one click</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
              <Hash size={16} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Unique Codes</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Each URL gets a unique 6-character code</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
              <RotateCcw size={16} className="text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Auto HTTPS</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Automatically adds HTTPS if missing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UrlShortenerTool
