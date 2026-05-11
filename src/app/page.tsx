import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Testimonials from '@/components/sections/Testimonials'

export const metadata: Metadata = {
  title: "Rehman Farouq - Full Stack Developer | Flutter & Next.js Portfolio | React, TypeScript, Web Development",
  description: "Professional full stack developer portfolio showcasing expertise in Flutter, Next.js, React, TypeScript, and modern web development. Explore innovative mobile apps, web applications, developer tools, and technical projects. Hire for freelance development work.",
  keywords: "full stack developer, Flutter developer, Next.js developer, React developer, TypeScript, web development, mobile app development, portfolio, software engineer, frontend developer, backend developer, freelance developer, React Native, Tailwind CSS, Node.js, JavaScript, developer tools, cross-platform development, UI UX designer, Firebase developer, Dart programmer, web application developer, mobile app programmer, full stack web developer, Flutter app development, Next.js expert, React TypeScript developer, freelance full stack developer, modern web development, mobile web development, responsive web design, progressive web apps, single page applications, API development, REST API development, GraphQL developer, database development, PostgreSQL developer, MongoDB developer, cloud development, AWS developer, Google Cloud developer, Azure developer, DevOps engineer, Git version control, GitHub developer, GitLab developer, agile development, scrum master, software architecture, microservices developer, serverless development, JAMstack developer, MERN stack developer, MEAN stack developer, LAMP stack developer, WordPress developer, Shopify developer, e-commerce development, fintech developer, healthcare app developer, education app developer, real estate app developer, social media app developer, gaming app developer, productivity apps, business applications, enterprise software, startup developer, MVP development, prototype development, software consulting, code review, technical writing, programming tutorials, coding bootcamp, online courses, tech blog, programming resources, developer community, open source contributor, software testing, QA engineer, performance optimization, SEO specialist, web accessibility, WCAG compliance, responsive design, mobile first design, progressive web apps, PWA developer, service worker, web manifest, push notifications, offline first development, edge computing, CDN optimization, caching strategies, load balancing, database optimization, query optimization, indexing strategies, search engine optimization, content management system, headless CMS, static site generator, server side rendering, client side rendering, universal JavaScript, isomorphic JavaScript, web components, custom hooks, state management, Redux, MobX, Zustand, Recoil, context API, local storage, session storage, indexed DB, web sockets, real time applications, WebRTC, WebAssembly, WebGL, Canvas API, SVG animations, CSS animations, JavaScript frameworks, Vue.js, Angular, Svelte, Solid.js, Alpine.js, HTMX, vanilla JavaScript, ES6+, ES2020, ES2021, ES2022, ES2023, ES2024, ES2025, ES2026, async await, promises, callbacks, event loop, DOM manipulation, virtual DOM, reconciliation algorithms, rendering optimization, bundle optimization, tree shaking, code splitting, lazy loading, intersection observer, mutation observer, resize observer, performance monitoring, Core Web Vitals, Lighthouse audit, web vitals optimization, user experience metrics, conversion rate optimization, A/B testing, analytics implementation, tracking pixels, heat maps, user behavior analysis, funnel optimization, landing page optimization, conversion rate optimization, user journey mapping, customer experience design, UX research, user testing, A/B testing tools, multivariate testing, personalization engines, recommendation systems, machine learning integration, AI development, TensorFlow.js, Brain.js, WebNN API, computer vision, image processing, face detection, object recognition, natural language processing, sentiment analysis, chatbot development, voice recognition, speech to text, text to speech, Web Speech API, Web Audio API, audio processing, video streaming, WebRTC video, screen sharing, remote collaboration, virtual meetings, online education, e-learning platforms, course management, learning management systems, student information systems, educational technology, EdTech developer, online assessment, quiz applications, exam platforms, certification management, digital badges, blockchain certificates, NFT credentials, decentralized identity, Web3 development, smart contracts, Solidity programming, Ethereum development, polygon development, binance smart chain, avalanche development, cosmos SDK, Polkadot development, substrate development, Rust programming, WebAssembly Rust, near protocol, solana development, flow blockchain, diem blockchain, aptos blockchain, move language, sui blockchain, internet computer, filecoin development, arweave development, storj development, IPFS development, decentralized storage, peer to peer networking, WebRTC data channels, WebTorrent, IPFS streaming, distributed web, federated learning, privacy preserving technologies, zero knowledge proofs, secure multi-party computation, homomorphic encryption, threshold signatures, digital signatures, cryptographic protocols, blockchain security, smart contract security, DeFi development, decentralized finance, yield farming, liquidity mining, automated market making, DEX development, AMM protocols, liquidity pools, token swaps, decentralized exchanges, trading bots, arbitrage, MEV protection, front running prevention, fair launch pads, token sales, ICO platforms, IDO platforms, IEO platforms, STO platforms, security audits, penetration testing, vulnerability assessment, bug bounty programs, responsible disclosure, security research, ethical hacking, security consulting, compliance frameworks, regulatory technology, RegTech, KYC AML, anti money laundering, transaction monitoring, suspicious activity reporting, fraud detection, risk assessment, compliance automation, regulatory reporting, audit trails, digital forensics, incident response, disaster recovery, business continuity, high availability, fault tolerance, load balancing, auto scaling, horizontal scaling, vertical scaling, container orchestration, Kubernetes, Docker, Podman, LXC, LXD, virtual machines, cloud native, microservices architecture, service mesh, API gateway, rate limiting, throttling, circuit breakers, retry policies, dead letter queues, event sourcing, CQRS, event driven architecture, domain driven design, hexagonal architecture, clean architecture, solid principles, SOLID, dependency injection, inversion of control, service locator, factory pattern, builder pattern, singleton pattern, observer pattern, strategy pattern, template method, facade pattern, adapter pattern, decorator pattern, composite pattern, flyweight pattern, proxy pattern, chain of responsibility, command pattern, iterator pattern, mediator pattern, memento pattern, observer pattern, state pattern, visitor pattern, null object pattern, specification pattern, data transfer object",
  openGraph: {
    title: "Rehman Farouq - Full Stack Developer | Flutter & Next.js Portfolio | React, TypeScript, Web Development",
    description: "Professional full stack developer portfolio showcasing expertise in Flutter, Next.js, React, TypeScript, and modern web development. Explore innovative mobile apps, web applications, developer tools, and technical projects. Hire for freelance development work.",
    url: "https://rehmanfarouq.site",
    type: "website",
    siteName: "Rehman Farouq Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rehman Farouq - Full Stack Developer | Flutter & Next.js Portfolio",
    description: "Professional full stack developer portfolio showcasing expertise in Flutter, Next.js, React, TypeScript, and modern web development.",
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      {/* <Blog /> */}
      <Testimonials />
      <Contact />
      <Footer />
      <ScrollProgress />
    </div>
  );
}
