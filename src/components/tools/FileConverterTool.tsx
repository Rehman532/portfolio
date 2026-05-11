'use client'

import { useState, useRef } from 'react'
import { FileText, Download, Upload, Copy, AlertCircle, Check } from 'lucide-react'

interface ConversionResult {
  success: boolean
  message: string
  data?: string
  filename?: string
}

export default function FileConverterTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [conversionType, setConversionType] = useState('')
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const conversionTypes = [
    { id: 'json-to-xml', name: 'JSON to XML', input: 'JSON', output: 'XML' },
    { id: 'xml-to-json', name: 'XML to JSON', input: 'XML', output: 'JSON' },
    { id: 'csv-to-json', name: 'CSV to JSON', input: 'CSV', output: 'JSON' },
    { id: 'json-to-csv', name: 'JSON to CSV', input: 'JSON', output: 'CSV' },
    { id: 'text-to-json', name: 'Text to JSON', input: 'Text', output: 'JSON' },
    { id: 'json-to-yaml', name: 'JSON to YAML', input: 'JSON', output: 'YAML' },
    { id: 'yaml-to-json', name: 'YAML to JSON', input: 'YAML', output: 'JSON' },
    { id: 'base64-to-text', name: 'Base64 to Text', input: 'Base64', output: 'Text' },
    { id: 'text-to-base64', name: 'Text to Base64', input: 'Text', output: 'Base64' },
    { id: 'url-encode', name: 'URL Encode', input: 'Text', output: 'URL Encoded' },
    { id: 'url-decode', name: 'URL Decode', input: 'URL Encoded', output: 'Text' }
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setResult(null)
    }
  }

  const convertFile = async () => {
    if (!selectedFile || !conversionType) {
      setResult({
        success: false,
        message: 'Please select a file and conversion type'
      })
      return
    }

    setIsConverting(true)
    
    try {
      const fileContent = await readFileContent(selectedFile)
      const conversionResult = await performConversion(fileContent, conversionType)
      setResult(conversionResult)
    } catch (error) {
      setResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`
      })
    } finally {
      setIsConverting(false)
    }
  }

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result
        if (typeof content === 'string') {
          resolve(content)
        } else {
          reject(new Error('Failed to read file content'))
        }
      }
      reader.onerror = () => reject(new Error('File reading failed'))
      reader.readAsText(file)
    })
  }

  const performConversion = async (content: string, type: string): Promise<ConversionResult> => {
    try {
      let convertedContent = ''
      let filename = ''

      switch (type) {
        case 'json-to-xml':
          convertedContent = jsonToXml(content)
          filename = selectedFile?.name.replace(/\.[^.]+$/, '.xml') || 'converted.xml'
          break
        case 'xml-to-json':
          convertedContent = xmlToJson(content)
          filename = selectedFile?.name.replace(/\.[^.]+$/, '.json') || 'converted.json'
          break
        case 'csv-to-json':
          convertedContent = csvToJson(content)
          filename = selectedFile?.name.replace(/\.[^.]+$/, '.json') || 'converted.json'
          break
        case 'json-to-csv':
          convertedContent = jsonToCsv(content)
          filename = selectedFile?.name.replace(/\.[^.]+$/, '.csv') || 'converted.csv'
          break
        case 'text-to-json':
          convertedContent = textToJson(content)
          filename = selectedFile?.name.replace(/\.[^.]+$/, '.json') || 'converted.json'
          break
        case 'json-to-yaml':
          convertedContent = jsonToYaml(content)
          filename = selectedFile?.name.replace(/\.[^.]+$/, '.yaml') || 'converted.yaml'
          break
        case 'yaml-to-json':
          convertedContent = yamlToJson(content)
          filename = selectedFile?.name.replace(/\.[^.]+$/, '.json') || 'converted.json'
          break
        case 'base64-to-text':
          convertedContent = base64ToText(content)
          filename = selectedFile?.name.replace(/\.[^.]+$/, '.txt') || 'converted.txt'
          break
        case 'text-to-base64':
          convertedContent = textToBase64(content)
          filename = selectedFile?.name.replace(/\.[^.]+$/, '.txt') || 'converted.txt'
          break
        case 'url-encode':
          convertedContent = encodeURIComponent(content)
          filename = selectedFile?.name.replace(/\.[^.]+$/, '.txt') || 'converted.txt'
          break
        case 'url-decode':
          convertedContent = decodeURIComponent(content)
          filename = selectedFile?.name.replace(/\.[^.]+$/, '.txt') || 'converted.txt'
          break
        default:
          throw new Error('Unsupported conversion type')
      }

      return {
        success: true,
        message: 'Conversion successful',
        data: convertedContent,
        filename
      }
    } catch (error) {
      return {
        success: false,
        message: `Conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      }
    }
  }

  // Conversion functions
  const jsonToXml = (json: string): string => {
    try {
      const parsed = JSON.parse(json)
      const xml = objectToXml(parsed, 'root')
      return xml
    } catch (error) {
      throw new Error('Invalid JSON format')
    }
  }

  const objectToXml = (obj: any, rootName: string): string => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>`
    
    const processValue = (value: any, key: string) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        xml += `\n<${key}>`
        Object.entries(value).forEach(([k, v]) => processValue(v, k))
        xml += `\n</${key}>`
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          xml += `\n<${key}>`
          processValue(item, 'item')
          xml += `\n</${key}>`
        })
      } else {
        xml += `\n<${key}>${value}</${key}>`
      }
    }
    
    Object.entries(obj).forEach(([key, value]) => processValue(value, key))
    xml += `\n</${rootName}>`
    return xml
  }

  const xmlToJson = (xml: string): string => {
    // Simple XML to JSON conversion (basic implementation)
    try {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xml, 'text/xml')
      
      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        throw new Error('Invalid XML format')
      }
      
      const json = xmlToObject(xmlDoc.documentElement)
      return JSON.stringify(json, null, 2)
    } catch (error) {
      throw new Error('Invalid XML format')
    }
  }

  const xmlToObject = (element: Element): any => {
    const obj: any = {}
    
    for (let i = 0; i < element.children.length; i++) {
      const child = element.children[i]
      const key = child.tagName
      
      if (child.children.length === 0) {
        obj[key] = child.textContent || ''
      } else {
        obj[key] = xmlToObject(child)
      }
    }
    
    return obj
  }

  const csvToJson = (csv: string): string => {
    try {
      const lines = csv.trim().split('\n')
      const headers = lines[0].split(',').map(h => h.trim())
      const data = []

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim())
        const obj: any = {}
        
        headers.forEach((header, index) => {
          obj[header] = values[index] || ''
        })
        
        data.push(obj)
      }

      return JSON.stringify(data, null, 2)
    } catch (error) {
      throw new Error('Invalid CSV format')
    }
  }

  const jsonToCsv = (json: string): string => {
    try {
      const parsed = JSON.parse(json)
      
      if (!Array.isArray(parsed)) {
        throw new Error('JSON must be an array of objects')
      }

      if (parsed.length === 0) {
        return ''
      }

      const headers = Object.keys(parsed[0])
      const csvLines = [headers.join(',')]

      parsed.forEach((item: any) => {
        const values = headers.map(header => item[header] || '')
        csvLines.push(values.join(','))
      })

      return csvLines.join('\n')
    } catch (error) {
      throw new Error('Invalid JSON format')
    }
  }

  const textToJson = (text: string): string => {
    const lines = text.trim().split('\n')
    const data = lines.map((line, index) => ({
      line: index + 1,
      content: line.trim()
    }))
    
    return JSON.stringify(data, null, 2)
  }

  const jsonToYaml = (json: string): string => {
    try {
      const parsed = JSON.parse(json)
      return objectToYaml(parsed)
    } catch (error) {
      throw new Error('Invalid JSON format')
    }
  }

  const objectToYaml = (obj: any, indent = 0): string => {
    const spaces = '  '.repeat(indent)
    let yaml = ''

    if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          yaml += `${spaces}${key}:\n${objectToYaml(value, indent + 1)}`
        } else if (Array.isArray(value)) {
          yaml += `${spaces}${key}:\n`
          value.forEach(item => {
            yaml += `${spaces}  - ${typeof item === 'object' ? objectToYaml(item, indent + 2) : item}\n`
          })
        } else {
          yaml += `${spaces}${key}: ${value}\n`
        }
      })
    }

    return yaml
  }

  const yamlToJson = (yaml: string): string => {
    // Simple YAML to JSON conversion (basic implementation)
    try {
      const lines = yaml.trim().split('\n')
      const obj: any = {}
      const stack: { obj: any; indent: number }[] = [{ obj, indent: -1 }]

      lines.forEach(line => {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) return

        const indent = line.length - line.trimStart().length
        const [key, ...valueParts] = trimmed.split(':')
        const value = valueParts.join(':').trim()

        // Find parent object
        while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
          stack.pop()
        }

        const current = stack[stack.length - 1].obj

        if (value) {
          current[key.trim()] = isNaN(Number(value)) ? value : Number(value)
        } else {
          current[key.trim()] = {}
          stack.push({ obj: current[key.trim()], indent })
        }
      })

      return JSON.stringify(obj, null, 2)
    } catch (error) {
      throw new Error('Invalid YAML format')
    }
  }

  const base64ToText = (base64: string): string => {
    try {
      return atob(base64)
    } catch (error) {
      throw new Error('Invalid Base64 format')
    }
  }

  const textToBase64 = (text: string): string => {
    return btoa(text)
  }

  const downloadFile = () => {
    if (!result?.data || !result?.filename) return

    const blob = new Blob([result.data], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = result.filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    if (result?.data) {
      navigator.clipboard.writeText(result.data)
    }
  }

  const resetConverter = () => {
    setSelectedFile(null)
    setConversionType('')
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-6">
      {/* File Selection */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <FileText size={20} />
          File Converter
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select File
            </label>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
            {selectedFile && (
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Conversion Type
            </label>
            <select
              value={conversionType}
              onChange={(e) => setConversionType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select conversion type...</option>
              {conversionTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name} ({type.input} → {type.output})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={convertFile}
            disabled={!selectedFile || !conversionType || isConverting}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isConverting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Upload size={16} />
            )}
            {isConverting ? 'Converting...' : 'Convert File'}
          </button>
          
          <button
            onClick={resetConverter}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              {result.success ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              Conversion Result
            </h3>
            
            {result.success && (
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <Copy size={16} />
                  Copy
                </button>
                <button
                  onClick={downloadFile}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            )}
          </div>

          <div className={`p-4 rounded-lg ${
            result.success 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}>
            <div className={`text-sm ${
              result.success 
                ? 'text-green-800 dark:text-green-200' 
                : 'text-red-800 dark:text-red-200'
            }`}>
              {result.message}
            </div>
            
            {result.success && result.data && (
              <div className="mt-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Converted content preview (first 500 characters):
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600 max-h-64 overflow-y-auto">
                  <pre className="text-xs text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {result.data.substring(0, 500)}
                    {result.data.length > 500 && '...'}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Supported Formats */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
          📋 Supported Conversions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          {conversionTypes.map(type => (
            <div key={type.id} className="bg-white dark:bg-gray-800 p-3 rounded border border-yellow-200 dark:border-yellow-700">
              <div className="font-medium text-yellow-900 dark:text-yellow-100">
                {type.name}
              </div>
              <div className="text-yellow-700 dark:text-yellow-300">
                {type.input} → {type.output}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
