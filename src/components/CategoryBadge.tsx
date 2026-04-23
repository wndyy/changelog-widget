import type { Category } from '../data/releases'
import styles from './CategoryBadge.module.css'

const META: Record<Category, { label: string; cls: string }> = {
  new:        { label: 'New',        cls: styles.new },
  improved:   { label: 'Improved',   cls: styles.improved },
  fixed:      { label: 'Fixed',      cls: styles.fixed },
  deprecated: { label: 'Deprecated', cls: styles.deprecated },
}

export function CategoryBadge({ category }: { category: Category }) {
  const m = META[category]
  return <span className={`${styles.badge} ${m.cls}`}>{m.label}</span>
}
