'use client'

import { useState, useEffect } from 'react'
import { Copy, FileText, Type, Clock, Hash, AlignLeft } from 'lucide-react'

export default function WordCounterTool() {
  const [text, setText] = useState('')
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  })

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0
    const paragraphs = text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0
    const readingTime = Math.ceil(words / 200) // Average reading speed: 200 words per minute

    setStats({
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime
    })
  }, [text])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const clearText = () => {
    setText('')
  }

  const loadSample = () => {
    setText(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

This is a sample text to demonstrate the word counter functionality. It contains multiple sentences and paragraphs to show how the tool calculates various statistics.`)
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter Your Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here to count words, characters, sentences, and more..."
          className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={clearText}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={loadSample}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Load Sample
          </button>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <Type size={20} className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Words</span>
          </div>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            {stats.words.toLocaleString()}
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={20} className="text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Characters</span>
          </div>
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">
            {stats.characters.toLocaleString()}
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-2">
            <Hash size={20} className="text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">No Spaces</span>
          </div>
          <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
            {stats.charactersNoSpaces.toLocaleString()}
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-2 mb-2">
            <AlignLeft size={20} className="text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Sentences</span>
          </div>
          <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
            {stats.sentences.toLocaleString()}
          </div>
        </div>

        <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={20} className="text-pink-600 dark:text-pink-400" />
            <span className="text-sm font-medium text-pink-600 dark:text-pink-400">Paragraphs</span>
          </div>
          <div className="text-2xl font-bold text-pink-900 dark:text-pink-100">
            {stats.paragraphs.toLocaleString()}
          </div>
        </div>

        <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg border border-cyan-200 dark:border-cyan-800">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={20} className="text-cyan-600 dark:text-cyan-400" />
            <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Reading Time</span>
          </div>
          <div className="text-2xl font-bold text-cyan-900 dark:text-cyan-100">
            {stats.readingTime}m
          </div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Detailed Text Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Text Metrics</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>Average words per sentence: {stats.sentences > 0 ? Math.round(stats.words / stats.sentences) : 0}</li>
              <li>Average characters per word: {stats.words > 0 ? Math.round(stats.characters / stats.words) : 0}</li>
              <li>Average sentences per paragraph: {stats.paragraphs > 0 ? Math.round(stats.sentences / stats.paragraphs) : 0}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Actions</h4>
            <div className="space-y-2">
              <button
                onClick={() => copyToClipboard(`Words: ${stats.words}`)}
                className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
              >
                Copy Word Count
              </button>
              <button
                onClick={() => copyToClipboard(`Characters: ${stats.characters}`)}
                className="w-full px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
              >
                Copy Character Count
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          💡 Pro Tips
        </h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• Use this tool to check essay length requirements</li>
          <li>• Monitor character limits for social media posts</li>
          <li>• Estimate reading time for blog posts and articles</li>
          <li>• Track writing progress with word count goals</li>
          <li>• Optimize content for SEO with proper text length</li>
        </ul>
      </div>
    </div>
  )
}
