import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rehmanfarouq.site'

  // ─── All 49 tools ─────────────────────────────────────────────────────────
  const tools = [
    'text-converter',
    'password-generator',
    'qr-generator',
    'image-resize',
    'json-formatter',
    'color-converter',
    'time-converter',
    'url-shortener',
    'base64-converter',
    'unit-converter',
    'markdown-editor',
    'hash-generator',
    'wifi-password-generator',
    'css-minifier',
    'html-encoder-decoder',
    'json-to-csv',
    'email-validator',
    'age-calculator',
    'bmi-calculator',
    'tip-calculator',
    'discount-calculator',
    'fuel-cost-calculator',
    'recipe-scaler',
    'sleep-calculator',
    'water-intake',
    'calorie-calculator',
    'phone-number-formatter',
    'word-counter',
    'calorie-burner',
    'pregnancy-calculator',
    'caffeine-calculator',
    'grade-calculator',
    'random-generator',
    'timezone-converter',
    'roman-numeral',
    'ascii-art',
    'password-strength',
    'text-statistics',
    'unit-converter-pro',
    'file-converter',
    'project-cost-estimator',
    'color-palette-pro',
    'app-vs-website',
    'website-speed-checker',
    'roi-calculator',
    'credit-card-validator',
    'loan-calculator',
    'percentage-calculator',
    'lorem-ipsum',
  ]

  // ─── All blog posts ────────────────────────────────────────────────────────
  const blogPosts = [
    'flutter-vs-nextjs',
    'how-to-build-password-generator-react',
    'vscode-extensions-flutter-web',
    'react-hooks-complete-guide',
    'typescript-react-guide',
    'modern-css-techniques-2026',
    'flutter-interview-questions',
    'flutter-vs-react-native',
    'best-flutter-packages',
    'how-to-learn-flutter',
    'nextjs-portfolio-tutorial',
    'flutter-state-management',
    'javascript-es6-features',
    'responsive-web-design-2026',
    'html5-css3-features',
  ]

  return [
    // ─── Main pages ──────────────────────────────────────────────────────────
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },

    // ─── Tools section ───────────────────────────────────────────────────────
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // ─── Blog section ────────────────────────────────────────────────────────
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // ─── Individual tool pages (49 tools) ────────────────────────────────────
    ...tools.map((tool) => ({
      url: `${baseUrl}/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    // ─── Individual blog posts (15 posts) ────────────────────────────────────
    ...blogPosts.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}