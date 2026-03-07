'use client'

import { useState } from 'react'
import { Copy, Check, Download, Upload, RotateCcw, FileText, Hash, Calculator, Clock, Link, Scissors, Binary, FileCode, Ruler, Calculator as CalculatorIcon } from 'lucide-react'

const UnitConverterTool = () => {
  const [value, setValue] = useState('1')
  const [fromUnit, setFromUnit] = useState('meter')
  const [toUnit, setToUnit] = useState('foot')
  const [result, setResult] = useState('3.28084')
  const [category, setCategory] = useState('length')
  const [copied, setCopied] = useState('')

  const categories = {
    length: {
      units: {
        meter: { name: 'Meter', factor: 1 },
        kilometer: { name: 'Kilometer', factor: 0.001 },
        centimeter: { name: 'Centimeter', factor: 100 },
        millimeter: { name: 'Millimeter', factor: 1000 },
        mile: { name: 'Mile', factor: 0.000621371 },
        yard: { name: 'Yard', factor: 1.09361 },
        foot: { name: 'Foot', factor: 3.28084 },
        inch: { name: 'Inch', factor: 39.3701 }
      }
    },
    weight: {
      units: {
        kilogram: { name: 'Kilogram', factor: 1 },
        gram: { name: 'Gram', factor: 1000 },
        milligram: { name: 'Milligram', factor: 1000000 },
        pound: { name: 'Pound', factor: 2.20462 },
        ounce: { name: 'Ounce', factor: 35.274 },
        ton: { name: 'Ton', factor: 0.001 }
      }
    },
    temperature: {
      units: {
        celsius: { name: 'Celsius', factor: 1, offset: 0 },
        fahrenheit: { name: 'Fahrenheit', factor: 1.8, offset: 32 },
        kelvin: { name: 'Kelvin', factor: 1, offset: 273.15 }
      }
    },
    data: {
      units: {
        byte: { name: 'Byte', factor: 1 },
        kilobyte: { name: 'Kilobyte', factor: 0.001 },
        megabyte: { name: 'Megabyte', factor: 0.000001 },
        gigabyte: { name: 'Gigabyte', factor: 0.000000001 },
        terabyte: { name: 'Terabyte', factor: 0.000000000001 },
        bit: { name: 'Bit', factor: 8 },
        kilobit: { name: 'Kilobit', factor: 0.008 },
        megabit: { name: 'Megabit', factor: 0.000008 }
      }
    }
  }

  const convert = () => {
    const numValue = parseFloat(value)
    if (isNaN(numValue)) {
      setResult('Invalid input')
      return
    }

    const categoryUnits = categories[category as keyof typeof categories].units
    const fromUnitData = (categoryUnits as any)[fromUnit]
    const toUnitData = (categoryUnits as any)[toUnit]
    const fromFactor = fromUnitData.factor
    const toFactor = toUnitData.factor

    if (category === 'temperature') {
      const fromOffset = fromUnitData.offset || 0
      const toOffset = toUnitData.offset || 0
      
      // Convert to Celsius first
      const celsius = (numValue - fromOffset) / fromFactor
      // Then convert to target unit
      const converted = (celsius * toFactor) + toOffset
      setResult(converted.toFixed(6))
    } else {
      const converted = (numValue / fromFactor) * toFactor
      setResult(converted.toFixed(6))
    }
  }

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied('result')
    setTimeout(() => setCopied(''), 2000)
  }

  const clearAll = () => {
    setValue('1')
    setResult('3.28084')
  }

  useState(() => {
    convert()
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Unit Converter</h2>
        <p className="text-gray-600 dark:text-gray-400">Convert between different units of measurement</p>
      </div>

      {/* Category Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.keys(categories).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat)
                if (cat === 'length') {
                  setFromUnit('meter')
                  setToUnit('foot')
                } else if (cat === 'weight') {
                  setFromUnit('kilogram')
                  setToUnit('pound')
                } else if (cat === 'temperature') {
                  setFromUnit('celsius')
                  setToUnit('fahrenheit')
                } else if (cat === 'data') {
                  setFromUnit('megabyte')
                  setToUnit('gigabyte')
                }
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                category === cat
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Converter */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
        <div className="space-y-6">
          {/* Value Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
              placeholder="Enter value to convert"
            />
          </div>

          {/* Units Selection */}
          <div className="grid md:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
              >
                {Object.entries(categories[category as keyof typeof categories].units).map(([key, unit]) => (
                  <option key={key} value={key}>{unit.name}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button
                onClick={swapUnits}
                className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-300"
              >
                <RotateCcw size={20} />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                To
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
              >
                {Object.entries(categories[category as keyof typeof categories].units).map(([key, unit]) => (
                  <option key={key} value={key}>{unit.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Convert Button */}
          <button
            onClick={convert}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <CalculatorIcon size={20} />
            Convert
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Result</h3>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {value} {(categories[category as keyof typeof categories].units as any)[fromUnit].name}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">=</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                  {result} {(categories[category as keyof typeof categories].units as any)[toUnit].name}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(`${value} ${(categories[category as keyof typeof categories].units as any)[fromUnit].name} = ${result} ${(categories[category as keyof typeof categories].units as any)[toUnit].name}`)}
                className="p-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {copied === 'result' ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Common Conversions */}
      <div className="bg-green-50 dark:bg-gray-800 rounded-xl p-6 border border-green-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Reference</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {category === 'length' && (
            <>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">1 Meter =</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">3.28084 Feet</p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">1 Kilometer =</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">0.621371 Miles</p>
              </div>
            </>
          )}
          {category === 'weight' && (
            <>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">1 Kilogram =</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">2.20462 Pounds</p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">1 Pound =</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">453.592 Grams</p>
              </div>
            </>
          )}
          {category === 'temperature' && (
            <>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">0°C =</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">32°F</p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">100°C =</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">212°F</p>
              </div>
            </>
          )}
          {category === 'data' && (
            <>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">1 MB =</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">1,048,576 Bytes</p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">1 GB =</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">1,024 MB</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default UnitConverterTool
