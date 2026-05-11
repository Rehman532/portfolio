'use client'

import { useState, useEffect } from 'react'
import { Calculator, DollarSign, Users, Copy, TrendingUp, Clock } from 'lucide-react'

interface ProjectTask {
  id: string
  name: string
  hours: number
  hourlyRate: number
  category: string
}

interface CostResult {
  totalHours: number
  laborCost: number
  materialCost: number
  overheadCost: number
  totalCost: number
  costPerHour: number
  estimatedDuration: string
}

const taskCategories = [
  'Planning',
  'Design',
  'Development',
  'Testing',
  'Documentation',
  'Management',
  'Deployment',
  'Support'
]

export default function ProjectCostEstimatorTool() {
  const [tasks, setTasks] = useState<ProjectTask[]>([
    { id: '1', name: 'Project Planning', hours: 40, hourlyRate: 75, category: 'Planning' }
  ])
  const [materialCost, setMaterialCost] = useState('')
  const [overheadPercentage, setOverheadPercentage] = useState('20')
  const [results, setResults] = useState<CostResult>({
    totalHours: 0,
    laborCost: 0,
    materialCost: 0,
    overheadCost: 0,
    totalCost: 0,
    costPerHour: 0,
    estimatedDuration: ''
  })

  const calculateCosts = () => {
    const validTasks = tasks.filter(task => task.hours > 0 && task.hourlyRate > 0)
    
    const totalHours = validTasks.reduce((sum, task) => sum + task.hours, 0)
    const laborCost = validTasks.reduce((sum, task) => sum + (task.hours * task.hourlyRate), 0)
    const materials = parseFloat(materialCost) || 0
    const overheadRate = parseFloat(overheadPercentage) || 20
    const overheadCost = (laborCost + materials) * (overheadRate / 100)
    const totalCost = laborCost + materials + overheadCost
    const costPerHour = totalHours > 0 ? totalCost / totalHours : 0

    // Estimate duration (assuming 8-hour work days)
    const workDays = Math.ceil(totalHours / 8)
    const weeks = Math.ceil(workDays / 5)
    const estimatedDuration = weeks > 4 
      ? `${Math.round(weeks / 4 * 10) / 10} months`
      : weeks > 1 
      ? `${weeks} weeks`
      : `${workDays} days`

    setResults({
      totalHours,
      laborCost,
      materialCost: materials,
      overheadCost,
      totalCost,
      costPerHour,
      estimatedDuration
    })
  }

  useEffect(() => {
    calculateCosts()
  }, [tasks, materialCost, overheadPercentage])

  const addTask = () => {
    const newTask: ProjectTask = {
      id: Date.now().toString(),
      name: `Task ${tasks.length + 1}`,
      hours: 40,
      hourlyRate: 75,
      category: 'Development'
    }
    setTasks([...tasks, newTask])
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const updateTask = (id: string, field: keyof ProjectTask, value: string | number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task }
        
        if (field === 'hours') {
          updatedTask.hours = parseFloat(value as string) || 0
        } else if (field === 'hourlyRate') {
          updatedTask.hourlyRate = parseFloat(value as string) || 0
        } else if (field === 'name') {
          updatedTask.name = value as string
        } else if (field === 'category') {
          updatedTask.category = value as string
        }
        
        return updatedTask
      }
      return task
    })
    
    setTasks(updatedTasks)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const resetEstimator = () => {
    setTasks([{ id: '1', name: 'Project Planning', hours: 40, hourlyRate: 75, category: 'Planning' }])
    setMaterialCost('')
    setOverheadPercentage('20')
  }

  const loadSampleProject = () => {
    const sampleTasks: ProjectTask[] = [
      { id: '1', name: 'Requirements Analysis', hours: 20, hourlyRate: 85, category: 'Planning' },
      { id: '2', name: 'UI/UX Design', hours: 60, hourlyRate: 90, category: 'Design' },
      { id: '3', name: 'Frontend Development', hours: 120, hourlyRate: 80, category: 'Development' },
      { id: '4', name: 'Backend Development', hours: 100, hourlyRate: 85, category: 'Development' },
      { id: '5', name: 'Database Setup', hours: 40, hourlyRate: 85, category: 'Development' },
      { id: '6', name: 'Testing & QA', hours: 60, hourlyRate: 75, category: 'Testing' },
      { id: '7', name: 'Documentation', hours: 30, hourlyRate: 70, category: 'Documentation' },
      { id: '8', name: 'Deployment', hours: 20, hourlyRate: 80, category: 'Deployment' }
    ]
    setTasks(sampleTasks)
    setMaterialCost('5000')
    setOverheadPercentage('25')
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'Planning': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'Design': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      'Development': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'Testing': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'Documentation': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
      'Management': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      'Deployment': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
      'Support': 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Project Tasks */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <Calculator size={20} />
          Project Cost Estimator
        </h3>
        
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                <input
                  type="text"
                  value={task.name}
                  onChange={(e) => updateTask(task.id, 'name', e.target.value)}
                  placeholder="Task name"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                
                <input
                  type="number"
                  value={task.hours}
                  onChange={(e) => updateTask(task.id, 'hours', e.target.value)}
                  placeholder="Hours"
                  min="0"
                  step="0.5"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                
                <input
                  type="number"
                  value={task.hourlyRate}
                  onChange={(e) => updateTask(task.id, 'hourlyRate', e.target.value)}
                  placeholder="Hourly rate"
                  min="0"
                  step="5"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                
                <select
                  value={task.category}
                  onChange={(e) => updateTask(task.id, 'category', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  {taskCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <button
                  onClick={() => removeTask(task.id)}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <button
            onClick={addTask}
            className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Additional Costs */}
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
          Additional Costs
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Material Costs ($)
            </label>
            <input
              type="number"
              value={materialCost}
              onChange={(e) => setMaterialCost(e.target.value)}
              placeholder="Enter material costs..."
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Overhead Percentage (%)
            </label>
            <input
              type="number"
              value={overheadPercentage}
              onChange={(e) => setOverheadPercentage(e.target.value)}
              placeholder="Enter overhead percentage..."
              step="1"
              min="0"
              max="100"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Cost Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={20} className="text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Hours</span>
          </div>
          <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
            {results.totalHours}
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-300 mt-1">
            {results.estimatedDuration}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <Users size={20} className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Labor Cost</span>
          </div>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            ${results.laborCost.toLocaleString()}
          </div>
          <button
            onClick={() => copyToClipboard(results.laborCost.toString())}
            className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
          >
            <Copy size={14} />
            Copy
          </button>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={20} className="text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Total Cost</span>
          </div>
          <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
            ${results.totalCost.toLocaleString()}
          </div>
          <button
            onClick={() => copyToClipboard(results.totalCost.toString())}
            className="mt-2 text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 flex items-center gap-1"
          >
            <Copy size={14} />
            Copy
          </button>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} className="text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Cost per Hour</span>
          </div>
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">
            ${results.costPerHour.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Cost Breakdown
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Labor Cost:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              ${results.laborCost.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Material Costs:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              ${results.materialCost.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Overhead ({overheadPercentage}%):</span>
            <span className="font-medium text-gray-900 dark:text-white">
              ${results.overheadCost.toLocaleString()}
            </span>
          </div>
          <div className="border-t pt-3 flex justify-between items-center">
            <span className="font-semibold text-gray-900 dark:text-white">Total Cost:</span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              ${results.totalCost.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Task Categories Summary */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4">
          Task Summary by Category
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {taskCategories.map(category => {
            const categoryTasks = tasks.filter(task => task.category === category)
            const categoryHours = categoryTasks.reduce((sum, task) => sum + task.hours, 0)
            const categoryCost = categoryTasks.reduce((sum, task) => sum + (task.hours * task.hourlyRate), 0)
            
            if (categoryTasks.length === 0) return null
            
            return (
              <div key={category} className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <div className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(category)} mb-2`}>
                  {category}
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Hours:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{categoryHours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Cost:</span>
                    <span className="font-medium text-gray-900 dark:text-white">${categoryCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={loadSampleProject}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Load Sample Project
        </button>
        <button
          onClick={resetEstimator}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          Reset Estimator
        </button>
      </div>
    </div>
  )
}
