export type Category = 'new' | 'improved' | 'fixed' | 'deprecated'

export interface ChangeEntry {
  id: string
  category: Category
  title: string
  description: string
}

export interface Release {
  id: string
  version: string
  date: string
  headline: string
  summary: string
  entries: ChangeEntry[]
  highlight?: boolean
}

export const releases: Release[] = [
  {
    id: 'v3-2-0',
    version: '3.2.0',
    date: 'April 18, 2026',
    headline: 'Swimlanes, smarter search, and a long-overdue mobile overhaul.',
    summary: 'Our biggest quality-of-life release yet — driven almost entirely by your feedback.',
    highlight: true,
    entries: [
      {
        id: 'e1',
        category: 'new',
        title: 'Swimlanes on Kanban boards',
        description: 'Group cards by assignee, priority, or any custom field. Drag tasks between swimlanes directly.',
      },
      {
        id: 'e2',
        category: 'new',
        title: 'Recurring tasks',
        description: 'Set any task to repeat daily, weekly, or on a custom schedule. No more recreating standups by hand.',
      },
      {
        id: 'e3',
        category: 'improved',
        title: 'Completely rebuilt mobile app',
        description: 'Larger touch targets, faster navigation, and file uploads that actually work on iOS and Android.',
      },
      {
        id: 'e4',
        category: 'improved',
        title: 'Search now supports natural language',
        description: 'Try "my overdue tasks this week" or "bugs assigned to Sarah" — no syntax required.',
      },
      {
        id: 'e5',
        category: 'fixed',
        title: 'Timeline view slow with 200+ tasks',
        description: 'Rendering performance improved by ~4× on large projects. Should feel instant now.',
      },
      {
        id: 'e6',
        category: 'fixed',
        title: 'CSV export missing custom field columns',
        description: 'All custom fields now export correctly. Reports are actually useful again.',
      },
    ],
  },
  {
    id: 'v3-1-0',
    version: '3.1.0',
    date: 'March 3, 2026',
    headline: 'Executive dashboard, notification controls, and Slack sync.',
    summary: 'Features your managers have been asking for since day one.',
    entries: [
      {
        id: 'e7',
        category: 'new',
        title: 'Executive dashboard',
        description: 'A read-only project health view with RAG status, milestone progress, and team capacity — shareable via link.',
      },
      {
        id: 'e8',
        category: 'new',
        title: 'Two-way Slack sync',
        description: 'Comment from Slack, see it in the app. Update status in the app, see it in Slack. Finally.',
      },
      {
        id: 'e9',
        category: 'improved',
        title: 'Granular notification settings',
        description: 'Choose exactly what triggers a notification: @mentions only, status changes, due date reminders, or nothing.',
      },
      {
        id: 'e10',
        category: 'improved',
        title: 'Custom fields now filterable in reports',
        description: 'Any custom field you\'ve created can now be used as a filter or group-by in the reports section.',
      },
      {
        id: 'e11',
        category: 'fixed',
        title: 'Changelog emails broken in Gmail',
        description: 'Images and buttons now render correctly in Gmail, Outlook, and Apple Mail.',
      },
    ],
  },
  {
    id: 'v3-0-0',
    version: '3.0.0',
    date: 'January 14, 2026',
    headline: 'Dark mode, mandatory 2FA for enterprise, and a new API.',
    summary: 'The release we\'ve been building toward for six months.',
    entries: [
      {
        id: 'e12',
        category: 'new',
        title: 'Dark mode',
        description: 'System preference is detected automatically, or toggle manually in Settings → Appearance.',
      },
      {
        id: 'e13',
        category: 'new',
        title: 'Public REST API v2',
        description: 'Full CRUD on projects, tasks, and comments. Webhooks included. See docs.yourapp.com/api.',
      },
      {
        id: 'e14',
        category: 'new',
        title: 'Mandatory 2FA for Enterprise plans',
        description: 'Admins can now enforce two-factor authentication org-wide. SSO support coming in 3.1.',
      },
      {
        id: 'e15',
        category: 'improved',
        title: 'Bulk task editing',
        description: 'Select multiple tasks and update status, assignee, or due date in one action.',
      },
      {
        id: 'e16',
        category: 'deprecated',
        title: 'Legacy webhooks v1 sunset',
        description: 'The v1 webhook format will stop working on June 1, 2026. Migrate to v2 webhooks now.',
      },
    ],
  },
]
