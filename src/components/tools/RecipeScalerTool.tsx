'use client'

import { useState, useEffect } from 'react'
import { ChefHat, Calculator, Users, Copy, Plus, Minus } from 'lucide-react'

interface Ingredient {
  name: string
  amount: number
  unit: string
}

export default function RecipeScalerTool() {
  const [originalServings, setOriginalServings] = useState('4')
  const [desiredServings, setDesiredServings] = useState('8')
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: 'All-purpose flour', amount: 2, unit: 'cups' },
    { name: 'Sugar', amount: 1, unit: 'cup' },
    { name: 'Eggs', amount: 2, unit: 'large' },
    { name: 'Milk', amount: 1, unit: 'cup' },
    { name: 'Butter', amount: 0.5, unit: 'cup' }
  ])
  const [newIngredientName, setNewIngredientName] = useState('')
  const [newIngredientAmount, setNewIngredientAmount] = useState('')
  const [newIngredientUnit, setNewIngredientUnit] = useState('')

  const scaleFactor = parseFloat(desiredServings) / parseFloat(originalServings) || 1

  const scaledIngredients = ingredients.map(ingredient => ({
    ...ingredient,
    amount: ingredient.amount * scaleFactor
  }))

  const addIngredient = () => {
    if (newIngredientName && newIngredientAmount && newIngredientUnit) {
      setIngredients([...ingredients, {
        name: newIngredientName,
        amount: parseFloat(newIngredientAmount),
        unit: newIngredientUnit
      }])
      setNewIngredientName('')
      setNewIngredientAmount('')
      setNewIngredientUnit('')
    }
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const updateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    const updated = [...ingredients]
    if (field === 'amount') {
      updated[index][field] = parseFloat(value as string) || 0
    } else {
      updated[index][field] = value as string
    }
    setIngredients(updated)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const resetRecipe = () => {
    setOriginalServings('4')
    setDesiredServings('8')
    setIngredients([
      { name: 'All-purpose flour', amount: 2, unit: 'cups' },
      { name: 'Sugar', amount: 1, unit: 'cup' },
      { name: 'Eggs', amount: 2, unit: 'large' },
      { name: 'Milk', amount: 1, unit: 'cup' },
      { name: 'Butter', amount: 0.5, unit: 'cup' }
    ])
  }

  const formatAmount = (amount: number) => {
    if (amount % 1 === 0) {
      return amount.toString()
    }
    return amount.toFixed(2).replace(/\.?0+$/, '')
  }

  return (
    <div className="space-y-6">
      {/* Serving Size Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <Users size={20} />
          Serving Size Adjustment
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Original Servings
            </label>
            <input
              type="number"
              value={originalServings}
              onChange={(e) => setOriginalServings(e.target.value)}
              min="1"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Desired Servings
            </label>
            <input
              type="number"
              value={desiredServings}
              onChange={(e) => setDesiredServings(e.target.value)}
              min="1"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div className="md:col-span-2 flex items-end">
            <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">Scale Factor: </span>
              <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                {scaleFactor.toFixed(2)}x
              </span>
            </div>
          </div>
        </div>

        {/* Quick Scale Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setDesiredServings((parseFloat(originalServings) * 0.5).toString())}
            className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
          >
            Half Size
          </button>
          <button
            onClick={() => setDesiredServings((parseFloat(originalServings) * 2).toString())}
            className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
          >
            Double Size
          </button>
          <button
            onClick={() => setDesiredServings((parseFloat(originalServings) * 1.5).toString())}
            className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
          >
            1.5x Size
          </button>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
          <ChefHat size={20} />
          Recipe Ingredients
        </h3>

        {/* Ingredients List */}
        <div className="space-y-3 mb-6">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                  placeholder="Ingredient name"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="number"
                  value={ingredient.amount}
                  onChange={(e) => updateIngredient(index, 'amount', e.target.value)}
                  step="0.01"
                  placeholder="Amount"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  value={ingredient.unit}
                  onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                  placeholder="Unit"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={() => removeIngredient(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Ingredient */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Add New Ingredient</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              value={newIngredientName}
              onChange={(e) => setNewIngredientName(e.target.value)}
              placeholder="Ingredient name"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
            <input
              type="number"
              value={newIngredientAmount}
              onChange={(e) => setNewIngredientAmount(e.target.value)}
              placeholder="Amount"
              step="0.01"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
            <input
              type="text"
              value={newIngredientUnit}
              onChange={(e) => setNewIngredientUnit(e.target.value)}
              placeholder="Unit (cups, tbsp, etc)"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
            <button
              onClick={addIngredient}
              className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Scaled Results */}
      <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
          <Calculator size={20} />
          Scaled Recipe Results
        </h3>
        
        <div className="space-y-3">
          {scaledIngredients.map((ingredient, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {ingredient.name}
                  </h4>
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {formatAmount(ingredient.amount)} {ingredient.unit}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Original: {formatAmount(ingredients[index].amount)} {ingredients[index].unit}
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(`${formatAmount(ingredient.amount)} ${ingredient.unit} ${ingredient.name}`)}
                  className="ml-4 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                >
                  <Copy size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => copyToClipboard(scaledIngredients.map(i => `${formatAmount(i.amount)} ${i.unit} ${i.name}`).join('\n'))}
          className="w-full px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium mt-4"
        >
          Copy All Ingredients
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={resetRecipe}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          Reset Recipe
        </button>
      </div>

      {/* Tips Section */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
          💡 Recipe Scaling Tips
        </h3>
        <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
          <li>• Scale spices carefully - some may need less proportional scaling</li>
          <li>• Adjust cooking time and temperature for larger batches</li>
          <li>• Consider pan size when scaling up recipes</li>
          <li>• Taste and adjust seasonings after scaling</li>
          <li>• Some ingredients (like yeast) don't scale linearly</li>
          <li>• Keep notes on successful scaling ratios for future reference</li>
        </ul>
      </div>
    </div>
  )
}
