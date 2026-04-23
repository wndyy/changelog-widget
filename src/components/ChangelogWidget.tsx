import { useState, useEffect, useRef } from 'react'
import { releases } from '../data/releases'
import { ReleaseCard } from './ReleaseCard'
import styles from './ChangelogWidget.module.css'

const UNREAD_COUNT = 2

export function ChangelogWidget() {
  const [open, setOpen] = useState(false)
  const [unread, setUnread] = useState(UNREAD_COUNT)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Mark as read when opened
  const handleOpen = () => {
    setOpen(v => !v)
    if (!open) setUnread(0)
  }

  return (
    <div className={styles.root} ref={panelRef}>
      {/* Trigger button */}
      <button
        className={`${styles.trigger} ${open ? styles.triggerActive : ''}`}
        onClick={handleOpen}
        aria-label="Open changelog"
        title="What's new"
      >
        <BellIcon />
        {unread > 0 && (
          <span className={styles.badge}>{unread}</span>
        )}
      </button>

      {/* Panel */}
      <div className={`${styles.panel} ${open ? styles.panelOpen : ''}`} aria-hidden={!open}>
        <div className={styles.panelHeader}>
          <div className={styles.headerLeft}>
            <h1 className={styles.headerTitle}>What's new</h1>
            <span className={styles.headerSub}>Product updates &amp; release notes</span>
          </div>
          <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close">
            ✕
          </button>
        </div>

        <div className={styles.feed}>
          {releases.map(release => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>

        <div className={styles.panelFooter}>
          <a href="#" className={styles.footerLink}>View full changelog →</a>
        </div>
      </div>
    </div>
  )
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  )
}
