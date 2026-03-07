'use client'

import { useState } from 'react'
import { QrCode, Download, Copy, Check, ExternalLink } from 'lucide-react'

const QRCodeGeneratorTool = () => {
  const [inputText, setInputText] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [copied, setCopied] = useState(false)

  const generateQRCode = () => {
    if (!inputText.trim()) {
      setQrCodeUrl('')
      return
    }
    
    // Using QR Code API from qr-server.com
    const encodedText = encodeURIComponent(inputText)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedText}`
    setQrCodeUrl(qrUrl)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const downloadQRCode = () => {
    if (!qrCodeUrl) return
    
    const link = document.createElement('a')
    link.href = qrCodeUrl
    link.download = `qrcode-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const openInNewTab = () => {
    if (!inputText.trim()) return
    window.open(inputText, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground dark:text-white mb-2 flex items-center justify-center gap-3">
          <QrCode className="text-green-500" />
          QR Code Generator
        </h3>
        <p className="text-gray-600 dark:text-gray-400">Create QR codes for URLs and text instantly</p>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Enter Text or URL
        </label>
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter URL, text, or any content to generate QR code..."
            className="w-full h-24 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          />
          {inputText && (
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={copyToClipboard}
                className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                title="Copy text"
              >
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
              {inputText.startsWith('http') && (
                <button
                  onClick={openInNewTab}
                  className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                  title="Open in new tab"
                >
                  <ExternalLink size={16} />
                </button>
              )}
            </div>
          )}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Character count: {inputText.length}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateQRCode}
        disabled={!inputText.trim()}
        className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-green-500/25"
      >
        <QrCode size={20} />
        Generate QR Code
      </button>

      {/* QR Code Display */}
      {qrCodeUrl && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Generated QR Code
            </label>
            <button
              onClick={downloadQRCode}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <Download size={16} />
              Download
            </button>
          </div>
          
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white p-4 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                <img
                  src={qrCodeUrl}
                  alt="Generated QR Code"
                  className="w-64 h-64 object-contain"
                />
              </div>
            </div>
          </div>

          {/* QR Code Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">QR Code Details:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Size: 300x300 pixels</li>
              <li>• Format: PNG</li>
              <li>• Content: {inputText.length} characters</li>
              <li>• Type: {inputText.startsWith('http') ? 'URL' : 'Text'}</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">💡 Tips:</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• QR codes work best with shorter text (up to 300 characters)</li>
          <li>• URLs should include https:// for better compatibility</li>
          <li>• Test the QR code before sharing it</li>
          <li>• High contrast backgrounds improve scanning accuracy</li>
        </ul>
      </div>
    </div>
  )
}

export default QRCodeGeneratorTool
