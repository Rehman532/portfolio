'use client'

import { useState } from 'react'
import { Copy, Check, Download, Upload, RotateCcw, FileText, Hash } from 'lucide-react'

const ColorConverterTool = () => {
  const [hexColor, setHexColor] = useState('#3B82F6')
  const [rgbColor, setRgbColor] = useState({ r: 59, g: 130, b: 246 })
  const [hslColor, setHslColor] = useState({ h: 217, s: 91, l: 64 })
  const [copied, setCopied] = useState('')
  const [inputType, setInputType] = useState('hex')

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 }
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360
    s /= 100
    l /= 100
    let r, g, b

    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    }
  }

  const handleHexChange = (value: string) => {
    setHexColor(value)
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      const rgb = hexToRgb(value)
      setRgbColor(rgb)
      setHslColor(rgbToHsl(rgb.r, rgb.g, rgb.b))
    }
  }

  const handleRgbChange = (type: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgbColor, [type]: Math.min(255, Math.max(0, value)) }
    setRgbColor(newRgb)
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    setHexColor(hex)
    setHslColor(rgbToHsl(newRgb.r, newRgb.g, newRgb.b))
  }

  const handleHslChange = (type: 'h' | 's' | 'l', value: number) => {
    const newHsl = { ...hslColor, [type]: type === 'h' ? value % 360 : Math.min(100, Math.max(0, value)) }
    setHslColor(newHsl)
    const rgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    setRgbColor(rgb)
    setHexColor(rgbToHex(rgb.r, rgb.g, rgb.b))
  }

  const handleRandomColor = () => {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    handleHexChange(randomHex)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Color Converter</h2>
        <p className="text-gray-600 dark:text-gray-400">Convert between HEX, RGB, and HSL color formats</p>
      </div>

      {/* Color Preview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
        <div 
          className="w-full h-32 rounded-xl shadow-inner mb-4"
          style={{ backgroundColor: hexColor }}
        ></div>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleRandomColor}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2"
          >
            <RotateCcw size={16} />
            Random Color
          </button>
        </div>
      </div>

      {/* Color Inputs */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* HEX Input */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Hash size={20} className="text-purple-500" />
            HEX
          </h3>
          <input
            type="text"
            value={hexColor}
            onChange={(e) => handleHexChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white"
            placeholder="#000000"
          />
          <button
            onClick={() => copyToClipboard(hexColor, 'hex')}
            className="mt-3 w-full px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {copied === 'hex' ? <Check size={16} /> : <Copy size={16} />}
            {copied === 'hex' ? 'Copied!' : 'Copy HEX'}
          </button>
        </div>

        {/* RGB Input */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded"></div>
            RGB
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 text-red-500 font-medium">R</span>
              <input
                type="number"
                value={rgbColor.r}
                onChange={(e) => handleRgbChange('r', parseInt(e.target.value) || 0)}
                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                min="0"
                max="255"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 text-green-500 font-medium">G</span>
              <input
                type="number"
                value={rgbColor.g}
                onChange={(e) => handleRgbChange('g', parseInt(e.target.value) || 0)}
                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                min="0"
                max="255"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 text-blue-500 font-medium">B</span>
              <input
                type="number"
                value={rgbColor.b}
                onChange={(e) => handleRgbChange('b', parseInt(e.target.value) || 0)}
                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                min="0"
                max="255"
              />
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(`rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`, 'rgb')}
            className="mt-3 w-full px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {copied === 'rgb' ? <Check size={16} /> : <Copy size={16} />}
            {copied === 'rgb' ? 'Copied!' : 'Copy RGB'}
          </button>
        </div>

        {/* HSL Input */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"></div>
            HSL
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 text-red-500 font-medium">H</span>
              <input
                type="number"
                value={hslColor.h}
                onChange={(e) => handleHslChange('h', parseInt(e.target.value) || 0)}
                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-white"
                min="0"
                max="360"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 text-green-500 font-medium">S</span>
              <input
                type="number"
                value={hslColor.s}
                onChange={(e) => handleHslChange('s', parseInt(e.target.value) || 0)}
                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                min="0"
                max="100"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 text-blue-500 font-medium">L</span>
              <input
                type="number"
                value={hslColor.l}
                onChange={(e) => handleHslChange('l', parseInt(e.target.value) || 0)}
                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                min="0"
                max="100"
              />
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(`hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`, 'hsl')}
            className="mt-3 w-full px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {copied === 'hsl' ? <Check size={16} /> : <Copy size={16} />}
            {copied === 'hsl' ? 'Copied!' : 'Copy HSL'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ColorConverterTool
