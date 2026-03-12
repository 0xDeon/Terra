/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  id: string
  label: string
  children?: NavItem[]
}

// ─── Navigation tree ──────────────────────────────────────────────────────────

const NAV: NavItem[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    children: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'installation', label: 'Installation' },
      { id: 'quick-start', label: 'Quick Start' },
      { id: 'authentication', label: 'Authentication' },
    ],
  },
  {
    id: 'terra-sdk',
    label: 'Terra SDK',
    children: [
      { id: 'sdk-overview', label: 'Overview' },
      { id: 'terra-init', label: 'Terra.init()' },
      { id: 'identity', label: 'Identity' },
      { id: 'social-graph', label: 'Social Graph' },
      { id: 'agent', label: 'Agent' },
    ],
  },
  {
    id: 'creator-coins',
    label: 'Creator Coins',
    children: [
      { id: 'bonding-curves', label: 'Bonding Curves' },
      { id: 'minting', label: 'Minting' },
      { id: 'trading', label: 'Trading' },
    ],
  },
  {
    id: 'mini-apps',
    label: 'Mini Apps',
    children: [
      { id: 'mini-apps-overview', label: 'Overview' },
      { id: 'wallet-integration', label: 'Wallet Integration' },
      { id: 'publishing', label: 'Publishing' },
    ],
  },
  {
    id: 'smart-contracts',
    label: 'Smart Contracts',
    children: [
      { id: 'architecture', label: 'Architecture' },
      { id: 'creator-coin-contract', label: 'Creator Coin Contract' },
      { id: 'nft-studio', label: 'NFT Studio' },
    ],
  },
  {
    id: 'api-reference',
    label: 'API Reference',
    children: [
      { id: 'rest-endpoints', label: 'REST Endpoints' },
      { id: 'websocket', label: 'WebSocket' },
      { id: 'rate-limits', label: 'Rate Limits' },
    ],
  },
]

// ─── Colour tokens ─────────────────────────────────────────────────────────────

const VIOLET = '#6025f5'
const GRADIENT = 'linear-gradient(90deg, #6025f5 0%, #ff5555 50%, #facc15 100%)'
const BG_DARK = '#1a1b2e'
const BG_TAB = '#13141f'
const BG_SIDEBAR = '#16172a'

// Tokyo Night syntax colours
const SYN = {
  keyword: '#bb9af7',
  func: '#7dcfff',
  string: '#9ece6a',
  comment: 'rgba(255,255,255,0.30)',
  number: '#ff9e64',
  type: '#2ac3de',
  plain: '#c0caf5',
  punct: '#89ddff',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function GradientUnderline() {
  return (
    <div
      style={{
        height: 2,
        width: 48,
        background: GRADIENT,
        borderRadius: 99,
        marginTop: 8,
        marginBottom: 20,
      }}
    />
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: VIOLET,
        marginBottom: 6,
        fontFamily: 'var(--font-inter), Inter, sans-serif',
      }}
    >
      {children}
    </p>
  )
}

function SectionHeading({
  id,
  children,
}: {
  id?: string
  children: React.ReactNode
}) {
  return (
    <div id={id}>
      <h2
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: '#1a1a1a',
          marginBottom: 0,
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
        }}
      >
        {children}
      </h2>
      <GradientUnderline />
    </div>
  )
}

function SubHeading({
  id,
  children,
}: {
  id?: string
  children: React.ReactNode
}) {
  return (
    <h3
      id={id}
      style={{
        fontSize: 18,
        fontWeight: 600,
        color: '#1a1a1a',
        margin: '32px 0 10px',
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        letterSpacing: '-0.01em',
      }}
    >
      {children}
    </h3>
  )
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 15,
        lineHeight: 1.75,
        color: '#4a4a4a',
        marginBottom: 16,
        fontFamily: 'var(--font-inter), Inter, sans-serif',
      }}
    >
      {children}
    </p>
  )
}

// ─── Code block ───────────────────────────────────────────────────────────────

function CodeBlock({
  filename,
  language,
  children,
}: {
  filename: string
  language: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        marginBottom: 24,
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* title bar */}
      <div
        style={{
          background: BG_TAB,
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* traffic lights */}
        <div style={{ display: 'flex', gap: 6 }}>
          <div
            style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }}
          />
          <div
            style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }}
          />
          <div
            style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }}
          />
        </div>
        <span
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 12,
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'monospace',
          }}
        >
          {filename}
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
            fontFamily: 'monospace',
          }}
        >
          {language}
        </span>
      </div>
      {/* code body */}
      <div
        style={{
          background: BG_DARK,
          padding: '20px 24px',
          overflowX: 'auto',
        }}
      >
        <pre
          style={{
            margin: 0,
            fontSize: 13.5,
            lineHeight: 1.9,
            fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", Menlo, monospace',
          }}
        >
          <code>{children}</code>
        </pre>
      </div>
    </div>
  )
}

// Syntax token helpers
function Kw({ children }: { children: React.ReactNode }) {
  return <span style={{ color: SYN.keyword }}>{children}</span>
}
function Fn({ children }: { children: React.ReactNode }) {
  return <span style={{ color: SYN.func }}>{children}</span>
}
function Str({ children }: { children: React.ReactNode }) {
  return <span style={{ color: SYN.string }}>{children}</span>
}
function Cm({ children }: { children: React.ReactNode }) {
  return <span style={{ color: SYN.comment }}>{children}</span>
}
function Num({ children }: { children: React.ReactNode }) {
  return <span style={{ color: SYN.number }}>{children}</span>
}
function Ty({ children }: { children: React.ReactNode }) {
  return <span style={{ color: SYN.type }}>{children}</span>
}
function Pl({ children }: { children: React.ReactNode }) {
  return <span style={{ color: SYN.plain }}>{children}</span>
}
function Pu({ children }: { children: React.ReactNode }) {
  return <span style={{ color: SYN.punct }}>{children}</span>
}

// ─── Callout ──────────────────────────────────────────────────────────────────

function Callout({
  type,
  children,
}: {
  type: 'tip' | 'warning' | 'info'
  children: React.ReactNode
}) {
  const config = {
    tip: {
      bg: 'rgba(96,37,245,0.06)',
      border: 'rgba(96,37,245,0.2)',
      icon: '✦',
      iconColor: VIOLET,
      label: 'Tip',
      labelColor: VIOLET,
    },
    warning: {
      bg: 'rgba(250,204,21,0.07)',
      border: 'rgba(250,204,21,0.3)',
      icon: '⚠',
      iconColor: '#d97706',
      label: 'Warning',
      labelColor: '#d97706',
    },
    info: {
      bg: 'rgba(45,195,222,0.06)',
      border: 'rgba(45,195,222,0.2)',
      icon: 'ℹ',
      iconColor: '#2ac3de',
      label: 'Note',
      labelColor: '#2ac3de',
    },
  }[type]

  return (
    <div
      style={{
        background: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: 12,
        padding: '14px 18px',
        marginBottom: 20,
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
      }}
    >
      <span style={{ color: config.iconColor, fontSize: 15, marginTop: 1 }}>
        {config.icon}
      </span>
      <div>
        <span
          style={{
            fontWeight: 600,
            fontSize: 13,
            color: config.labelColor,
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
        >
          {config.label}&nbsp;&mdash;&nbsp;
        </span>
        <span
          style={{
            fontSize: 14,
            color: '#4a4a4a',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            lineHeight: 1.65,
          }}
        >
          {children}
        </span>
      </div>
    </div>
  )
}

// ─── Method badge ─────────────────────────────────────────────────────────────

function MethodBadge({ method }: { method: 'GET' | 'POST' | 'DELETE' | 'WS' }) {
  const colors: Record<string, { bg: string; text: string }> = {
    GET: { bg: 'rgba(37,99,235,0.12)', text: '#3b82f6' },
    POST: { bg: 'rgba(96,37,245,0.12)', text: VIOLET },
    DELETE: { bg: 'rgba(239,68,68,0.12)', text: '#ef4444' },
    WS: { bg: 'rgba(34,197,94,0.12)', text: '#22c55e' },
  }
  const c = colors[method] ?? colors.GET
  return (
    <span
      style={{
        display: 'inline-block',
        background: c.bg,
        color: c.text,
        fontWeight: 700,
        fontSize: 11,
        padding: '2px 8px',
        borderRadius: 6,
        fontFamily: 'monospace',
        letterSpacing: '0.04em',
      }}
    >
      {method}
    </span>
  )
}

// ─── Parameter table ──────────────────────────────────────────────────────────

interface ParamRow {
  name: string
  type: string
  required: boolean
  description: string
}

function ParamTable({ rows }: { rows: ParamRow[] }) {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.07)',
        marginBottom: 24,
      }}
    >
      {/* header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '160px 140px 90px 1fr',
          background: '#F3F4F4',
          padding: '10px 16px',
          gap: 12,
          borderBottom: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        {['Parameter', 'Type', 'Required', 'Description'].map((h) => (
          <span
            key={h}
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#757575',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
          >
            {h}
          </span>
        ))}
      </div>
      {rows.map((row, i) => (
        <div
          key={row.name}
          style={{
            display: 'grid',
            gridTemplateColumns: '160px 140px 90px 1fr',
            padding: '12px 16px',
            gap: 12,
            background: i % 2 === 0 ? '#ffffff' : '#FAFAFA',
            borderBottom:
              i < rows.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
            alignItems: 'start',
          }}
        >
          <code
            style={{
              fontSize: 13,
              color: VIOLET,
              fontFamily: 'monospace',
              fontWeight: 600,
            }}
          >
            {row.name}
          </code>
          <code
            style={{
              fontSize: 12,
              color: '#2ac3de',
              fontFamily: 'monospace',
            }}
          >
            {row.type}
          </code>
          <span
            style={{
              fontSize: 12,
              color: row.required ? '#22c55e' : '#9ca3af',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontWeight: 500,
            }}
          >
            {row.required ? 'Yes' : 'No'}
          </span>
          <span
            style={{
              fontSize: 13,
              color: '#4a4a4a',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              lineHeight: 1.6,
            }}
          >
            {row.description}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Divider ──────────────────────────────────────────────────────────────────

function Divider() {
  return (
    <div
      style={{
        height: 1,
        background: 'rgba(0,0,0,0.06)',
        margin: '48px 0',
      }}
    />
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('introduction')
  const [searchFocused, setSearchFocused] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Highlight sidebar item on scroll
  useEffect(() => {
    const allIds = NAV.flatMap((g) => g.children?.map((c) => c.id) ?? [])

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    allIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  function scrollTo(id: string) {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F9F8F6',
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 0,
          paddingRight: 32,
          gap: 0,
        }}
      >
        {/* Logo area — same width as sidebar */}
        <div
          style={{
            width: 260,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            paddingLeft: 24,
            borderRight: '1px solid rgba(0,0,0,0.06)',
            height: '100%',
          }}
        >
          {/* Terra logo */}
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: '#1a1a1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                color: '#fff',
                fontWeight: 700,
                fontSize: 13,
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                letterSpacing: '-0.02em',
              }}
            >
              T
            </span>
          </div>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: '#1a1a1a',
              letterSpacing: '-0.02em',
            }}
          >
            Terra
          </span>
          <span
            style={{
              fontSize: 15,
              color: '#9ca3af',
              fontWeight: 400,
            }}
          >
            / Docs
          </span>
        </div>

        {/* Search + actions */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            paddingLeft: 24,
          }}
        >
          {/* Search */}
          <div
            style={{
              position: 'relative',
              maxWidth: 340,
              width: '100%',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
                fontSize: 13,
                pointerEvents: 'none',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="⌘K to search..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                width: '100%',
                height: 34,
                borderRadius: 999,
                border: searchFocused
                  ? `1.5px solid ${VIOLET}`
                  : '1.5px solid rgba(0,0,0,0.10)',
                background: '#F3F4F4',
                paddingLeft: 34,
                paddingRight: 12,
                fontSize: 13,
                color: '#4a4a4a',
                outline: 'none',
                transition: 'border-color 0.15s',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Version badge */}
          <div
            style={{
              background: 'rgba(96,37,245,0.08)',
              color: VIOLET,
              fontSize: 12,
              fontWeight: 600,
              padding: '4px 12px',
              borderRadius: 999,
              border: `1px solid rgba(96,37,245,0.15)`,
              fontFamily: 'monospace',
              letterSpacing: '0.03em',
            }}
          >
            v0.4.2-beta
          </div>

          {/* GitHub */}
          <a
            href="https://github.com/terra-protocol"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              color: '#4a4a4a',
              fontWeight: 500,
              textDecoration: 'none',
              padding: '5px 12px',
              borderRadius: 999,
              border: '1.5px solid rgba(0,0,0,0.10)',
              background: '#fff',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = VIOLET
              e.currentTarget.style.color = VIOLET
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.10)'
              e.currentTarget.style.color = '#4a4a4a'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub ↗
          </a>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <aside
          style={{
            width: 260,
            flexShrink: 0,
            background: '#FAFAFA',
            borderRight: '1px solid rgba(0,0,0,0.06)',
            position: 'sticky',
            top: 56,
            height: 'calc(100vh - 56px)',
            overflowY: 'auto',
            paddingTop: 24,
            paddingBottom: 40,
          }}
        >
          {NAV.map((group) => (
            <div key={group.id} style={{ marginBottom: 28, paddingLeft: 20, paddingRight: 12 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: '#9ca3af',
                  marginBottom: 8,
                  paddingLeft: 12,
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              >
                {group.label}
              </p>
              {group.children?.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      background: isActive ? 'rgba(96,37,245,0.06)' : 'transparent',
                      border: 'none',
                      borderLeft: isActive ? `2px solid ${VIOLET}` : '2px solid transparent',
                      borderRadius: '0 8px 8px 0',
                      padding: '7px 12px',
                      fontSize: 13.5,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? VIOLET : '#4a4a4a',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      marginBottom: 2,
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#1a1a1a'
                        e.currentTarget.style.background = 'rgba(0,0,0,0.03)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#4a4a4a'
                        e.currentTarget.style.background = 'transparent'
                      }
                    }}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          ))}
        </aside>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <main
          ref={contentRef}
          style={{
            flex: 1,
            maxWidth: 820,
            margin: '0 auto',
            padding: '56px 48px 120px',
            boxSizing: 'border-box',
          }}
        >
          {/* ─── Hero / Introduction ─────────────────────────────────────── */}
          <motion.div
            id="introduction"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 64 }}
          >
            <SectionLabel>Getting Started</SectionLabel>
            <h1
              style={{
                fontSize: 46,
                fontWeight: 800,
                color: '#1a1a1a',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: 12,
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}
            >
              Terra Developer Docs
              <span
                style={{
                  background: GRADIENT,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                .
              </span>
            </h1>

            <p
              style={{
                fontSize: 22,
                fontStyle: 'italic',
                color: '#757575',
                marginBottom: 40,
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                lineHeight: 1.4,
              }}
            >
              "Build on Bitcoin. Ship at social speed."
            </p>

            {/* Quick nav cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                {
                  title: 'Quick Start',
                  desc: 'Up and running in under 5 minutes',
                  href: '#quick-start',
                  id: 'quick-start',
                },
                {
                  title: 'SDK Reference',
                  desc: 'Full API for the Terra SDK',
                  href: '#sdk-overview',
                  id: 'sdk-overview',
                },
                {
                  title: 'API Reference',
                  desc: 'REST & WebSocket endpoints',
                  href: '#rest-endpoints',
                  id: 'rest-endpoints',
                },
              ].map((card) => (
                <button
                  key={card.title}
                  onClick={() => scrollTo(card.id)}
                  style={{
                    background: '#1a1b2e',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 14,
                    padding: '20px 20px 18px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'block',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = VIOLET
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = `0 8px 32px rgba(96,37,245,0.15)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#e2e8f0',
                      marginBottom: 6,
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    {card.title}
                    <span style={{ color: VIOLET, fontSize: 18 }}>→</span>
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.40)',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      lineHeight: 1.5,
                    }}
                  >
                    {card.desc}
                  </div>
                </button>
              ))}
            </div>

            <div style={{ marginTop: 40 }}>
              <Prose>
                Terra is an open, Bitcoin-native social protocol built on the Stacks blockchain. It gives developers
                the primitives they need to build social applications with real economic weight — creator coins,
                on-chain reputation, AI agents, and mini-app publishing — all settled in BTC.
              </Prose>
              <Prose>
                This documentation covers the Terra SDK, the REST and WebSocket APIs, the Clarity smart contracts
                deployed on Stacks mainnet, and the AI services layer. Whether you are building a creator
                monetisation tool, a social feed, or a full mini-app inside the Terra client, you will find
                everything you need here.
              </Prose>
            </div>

            {/* Architecture overview chips */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: 24,
              }}
            >
              {[
                'Stacks L2',
                'Bitcoin Settlement',
                'Clarity Contracts',
                'Creator Coins',
                'AI Agents',
                'Mini Apps',
                'On-chain Reputation',
                'WebSocket Events',
              ].map((chip) => (
                <span
                  key={chip}
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#4a4a4a',
                    background: '#F3F4F4',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 999,
                    padding: '4px 12px',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>

          <Divider />

          {/* ─── Installation ────────────────────────────────────────────── */}
          <motion.div
            id="installation"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: 56 }}
          >
            <SectionHeading id="installation">Installation</SectionHeading>

            <Prose>
              The Terra SDK is available on npm and is compatible with any Node.js 18+ project. Install it with your
              preferred package manager:
            </Prose>

            <CodeBlock filename="terminal" language="bash">
              <Pl>$ </Pl><Fn>npm</Fn><Pl> install </Pl><Str>@terra/sdk</Str>{'\n'}
              <Cm># or with pnpm</Cm>{'\n'}
              <Pl>$ </Pl><Fn>pnpm</Fn><Pl> add </Pl><Str>@terra/sdk</Str>{'\n'}
              <Cm># or with yarn</Cm>{'\n'}
              <Pl>$ </Pl><Fn>yarn</Fn><Pl> add </Pl><Str>@terra/sdk</Str>
            </CodeBlock>

            <SubHeading>Requirements</SubHeading>
            <div
              style={{
                borderRadius: 12,
                border: '1px solid rgba(0,0,0,0.07)',
                overflow: 'hidden',
                marginBottom: 24,
              }}
            >
              {[
                ['Node.js', '18.0.0 or later'],
                ['TypeScript', '4.9.0 or later (strongly recommended)'],
                ['Stacks wallet', 'Leather, Xverse, or any WalletConnect-compatible wallet'],
                ['Network', 'Stacks mainnet or Stacks testnet'],
              ].map(([dep, ver], i, arr) => (
                <div
                  key={dep}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 18px',
                    background: i % 2 === 0 ? '#fff' : '#FAFAFA',
                    borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                  }}
                >
                  <code
                    style={{
                      fontSize: 13,
                      color: VIOLET,
                      fontFamily: 'monospace',
                      fontWeight: 600,
                    }}
                  >
                    {dep}
                  </code>
                  <span
                    style={{
                      fontSize: 13,
                      color: '#757575',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                    }}
                  >
                    {ver}
                  </span>
                </div>
              ))}
            </div>

            <Callout type="tip">
              Terra ships full TypeScript definitions. No <code>@types/terra</code> package is needed — types are
              bundled directly in <code>@terra/sdk</code>.
            </Callout>
          </motion.div>

          <Divider />

          {/* ─── Quick Start ─────────────────────────────────────────────── */}
          <motion.div
            id="quick-start"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: 56 }}
          >
            <SectionHeading id="quick-start">Quick Start</SectionHeading>

            <Prose>
              The following example initialises the Terra protocol, mints a developer identity, and deploys a
              creator coin — all in under 20 lines of TypeScript.
            </Prose>

            <CodeBlock filename="terra-quickstart.ts" language="typescript">
              <Kw>import</Kw><Pl> {'{'} </Pl><Ty>Terra</Ty><Pl>, </Pl><Ty>Identity</Ty><Pl>, </Pl><Ty>Agent</Ty><Pl> {'}'} </Pl><Kw>from</Kw><Pl> </Pl><Str>'@terra/sdk'</Str>{'\n'}
              {'\n'}
              <Cm>// Initialise the Terra protocol client</Cm>{'\n'}
              <Kw>const</Kw><Pl> protocol </Pl><Pu>=</Pu><Pl> </Pl><Kw>await</Kw><Pl> </Pl><Ty>Terra</Ty><Pu>.</Pu><Fn>init</Fn><Pu>({'('})</Pu><Pu>(</Pu><Pu>{'{'}</Pu>{'\n'}
              <Pl>{'  '}ticker</Pl><Pu>:</Pu><Pl> </Pl><Str>'$LUNA'</Str><Pu>,</Pu>{'\n'}
              <Pl>{'  '}security</Pl><Pu>:</Pu><Pl> </Pl><Str>'bitcoin'</Str><Pu>,</Pu>{'\n'}
              <Pl>{'  '}agents</Pl><Pu>:</Pu><Pl> </Pl><Pu>[</Pu><Ty>Agent</Ty><Pu>.</Pu><Fn>create</Fn><Pu>()</Pu><Pu>]</Pu><Pu>,</Pu>{'\n'}
              <Pl>{'  '}reputation</Pl><Pu>:</Pu><Pl> </Pl><Kw>true</Kw><Pu>,</Pu>{'\n'}
              <Pl>{'  '}social</Pl><Pu>:</Pu><Pl> </Pl><Kw>true</Kw><Pu>,</Pu>{'\n'}
              <Pu>{'}'}</Pu><Pu>)</Pu>{'\n'}
              {'\n'}
              <Cm>// Mint an on-chain identity for the connected wallet</Cm>{'\n'}
              <Kw>const</Kw><Pl> id </Pl><Pu>=</Pu><Pl> </Pl><Kw>await</Kw><Pl> </Pl><Ty>Identity</Ty><Pu>.</Pu><Fn>mint</Fn><Pu>({'({'}</Pu><Pl> wallet </Pl><Pu>{'}})'}</Pu>{'\n'}
              {'\n'}
              <Cm>// Subscribe to social events</Cm>{'\n'}
              <Pl>protocol</Pl><Pu>.</Pu><Fn>on</Fn><Pu>(</Pu><Str>'follow'</Str><Pu>,</Pu><Pl> </Pl><Pu>(</Pu><Pl>event</Pl><Pu>)</Pu><Pl> </Pl><Pu>{'{'}{'=> {'}</Pu>{'\n'}
              <Pl>{'  '}console</Pl><Pu>.</Pu><Fn>log</Fn><Pu>(</Pu><Str>`New follower: </Str><Pu>{'${'}</Pu><Pl>event</Pl><Pu>.</Pu><Pl>from</Pl><Pu>{'}'}</Pu><Str>`</Str><Pu>)</Pu>{'\n'}
              <Pu>{'}'}</Pu><Pu>)</Pu>
            </CodeBlock>

            <Callout type="info">
              <code>Terra.init()</code> automatically detects the connected Stacks wallet via the browser extension
              API. In a server-side context, pass a <code>privateKey</code> option instead.
            </Callout>

            <SubHeading>Authentication</SubHeading>

            <Prose>
              Terra uses Stacks wallet signatures for authentication. No email or password is required. When a user
              connects their wallet for the first time, Terra mints a lightweight on-chain identity NFT that anchors
              their social graph and reputation score.
            </Prose>

            <CodeBlock filename="auth.ts" language="typescript">
              <Kw>import</Kw><Pl> {'{'} </Pl><Ty>Terra</Ty><Pl>, </Pl><Ty>WalletAuth</Ty><Pl> {'}'} </Pl><Kw>from</Kw><Pl> </Pl><Str>'@terra/sdk'</Str>{'\n'}
              {'\n'}
              <Kw>const</Kw><Pl> auth </Pl><Pu>=</Pu><Pl> </Pl><Kw>new</Kw><Pl> </Pl><Fn>WalletAuth</Fn><Pu>()</Pu>{'\n'}
              {'\n'}
              <Cm>// Opens wallet pop-up for the user to sign a message</Cm>{'\n'}
              <Kw>const</Kw><Pl> session </Pl><Pu>=</Pu><Pl> </Pl><Kw>await</Kw><Pl> auth</Pl><Pu>.</Pu><Fn>connect</Fn><Pu>()</Pu>{'\n'}
              {'\n'}
              <Cm>// session.address — Stacks principal (e.g. SP3FBR...)</Cm>{'\n'}
              <Cm>// session.jwt     — short-lived JWT for REST API calls</Cm>{'\n'}
              <Cm>// session.identity — on-chain identity NFT metadata</Cm>{'\n'}
              {'\n'}
              <Fn>console</Fn><Pu>.</Pu><Fn>log</Fn><Pu>(</Pu><Pl>session</Pl><Pu>.</Pu><Pl>address</Pl><Pu>)</Pu><Pl> </Pl><Cm>// SP3FBR2AGK5H7YQX8VNJ9QR3R9Q8EX7KYX...</Cm>
            </CodeBlock>
          </motion.div>

          <Divider />

          {/* ─── SDK Overview ────────────────────────────────────────────── */}
          <motion.div
            id="sdk-overview"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: 56 }}
          >
            <SectionLabel>Terra SDK</SectionLabel>
            <SectionHeading id="sdk-overview">SDK Overview</SectionHeading>

            <Prose>
              The <code style={{ color: VIOLET }}>@terra/sdk</code> package is the primary TypeScript client for the
              Terra protocol. It provides a unified interface to all Terra primitives: identities, social graphs,
              creator coins, AI agents, and mini-app publishing.
            </Prose>

            <Prose>
              The SDK is structured around a central <code style={{ color: VIOLET }}>protocol</code> object returned
              by <code style={{ color: VIOLET }}>Terra.init()</code>. All subsequent operations flow through
              namespaced sub-clients attached to this object.
            </Prose>

            {/* Module map */}
            <div
              style={{
                background: '#1a1b2e',
                borderRadius: 14,
                padding: '24px 28px',
                marginBottom: 24,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                  marginBottom: 16,
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              >
                Module map
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { ns: 'protocol.identity', desc: 'Mint, resolve, update identities' },
                  { ns: 'protocol.social', desc: 'Follow, unfollow, feed, graph' },
                  { ns: 'protocol.coins', desc: 'Deploy, buy, sell creator coins' },
                  { ns: 'protocol.agents', desc: 'Create and manage AI agents' },
                  { ns: 'protocol.miniapps', desc: 'Publish and embed mini-apps' },
                  { ns: 'protocol.nft', desc: 'Mint and transfer NFT assets' },
                ].map((m) => (
                  <div
                    key={m.ns}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: 8,
                      padding: '10px 14px',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <code
                      style={{
                        fontSize: 12.5,
                        color: SYN.func,
                        fontFamily: 'monospace',
                        display: 'block',
                        marginBottom: 4,
                      }}
                    >
                      {m.ns}
                    </code>
                    <span
                      style={{
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.35)',
                        fontFamily: 'var(--font-inter), Inter, sans-serif',
                      }}
                    >
                      {m.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── Terra.init() ────────────────────────────────────────────── */}
          <motion.div
            id="terra-init"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: 56 }}
          >
            <SubHeading id="terra-init">Terra.init()</SubHeading>

            <Prose>
              <code style={{ color: VIOLET }}>Terra.init(options)</code> is the entry point for the SDK. It
              establishes a connection to the Stacks network, authenticates the caller, and returns a fully
              configured <code style={{ color: VIOLET }}>TerraProtocol</code> instance.
            </Prose>

            <CodeBlock filename="signature.ts" language="typescript">
              <Kw>async function</Kw><Pl> </Pl><Fn>Terra</Fn><Pu>.</Pu><Fn>init</Fn><Pu>(</Pu>{'\n'}
              <Pl>{'  '}options</Pl><Pu>:</Pu><Pl> </Pl><Ty>TerraInitOptions</Ty>{'\n'}
              <Pu>):</Pu><Pl> </Pl><Ty>Promise</Ty><Pu>{'<'}</Pu><Ty>TerraProtocol</Ty><Pu>{'>'}</Pu>
            </CodeBlock>

            <SubHeading>Parameters</SubHeading>

            <ParamTable
              rows={[
                {
                  name: 'ticker',
                  type: 'string',
                  required: false,
                  description: 'The creator coin ticker for this session (e.g. "$LUNA"). Enables coin-gated features.',
                },
                {
                  name: 'security',
                  type: '"bitcoin" | "stacks"',
                  required: false,
                  description: 'Settlement layer for coin transactions. Defaults to "stacks" (faster, lower fees).',
                },
                {
                  name: 'agents',
                  type: 'Agent[]',
                  required: false,
                  description: 'AI agents to attach to this protocol session. Each agent gets its own on-chain wallet.',
                },
                {
                  name: 'reputation',
                  type: 'boolean',
                  required: false,
                  description: 'Enable the reputation module. Tracks on-chain activity and computes a score (0–1000).',
                },
                {
                  name: 'social',
                  type: 'boolean',
                  required: false,
                  description: 'Enable the social graph module. Required for follow/unfollow and feed APIs.',
                },
                {
                  name: 'network',
                  type: '"mainnet" | "testnet"',
                  required: false,
                  description: 'Stacks network to connect to. Defaults to "mainnet".',
                },
                {
                  name: 'privateKey',
                  type: 'string',
                  required: false,
                  description: 'Server-side usage only. Bypasses browser wallet authentication.',
                },
              ]}
            />

            <SubHeading>Returns</SubHeading>
            <Prose>
              A <code style={{ color: VIOLET }}>TerraProtocol</code> instance with namespaced sub-clients:
              <code style={{ color: SYN.func }}> .identity</code>,{' '}
              <code style={{ color: SYN.func }}>.social</code>,{' '}
              <code style={{ color: SYN.func }}>.coins</code>,{' '}
              <code style={{ color: SYN.func }}>.agents</code>,{' '}
              <code style={{ color: SYN.func }}>.miniapps</code>, and{' '}
              <code style={{ color: SYN.func }}>.nft</code>.
            </Prose>
          </motion.div>

          {/* ─── Identity ────────────────────────────────────────────────── */}
          <motion.div
            id="identity"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: 56 }}
          >
            <SubHeading id="identity">Identity</SubHeading>

            <Prose>
              Every Terra user has an on-chain identity — a lightweight NFT minted on the Stacks chain that anchors
              their username, avatar, bio, social graph, and reputation score. Identities are permanent,
              self-sovereign, and portable across all Terra-compatible applications.
            </Prose>

            <CodeBlock filename="identity.ts" language="typescript">
              <Cm>// Mint a new identity</Cm>{'\n'}
              <Kw>const</Kw><Pl> identity </Pl><Pu>=</Pu><Pl> </Pl><Kw>await</Kw><Pl> protocol</Pl><Pu>.</Pu><Pl>identity</Pl><Pu>.</Pu><Fn>mint</Fn><Pu>({'({'}</Pu>{'\n'}
              <Pl>{'  '}username</Pl><Pu>:</Pu><Pl> </Pl><Str>'satoshi'</Str><Pu>,</Pu>{'\n'}
              <Pl>{'  '}bio</Pl><Pu>:</Pu><Pl> </Pl><Str>'I fix software.'</Str><Pu>,</Pu>{'\n'}
              <Pl>{'  '}avatar</Pl><Pu>:</Pu><Pl> </Pl><Str>'ipfs://Qm...'</Str><Pu>,</Pu>{'\n'}
              <Pu>{'}})'}</Pu>{'\n'}
              {'\n'}
              <Cm>// Resolve an identity by Stacks address</Cm>{'\n'}
              <Kw>const</Kw><Pl> profile </Pl><Pu>=</Pu><Pl> </Pl><Kw>await</Kw><Pl> protocol</Pl><Pu>.</Pu><Pl>identity</Pl><Pu>.</Pu><Fn>resolve</Fn><Pu>(</Pu>{'\n'}
              <Pl>{'  '}</Pl><Str>'SP3FBR2AGK5H7YQX8VNJ9QR3R9Q8EX7KYX'</Str>{'\n'}
              <Pu>)</Pu>{'\n'}
              {'\n'}
              <Fn>console</Fn><Pu>.</Pu><Fn>log</Fn><Pu>(</Pu><Pl>profile</Pl><Pu>.</Pu><Pl>reputation</Pl><Pu>.</Pu><Pl>score</Pl><Pu>)</Pu><Pl> </Pl><Cm>// 847</Cm>
            </CodeBlock>
          </motion.div>

          {/* ─── Social Graph ────────────────────────────────────────────── */}
          <motion.div
            id="social-graph"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: 56 }}
          >
            <SubHeading id="social-graph">Social Graph</SubHeading>

            <Prose>
              The Terra social graph is stored on-chain in the <code style={{ color: VIOLET }}>terra-social</code> Clarity
              contract. Every follow relationship is a transaction, creating an immutable, censorship-resistant social
              layer that no single party can alter.
            </Prose>

            <CodeBlock filename="social.ts" language="typescript">
              <Cm>// Follow a creator</Cm>{'\n'}
              <Kw>await</Kw><Pl> protocol</Pl><Pu>.</Pu><Pl>social</Pl><Pu>.</Pu><Fn>follow</Fn><Pu>(</Pu><Str>'SP3FBR...'</Str><Pu>)</Pu>{'\n'}
              {'\n'}
              <Cm>// Get followers of an address</Cm>{'\n'}
              <Kw>const</Kw><Pl> {'{'} followers</Pl><Pu>,</Pu><Pl> following {'}'} </Pl><Pu>=</Pu><Pl> </Pl><Kw>await</Kw><Pl> protocol</Pl><Pu>.</Pu><Pl>social</Pl><Pu>.</Pu><Fn>getGraph</Fn><Pu>(</Pu>{'\n'}
              <Pl>{'  '}</Pl><Str>'SP3FBR2AGK5H7YQX8VNJ9QR3R9Q8EX7KYX'</Str>{'\n'}
              <Pu>)</Pu>{'\n'}
              {'\n'}
              <Cm>// Stream the personalised feed</Cm>{'\n'}
              <Kw>const</Kw><Pl> feed </Pl><Pu>=</Pu><Pl> protocol</Pl><Pu>.</Pu><Pl>social</Pl><Pu>.</Pu><Fn>feed</Fn><Pu>()</Pu>{'\n'}
              <Kw>for await</Kw><Pl> </Pl><Pu>(</Pu><Kw>const</Kw><Pl> post </Pl><Kw>of</Kw><Pl> feed</Pl><Pu>)</Pu><Pl> </Pl><Pu>{'{'}</Pu>{'\n'}
              <Pl>{'  '}console</Pl><Pu>.</Pu><Fn>log</Fn><Pu>(</Pu><Pl>post</Pl><Pu>.</Pu><Pl>content</Pl><Pu>,</Pu><Pl> post</Pl><Pu>.</Pu><Pl>author</Pl><Pu>.</Pu><Pl>username</Pl><Pu>)</Pu>{'\n'}
              <Pu>{'}'}</Pu>
            </CodeBlock>
          </motion.div>

          {/* ─── Agent ───────────────────────────────────────────────────── */}
          <motion.div
            id="agent"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: 56 }}
          >
            <SubHeading id="agent">Agent</SubHeading>

            <Prose>
              Terra AI Agents are autonomous actors that can hold wallets, post content, trade creator coins, and
              interact with the social graph on behalf of a creator. Agents run as LangChain-powered workers in the
              Terra Intelligence service.
            </Prose>

            <CodeBlock filename="agent.ts" language="typescript">
              <Kw>import</Kw><Pl> {'{'} </Pl><Ty>Agent</Ty><Pl>, </Pl><Ty>AgentPersona</Ty><Pl> {'}'} </Pl><Kw>from</Kw><Pl> </Pl><Str>'@terra/sdk'</Str>{'\n'}
              {'\n'}
              <Kw>const</Kw><Pl> myAgent </Pl><Pu>=</Pu><Pl> </Pl><Kw>await</Kw><Pl> </Pl><Ty>Agent</Ty><Pu>.</Pu><Fn>create</Fn><Pu>({'({'}</Pu>{'\n'}
              <Pl>{'  '}name</Pl><Pu>:</Pu><Pl> </Pl><Str>'Luna AI'</Str><Pu>,</Pu>{'\n'}
              <Pl>{'  '}persona</Pl><Pu>:</Pu><Pl> </Pl><Ty>AgentPersona</Ty><Pu>.</Pu><Pl>CREATOR</Pl><Pu>,</Pu>{'\n'}
              <Pl>{'  '}model</Pl><Pu>:</Pu><Pl> </Pl><Str>'gpt-4o'</Str><Pu>,</Pu>{'\n'}
              <Pl>{'  '}schedule</Pl><Pu>:</Pu><Pl> </Pl><Str>'0 9 * * *'</Str><Pu>,</Pu><Pl> </Pl><Cm>// post daily at 9am UTC</Cm>{'\n'}
              <Pl>{'  '}capabilities</Pl><Pu>:</Pu><Pl> </Pl><Pu>[</Pu><Str>'post'</Str><Pu>,</Pu><Pl> </Pl><Str>'trade'</Str><Pu>,</Pu><Pl> </Pl><Str>'reply'</Str><Pu>]</Pu><Pu>,</Pu>{'\n'}
              <Pu>{'}})'}</Pu>
            </CodeBlock>

            <Callout type="warning">
              Agents with the <code>trade</code> capability will autonomously buy and sell creator coins. Set a
              <code> maxBudget</code> in STX to cap spending per epoch.
            </Callout>
          </motion.div>

          <Divider />

          {/* ─── Bonding Curves ──────────────────────────────────────────── */}
          <motion.div
            id="bonding-curves"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: 56 }}
          >
            <SectionLabel>Creator Coins</SectionLabel>
            <SectionHeading id="bonding-curves">Bonding Curves</SectionHeading>

            <Prose>
              Every creator coin on Terra is backed by a bonding curve contract deployed on the Stacks blockchain.
              The curve algorithmically sets the price of each coin as a function of supply — the more coins that
              are minted, the higher the price. Revenue from coin purchases is locked in the contract and
              settled to the creator in BTC via the Stacks-Bitcoin bridge.
            </Prose>

            {/* Visual diagram */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 0,
                marginBottom: 28,
                background: '#FAFAFA',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: 14,
                padding: '20px 24px',
                overflowX: 'auto',
              }}
            >
              {[
                { label: 'Price', sub: 'Dynamic' },
                null,
                { label: 'Buyers', sub: 'Any wallet' },
                null,
                { label: 'Curve', sub: 'Exponential' },
                null,
                { label: 'BTC Settlement', sub: 'On-chain' },
              ].map((item, i) => {
                if (item === null) {
                  return (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: 2,
                        background: GRADIENT,
                        minWidth: 24,
                        maxWidth: 60,
                      }}
                    />
                  )
                }
                return (
                  <div
                    key={i}
                    style={{
                      textAlign: 'center',
                      padding: '12px 16px',
                      background: '#1a1b2e',
                      borderRadius: 10,
                      border: `1px solid rgba(96,37,245,0.25)`,
                      minWidth: 100,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: '#e2e8f0',
                        fontFamily: 'var(--font-inter), Inter, sans-serif',
                        marginBottom: 2,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: 'rgba(255,255,255,0.35)',
                        fontFamily: 'var(--font-inter), Inter, sans-serif',
                      }}
                    >
                      {item.sub}
                    </div>
                  </div>
                )
              })}
            </div>

            <Prose>
              Terra supports three bonding curve shapes:
            </Prose>

            <div style={{ marginBottom: 24 }}>
              {[
                {
                  name: 'linear',
                  formula: 'P = k × S',
                  desc: 'Price grows linearly with supply. Predictable, good for large communities.',
                },
                {
                  name: 'exponential',
                  formula: 'P = a × e^(bS)',
                  desc: 'Price grows exponentially. Early adopters are heavily rewarded.',
                },
                {
                  name: 'sigmoid',
                  formula: 'P = L / (1 + e^-k(S-S₀))',
                  desc: 'Price grows slowly at first, accelerates, then flattens. Balanced.',
                },
              ].map((c) => (
                <div
                  key={c.name}
                  style={{
                    display: 'flex',
                    gap: 16,
                    alignItems: 'flex-start',
                    padding: '14px 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <code
                    style={{
                      fontSize: 13,
                      color: VIOLET,
                      fontWeight: 700,
                      fontFamily: 'monospace',
                      minWidth: 90,
                    }}
                  >
                    {c.name}
                  </code>
                  <code
                    style={{
                      fontSize: 12,
                      color: SYN.string,
                      fontFamily: 'monospace',
                      minWidth: 160,
                    }}
                  >
                    {c.formula}
                  </code>
                  <span
                    style={{
                      fontSize: 13,
                      color: '#4a4a4a',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      lineHeight: 1.6,
                    }}
                  >
                    {c.desc}
                  </span>
                </div>
              ))}
            </div>

            <SubHeading id="minting">Minting a Creator Coin</SubHeading>

            <CodeBlock filename="coin-deploy.ts" language="typescript">
              <Kw>const</Kw><Pl> coin </Pl><Pu>=</Pu><Pl> </Pl><Kw>await</Kw><Pl> protocol</Pl><Pu>.</Pu><Pl>coins</Pl><Pu>.</Pu><Fn>deploy</Fn><Pu>({'({'}</Pu>{'\n'}
              <Pl>{'  '}name</Pl><Pu>:</Pu><Pl> </Pl><Str>'Luna Coin'</Str><Pu>,</Pu>{'\n'}
              <Pl>{'  '}ticker</Pl><Pu>:</Pu><Pl> </Pl><Str>'$LUNA'</Str><Pu>,</Pu>{'\n'}
              <Pl>{'  '}curve</Pl><Pu>:</Pu><Pl> </Pl><Str>'exponential'</Str><Pu>,</Pu>{'\n'}
              <Pl>{'  '}initialPrice</Pl><Pu>:</Pu><Pl> </Pl><Num>0.001</Num><Pu>,</Pu><Pl> </Pl><Cm>// in BTC</Cm>{'\n'}
              <Pl>{'  '}creatorShare</Pl><Pu>:</Pu><Pl> </Pl><Num>0.10</Num><Pu>,</Pu><Pl> </Pl><Cm>// 10% of all trades go to creator</Cm>{'\n'}
              <Pl>{'  '}maxSupply</Pl><Pu>:</Pu><Pl> </Pl><Num>1_000_000</Num><Pu>,</Pu>{'\n'}
              <Pu>{'}})'}</Pu>{'\n'}
              {'\n'}
              <Fn>console</Fn><Pu>.</Pu><Fn>log</Fn><Pu>(</Pu><Pl>coin</Pl><Pu>.</Pu><Pl>contractAddress</Pl><Pu>)</Pu>
            </CodeBlock>

            <SubHeading id="trading">Trading</SubHeading>

            <Prose>
              Users can buy and sell creator coins at any time. The bonding curve guarantees liquidity — there is
              always a price. Slippage protection prevents sandwich attacks.
            </Prose>

            <CodeBlock filename="trade.ts" language="typescript">
              <Cm>// Buy 100 $LUNA coins</Cm>{'\n'}
              <Kw>const</Kw><Pl> receipt </Pl><Pu>=</Pu><Pl> </Pl><Kw>await</Kw><Pl> protocol</Pl><Pu>.</Pu><Pl>coins</Pl><Pu>.</Pu><Fn>buy</Fn><Pu>({'({'}</Pu>{'\n'}
              <Pl>{'  '}ticker</Pl><Pu>:</Pu><Pl> </Pl><Str>'$LUNA'</Str><Pu>,</Pu>{'\n'}
              <Pl>{'  '}amount</Pl><Pu>:</Pu><Pl> </Pl><Num>100</Num><Pu>,</Pu>{'\n'}
              <Pl>{'  '}maxSlippage</Pl><Pu>:</Pu><Pl> </Pl><Num>0.01</Num><Pu>,</Pu><Pl> </Pl><Cm>// 1%</Cm>{'\n'}
              <Pu>{'}})'}</Pu>{'\n'}
              {'\n'}
              <Fn>console</Fn><Pu>.</Pu><Fn>log</Fn><Pu>(</Pu><Pl>receipt</Pl><Pu>.</Pu><Pl>btcPaid</Pl><Pu>,</Pu><Pl> receipt</Pl><Pu>.</Pu><Pl>txId</Pl><Pu>)</Pu>
            </CodeBlock>
          </motion.div>

          <Divider />

          {/* ─── Mini Apps ───────────────────────────────────────────────── */}
          <motion.div
            id="mini-apps-overview"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: 56 }}
          >
            <SectionLabel>Mini Apps</SectionLabel>
            <SectionHeading id="mini-apps-overview">Mini Apps Overview</SectionHeading>

            <Prose>
              Terra Mini Apps are lightweight web experiences that run inside the Terra client — similar to Telegram
              Mini Apps or WeChat Mini Programs, but with native BTC payments and on-chain permissioning. A Mini App
              can gate access behind coin ownership, reputation thresholds, or NFT holdings.
            </Prose>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 14,
                marginBottom: 28,
              }}
            >
              {[
                {
                  icon: '⬡',
                  title: 'Coin-Gated Access',
                  desc: 'Require a minimum coin balance to enter',
                },
                {
                  icon: '◈',
                  title: 'BTC Payments',
                  desc: 'Accept payments via the Stacks-BTC bridge',
                },
                {
                  icon: '✦',
                  title: 'Reputation Gates',
                  desc: 'Filter users by on-chain reputation score',
                },
                {
                  icon: '◉',
                  title: 'NFT Unlocks',
                  desc: 'Grant access to NFT holders only',
                },
              ].map((f) => (
                <div
                  key={f.title}
                  style={{
                    background: '#fff',
                    border: '1px solid rgba(0,0,0,0.07)',
                    borderRadius: 12,
                    padding: '16px 18px',
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                  }}
                >
                  <span style={{ fontSize: 18, color: VIOLET }}>{f.icon}</span>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#1a1a1a',
                        marginBottom: 4,
                        fontFamily: 'var(--font-inter), Inter, sans-serif',
                      }}
                    >
                      {f.title}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: '#757575',
                        fontFamily: 'var(--font-inter), Inter, sans-serif',
                        lineHeight: 1.5,
                      }}
                    >
                      {f.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SubHeading id="wallet-integration">Wallet Integration</SubHeading>

            <Prose>
              Mini Apps communicate with the host wallet via the <code style={{ color: VIOLET }}>TerraSDK.miniapp</code> bridge.
              The host injects the bridge object into the Mini App iframe context automatically.
            </Prose>

            <CodeBlock filename="miniapp-wallet.ts" language="typescript">
              <Kw>import</Kw><Pl> {'{'} </Pl><Ty>MiniAppSDK</Ty><Pl> {'}'} </Pl><Kw>from</Kw><Pl> </Pl><Str>'@terra/miniapp'</Str>{'\n'}
              {'\n'}
              <Kw>const</Kw><Pl> sdk </Pl><Pu>=</Pu><Pl> </Pl><Kw>new</Kw><Pl> </Pl><Fn>MiniAppSDK</Fn><Pu>()</Pu>{'\n'}
              <Kw>await</Kw><Pl> sdk</Pl><Pu>.</Pu><Fn>ready</Fn><Pu>()</Pu>{'\n'}
              {'\n'}
              <Cm>// Request payment from the user</Cm>{'\n'}
              <Kw>const</Kw><Pl> payment </Pl><Pu>=</Pu><Pl> </Pl><Kw>await</Kw><Pl> sdk</Pl><Pu>.</Pu><Pl>wallet</Pl><Pu>.</Pu><Fn>requestPayment</Fn><Pu>({'({'}</Pu>{'\n'}
              <Pl>{'  '}amount</Pl><Pu>:</Pu><Pl> </Pl><Num>0.0001</Num><Pu>,</Pu><Pl> </Pl><Cm>// BTC</Cm>{'\n'}
              <Pl>{'  '}memo</Pl><Pu>:</Pu><Pl> </Pl><Str>'Premium content unlock'</Str><Pu>,</Pu>{'\n'}
              <Pu>{'}})'}</Pu>{'\n'}
              {'\n'}
              <Cm>// Check coin balance</Cm>{'\n'}
              <Kw>const</Kw><Pl> balance </Pl><Pu>=</Pu><Pl> </Pl><Kw>await</Kw><Pl> sdk</Pl><Pu>.</Pu><Pl>wallet</Pl><Pu>.</Pu><Fn>getCoinBalance</Fn><Pu>(</Pu><Str>'$LUNA'</Str><Pu>)</Pu>
            </CodeBlock>

            <SubHeading id="publishing">Publishing a Mini App</SubHeading>

            <CodeBlock filename="publish.ts" language="typescript">
              <Kw>const</Kw><Pl> app </Pl><Pu>=</Pu><Pl> </Pl><Kw>await</Kw><Pl> protocol</Pl><Pu>.</Pu><Pl>miniapps</Pl><Pu>.</Pu><Fn>publish</Fn><Pu>({'({'}</Pu>{'\n'}
              <Pl>{'  '}name</Pl><Pu>:</Pu><Pl> </Pl><Str>'Luna Premium'</Str><Pu>,</Pu>{'\n'}
              <Pl>{'  '}url</Pl><Pu>:</Pu><Pl> </Pl><Str>'https://luna.app'</Str><Pu>,</Pu>{'\n'}
              <Pl>{'  '}icon</Pl><Pu>:</Pu><Pl> </Pl><Str>'ipfs://Qm...'</Str><Pu>,</Pu>{'\n'}
              <Pl>{'  '}gate</Pl><Pu>:</Pu><Pl> </Pl><Pu>{'{'}</Pu>{'\n'}
              <Pl>{'    '}type</Pl><Pu>:</Pu><Pl> </Pl><Str>'coin'</Str><Pu>,</Pu>{'\n'}
              <Pl>{'    '}ticker</Pl><Pu>:</Pu><Pl> </Pl><Str>'$LUNA'</Str><Pu>,</Pu>{'\n'}
              <Pl>{'    '}minBalance</Pl><Pu>:</Pu><Pl> </Pl><Num>10</Num><Pu>,</Pu>{'\n'}
              <Pl>{'  '}</Pl><Pu>{'}'}</Pu><Pu>,</Pu>{'\n'}
              <Pu>{'}})'}</Pu>
            </CodeBlock>
          </motion.div>

          <Divider />

          {/* ─── Smart Contracts ─────────────────────────────────────────── */}
          <motion.div
            id="architecture"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: 56 }}
          >
            <SectionLabel>Smart Contracts</SectionLabel>
            <SectionHeading id="architecture">Architecture</SectionHeading>

            <Prose>
              Terra's on-chain logic is written in Clarity — the decidable, interpreted smart contract language
              native to the Stacks blockchain. Clarity contracts execute on Stacks L2 and settle finality to
              Bitcoin L1, inheriting Bitcoin's security without wrapping or bridging risks.
            </Prose>

            <div
              style={{
                background: '#1a1b2e',
                borderRadius: 14,
                padding: '24px 28px',
                marginBottom: 28,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                  marginBottom: 16,
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              >
                Deployed contracts
              </p>
              {[
                {
                  name: 'terra-identity',
                  chain: 'Stacks mainnet',
                  desc: 'SIP-009 NFT for on-chain identities',
                },
                {
                  name: 'terra-social',
                  chain: 'Stacks mainnet',
                  desc: 'Follow graph & feed indexing',
                },
                {
                  name: 'terra-coin-factory',
                  chain: 'Stacks mainnet',
                  desc: 'Deploys bonding curve contracts per creator',
                },
                {
                  name: 'terra-reputation',
                  chain: 'Stacks mainnet',
                  desc: 'Computes and stores reputation scores',
                },
                {
                  name: 'terra-nft-studio',
                  chain: 'Stacks mainnet',
                  desc: 'AI-generated NFT minting & royalty splits',
                },
              ].map((c, i, arr) => (
                <div
                  key={c.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom:
                      i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    gap: 16,
                  }}
                >
                  <code
                    style={{
                      fontSize: 13,
                      color: SYN.func,
                      fontFamily: 'monospace',
                      minWidth: 180,
                    }}
                  >
                    {c.name}
                  </code>
                  <span
                    style={{
                      fontSize: 12,
                      color: SYN.string,
                      fontFamily: 'monospace',
                      minWidth: 130,
                    }}
                  >
                    {c.chain}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.35)',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      flex: 1,
                    }}
                  >
                    {c.desc}
                  </span>
                </div>
              ))}
            </div>

            <SubHeading id="creator-coin-contract">Creator Coin Contract</SubHeading>

            <Prose>
              Each creator coin is backed by its own bonding curve contract, deployed by the <code style={{ color: VIOLET }}>terra-coin-factory</code>.
              Below is a simplified excerpt of the Clarity contract that handles purchases:
            </Prose>

            <CodeBlock filename="terra-coin.clar" language="clarity">
              <Cm>;; Terra Creator Coin — bonding curve implementation</Cm>{'\n'}
              <Cm>;; SPDX-License-Identifier: MIT</Cm>{'\n'}
              {'\n'}
              <Pu>(</Pu><Kw>define-fungible-token</Kw><Pl> creator-coin</Pl><Pu>)</Pu>{'\n'}
              {'\n'}
              <Cm>;; Calculate price for next N tokens using exponential curve</Cm>{'\n'}
              <Pu>(</Pu><Kw>define-read-only</Kw><Pl> </Pl><Pu>(</Pu><Fn>get-price</Fn><Pl> </Pl><Pu>(</Pu><Pl>amount </Pl><Ty>uint</Ty><Pu>))</Pu>{'\n'}
              <Pl>{'  '}</Pl><Pu>(</Pu><Kw>let</Kw><Pl> </Pl><Pu>((</Pu><Pl>supply </Pl><Pu>(</Pu><Fn>ft-get-supply</Fn><Pl> creator-coin</Pl><Pu>)))</Pu>{'\n'}
              <Pl>{'    '}</Pl><Pu>(</Pu><Kw>ok</Kw><Pl> </Pl><Pu>(</Pu><Fn>+</Fn><Pl> </Pl><Pu>(</Pu><Fn>*</Fn><Pl> BASE-PRICE </Pl><Pu>(</Pu><Fn>pow</Fn><Pl> CURVE-FACTOR supply</Pl><Pu>))))</Pu>{'\n'}
              <Pl>{'  '}</Pl><Pu>)</Pu>{'\n'}
              <Pu>)</Pu>{'\n'}
              {'\n'}
              <Cm>;; Purchase tokens — transfers STX, mints creator-coin</Cm>{'\n'}
              <Pu>(</Pu><Kw>define-public</Kw><Pl> </Pl><Pu>(</Pu><Fn>buy</Fn><Pl> </Pl><Pu>(</Pu><Pl>amount </Pl><Ty>uint</Ty><Pu>)</Pu><Pl> </Pl><Pu>(</Pu><Pl>max-cost </Pl><Ty>uint</Ty><Pu>))</Pu>{'\n'}
              <Pl>{'  '}</Pl><Pu>(</Pu><Kw>let</Kw><Pl> </Pl><Pu>((</Pu><Pl>price </Pl><Pu>(</Pu><Fn>unwrap!</Fn><Pl> </Pl><Pu>(</Pu><Fn>get-price</Fn><Pl> amount</Pl><Pu>)</Pu><Pl> ERR-CALC</Pl><Pu>)))</Pu>{'\n'}
              <Pl>{'    '}</Pl><Pu>(</Pu><Fn>asserts!</Fn><Pl> </Pl><Pu>({'<='}  price max-cost) ERR-SLIPPAGE</Pu><Pu>)</Pu>{'\n'}
              <Pl>{'    '}</Pl><Pu>(</Pu><Fn>try!</Fn><Pl> </Pl><Pu>(</Pu><Fn>stx-transfer?</Fn><Pl> price tx-sender CONTRACT</Pl><Pu>))</Pu>{'\n'}
              <Pl>{'    '}</Pl><Pu>(</Pu><Fn>ft-mint?</Fn><Pl> creator-coin amount tx-sender</Pl><Pu>)</Pu>{'\n'}
              <Pl>{'  '}</Pl><Pu>)</Pu>{'\n'}
              <Pu>)</Pu>
            </CodeBlock>

            <SubHeading id="nft-studio">NFT Studio</SubHeading>

            <Prose>
              The NFT Studio contract handles minting of AI-generated artwork with on-chain royalty splits.
              Creators configure royalty recipients and percentages at deploy time; the contract enforces them
              on every secondary sale.
            </Prose>

            <CodeBlock filename="nft-studio.ts" language="typescript">
              <Kw>const</Kw><Pl> nft </Pl><Pu>=</Pu><Pl> </Pl><Kw>await</Kw><Pl> protocol</Pl><Pu>.</Pu><Pl>nft</Pl><Pu>.</Pu><Fn>mint</Fn><Pu>({'({'}</Pu>{'\n'}
              <Pl>{'  '}prompt</Pl><Pu>:</Pu><Pl> </Pl><Str>'Cyberpunk Tokyo at golden hour, ultra-detailed'</Str><Pu>,</Pu>{'\n'}
              <Pl>{'  '}model</Pl><Pu>:</Pu><Pl> </Pl><Str>'dall-e-3'</Str><Pu>,</Pu>{'\n'}
              <Pl>{'  '}royalties</Pl><Pu>:</Pu><Pl> </Pl><Pu>[</Pu>{'\n'}
              <Pl>{'    '}</Pl><Pu>{'{'}</Pu><Pl> address</Pl><Pu>:</Pu><Pl> myAddress</Pl><Pu>,</Pu><Pl> bps</Pl><Pu>:</Pu><Pl> </Pl><Num>750</Num><Pl> </Pl><Pu>{'}'}</Pu><Pu>,</Pu><Pl> </Pl><Cm>// 7.5%</Cm>{'\n'}
              <Pl>{'  '}</Pl><Pu>]</Pu><Pu>,</Pu>{'\n'}
              <Pu>{'}})'}</Pu>{'\n'}
              {'\n'}
              <Fn>console</Fn><Pu>.</Pu><Fn>log</Fn><Pu>(</Pu><Pl>nft</Pl><Pu>.</Pu><Pl>tokenId</Pl><Pu>,</Pu><Pl> nft</Pl><Pu>.</Pu><Pl>ipfsUri</Pl><Pu>)</Pu>
            </CodeBlock>
          </motion.div>

          <Divider />

          {/* ─── REST Endpoints ──────────────────────────────────────────── */}
          <motion.div
            id="rest-endpoints"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: 56 }}
          >
            <SectionLabel>API Reference</SectionLabel>
            <SectionHeading id="rest-endpoints">REST Endpoints</SectionHeading>

            {/* Base URL */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#1a1b2e',
                borderRadius: 10,
                padding: '10px 16px',
                marginBottom: 24,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.3)',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              >
                Base URL
              </span>
              <code style={{ fontSize: 13, color: SYN.string, fontFamily: 'monospace' }}>
                https://api.terra.app/v1
              </code>
            </div>

            <Prose>
              All endpoints require a Bearer token obtained from <code style={{ color: VIOLET }}>WalletAuth.connect()</code>.
              Rate limits apply per-address (see Rate Limits section). All responses are JSON.
            </Prose>

            {/* Endpoints table */}
            <div
              style={{
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.07)',
                marginBottom: 24,
              }}
            >
              {/* Table header */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 220px 1fr',
                  background: '#F3F4F4',
                  padding: '10px 16px',
                  gap: 16,
                  borderBottom: '1px solid rgba(0,0,0,0.07)',
                }}
              >
                {['Method', 'Endpoint', 'Description'].map((h) => (
                  <span
                    key={h}
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#757575',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {(
                [
                  ['GET', '/identity/:address', 'Resolve an on-chain identity by Stacks address'],
                  ['POST', '/coins/deploy', 'Deploy a new creator coin bonding curve contract'],
                  ['GET', '/social/graph/:id', 'Fetch followers and following for an identity'],
                  ['POST', '/agents/create', 'Create and deploy a new AI agent'],
                  ['GET', '/feed/:creatorId', 'Fetch the personalised feed for a creator'],
                  ['POST', '/miniapps/publish', 'Publish a mini-app to the Terra client directory'],
                  ['GET', '/coins/:ticker/price', 'Get current price and supply for a creator coin'],
                  ['POST', '/coins/:ticker/buy', 'Purchase creator coins from the bonding curve'],
                  ['DELETE', '/identity/:address', 'Deactivate an identity (irreversible)'],
                ] as [string, string, string][]
              ).map(([method, endpoint, desc], i, arr) => (
                <div
                  key={endpoint}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 220px 1fr',
                    padding: '12px 16px',
                    gap: 16,
                    background: i % 2 === 0 ? '#ffffff' : '#FAFAFA',
                    borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                    alignItems: 'center',
                  }}
                >
                  <MethodBadge method={method as 'GET' | 'POST' | 'DELETE'} />
                  <code
                    style={{
                      fontSize: 13,
                      color: '#1a1a1a',
                      fontFamily: 'monospace',
                    }}
                  >
                    {endpoint}
                  </code>
                  <span
                    style={{
                      fontSize: 13,
                      color: '#4a4a4a',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                    }}
                  >
                    {desc}
                  </span>
                </div>
              ))}
            </div>

            <Callout type="tip">
              All write operations (<code>POST</code>, <code>DELETE</code>) require a valid JWT in the
              <code> Authorization: Bearer &lt;token&gt;</code> header. Tokens expire after 24 hours.
            </Callout>
          </motion.div>

          {/* ─── WebSocket ───────────────────────────────────────────────── */}
          <motion.div
            id="websocket"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: 56 }}
          >
            <SubHeading id="websocket">WebSocket Events</SubHeading>

            <Prose>
              Terra exposes a WebSocket endpoint for real-time event streaming. Connect with any standards-compliant
              WebSocket client and subscribe to event channels by sending a JSON subscription message.
            </Prose>

            <CodeBlock filename="websocket.ts" language="typescript">
              <Kw>const</Kw><Pl> ws </Pl><Pu>=</Pu><Pl> </Pl><Kw>new</Kw><Pl> </Pl><Fn>WebSocket</Fn><Pu>(</Pu>{'\n'}
              <Pl>{'  '}</Pl><Str>'wss://ws.terra.app/v1?token=&lt;JWT&gt;'</Str>{'\n'}
              <Pu>)</Pu>{'\n'}
              {'\n'}
              <Cm>// Subscribe to social and coin events for an address</Cm>{'\n'}
              <Pl>ws</Pl><Pu>.</Pu><Fn>onopen</Fn><Pl> </Pl><Pu>=</Pu><Pl> </Pl><Pu>()</Pu><Pl> </Pl><Pu>{'{'}{'=> {'}</Pu>{'\n'}
              <Pl>{'  '}ws</Pl><Pu>.</Pu><Fn>send</Fn><Pu>(</Pu><Ty>JSON</Ty><Pu>.</Pu><Fn>stringify</Fn><Pu>({'{'}</Pu>{'\n'}
              <Pl>{'    '}type</Pl><Pu>:</Pu><Pl> </Pl><Str>'subscribe'</Str><Pu>,</Pu>{'\n'}
              <Pl>{'    '}channels</Pl><Pu>:</Pu><Pl> </Pl><Pu>[</Pu><Str>'social'</Str><Pu>,</Pu><Pl> </Pl><Str>'coins'</Str><Pu>,</Pu><Pl> </Pl><Str>'agents'</Str><Pu>]</Pu><Pu>,</Pu>{'\n'}
              <Pl>{'    '}address</Pl><Pu>:</Pu><Pl> </Pl><Str>'SP3FBR2AGK5H7YQX8VNJ9QR3R9Q8EX7KYX'</Str><Pu>,</Pu>{'\n'}
              <Pu>{'  '}</Pu><Pu>{'}'}</Pu><Pu>)</Pu><Pu>)</Pu>{'\n'}
              <Pu>{'}'}</Pu>{'\n'}
              {'\n'}
              <Cm>// Incoming event shapes</Cm>{'\n'}
              <Pl>ws</Pl><Pu>.</Pu><Fn>onmessage</Fn><Pl> </Pl><Pu>=</Pu><Pl> </Pl><Pu>(</Pu><Pl>ev</Pl><Pu>)</Pu><Pl> </Pl><Pu>{'{'}{'=> {'}</Pu>{'\n'}
              <Pl>{'  '}</Pl><Kw>const</Kw><Pl> event </Pl><Pu>=</Pu><Pl> </Pl><Ty>JSON</Ty><Pu>.</Pu><Fn>parse</Fn><Pu>(</Pu><Pl>ev</Pl><Pu>.</Pu><Pl>data</Pl><Pu>)</Pu>{'\n'}
              <Cm>{'  '}// event.type: 'follow' | 'coin.buy' | 'coin.sell' | 'post' | 'agent.action'</Cm>{'\n'}
              <Cm>{'  '}// event.payload: {'{ from, to, amount, txId, timestamp }'}</Cm>{'\n'}
              <Pu>{'}'}</Pu>{'\n'}
            </CodeBlock>

            {/* Event types */}
            <div
              style={{
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.07)',
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  background: '#F3F4F4',
                  padding: '10px 16px',
                  borderBottom: '1px solid rgba(0,0,0,0.07)',
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#757575',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                  }}
                >
                  Event types
                </span>
              </div>
              {[
                { event: 'follow', desc: 'A wallet followed another identity' },
                { event: 'unfollow', desc: 'A wallet unfollowed another identity' },
                { event: 'post', desc: 'A new post was published to the feed' },
                { event: 'coin.buy', desc: 'Creator coins were purchased from a bonding curve' },
                { event: 'coin.sell', desc: 'Creator coins were sold back to a bonding curve' },
                { event: 'coin.deploy', desc: 'A new creator coin contract was deployed' },
                { event: 'agent.action', desc: 'An AI agent performed an autonomous action' },
                { event: 'reputation.update', desc: 'An on-chain reputation score was updated' },
              ].map((e, i, arr) => (
                <div
                  key={e.event}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '11px 16px',
                    background: i % 2 === 0 ? '#fff' : '#FAFAFA',
                    borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                  }}
                >
                  <code
                    style={{
                      fontSize: 12.5,
                      color: SYN.func,
                      fontFamily: 'monospace',
                      minWidth: 170,
                    }}
                  >
                    {e.event}
                  </code>
                  <span
                    style={{
                      fontSize: 13,
                      color: '#4a4a4a',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                    }}
                  >
                    {e.desc}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── Rate Limits ─────────────────────────────────────────────── */}
          <motion.div
            id="rate-limits"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: 80 }}
          >
            <SubHeading id="rate-limits">Rate Limits</SubHeading>

            <Prose>
              Terra API rate limits are applied per Stacks address. Limits reset on a rolling 60-second window.
              Exceeding a limit returns a <code style={{ color: '#ef4444' }}>429 Too Many Requests</code> response
              with a <code style={{ color: VIOLET }}>Retry-After</code> header indicating when to retry.
            </Prose>

            <div
              style={{
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.07)',
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 120px 120px',
                  background: '#F3F4F4',
                  padding: '10px 16px',
                  gap: 12,
                  borderBottom: '1px solid rgba(0,0,0,0.07)',
                }}
              >
                {['Endpoint group', 'Free tier', 'Creator tier'].map((h) => (
                  <span
                    key={h}
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#757575',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
              {[
                ['Identity & Social reads', '120 / min', '600 / min'],
                ['Feed reads', '60 / min', '300 / min'],
                ['Coin reads', '120 / min', '600 / min'],
                ['Write operations (POST)', '10 / min', '60 / min'],
                ['WebSocket connections', '2 concurrent', '10 concurrent'],
                ['Agent actions', '5 / min', '30 / min'],
              ].map(([group, free, creator], i, arr) => (
                <div
                  key={group}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 120px 120px',
                    padding: '11px 16px',
                    gap: 12,
                    background: i % 2 === 0 ? '#fff' : '#FAFAFA',
                    borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color: '#1a1a1a',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                    }}
                  >
                    {group}
                  </span>
                  <span style={{ fontSize: 13, color: '#757575', fontFamily: 'monospace' }}>{free}</span>
                  <span style={{ fontSize: 13, color: '#22c55e', fontFamily: 'monospace', fontWeight: 600 }}>
                    {creator}
                  </span>
                </div>
              ))}
            </div>

            <Callout type="tip">
              Creator tier rate limits are automatically applied when your session address holds &ge; 100 $TERRA
              governance tokens. No manual upgrade required.
            </Callout>

            <Divider />

            {/* Footer CTA */}
            <div
              style={{
                background: '#1a1b2e',
                borderRadius: 18,
                padding: '36px 40px',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 24,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#e2e8f0',
                    marginBottom: 8,
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Ready to build on Terra?
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.40)',
                    fontStyle: 'italic',
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                  }}
                >
                  The first social protocol with Bitcoin finality.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
                <button
                  onClick={() => scrollTo('installation')}
                  style={{
                    padding: '12px 22px',
                    borderRadius: 999,
                    background: GRADIENT,
                    border: 'none',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Get Started
                </button>
                <a
                  href="https://github.com/terra-protocol"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: '12px 22px',
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    color: '#e2e8f0',
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
