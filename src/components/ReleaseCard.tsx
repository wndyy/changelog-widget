import { useState } from 'react'
import type { Release } from '../data/releases'
import { CategoryBadge } from './CategoryBadge'
import styles from './ReleaseCard.module.css'

export function ReleaseCard({ release }: { release: Release }) {
  const [expanded, setExpanded] = useState(release.highlight ?? false)

  return (
    <article className={`${styles.card} ${release.highlight ? styles.highlight : ''}`}>
      <div className={styles.meta}>
        <span className={styles.version}>v{release.version}</span>
        <span className={styles.date}>{release.date}</span>
      </div>

      <h2 className={styles.headline}>{release.headline}</h2>
      <p className={styles.summary}>{release.summary}</p>

      {expanded && (
        <ul className={styles.entries}>
          {release.entries.map(entry => (
            <li key={entry.id} className={styles.entry}>
              <div className={styles.entryTop}>
                <CategoryBadge category={entry.category} />
                <span className={styles.entryTitle}>{entry.title}</span>
              </div>
              <p className={styles.entryDesc}>{entry.description}</p>
            </li>
          ))}
        </ul>
      )}

      <button
        className={styles.toggle}
        onClick={() => setExpanded(v => !v)}
      >
        {expanded
          ? '↑ collapse'
          : `↓ see all ${release.entries.length} changes`}
      </button>
    </article>
  )
}
