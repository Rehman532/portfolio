'use client'

import { useState, useEffect } from 'react'
import { Calculator, TrendingUp, Award, Copy, Plus, X } from 'lucide-react'

interface Course {
  id: string
  name: string
  grade: string
  credits: number
  gradePoints: number
}

interface GradeResult {
  gpa: number
  totalCredits: number
  totalGradePoints: number
  letterGrade: string
  percentage: number
}

const gradeScale = {
  'A+': { points: 4.0, percentage: 97 },
  'A': { points: 4.0, percentage: 93 },
  'A-': { points: 3.7, percentage: 90 },
  'B+': { points: 3.3, percentage: 87 },
  'B': { points: 3.0, percentage: 83 },
  'B-': { points: 2.7, percentage: 80 },
  'C+': { points: 2.3, percentage: 77 },
  'C': { points: 2.0, percentage: 73 },
  'C-': { points: 1.7, percentage: 70 },
  'D+': { points: 1.3, percentage: 67 },
  'D': { points: 1.0, percentage: 63 },
  'D-': { points: 0.7, percentage: 60 },
  'F': { points: 0.0, percentage: 0 }
}

export default function GradeCalculatorTool() {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Course 1', grade: 'A', credits: 3, gradePoints: 12.0 }
  ])
  const [targetGPA, setTargetGPA] = useState('')
  const [currentGPA, setCurrentGPA] = useState('')
  const [completedCredits, setCompletedCredits] = useState('')
  const [results, setResults] = useState<GradeResult>({
    gpa: 0,
    totalCredits: 0,
    totalGradePoints: 0,
    letterGrade: 'F',
    percentage: 0
  })

  const calculateGPA = () => {
    const validCourses = courses.filter(course => course.grade && course.credits > 0)
    
    if (validCourses.length === 0) {
      setResults({
        gpa: 0,
        totalCredits: 0,
        totalGradePoints: 0,
        letterGrade: 'F',
        percentage: 0
      })
      return
    }

    const totalCredits = validCourses.reduce((sum, course) => sum + course.credits, 0)
    const totalGradePoints = validCourses.reduce((sum, course) => sum + course.gradePoints, 0)
    const gpa = totalGradePoints / totalCredits

    // Convert GPA to letter grade and percentage
    let letterGrade = 'F'
    let percentage = 0

    if (gpa >= 3.7) {
      letterGrade = 'A'
      percentage = 93 + (gpa - 3.7) * 10
    } else if (gpa >= 3.3) {
      letterGrade = 'B+'
      percentage = 87 + (gpa - 3.3) * 15
    } else if (gpa >= 3.0) {
      letterGrade = 'B'
      percentage = 83 + (gpa - 3.0) * 12
    } else if (gpa >= 2.7) {
      letterGrade = 'B-'
      percentage = 80 + (gpa - 2.7) * 10
    } else if (gpa >= 2.3) {
      letterGrade = 'C+'
      percentage = 77 + (gpa - 2.3) * 10
    } else if (gpa >= 2.0) {
      letterGrade = 'C'
      percentage = 73 + (gpa - 2.0) * 10
    } else if (gpa >= 1.7) {
      letterGrade = 'C-'
      percentage = 70 + (gpa - 1.7) * 10
    } else if (gpa >= 1.3) {
      letterGrade = 'D+'
      percentage = 67 + (gpa - 1.3) * 10
    } else if (gpa >= 1.0) {
      letterGrade = 'D'
      percentage = 63 + (gpa - 1.0) * 10
    } else if (gpa >= 0.7) {
      letterGrade = 'D-'
      percentage = 60 + (gpa - 0.7) * 10
    } else {
      letterGrade = 'F'
      percentage = gpa * 60
    }

    setResults({
      gpa,
      totalCredits,
      totalGradePoints,
      letterGrade,
      percentage: Math.min(100, Math.max(0, percentage))
    })
  }

  useEffect(() => {
    calculateGPA()
  }, [courses])

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: `Course ${courses.length + 1}`,
      grade: 'A',
      credits: 3,
      gradePoints: 12.0
    }
    setCourses([...courses, newCourse])
  }

  const removeCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id))
  }

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    const updatedCourses = courses.map(course => {
      if (course.id === id) {
        const updatedCourse = { ...course }
        
        if (field === 'grade') {
          updatedCourse.grade = value as string
          updatedCourse.gradePoints = (gradeScale[value as keyof typeof gradeScale]?.points || 0) * course.credits
        } else if (field === 'credits') {
          const credits = parseFloat(value as string) || 0
          updatedCourse.credits = credits
          updatedCourse.gradePoints = (gradeScale[course.grade as keyof typeof gradeScale]?.points || 0) * credits
        } else if (field === 'name') {
          updatedCourse.name = value as string
        }
        
        return updatedCourse
      }
      return course
    })
    
    setCourses(updatedCourses)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const resetCalculator = () => {
    setCourses([{ id: '1', name: 'Course 1', grade: 'A', credits: 3, gradePoints: 12.0 }])
    setTargetGPA('')
    setCurrentGPA('')
    setCompletedCredits('')
  }

  const calculateTargetGPA = () => {
    const target = parseFloat(targetGPA) || 0
    const current = parseFloat(currentGPA) || 0
    const completed = parseFloat(completedCredits) || 0
    
    if (target <= 0 || current <= 0 || completed <= 0) {
      return { neededGPA: 0, message: 'Please enter valid values' }
    }

    const currentPoints = current * completed
    const remainingCredits = 120 - completed // Assuming 120 credit degree
    const neededPoints = (target * 120) - currentPoints
    const neededGPA = neededPoints / remainingCredits

    return {
      neededGPA,
      message: neededGPA > 4.0 ? 'Target GPA not achievable' : `You need ${neededGPA.toFixed(2)} GPA in remaining courses`
    }
  }

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return 'text-green-600 dark:text-green-400'
    if (gpa >= 3.0) return 'text-blue-600 dark:text-blue-400'
    if (gpa >= 2.5) return 'text-yellow-600 dark:text-yellow-400'
    if (gpa >= 2.0) return 'text-orange-600 dark:text-orange-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <div className="space-y-6">
      {/* Course Input */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <Calculator size={20} />
          GPA Calculator
        </h3>
        
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                  placeholder="Course name"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                
                <select
                  value={course.grade}
                  onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  {Object.keys(gradeScale).map(grade => (
                    <option key={grade} value={grade}>
                      {grade} ({gradeScale[grade as keyof typeof gradeScale].points})
                    </option>
                  ))}
                </select>
                
                <input
                  type="number"
                  value={course.credits}
                  onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                  placeholder="Credits"
                  min="0.5"
                  step="0.5"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                
                <button
                  onClick={() => removeCourse(course.id)}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
          
          <button
            onClick={addCourse}
            className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add Course
          </button>
        </div>
      </div>

      {/* GPA Results */}
      {results.gpa > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <Award size={20} className="text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">GPA</span>
            </div>
            <div className={`text-2xl font-bold ${getGPAColor(results.gpa)}`}>
              {results.gpa.toFixed(2)}
            </div>
            <button
              onClick={() => copyToClipboard(results.gpa.toFixed(2))}
              className="mt-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Letter Grade</span>
            </div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {results.letterGrade}
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              {results.percentage.toFixed(1)}%
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-2">
              <Calculator size={20} className="text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Credits</span>
            </div>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {results.totalCredits}
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300 mt-1">
              {courses.length} courses
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2 mb-2">
              <Award size={20} className="text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Grade Points</span>
            </div>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {results.totalGradePoints.toFixed(1)}
            </div>
            <div className="text-sm text-orange-700 dark:text-orange-300 mt-1">
              Total earned
            </div>
          </div>
        </div>
      )}

      {/* Target GPA Calculator */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4">
          Target GPA Calculator
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target GPA
            </label>
            <input
              type="number"
              value={targetGPA}
              onChange={(e) => setTargetGPA(e.target.value)}
              placeholder="Enter target GPA..."
              step="0.01"
              min="0"
              max="4"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current GPA
            </label>
            <input
              type="number"
              value={currentGPA}
              onChange={(e) => setCurrentGPA(e.target.value)}
              placeholder="Enter current GPA..."
              step="0.01"
              min="0"
              max="4"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Completed Credits
            </label>
            <input
              type="number"
              value={completedCredits}
              onChange={(e) => setCompletedCredits(e.target.value)}
              placeholder="Enter completed credits..."
              step="0.5"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {targetGPA && currentGPA && completedCredits && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-yellow-200 dark:border-yellow-700">
            <div className="text-center">
              <div className="text-lg font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                {calculateTargetGPA().message}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grade Scale Reference */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Grade Scale Reference
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {Object.entries(gradeScale).map(([grade, data]) => (
            <div key={grade} className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600 text-center">
              <div className="font-bold text-gray-900 dark:text-white">{grade}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{data.points}</div>
              <div className="text-xs text-gray-500 dark:text-gray-500">{data.percentage}%+</div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={resetCalculator}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          Reset Calculator
        </button>
      </div>
    </div>
  )
}
