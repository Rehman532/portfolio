'use client'

import { useState, useEffect } from 'react'
import { CreditCard, Check, X, AlertTriangle, Copy } from 'lucide-react'

interface ValidationResult {
  isValid: boolean
  cardType: string
  issuer: string
  isValidLuhn: boolean
  errorMessage?: string
}

interface CardInfo {
  type: string
  patterns: number[]
  issuer: string
  color: string
}

const cardTypes: CardInfo[] = [
  { type: 'Visa', patterns: [4], issuer: 'Visa Inc.', color: 'text-blue-600' },
  { type: 'Mastercard', patterns: [51, 52, 53, 54, 55], issuer: 'Mastercard Worldwide', color: 'text-red-600' },
  { type: 'American Express', patterns: [34, 37], issuer: 'American Express', color: 'text-green-600' },
  { type: 'Discover', patterns: [6011, 65], issuer: 'Discover Financial', color: 'text-orange-600' },
  { type: 'JCB', patterns: [35], issuer: 'JCB Co., Ltd.', color: 'text-purple-600' },
  { type: 'Diners Club', patterns: [36, 38, 39], issuer: 'Diners Club International', color: 'text-yellow-600' },
]

export default function CreditCardValidatorTool() {
  const [cardNumber, setCardNumber] = useState('')
  const [result, setResult] = useState<ValidationResult>({
    isValid: false,
    cardType: 'Unknown',
    issuer: 'Unknown',
    isValidLuhn: false
  })

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '')
    // Add spaces every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ')
    return formatted
  }

  const getCardType = (number: string): CardInfo | null => {
    const cleanNumber = number.replace(/\D/g, '')
    
    for (const cardType of cardTypes) {
      for (const pattern of cardType.patterns) {
        if (cleanNumber.startsWith(pattern.toString())) {
          return cardType
        }
      }
    }
    
    return null
  }

  const luhnCheck = (number: string): boolean => {
    const cleanNumber = number.replace(/\D/g, '')
    
    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      return false
    }

    let sum = 0
    let isEven = false

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i], 10)

      if (isEven) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }

      sum += digit
      isEven = !isEven
    }

    return sum % 10 === 0
  }

  const validateCard = (number: string): ValidationResult => {
    const cleanNumber = number.replace(/\D/g, '')
    
    if (!cleanNumber) {
      return {
        isValid: false,
        cardType: 'Unknown',
        issuer: 'Unknown',
        isValidLuhn: false,
        errorMessage: 'Please enter a card number'
      }
    }

    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      return {
        isValid: false,
        cardType: 'Unknown',
        issuer: 'Unknown',
        isValidLuhn: false,
        errorMessage: 'Card number must be between 13 and 19 digits'
      }
    }

    const cardTypeInfo = getCardType(cleanNumber)
    const isValidLuhn = luhnCheck(cleanNumber)

    if (!cardTypeInfo) {
      return {
        isValid: false,
        cardType: 'Unknown',
        issuer: 'Unknown',
        isValidLuhn,
        errorMessage: 'Unknown card type'
      }
    }

    if (!isValidLuhn) {
      return {
        isValid: false,
        cardType: cardTypeInfo.type,
        issuer: cardTypeInfo.issuer,
        isValidLuhn,
        errorMessage: 'Invalid card number (failed Luhn check)'
      }
    }

    return {
      isValid: true,
      cardType: cardTypeInfo.type,
      issuer: cardTypeInfo.issuer,
      isValidLuhn
    }
  }

  useEffect(() => {
    if (cardNumber) {
      setResult(validateCard(cardNumber))
    } else {
      setResult({
        isValid: false,
        cardType: 'Unknown',
        issuer: 'Unknown',
        isValidLuhn: false
      })
    }
  }, [cardNumber])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const generateTestCard = (type: string) => {
    const testCards: { [key: string]: string } = {
      'Visa': '4111 1111 1111 1111',
      'Mastercard': '5500 0000 0000 0004',
      'American Express': '3782 822463 10005',
      'Discover': '6011 0000 0000 0004',
      'JCB': '3530 1113 3330 0000',
      'Diners Club': '3056 9300 9025 0004'
    }
    
    setCardNumber(testCards[type] || '')
  }

  const resetValidator = () => {
    setCardNumber('')
  }

  const getStatusIcon = () => {
    if (!cardNumber) return null
    
    if (result.isValid) {
      return <Check className="w-5 h-5 text-green-600" />
    } else {
      return <X className="w-5 h-5 text-red-600" />
    }
  }

  const getCardTypeInfo = () => {
    return getCardType(cardNumber)
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <CreditCard size={20} />
          Credit Card Validator
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white font-mono text-lg"
              />
              <div className="absolute right-3 top-3">
                {getStatusIcon()}
              </div>
            </div>
          </div>

          {/* Test Card Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Test Cards (for testing only)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {cardTypes.map((card) => (
                <button
                  key={card.type}
                  onClick={() => generateTestCard(card.type)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${card.color} bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:opacity-80`}
                >
                  {card.type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Validation Results */}
      {cardNumber && (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Validation Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Card Information</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className={`font-medium ${result.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {result.isValid ? 'Valid' : 'Invalid'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Card Type:</span>
                  <span className={`font-medium ${getCardTypeInfo()?.color || 'text-gray-600'}`}>
                    {result.cardType}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Issuer:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {result.issuer}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Luhn Check:</span>
                  <span className={`font-medium ${result.isValidLuhn ? 'text-green-600' : 'text-red-600'}`}>
                    {result.isValidLuhn ? 'Passed' : 'Failed'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Card Details</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Length:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {cardNumber.replace(/\D/g, '').length} digits
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Format:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {cardNumber}
                  </span>
                </div>
                
                {result.errorMessage && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                      <AlertTriangle size={16} />
                      <span className="text-sm font-medium">{result.errorMessage}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Type Reference */}
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
          💳 Credit Card Reference
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          {cardTypes.map((card) => (
            <div key={card.type} className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-green-200 dark:border-green-700">
              <div className={`font-medium ${card.color} mb-1`}>{card.type}</div>
              <div className="text-gray-600 dark:text-gray-400 text-xs">
                Starts with: {card.patterns.join(', ')}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-xs">
                {card.issuer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => copyToClipboard(cardNumber)}
          disabled={!cardNumber}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Copy size={16} />
          Copy Card Number
        </button>
        <button
          onClick={resetValidator}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          Reset Validator
        </button>
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3 flex items-center gap-2">
          <AlertTriangle size={20} />
          Security Notice
        </h3>
        <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
          <li>• This tool only validates card number format using the Luhn algorithm</li>
          <li>• It does not check if the card is active or has sufficient funds</li>
          <li>• Never enter real credit card numbers in online tools</li>
          <li>• Use test card numbers provided for development and testing only</li>
          <li>• Always handle sensitive financial information securely</li>
        </ul>
      </div>
    </div>
  )
}
