'use client'

import { useState, useRef, ChangeEvent } from 'react'
import { Image as ImageIcon, Upload, Download, RotateCw, Maximize2 } from 'lucide-react'

const ImageResizeTool = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [resizedImage, setResizedImage] = useState<string | null>(null)
  const [width, setWidth] = useState(300)
  const [height, setHeight] = useState(300)
  const [originalWidth, setOriginalWidth] = useState(0)
  const [originalHeight, setOriginalHeight] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        setOriginalImage(event.target?.result as string)
        setOriginalWidth(img.width)
        setOriginalHeight(img.height)
        setWidth(img.width)
        setHeight(img.height)
        setResizedImage(null)
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const resizeImage = () => {
    if (!originalImage) return

    setIsProcessing(true)
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)
      
      const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.9)
      setResizedImage(resizedDataUrl)
      setIsProcessing(false)
    }
    img.src = originalImage
  }

  const downloadResizedImage = () => {
    if (!resizedImage) return

    const link = document.createElement('a')
    link.href = resizedImage
    link.download = `resized-image-${width}x${height}-${Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const maintainAspectRatio = () => {
    if (!originalWidth || !originalHeight) return
    
    const aspectRatio = originalWidth / originalHeight
    const newHeight = Math.round(width / aspectRatio)
    setHeight(newHeight)
  }

  const resetImage = () => {
    setOriginalImage(null)
    setResizedImage(null)
    setWidth(300)
    setHeight(300)
    setOriginalWidth(0)
    setOriginalHeight(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground dark:text-white mb-2 flex items-center justify-center gap-3">
          <ImageIcon className="text-orange-500" />
          Image Resizer
        </h3>
        <p className="text-gray-600 dark:text-gray-400">Resize images quickly and easily</p>
      </div>

      {/* Upload Section */}
      {!originalImage && (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="space-y-2">
            <label htmlFor="image-upload" className="cursor-pointer">
              <span className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                Click to upload
              </span>
              <span className="text-gray-600 dark:text-gray-400"> or drag and drop</span>
            </label>
            <input
              ref={fileInputRef}
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      )}

      {/* Image Processing Section */}
      {originalImage && (
        <div className="space-y-6">
          {/* Original Image Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Original Image:</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Size: {originalWidth} × {originalHeight} pixels
            </p>
          </div>

          {/* Resize Controls */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              New Dimensions
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Width (px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  min="1"
                  max="2000"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Height (px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  min="1"
                  max="2000"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <button
              onClick={maintainAspectRatio}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <Maximize2 size={16} />
              Maintain Aspect Ratio
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={resizeImage}
              disabled={isProcessing}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-orange-500/25"
            >
              {isProcessing ? (
                <>
                  <RotateCw size={20} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Maximize2 size={20} />
                  Resize Image
                </>
              )}
            </button>
            <button
              onClick={resetImage}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition-colors duration-200"
            >
              Reset
            </button>
          </div>

          {/* Image Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original Image */}
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Original</h4>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800">
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-auto max-h-64 object-contain"
                />
              </div>
            </div>

            {/* Resized Image */}
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Resized</h4>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 min-h-[160px] flex items-center justify-center">
                {resizedImage ? (
                  <img
                    src={resizedImage}
                    alt="Resized"
                    className="w-full h-auto max-h-64 object-contain"
                  />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">Resized image will appear here</p>
                )}
              </div>
            </div>
          </div>

          {/* Download Button */}
          {resizedImage && (
            <button
              onClick={downloadResizedImage}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-green-500/25"
            >
              <Download size={20} />
              Download Resized Image ({width} × {height})
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default ImageResizeTool
