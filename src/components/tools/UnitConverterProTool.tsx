'use client'

import { useState, useEffect } from 'react'
import { ArrowRightLeft, Copy, Calculator } from 'lucide-react'

interface ConversionUnit {
  name: string
  symbol: string
  category: string
  toBase: (value: number) => number
  fromBase: (value: number) => number
}

const conversionCategories = {
  length: [
    { name: 'Meter', symbol: 'm', toBase: (v: number) => v, fromBase: (v: number) => v },
    { name: 'Kilometer', symbol: 'km', toBase: (v: number) => v * 1000, fromBase: (v: number) => v / 1000 },
    { name: 'Centimeter', symbol: 'cm', toBase: (v: number) => v / 100, fromBase: (v: number) => v * 100 },
    { name: 'Millimeter', symbol: 'mm', toBase: (v: number) => v / 1000, fromBase: (v: number) => v * 1000 },
    { name: 'Mile', symbol: 'mi', toBase: (v: number) => v * 1609.344, fromBase: (v: number) => v / 1609.344 },
    { name: 'Yard', symbol: 'yd', toBase: (v: number) => v * 0.9144, fromBase: (v: number) => v / 0.9144 },
    { name: 'Foot', symbol: 'ft', toBase: (v: number) => v * 0.3048, fromBase: (v: number) => v / 0.3048 },
    { name: 'Inch', symbol: 'in', toBase: (v: number) => v * 0.0254, fromBase: (v: number) => v / 0.0254 },
    { name: 'Nautical Mile', symbol: 'nmi', toBase: (v: number) => v * 1852, fromBase: (v: number) => v / 1852 },
  ],
  weight: [
    { name: 'Kilogram', symbol: 'kg', toBase: (v: number) => v, fromBase: (v: number) => v },
    { name: 'Gram', symbol: 'g', toBase: (v: number) => v / 1000, fromBase: (v: number) => v * 1000 },
    { name: 'Milligram', symbol: 'mg', toBase: (v: number) => v / 1000000, fromBase: (v: number) => v * 1000000 },
    { name: 'Pound', symbol: 'lb', toBase: (v: number) => v * 0.453592, fromBase: (v: number) => v / 0.453592 },
    { name: 'Ounce', symbol: 'oz', toBase: (v: number) => v * 0.0283495, fromBase: (v: number) => v / 0.0283495 },
    { name: 'Ton', symbol: 't', toBase: (v: number) => v * 1000, fromBase: (v: number) => v / 1000 },
    { name: 'Stone', symbol: 'st', toBase: (v: number) => v * 6.35029, fromBase: (v: number) => v / 6.35029 },
  ],
  temperature: [
    { name: 'Celsius', symbol: '°C', toBase: (v: number) => v + 273.15, fromBase: (v: number) => v - 273.15 },
    { name: 'Fahrenheit', symbol: '°F', toBase: (v: number) => (v - 32) * 5/9 + 273.15, fromBase: (v: number) => (v - 273.15) * 9/5 + 32 },
    { name: 'Kelvin', symbol: 'K', toBase: (v: number) => v, fromBase: (v: number) => v },
    { name: 'Rankine', symbol: '°R', toBase: (v: number) => v * 5/9, fromBase: (v: number) => v * 9/5 },
  ],
  volume: [
    { name: 'Liter', symbol: 'L', toBase: (v: number) => v, fromBase: (v: number) => v },
    { name: 'Milliliter', symbol: 'mL', toBase: (v: number) => v / 1000, fromBase: (v: number) => v * 1000 },
    { name: 'Gallon', symbol: 'gal', toBase: (v: number) => v * 3.78541, fromBase: (v: number) => v / 3.78541 },
    { name: 'Quart', symbol: 'qt', toBase: (v: number) => v * 0.946353, fromBase: (v: number) => v / 0.946353 },
    { name: 'Pint', symbol: 'pt', toBase: (v: number) => v * 0.473176, fromBase: (v: number) => v / 0.473176 },
    { name: 'Cup', symbol: 'cup', toBase: (v: number) => v * 0.236588, fromBase: (v: number) => v / 0.236588 },
    { name: 'Fluid Ounce', symbol: 'fl oz', toBase: (v: number) => v * 0.0295735, fromBase: (v: number) => v / 0.0295735 },
    { name: 'Tablespoon', symbol: 'tbsp', toBase: (v: number) => v * 0.0147868, fromBase: (v: number) => v / 0.0147868 },
    { name: 'Teaspoon', symbol: 'tsp', toBase: (v: number) => v * 0.00492892, fromBase: (v: number) => v / 0.00492892 },
  ],
  area: [
    { name: 'Square Meter', symbol: 'm²', toBase: (v: number) => v, fromBase: (v: number) => v },
    { name: 'Square Kilometer', symbol: 'km²', toBase: (v: number) => v * 1000000, fromBase: (v: number) => v / 1000000 },
    { name: 'Square Centimeter', symbol: 'cm²', toBase: (v: number) => v / 10000, fromBase: (v: number) => v * 10000 },
    { name: 'Square Mile', symbol: 'mi²', toBase: (v: number) => v * 2589988.11, fromBase: (v: number) => v / 2589988.11 },
    { name: 'Acre', symbol: 'ac', toBase: (v: number) => v * 4046.86, fromBase: (v: number) => v / 4046.86 },
    { name: 'Hectare', symbol: 'ha', toBase: (v: number) => v * 10000, fromBase: (v: number) => v / 10000 },
    { name: 'Square Foot', symbol: 'ft²', toBase: (v: number) => v * 0.092903, fromBase: (v: number) => v / 0.092903 },
    { name: 'Square Inch', symbol: 'in²', toBase: (v: number) => v * 0.00064516, fromBase: (v: number) => v / 0.00064516 },
  ],
  speed: [
    { name: 'Meter per Second', symbol: 'm/s', toBase: (v: number) => v, fromBase: (v: number) => v },
    { name: 'Kilometer per Hour', symbol: 'km/h', toBase: (v: number) => v / 3.6, fromBase: (v: number) => v * 3.6 },
    { name: 'Mile per Hour', symbol: 'mph', toBase: (v: number) => v * 0.44704, fromBase: (v: number) => v / 0.44704 },
    { name: 'Knot', symbol: 'kt', toBase: (v: number) => v * 0.514444, fromBase: (v: number) => v / 0.514444 },
    { name: 'Foot per Second', symbol: 'ft/s', toBase: (v: number) => v * 0.3048, fromBase: (v: number) => v / 0.3048 },
  ],
  pressure: [
    { name: 'Pascal', symbol: 'Pa', toBase: (v: number) => v, fromBase: (v: number) => v },
    { name: 'Kilopascal', symbol: 'kPa', toBase: (v: number) => v * 1000, fromBase: (v: number) => v / 1000 },
    { name: 'Bar', symbol: 'bar', toBase: (v: number) => v * 100000, fromBase: (v: number) => v / 100000 },
    { name: 'PSI', symbol: 'psi', toBase: (v: number) => v * 6894.76, fromBase: (v: number) => v / 6894.76 },
    { name: 'Atmosphere', symbol: 'atm', toBase: (v: number) => v * 101325, fromBase: (v: number) => v / 101325 },
    { name: 'Torr', symbol: 'torr', toBase: (v: number) => v * 133.322, fromBase: (v: number) => v / 133.322 },
  ],
  energy: [
    { name: 'Joule', symbol: 'J', toBase: (v: number) => v, fromBase: (v: number) => v },
    { name: 'Kilojoule', symbol: 'kJ', toBase: (v: number) => v * 1000, fromBase: (v: number) => v / 1000 },
    { name: 'Calorie', symbol: 'cal', toBase: (v: number) => v * 4.184, fromBase: (v: number) => v / 4.184 },
    { name: 'Kilocalorie', symbol: 'kcal', toBase: (v: number) => v * 4184, fromBase: (v: number) => v / 4184 },
    { name: 'Watt-hour', symbol: 'Wh', toBase: (v: number) => v * 3600, fromBase: (v: number) => v / 3600 },
    { name: 'Kilowatt-hour', symbol: 'kWh', toBase: (v: number) => v * 3600000, fromBase: (v: number) => v / 3600000 },
    { name: 'BTU', symbol: 'BTU', toBase: (v: number) => v * 1055.06, fromBase: (v: number) => v / 1055.06 },
  ],
  power: [
    { name: 'Watt', symbol: 'W', toBase: (v: number) => v, fromBase: (v: number) => v },
    { name: 'Kilowatt', symbol: 'kW', toBase: (v: number) => v * 1000, fromBase: (v: number) => v / 1000 },
    { name: 'Horsepower', symbol: 'hp', toBase: (v: number) => v * 745.7, fromBase: (v: number) => v / 745.7 },
    { name: 'Megawatt', symbol: 'MW', toBase: (v: number) => v * 1000000, fromBase: (v: number) => v / 1000000 },
  ],
  time: [
    { name: 'Second', symbol: 's', toBase: (v: number) => v, fromBase: (v: number) => v },
    { name: 'Minute', symbol: 'min', toBase: (v: number) => v * 60, fromBase: (v: number) => v / 60 },
    { name: 'Hour', symbol: 'h', toBase: (v: number) => v * 3600, fromBase: (v: number) => v / 3600 },
    { name: 'Day', symbol: 'd', toBase: (v: number) => v * 86400, fromBase: (v: number) => v / 86400 },
    { name: 'Week', symbol: 'wk', toBase: (v: number) => v * 604800, fromBase: (v: number) => v / 604800 },
    { name: 'Month', symbol: 'mo', toBase: (v: number) => v * 2629746, fromBase: (v: number) => v / 2629746 },
    { name: 'Year', symbol: 'yr', toBase: (v: number) => v * 31556952, fromBase: (v: number) => v / 31556952 },
  ],
  data: [
    { name: 'Byte', symbol: 'B', toBase: (v: number) => v, fromBase: (v: number) => v },
    { name: 'Kilobyte', symbol: 'KB', toBase: (v: number) => v * 1024, fromBase: (v: number) => v / 1024 },
    { name: 'Megabyte', symbol: 'MB', toBase: (v: number) => v * 1048576, fromBase: (v: number) => v / 1048576 },
    { name: 'Gigabyte', symbol: 'GB', toBase: (v: number) => v * 1073741824, fromBase: (v: number) => v / 1073741824 },
    { name: 'Terabyte', symbol: 'TB', toBase: (v: number) => v * 1099511627776, fromBase: (v: number) => v / 1099511627776 },
    { name: 'Bit', symbol: 'bit', toBase: (v: number) => v / 8, fromBase: (v: number) => v * 8 },
    { name: 'Kilobit', symbol: 'Kbit', toBase: (v: number) => v * 128, fromBase: (v: number) => v / 128 },
    { name: 'Megabit', symbol: 'Mbit', toBase: (v: number) => v * 131072, fromBase: (v: number) => v / 131072 },
    { name: 'Gigabit', symbol: 'Gbit', toBase: (v: number) => v * 134217728, fromBase: (v: number) => v / 134217728 },
  ]
}

export default function UnitConverterProTool() {
  const [category, setCategory] = useState<keyof typeof conversionCategories>('length')
  const [fromValue, setFromValue] = useState('')
  const [fromUnit, setFromUnit] = useState('')
  const [toUnit, setToUnit] = useState('')
  const [result, setResult] = useState('')

  const currentUnits = conversionCategories[category]

  useEffect(() => {
    if (currentUnits.length > 0) {
      setFromUnit(currentUnits[0].name)
      setToUnit(currentUnits[1]?.name || currentUnits[0].name)
    }
  }, [category, currentUnits])

  useEffect(() => {
    if (fromValue && fromUnit && toUnit) {
      const value = parseFloat(fromValue)
      if (!isNaN(value)) {
        const fromUnitData = currentUnits.find(u => u.name === fromUnit)
        const toUnitData = currentUnits.find(u => u.name === toUnit)
        
        if (fromUnitData && toUnitData) {
          const baseValue = fromUnitData.toBase(value)
          const convertedValue = toUnitData.fromBase(baseValue)
          
          if (Math.abs(convertedValue) > 1000000 || Math.abs(convertedValue) < 0.0001) {
            setResult(convertedValue.toExponential(6))
          } else {
            setResult(convertedValue.toLocaleString(undefined, { 
              maximumFractionDigits: 10,
              minimumFractionDigits: 0 
            }))
          }
        }
      } else {
        setResult('')
      }
    } else {
      setResult('')
    }
  }, [fromValue, fromUnit, toUnit, currentUnits])

  const swapUnits = () => {
    setToUnit(fromUnit)
    setFromUnit(toUnit)
    setFromValue(result)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const resetConverter = () => {
    setFromValue('')
    setResult('')
  }

  const getUnitSymbol = (unitName: string) => {
    const unit = currentUnits.find(u => u.name === unitName)
    return unit?.symbol || ''
  }

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <Calculator size={20} />
          Advanced Unit Converter
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as keyof typeof conversionCategories)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          >
            <option value="length">Length</option>
            <option value="weight">Weight/Mass</option>
            <option value="temperature">Temperature</option>
            <option value="volume">Volume</option>
            <option value="area">Area</option>
            <option value="speed">Speed</option>
            <option value="pressure">Pressure</option>
            <option value="energy">Energy</option>
            <option value="power">Power</option>
            <option value="time">Time</option>
            <option value="data">Data Storage</option>
          </select>
        </div>
      </div>

      {/* Conversion Interface */}
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              From
            </label>
            <input
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              placeholder="Enter value..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full mt-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            >
              {currentUnits.map((unit) => (
                <option key={unit.name} value={unit.name}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To
            </label>
            <div className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg min-h-[48px] flex items-center justify-between">
              <span className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                {result || 'Result will appear here'}
              </span>
              {result && (
                <button
                  onClick={() => copyToClipboard(result)}
                  className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                >
                  <Copy size={18} />
                </button>
              )}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full mt-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            >
              {currentUnits.map((unit) => (
                <option key={unit.name} value={unit.name}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={swapUnits}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium flex items-center gap-2"
          >
            <ArrowRightLeft size={18} />
            Swap Units
          </button>
        </div>
      </div>

      {/* Conversion Formula */}
      {result && fromValue && (
        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
            Conversion Details
          </h3>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-2">
                {fromValue} {getUnitSymbol(fromUnit)} = {result} {getUnitSymbol(toUnit)}
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-300">
                {fromValue} {fromUnit} equals {result} {toUnit}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Conversions */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
          Quick Common Conversions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          {category === 'length' && (
            <>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-yellow-200 dark:border-yellow-700">
                <div className="font-medium text-yellow-900 dark:text-yellow-100">1 inch</div>
                <div className="text-yellow-700 dark:text-yellow-300">= 2.54 cm</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-yellow-200 dark:border-yellow-700">
                <div className="font-medium text-yellow-900 dark:text-yellow-100">1 foot</div>
                <div className="text-yellow-700 dark:text-yellow-300">= 12 inches</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-yellow-200 dark:border-yellow-700">
                <div className="font-medium text-yellow-900 dark:text-yellow-100">1 mile</div>
                <div className="text-yellow-700 dark:text-yellow-300">= 1.609 km</div>
              </div>
            </>
          )}
          {category === 'weight' && (
            <>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-yellow-200 dark:border-yellow-700">
                <div className="font-medium text-yellow-900 dark:text-yellow-100">1 kg</div>
                <div className="text-yellow-700 dark:text-yellow-300">= 2.205 lb</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-yellow-200 dark:border-yellow-700">
                <div className="font-medium text-yellow-900 dark:text-yellow-100">1 lb</div>
                <div className="text-yellow-700 dark:text-yellow-300">= 16 oz</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-yellow-200 dark:border-yellow-700">
                <div className="font-medium text-yellow-900 dark:text-yellow-100">1 ton</div>
                <div className="text-yellow-700 dark:text-yellow-300">= 1000 kg</div>
              </div>
            </>
          )}
          {category === 'temperature' && (
            <>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-yellow-200 dark:border-yellow-700">
                <div className="font-medium text-yellow-900 dark:text-yellow-100">0°C</div>
                <div className="text-yellow-700 dark:text-yellow-300">= 32°F</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-yellow-200 dark:border-yellow-700">
                <div className="font-medium text-yellow-900 dark:text-yellow-100">100°C</div>
                <div className="text-yellow-700 dark:text-yellow-300">= 212°F</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-yellow-200 dark:border-yellow-700">
                <div className="font-medium text-yellow-900 dark:text-yellow-100">0°F</div>
                <div className="text-yellow-700 dark:text-yellow-300">= -17.78°C</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={resetConverter}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          Reset Converter
        </button>
      </div>
    </div>
  )
}
