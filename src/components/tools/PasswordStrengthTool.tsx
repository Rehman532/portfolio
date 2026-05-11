'use client'

import { useState, useEffect } from 'react'
import { Shield, Eye, EyeOff, Copy, Check, X, AlertTriangle } from 'lucide-react'

interface StrengthResult {
  score: number
  level: 'weak' | 'fair' | 'good' | 'strong' | 'excellent'
  color: string
  feedback: string[]
  suggestions: string[]
}

export default function PasswordStrengthTool() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [result, setResult] = useState<StrengthResult>({
    score: 0,
    level: 'weak',
    color: 'text-red-600',
    feedback: [],
    suggestions: []
  })

  const analyzePassword = (pwd: string): StrengthResult => {
    let score = 0
    const feedback: string[] = []
    const suggestions: string[] = []

    // Length check
    if (pwd.length >= 8) {
      score += 20
      feedback.push('✓ Good length (8+ characters)')
    } else {
      suggestions.push('Use at least 8 characters')
    }

    if (pwd.length >= 12) {
      score += 10
      feedback.push('✓ Excellent length (12+ characters)')
    }

    // Uppercase letters
    if (/[A-Z]/.test(pwd)) {
      score += 15
      feedback.push('✓ Contains uppercase letters')
    } else {
      suggestions.push('Add uppercase letters')
    }

    // Lowercase letters
    if (/[a-z]/.test(pwd)) {
      score += 15
      feedback.push('✓ Contains lowercase letters')
    } else {
      suggestions.push('Add lowercase letters')
    }

    // Numbers
    if (/\d/.test(pwd)) {
      score += 15
      feedback.push('✓ Contains numbers')
    } else {
      suggestions.push('Add numbers')
    }

    // Special characters
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) {
      score += 15
      feedback.push('✓ Contains special characters')
    } else {
      suggestions.push('Add special characters (!@#$%^&*)')
    }

    // Multiple special characters
    const specialCount = (pwd.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length
    if (specialCount >= 2) {
      score += 10
      feedback.push('✓ Multiple special characters')
    }

    // No common patterns
    const commonPatterns = ['password', '123456', 'qwerty', 'admin', 'letmein', 'welcome']
    const hasCommonPattern = commonPatterns.some(pattern => 
      pwd.toLowerCase().includes(pattern)
    )
    
    if (!hasCommonPattern) {
      score += 10
      feedback.push('✓ No common patterns')
    } else {
      suggestions.push('Avoid common passwords or patterns')
    }

    // No repeated characters
    const hasRepeats = /(.)\1{2,}/.test(pwd)
    if (!hasRepeats) {
      score += 10
      feedback.push('✓ No repeated characters')
    } else {
      suggestions.push('Avoid repeating characters')
    }

    // Determine level
    let level: 'weak' | 'fair' | 'good' | 'strong' | 'excellent'
    let color: string

    if (score < 40) {
      level = 'weak'
      color = 'text-red-600 dark:text-red-400'
    } else if (score < 60) {
      level = 'fair'
      color = 'text-orange-600 dark:text-orange-400'
    } else if (score < 80) {
      level = 'good'
      color = 'text-yellow-600 dark:text-yellow-400'
    } else if (score < 95) {
      level = 'strong'
      color = 'text-green-600 dark:text-green-400'
    } else {
      level = 'excellent'
      color = 'text-emerald-600 dark:text-emerald-400'
    }

    return { score, level, color, feedback, suggestions }
  }

  useEffect(() => {
    if (password) {
      setResult(analyzePassword(password))
    } else {
      setResult({
        score: 0,
        level: 'weak',
        color: 'text-gray-600',
        feedback: [],
        suggestions: ['Enter a password to analyze']
      })
    }
  }, [password])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const generateStrongPassword = () => {
    const length = 16
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
    let password = ''
    
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    
    setPassword(password)
  }

  const resetTool = () => {
    setPassword('')
    setShowPassword(false)
  }

  const getStrengthIcon = () => {
    switch (result.level) {
      case 'excellent':
      case 'strong':
        return <Check className="w-5 h-5" />
      case 'good':
        return <Shield className="w-5 h-5" />
      case 'fair':
        return <AlertTriangle className="w-5 h-5" />
      default:
        return <X className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Password Input */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <Shield size={20} />
          Password Strength Analyzer
        </h3>
        
        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password to analyze..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            onClick={generateStrongPassword}
            className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Generate Strong Password
          </button>
        </div>
      </div>

      {/* Strength Results */}
      {password && (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Strength Analysis
          </h3>
          
          {/* Score Display */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`font-medium ${result.color}`}>
                {result.level.toUpperCase()} PASSWORD
              </span>
              <span className={`font-bold text-2xl ${result.color}`}>
                {result.score}%
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  result.level === 'excellent' ? 'bg-emerald-500' :
                  result.level === 'strong' ? 'bg-green-500' :
                  result.level === 'good' ? 'bg-yellow-500' :
                  result.level === 'fair' ? 'bg-orange-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${result.score}%` }}
              />
            </div>
          </div>

          {/* Feedback */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                {getStrengthIcon()}
                Strength Factors
              </h4>
              <div className="space-y-2 text-sm">
                {result.feedback.length > 0 ? (
                  result.feedback.map((item, index) => (
                    <div key={index} className="text-green-700 dark:text-green-300">
                      {item}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 dark:text-gray-400">
                    No positive factors detected
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <AlertTriangle size={16} />
                Improvement Suggestions
              </h4>
              <div className="space-y-2 text-sm">
                {result.suggestions.map((suggestion, index) => (
                  <div key={index} className="text-orange-700 dark:text-orange-300">
                    • {suggestion}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Password Guidelines */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
          💡 Password Security Guidelines
        </h3>
        <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
          <li>• Use at least 12-16 characters for strong passwords</li>
          <li>• Include uppercase, lowercase, numbers, and special characters</li>
          <li>• Avoid personal information, common words, or patterns</li>
          <li>• Use unique passwords for each account</li>
          <li>• Consider using a password manager for secure storage</li>
          <li>• Enable two-factor authentication when available</li>
          <li>• Change passwords regularly for sensitive accounts</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => copyToClipboard(password)}
          disabled={!password}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Copy size={16} />
          Copy Password
        </button>
        <button
          onClick={resetTool}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          Reset Tool
        </button>
      </div>
    </div>
  )
}
