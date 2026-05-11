'use client'

import { useState, useEffect } from 'react'
import { FileText, BarChart, Copy, Hash, Type, Clock, Eye } from 'lucide-react'

interface TextStats {
  characters: number
  charactersNoSpaces: number
  words: number
  sentences: number
  paragraphs: number
  lines: number
  avgWordLength: number
  avgSentenceLength: number
  readingTime: number
  speakingTime: number
  mostFrequentWords: { word: string; count: number }[]
}

export default function TextStatisticsTool() {
  const [text, setText] = useState('')
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    avgWordLength: 0,
    avgSentenceLength: 0,
    readingTime: 0,
    speakingTime: 0,
    mostFrequentWords: []
  })

  const analyzeText = (inputText: string): TextStats => {
    const characters = inputText.length
    const charactersNoSpaces = inputText.replace(/\s/g, '').length
    const words = inputText.trim() ? inputText.trim().split(/\s+/) : []
    const sentences = inputText.trim() ? inputText.split(/[.!?]+/).filter(s => s.trim()) : []
    const paragraphs = inputText.trim() ? inputText.split(/\n\n+/).filter(p => p.trim()) : []
    const lines = inputText.split('\n')

    const wordCount = words.length
    const sentenceCount = sentences.length

    // Calculate averages
    const avgWordLength = wordCount > 0 
      ? words.reduce((sum, word) => sum + word.length, 0) / wordCount 
      : 0

    const avgSentenceLength = sentenceCount > 0
      ? words.length / sentenceCount
      : 0

    // Calculate reading times
    const readingWordsPerMinute = 200
    const speakingWordsPerMinute = 150
    const readingTime = Math.ceil(wordCount / readingWordsPerMinute)
    const speakingTime = Math.ceil(wordCount / speakingWordsPerMinute)

    // Find most frequent words
    const wordFrequency: { [key: string]: number } = {}
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them']

    words.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, '')
      if (cleanWord && !commonWords.includes(cleanWord)) {
        wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1
      }
    })

    const mostFrequentWords = Object.entries(wordFrequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }))

    return {
      characters,
      charactersNoSpaces,
      words: wordCount,
      sentences: sentenceCount,
      paragraphs: paragraphs.length,
      lines: lines.length,
      avgWordLength,
      avgSentenceLength,
      readingTime,
      speakingTime,
      mostFrequentWords
    }
  }

  useEffect(() => {
    setStats(analyzeText(text))
  }, [text])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const loadSample = () => {
    setText(`The quick brown fox jumps over the lazy dog. This pangram sentence contains every letter of the alphabet at least once.

Text analysis is the process of examining written text to extract meaningful information. It can help writers improve their work, students understand reading materials, and researchers analyze content.

Statistics like word count, sentence length, and reading time provide valuable insights into text complexity and readability. These metrics are particularly useful for content creators, educators, and anyone who works with written communication.

Modern text analysis tools can process large amounts of text quickly and accurately, making them essential for content optimization and quality assessment.`)
  }

  const clearText = () => {
    setText('')
  }

  const exportStats = () => {
    const statsText = `
Text Statistics Report
=====================
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Words: ${stats.words}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Lines: ${stats.lines}
Average Word Length: ${stats.avgWordLength.toFixed(1)} characters
Average Sentence Length: ${stats.avgSentenceLength.toFixed(1)} words
Reading Time: ${stats.readingTime} minutes
Speaking Time: ${stats.speakingTime} minutes

Most Frequent Words:
${stats.mostFrequentWords.map((item, index) => 
  `${index + 1}. ${item.word} (${item.count} times)`
).join('\n')}
    `.trim()

    copyToClipboard(statsText)
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <FileText size={20} />
          Text Input
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Your Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your text here to analyze..."
              className="w-full h-48 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={loadSample}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Load Sample
            </button>
            <button
              onClick={clearText}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Basic Statistics */}
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
          <BarChart size={20} />
          Basic Statistics
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-700">
            <div className="flex items-center gap-2 mb-2">
              <Type size={16} className="text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Characters</span>
            </div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {stats.characters.toLocaleString()}
            </div>
            <div className="text-xs text-green-700 dark:text-green-300">
              {stats.charactersNoSpaces.toLocaleString()} no spaces
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-700">
            <div className="flex items-center gap-2 mb-2">
              <Hash size={16} className="text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Words</span>
            </div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {stats.words.toLocaleString()}
            </div>
            <div className="text-xs text-green-700 dark:text-green-300">
              {stats.avgWordLength.toFixed(1)} chars avg
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-700">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={16} className="text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Sentences</span>
            </div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {stats.sentences.toLocaleString()}
            </div>
            <div className="text-xs text-green-700 dark:text-green-300">
              {stats.avgSentenceLength.toFixed(1)} words avg
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-700">
            <div className="flex items-center gap-2 mb-2">
              <Eye size={16} className="text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Reading Time</span>
            </div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {stats.readingTime}m
            </div>
            <div className="text-xs text-green-700 dark:text-green-300">
              {stats.speakingTime}m speaking
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Statistics */}
      <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4">
          Advanced Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Text Structure</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-700 dark:text-purple-300">Paragraphs:</span>
                <span className="font-medium text-purple-900 dark:text-purple-100">
                  {stats.paragraphs.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700 dark:text-purple-300">Lines:</span>
                <span className="font-medium text-purple-900 dark:text-purple-100">
                  {stats.lines.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700 dark:text-purple-300">Words per Paragraph:</span>
                <span className="font-medium text-purple-900 dark:text-purple-100">
                  {stats.paragraphs > 0 ? Math.round(stats.words / stats.paragraphs) : 0}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Time Estimates</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-700 dark:text-purple-300">Reading (200 wpm):</span>
                <span className="font-medium text-purple-900 dark:text-purple-100">
                  {stats.readingTime} minutes
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700 dark:text-purple-300">Speaking (150 wpm):</span>
                <span className="font-medium text-purple-900 dark:text-purple-100">
                  {stats.speakingTime} minutes
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700 dark:text-purple-300">Slow Reading (100 wpm):</span>
                <span className="font-medium text-purple-900 dark:text-purple-100">
                  {Math.ceil(stats.words / 100)} minutes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Word Frequency */}
      {stats.mostFrequentWords.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4">
            Most Frequent Words (excluding common words)
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {stats.mostFrequentWords.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <div className="font-medium text-yellow-900 dark:text-yellow-100">
                  {item.word}
                </div>
                <div className="text-sm text-yellow-700 dark:text-yellow-300">
                  {item.count} times
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={exportStats}
          disabled={!text}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Copy size={16} />
          Export Statistics
        </button>
      </div>

      {/* Tips Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          💡 Text Analysis Tips
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>• Average sentence length of 15-20 words is ideal for readability</li>
          <li>• Paragraphs of 3-5 sentences are most readable</li>
          <li>• Reading time estimates help with content planning</li>
          <li>• Word frequency analysis identifies key themes</li>
          <li>• Character counts are important for social media and forms</li>
        </ul>
      </div>
    </div>
  )
}
