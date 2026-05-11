'use client'

import { useState } from 'react'
import { Palette, Copy, Download, Eye, RefreshCw, Sparkles } from 'lucide-react'

interface Color {
  hex: string
  rgb: string
  hsl: string
  name: string
}

interface PaletteScheme {
  name: string
  colors: Color[]
  description: string
}

const colorSchemes: PaletteScheme[] = [
  {
    name: 'Ocean Breeze',
    colors: [
      { hex: '#0077BE', rgb: 'rgb(0, 119, 190)', hsl: 'hsl(200, 100%, 37%)', name: 'Ocean Blue' },
      { hex: '#00A8E8', rgb: 'rgb(0, 168, 232)', hsl: 'hsl(200, 100%, 45%)', name: 'Sky Blue' },
      { hex: '#7EC8E3', rgb: 'rgb(126, 200, 227)', hsl: 'hsl(200, 65%, 69%)', name: 'Light Sky' },
      { hex: '#B4E7CE', rgb: 'rgb(180, 231, 206)', hsl: 'hsl(160, 52%, 81%)', name: 'Seafoam' },
      { hex: '#F0F8EA', rgb: 'rgb(240, 248, 234)', hsl: 'hsl(160, 40%, 96%)', name: 'Mint Cream' }
    ],
    description: 'Cool and calming ocean-inspired colors'
  },
  {
    name: 'Sunset Vibes',
    colors: [
      { hex: '#FF6B6B', rgb: 'rgb(255, 107, 107)', hsl: 'hsl(0, 100%, 71%)', name: 'Coral Red' },
      { hex: '#FFA07A', rgb: 'rgb(255, 160, 122)', hsl: 'hsl(25, 100%, 74%)', name: 'Light Salmon' },
      { hex: '#FFD93D', rgb: 'rgb(255, 217, 61)', hsl: 'hsl(50, 100%, 62%)', name: 'Golden Yellow' },
      { hex: '#6BCB77', rgb: 'rgb(107, 203, 119)', hsl: 'hsl(140, 47%, 61%)', name: 'Mint Green' },
      { hex: '#4D96FF', rgb: 'rgb(77, 150, 255)', hsl: 'hsl(220, 100%, 65%)', name: 'Periwinkle' }
    ],
    description: 'Warm and energetic sunset colors'
  },
  {
    name: 'Forest Dreams',
    colors: [
      { hex: '#2D5016', rgb: 'rgb(45, 80, 22)', hsl: 'hsl(95, 57%, 20%)', name: 'Forest Green' },
      { hex: '#73A942', rgb: 'rgb(115, 169, 66)', hsl: 'hsl(95, 44%, 46%)', name: 'Moss Green' },
      { hex: '#AAD576', rgb: 'rgb(170, 213, 118)', hsl: 'hsl(95, 54%, 65%)', name: 'Lime Green' },
      { hex: '#D4E4BC', rgb: 'rgb(212, 228, 188)', hsl: 'hsl(95, 39%, 82%)', name: 'Sage Green' },
      { hex: '#F0F4E8', rgb: 'rgb(240, 244, 232)', hsl: 'hsl(95, 22%, 93%)', name: 'Pale Green' }
    ],
    description: 'Natural and earthy forest tones'
  },
  {
    name: 'Royal Purple',
    colors: [
      { hex: '#4B0082', rgb: 'rgb(75, 0, 130)', hsl: 'hsl(275, 100%, 25%)', name: 'Indigo' },
      { hex: '#6A0DAD', rgb: 'rgb(106, 13, 173)', hsl: 'hsl(275, 87%, 36%)', name: 'Medium Purple' },
      { hex: '#8B7AB8', rgb: 'rgb(139, 122, 184)', hsl: 'hsl(275, 29%, 60%)', name: 'Lavender' },
      { hex: '#C8B6DB', rgb: 'rgb(200, 182, 219)', hsl: 'hsl(275, 33%, 79%)', name: 'Thistle' },
      { hex: '#E6E6FA', rgb: 'rgb(230, 230, 250)', hsl: 'hsl(240, 80%, 94%)', name: 'Lavender Web' }
    ],
    description: 'Elegant and sophisticated purple tones'
  },
  {
    name: 'Modern Minimal',
    colors: [
      { hex: '#2C3E50', rgb: 'rgb(44, 62, 80)', hsl: 'hsl(210, 29%, 24%)', name: 'Midnight Blue' },
      { hex: '#34495E', rgb: 'rgb(52, 73, 94)', hsl: 'hsl(210, 29%, 28%)', name: 'Wet Asphalt' },
      { hex: '#7F8C8D', rgb: 'rgb(127, 140, 141)', hsl: 'hsl(189, 6%, 53%)', name: 'Silver' },
      { hex: '#BDC3C7', rgb: 'rgb(189, 195, 199)', hsl: 'hsl(189, 8%, 76%)', name: 'Light Silver' },
      { hex: '#ECF0F1', rgb: 'rgb(236, 240, 241)', hsl: 'hsl(189, 9%, 94%)', name: 'Clouds' }
    ],
    description: 'Clean and professional neutral tones'
  },
  {
    name: 'Tropical Paradise',
    colors: [
      { hex: '#FF6B9D', rgb: 'rgb(255, 107, 157)', hsl: 'hsl(340, 100%, 71%)', name: 'Hot Pink' },
      { hex: '#FFB6C1', rgb: 'rgb(255, 182, 193)', hsl: 'hsl(350, 100%, 86%)', name: 'Light Pink' },
      { hex: '#FFA500', rgb: 'rgb(255, 165, 0)', hsl: 'hsl(39, 100%, 50%)', name: 'Orange' },
      { hex: '#FFD700', rgb: 'rgb(255, 215, 0)', hsl: 'hsl(50, 100%, 50%)', name: 'Gold' },
      { hex: '#98D8C8', rgb: 'rgb(152, 216, 200)', hsl: 'hsl(160, 47%, 72%)', name: 'Turquoise' }
    ],
    description: 'Vibrant and playful tropical colors'
  }
]

export default function ColorPaletteProTool() {
  const [selectedPalette, setSelectedPalette] = useState<PaletteScheme>(colorSchemes[0])
  const [customColors, setCustomColors] = useState<Color[]>([])
  const [newColorHex, setNewColorHex] = useState('')
  const [copiedColor, setCopiedColor] = useState('')

  const generateRandomPalette = () => {
    const randomColors: Color[] = []
    for (let i = 0; i < 5; i++) {
      const hue = Math.random() * 360
      const saturation = 50 + Math.random() * 50
      const lightness = 40 + Math.random() * 40
      const hsl = `hsl(${hue}, ${saturation}%, ${lightness}%)`
      const hex = hslToHex(hsl)
      const rgb = hslToRgb(hsl)
      
      randomColors.push({
        hex,
        rgb,
        hsl,
        name: `Color ${i + 1}`
      })
    }
    
    setCustomColors(randomColors)
  }

  const hslToHex = (hsl: string): string => {
    const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
    if (!match) return '#000000'
    
    const h = parseInt(match[1]) / 360
    const s = parseInt(match[2]) / 100
    const l = parseInt(match[3]) / 100
    
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
    
    const r = Math.round(hue2rgb(p, q, h + 1/3) * 255)
    const g = Math.round(hue2rgb(p, q, h) * 255)
    const b = Math.round(hue2rgb(p, q, h - 1/3) * 255)
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }

  const hslToRgb = (hsl: string): string => {
    const hex = hslToHex(hsl)
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgb(${r}, ${g}, ${b})`
  }

  const hexToRgb = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgb(${r}, ${g}, ${b})`
  }

  const addCustomColor = () => {
    if (!newColorHex || !/^#[0-9A-F]{6}$/i.test(newColorHex)) {
      return
    }

    const newColor: Color = {
      hex: newColorHex.toUpperCase(),
      rgb: hexToRgb(newColorHex),
      hsl: 'hsl(0, 0%, 0%)', // Simplified for now
      name: `Custom Color ${customColors.length + 1}`
    }

    setCustomColors([...customColors, newColor])
    setNewColorHex('')
  }

  const copyColor = (color: Color) => {
    navigator.clipboard.writeText(color.hex)
    setCopiedColor(color.hex)
    setTimeout(() => setCopiedColor(''), 2000)
  }

  const copyPalette = (colors: Color[]) => {
    const paletteText = colors.map(c => `${c.hex} - ${c.name}`).join('\n')
    navigator.clipboard.writeText(paletteText)
  }

  const downloadPalette = (colors: Color[]) => {
    const paletteData = {
      name: 'Custom Palette',
      colors: colors,
      generated: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'palette.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const removeCustomColor = (index: number) => {
    setCustomColors(customColors.filter((_, i) => i !== index))
  }

  const displayColors = customColors.length > 0 ? customColors : selectedPalette.colors

  return (
    <div className="space-y-6">
      {/* Palette Selection */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <Palette size={20} />
          Color Palette Generator
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {colorSchemes.map((palette) => (
            <button
              key={palette.name}
              onClick={() => setSelectedPalette(palette)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedPalette.name === palette.name
                  ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-300'
              }`}
            >
              <div className="flex gap-1 mb-2">
                {palette.colors.slice(0, 5).map((color, index) => (
                  <div
                    key={index}
                    className="w-full h-8 rounded"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  {palette.name}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {palette.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={generateRandomPalette}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Generate Random Palette
          </button>
        </div>
      </div>

      {/* Color Display */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {customColors.length > 0 ? 'Custom Palette' : selectedPalette.name}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => copyPalette(displayColors)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm flex items-center gap-1"
            >
              <Copy size={14} />
              Copy All
            </button>
            <button
              onClick={() => downloadPalette(displayColors)}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm flex items-center gap-1"
            >
              <Download size={14} />
              Download
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {displayColors.map((color, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <div
                className="w-full h-24 rounded-lg mb-3 border-2 border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: color.hex }}
              />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white text-sm">
                    {color.name}
                  </span>
                  <button
                    onClick={() => copyColor(color)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">HEX:</span>
                    <span className="font-mono text-gray-900 dark:text-white">
                      {color.hex}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">RGB:</span>
                    <span className="font-mono text-gray-900 dark:text-white text-xs">
                      {color.rgb}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">HSL:</span>
                    <span className="font-mono text-gray-900 dark:text-white text-xs">
                      {color.hsl}
                    </span>
                  </div>
                </div>
                
                {copiedColor === color.hex && (
                  <div className="text-green-600 dark:text-green-400 text-xs flex items-center gap-1">
                    <Eye size={12} />
                    Copied!
                  </div>
                )}
                
                {customColors.length > 0 && (
                  <button
                    onClick={() => removeCustomColor(index)}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-xs"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Custom Color */}
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
          Add Custom Color
        </h3>
        
        <div className="flex gap-4">
          <input
            type="text"
            value={newColorHex}
            onChange={(e) => setNewColorHex(e.target.value)}
            placeholder="#FF6B6B"
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white font-mono"
          />
          <button
            onClick={addCustomColor}
            disabled={!newColorHex || !/^#[0-9A-F]{6}$/i.test(newColorHex)}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Color
          </button>
        </div>
        
        {newColorHex && !/^#[0-9A-F]{6}$/i.test(newColorHex) && (
          <p className="text-sm text-red-600 dark:text-red-400">
            Please enter a valid hex color (e.g., #FF6B6B)
          </p>
        )}
      </div>

      {/* Color Tips */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3 flex items-center gap-2">
          <Sparkles size={20} />
          Color Design Tips
        </h3>
        <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
          <li>• Use the 60-30-10 rule: 60% dominant, 30% secondary, 10% accent colors</li>
          <li>• Ensure sufficient contrast for accessibility (WCAG AA standards)</li>
          <li>• Consider color psychology and emotional impact</li>
          <li>• Test colors in different lighting conditions</li>
          <li>• Limit your palette to 3-5 main colors for consistency</li>
          <li>• Use color tools to check color blindness compatibility</li>
        </ul>
      </div>
    </div>
  )
}
