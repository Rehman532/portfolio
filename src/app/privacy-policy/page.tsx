import { Metadata } from 'next'
import { ArrowLeft, Shield, Eye, Cookie, Database, UserCheck, Mail, Phone, MapPin, Calendar } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: "Privacy Policy | Rehman Farouq Portfolio | Data Protection & User Privacy",
  description: "Comprehensive privacy policy for Rehman Farouq's portfolio website. Learn how we collect, use, and protect your personal information. GDPR compliant data protection practices for visitors and contact form submissions.",
  keywords: "privacy policy, data protection, GDPR compliance, user privacy, personal information, cookie policy, data collection, website privacy, contact form privacy, portfolio privacy policy",
  openGraph: {
    title: "Privacy Policy | Rehman Farouq Portfolio",
    description: "Comprehensive privacy policy explaining data collection and protection practices.",
    url: "https://rehmanfarouq.site/privacy-policy",
    type: "website",
    siteName: "Rehman Farouq Portfolio",
  },
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/"
              className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-foreground dark:hover:text-white transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Portfolio</span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Privacy Policy</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
              <Shield size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information when you visit our portfolio website.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-500">
              <Calendar size={14} />
              <span>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-12">
            {/* Information We Collect */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                  <Database className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information We Collect</h2>
              </div>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We collect minimal information necessary to provide and improve our portfolio services:
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Contact Form Information:</strong>
                      <span className="text-gray-600 dark:text-gray-400"> When you contact us through our form, we collect your name, email address, and message content.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Analytics Data:</strong>
                      <span className="text-gray-600 dark:text-gray-400"> Anonymous usage statistics through Vercel Analytics to understand how visitors interact with our site.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Technical Information:</strong>
                      <span className="text-gray-600 dark:text-gray-400"> Browser type, IP address (anonymized), and device type for security and optimization purposes.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
                  <Eye className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Use Your Information</h2>
              </div>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We use collected information for the following purposes:
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Respond to Inquiries:</strong>
                      <span className="text-gray-600 dark:text-gray-400"> To reply to your messages and provide information about our services.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Improve User Experience:</strong>
                      <span className="text-gray-600 dark:text-gray-400"> Analytics help us understand how to make our portfolio more useful and accessible.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Security and Maintenance:</strong>
                      <span className="text-gray-600 dark:text-gray-400"> To protect our website and ensure optimal performance.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                  <Cookie className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cookies and Tracking</h2>
              </div>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our website uses minimal tracking technologies:
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Essential Cookies:</strong>
                      <span className="text-gray-600 dark:text-gray-400"> Required for basic site functionality and security.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Analytics Cookies:</strong>
                      <span className="text-gray-600 dark:text-gray-400"> Anonymous data collection through Vercel Analytics to improve user experience.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">No Advertising Cookies:</strong>
                      <span className="text-gray-600 dark:text-gray-400"> We do not use third-party advertising or tracking cookies.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Data Protection */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-xl flex items-center justify-center">
                  <UserCheck className="text-red-600 dark:text-red-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Protection and Security</h2>
              </div>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We implement appropriate security measures to protect your information:
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Secure Storage:</strong>
                      <span className="text-gray-600 dark:text-gray-400"> Contact form submissions are stored securely and deleted after response.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Limited Access:</strong>
                      <span className="text-gray-600 dark:text-gray-400"> Only authorized personnel can access collected information.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Regular Reviews:</strong>
                      <span className="text-gray-600 dark:text-gray-400"> We regularly review and update our security practices.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center">
                  <UserCheck className="text-indigo-600 dark:text-indigo-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Rights</h2>
              </div>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Access:</strong>
                      <span className="text-gray-600 dark:text-gray-400"> Request a copy of your personal information.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Correction:</strong>
                      <span className="text-gray-600 dark:text-gray-400"> Request correction of inaccurate information.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Deletion:</strong>
                      <span className="text-gray-600 dark:text-gray-400"> Request deletion of your personal information.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Opt-out:</strong>
                      <span className="text-gray-600 dark:text-gray-400"> Opt out of analytics tracking by using browser privacy settings.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Third-Party Services */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-xl flex items-center justify-center">
                  <Database className="text-yellow-600 dark:text-yellow-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Third-Party Services</h2>
              </div>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our website uses the following third-party services:
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Vercel Analytics:</strong>
                      <span className="text-gray-600 dark:text-gray-400"> For anonymous website performance and usage analytics.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Vercel Hosting:</strong>
                      <span className="text-gray-600 dark:text-gray-400"> For secure and reliable website hosting.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* International Users */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-xl flex items-center justify-center">
                  <Shield className="text-cyan-600 dark:text-cyan-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">International Users</h2>
              </div>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our website may be accessed from around the world. We comply with applicable international data protection laws, including GDPR for European users.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                  If you are located outside the United States, please be aware that your information may be transferred to and processed in the United States, where our servers are located.
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-xl flex items-center justify-center">
                  <UserCheck className="text-pink-600 dark:text-pink-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Children's Privacy</h2>
              </div>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
                </p>
              </div>
            </section>

            {/* Changes to This Policy */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
                  <Calendar className="text-orange-600 dark:text-orange-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Changes to This Policy</h2>
              </div>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                  You are advised to review this privacy policy periodically for any changes.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  If you have questions about this privacy policy or want to exercise your rights, please contact us:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="text-blue-600 dark:text-blue-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                          Contact through form
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
                        <p className="text-gray-700 dark:text-gray-300">https://rehmanfarouq.site</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="text-blue-600 dark:text-blue-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Response Time</p>
                        <p className="text-gray-700 dark:text-gray-300">Within 24-48 hours</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="text-blue-600 dark:text-blue-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                        <p className="text-gray-700 dark:text-gray-300">Online Portfolio</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
