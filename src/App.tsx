import { ChangelogWidget } from './components/ChangelogWidget'
import './index.css'
import styles from './App.module.css'
import { useState, useRef } from 'react'

export default function App() {
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    desc: '',
    status: 'ontrack',
    due: '',
    members: 1,
    tasks: 0,
    progress: 0,
  })
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const touchDragIndex = useRef<number | null>(null);
  const touchOriginIndex = useRef<number | null>(null);
  const [projects, setProjects] = useState(PROJECTS_DEFAULT);
  const [ghostPos, setGhostPos] = useState<{ x: number; y: number } | null>(null)
  const [ghostProject, setGhostProject] = useState<typeof PROJECTS_DEFAULT[0] | null>(null)
  const getTouchTargetIndex = (e: TouchEvent) => {
    const touch = e.touches[0]
    const els = document.elementsFromPoint(touch.clientX, touch.clientY)
    for (const el of els) {
      const card = el.closest('[data-index]')
      if (card) return parseInt(card.getAttribute('data-index')!)
    }
    return null
  };
  return (
    <div className={styles.app}>
      {/* Fake SaaS app chrome */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoMark}>◆</span>
          <span className={styles.logoText}>Acme</span>
        </div>
        <nav className={styles.nav}>
          {['Dashboard', 'Projects', 'Tasks', 'Reports', 'Settings'].map((item, i) => (
            <a key={item} href="#" className={`${styles.navItem} ${i === 1 ? styles.navActive : ''}`}>
              {item}
            </a>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <div className={styles.avatar}>JD</div>
          <div>
            <div className={styles.avatarName}>Jane Doe</div>
            <div className={styles.avatarRole}>Admin</div>
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <h1 className={styles.pageTitle}>Projects</h1>
            <p className={styles.pageSub}>3 active · 1 on hold</p>
          </div>
          <button className={styles.newBtn} onClick={() => setShowNewProject(true)}>+ New project</button>
        </header>

        {/* Fake project cards */}
        <div className={styles.grid}>
          {projects.map((p, i) => (
            <div key={p.name}
              data-index={i}
              className={`${styles.projectCard} ${dragIndex === i ? styles.dragging : ''}`}
              draggable
              onDragStart={() => { 
                setDragIndex(i)
                setGhostProject(p)
                document.body.classList.add('dragging')
              }}
              onDragEnd={() => {
                setDragIndex(null)
                setGhostPos(null)
                setGhostProject(null)
                document.body.classList.remove('dragging')
              }}
              onDragOver={e => {
                e.preventDefault()
              }}
              onDrag={(e) => {
                if (e.clientX === 0 && e.clientY === 0) return
                setGhostPos({ x: e.clientX, y: e.clientY })
              }}
              onDrop={() => {
                if (dragIndex === null) return
                const updated = [...projects]
                const [removed] = updated.splice(dragIndex, 1)
                updated.splice(i, 0, removed)
                setProjects(updated)
                setDragIndex(null)
              }}
              onTouchStart={() => { 
                touchDragIndex.current = i
                touchOriginIndex.current = i
                setDragIndex(i)
              }}
              onTouchMove={e => {
                const target = getTouchTargetIndex(e.nativeEvent)
                if (target !== null && target !== touchDragIndex.current) {
                  const updated = [...projects]
                  const [removed] = updated.splice(touchDragIndex.current!, 1)
                  updated.splice(target, 0, removed)
                  setProjects(updated)
                  touchDragIndex.current = target
                  setDragIndex(touchOriginIndex.current)
                }
              }}
              onTouchEnd={() => {
                touchDragIndex.current = null
                touchOriginIndex.current = null
                setDragIndex(null)
              }}
            >
              <div className={styles.projectHeader}>
                <span className={styles.projectName}>{p.name}</span>
                <span className={`${styles.projectStatus} ${styles[p.statusKey]}`}>{p.status}</span>
              </div>
              <p className={styles.projectDesc}>{p.desc}</p>
              <div className={styles.projectMeta}>
                <span>{p.tasks} tasks</span>
                <span>{p.members} members</span>
                <span>Due {p.due}</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${p.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* The actual widget — floats over everything */}
      {ghostPos && ghostProject && (
        <div className={styles.ghostCard} style={{ left: ghostPos.x, top: ghostPos.y }}>
          <div className={styles.projectHeader}>
            <span className={styles.projectName}>{ghostProject.name}</span>
            <span className={`${styles.projectStatus} ${styles[ghostProject.statusKey]}`}>{ghostProject.status}</span>
          </div>
          <p className={styles.projectDesc}>{ghostProject.desc}</p>
        </div>
      )}
      <ChangelogWidget />
      {showNewProject && (
      <div className={styles.overlay} onClick={() => setShowNewProject(false)}>
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>New Project</h2><button className={styles.closeBtn} onClick={() => setShowNewProject(false)}>✕</button>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>PROJECT NAME</label>
              <input className={styles.input} type="text" placeholder="e.g. Website Redesign" 
                value={newProject.name}
                onChange={e => setNewProject({...newProject, name: e.target.value})}/>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>DESCRIPTION</label>
              <textarea className={styles.input} placeholder="What is this project about?" rows={3} 
                  value={newProject.desc}
                  onChange={e => setNewProject({...newProject, desc: e.target.value})} />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>STATUS</label>
              <select className={styles.input}
                value={newProject.status}
                onChange={e => setNewProject({...newProject, status: e.target.value})}>
                <option value="ontrack">On track</option>
                <option value="atrisk">At risk</option>
                <option value="onhold">On hold</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>DUE DATE</label>
              <input className={styles.input} type="date" 
                value={newProject.due}
                onChange={e => setNewProject({...newProject, due: e.target.value})} />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>MEMBERS</label>
              <input className={styles.input} type="number" placeholder="e.g. 4" min={1}
                value={newProject.members}
                onChange={e => setNewProject({...newProject, members: parseInt(e.target.value)})} />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>TASKS</label>
              <input className={styles.input} type="number" placeholder="e.g. 12" min={0}
                value={newProject.tasks}
                onChange={e => setNewProject({...newProject, tasks: parseInt(e.target.value)})} />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>PROGRESS (0-100)</label>
              <input className={styles.input} type="number" placeholder="e.g. 45" min={0} max={100}
                value={newProject.progress}
                onChange={e => setNewProject({...newProject, progress: parseInt(e.target.value)})} />
            </div>

            <button className={styles.submitBtn} onClick={() => {
              setProjects([...projects, {
                name: newProject.name,
                status: newProject.status === 'ontrack' ? 'On track' : newProject.status === 'atrisk' ? 'At risk' : 'On hold',
                statusKey: newProject.status,
                desc: newProject.desc,
                tasks: newProject.tasks,
                members: newProject.members,
                due: newProject.due || 'TBD',
                progress: newProject.progress,
              }])
              setNewProject({ name: '', desc: '', status: 'ontrack', due: '', members: 1, tasks: 0, progress: 0 })
              setShowNewProject(false)
            }}>Submit
            </button>
        </div>
      </div>
      )}
    </div>
  )
}

const PROJECTS_DEFAULT = [
  { name: 'Website Redesign', status: 'On track', statusKey: 'ontrack', desc: 'Full rebrand of marketing site and docs portal.', tasks: 42, members: 5, due: 'May 30', progress: 68 },
  { name: 'Mobile App v2', status: 'At risk', statusKey: 'atrisk', desc: 'iOS and Android redesign with new onboarding flow.', tasks: 87, members: 8, due: 'Jun 15', progress: 34 },
  { name: 'API Platform', status: 'On track', statusKey: 'ontrack', desc: 'Public REST API v2 with improved rate limiting.', tasks: 29, members: 4, due: 'May 10', progress: 91 },
  { name: 'Data Migration', status: 'On hold', statusKey: 'onhold', desc: 'Move legacy data warehouse to Snowflake.', tasks: 18, members: 3, due: 'TBD', progress: 12 },
]
