/** LayerPanel: Collapsible top-left panel for layer visibility, colour, and opacity. */
import { useState } from 'react'
import type { LayersEnabled, LayerStyle } from '../App'

type Props = {
  layersEnabled: LayersEnabled
  layerStyles: Record<keyof LayersEnabled, LayerStyle>
  onToggle: (key: keyof LayersEnabled) => void
  onStyleChange: (key: keyof LayersEnabled, style: Partial<LayerStyle>) => void
  loading2d: boolean
  loading3d: boolean
  loadingHdb: boolean
  error2d: string | null
  error3d: string | null
  errorHdb: string | null
}

type LayerRowProps = {
  id: keyof LayersEnabled
  label: string
  enabled: boolean
  style: LayerStyle
  loading: boolean
  error: string | null
  onToggle: (key: keyof LayersEnabled) => void
  onStyleChange: (key: keyof LayersEnabled, s: Partial<LayerStyle>) => void
}

function LayerRow({ id, label, enabled, style, loading, error, onToggle, onStyleChange }: LayerRowProps) {
  return (
    <div className="layer-row">
      <label className="layer-check-label">
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => onToggle(id)}
          id={`toggle-${id}`}
        />
        <span className="layer-name">{label}</span>
        {loading && <span className="status loading">loading</span>}
        {error && <span className="status error" title={error}>error</span>}
      </label>
      <div className="layer-controls">
        <label className="ctrl-label" title="Layer colour">
          <input
            type="color"
            value={style.colorHex}
            onChange={(e) => onStyleChange(id, { colorHex: e.target.value })}
            className="color-swatch"
          />
        </label>
        <label className="ctrl-label opacity-ctrl" title="Opacity">
          <span className="ctrl-icon">◑</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={style.alpha}
            onChange={(e) => onStyleChange(id, { alpha: parseFloat(e.target.value) })}
            className="opacity-slider"
          />
        </label>
      </div>
    </div>
  )
}

export default function LayerPanel({
  layersEnabled,
  layerStyles,
  onToggle,
  onStyleChange,
  loading2d,
  loading3d,
  loadingHdb,
  error2d,
  error3d,
  errorHdb,
}: Props) {
  const [open, setOpen] = useState(true)

  return (
    <div className={`layer-panel ${open ? 'layer-panel--open' : ''}`}>
      <button
        className="layer-panel-header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="layer-panel-body"
      >
        <span className="panel-icon">⊞</span>
        <span className="panel-title">Layers</span>
        <span className="panel-chevron">{open ? '▲' : '▼'}</span>
      </button>

      <div id="layer-panel-body" className="layer-panel-body">
        <LayerRow
          id="layer2d"
          label="2D Corridors"
          enabled={layersEnabled.layer2d}
          style={layerStyles.layer2d}
          loading={loading2d}
          error={error2d}
          onToggle={onToggle}
          onStyleChange={onStyleChange}
        />
        <LayerRow
          id="layer3d"
          label="3D Network"
          enabled={layersEnabled.layer3d}
          style={layerStyles.layer3d}
          loading={loading3d}
          error={error3d}
          onToggle={onToggle}
          onStyleChange={onStyleChange}
        />
        <LayerRow
          id="layerHdb"
          label="HDB Footprints"
          enabled={layersEnabled.layerHdb}
          style={layerStyles.layerHdb}
          loading={loadingHdb}
          error={errorHdb}
          onToggle={onToggle}
          onStyleChange={onStyleChange}
        />
        <LayerRow
          id="layerTileset"
          label="3D Tileset"
          enabled={layersEnabled.layerTileset}
          style={layerStyles.layerTileset}
          loading={false}
          error={null}
          onToggle={onToggle}
          onStyleChange={onStyleChange}
        />
      </div>
    </div>
  )
}
