/** InfoBar: bottom bar showing clicked polygon properties (accumulates overlapping layers). */
import type { SelectedInfo } from '../hooks/useCesiumViewer'

const LAYER_LABELS: Record<string, string> = {
  '2d': '2D Corridor',
  '3d': '3D Network',
  'hdb': 'HDB Footprint',
}

function formatVal(v: unknown): string {
  if (v === null || v === undefined || v === '') return '—'
  if (typeof v === 'number') return Number.isFinite(v) ? String(Math.round(v * 100) / 100) : '—'
  return String(v)
}

function renderRows(props: Record<string, unknown>): React.ReactNode[] {
  return Object.entries(props)
    .filter(([k]) => !k.startsWith('_'))
    .slice(0, 12)
    .map(([k, v]) => (
      <div key={k} className="info-row">
        <span className="info-k">{k}</span>
        <span className="info-v">{formatVal(v)}</span>
      </div>
    ))
}

type Props = {
  selected: SelectedInfo[] | null
}

export default function InfoBar({ selected }: Props) {
  if (!selected || selected.length === 0) return null

  return (
    <div className="info-bar" role="region" aria-label="Feature info">
      <div className="info-bar-scroll">
        {selected.map((sel, idx) => {
          const props = sel.properties as Record<string, unknown>
          const label = LAYER_LABELS[sel.layer] ?? sel.layer
          const titleId = props.feat_id || props.priorityID || 'Properties'
          return (
            <div key={idx} className="info-bar-item">
              <div className="info-bar-header">
                <span className="info-badge">{label}</span>
                <span className="info-bar-title">Feature {titleId}</span>
              </div>
              <div className="info-bar-props">
                {renderRows(props)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
