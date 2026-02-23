/** PerspectiveButton: Bottom-right button to cycle through multiple 3D/2D views. */
import { useState, type RefObject } from 'react'
import * as Cesium from 'cesium'

type Props = {
  viewerRef: RefObject<Cesium.Viewer | null>
}

const VIEWS = [
  { label: 'Bird View', icon: '🗺️', height: 25000, pitch: -90, heading: 0 },
  { label: 'Face North', icon: '⬆️', height: 350, pitch: -15, heading: 0 },
  { label: 'Face East', icon: '➡️', height: 350, pitch: -15, heading: 90 },
  { label: 'Face South', icon: '⬇️', height: 350, pitch: -15, heading: 180 },
  { label: 'Face West', icon: '⬅️', height: 350, pitch: -15, heading: 270 },
]

export default function PerspectiveButton({ viewerRef }: Props) {
  const [viewIdx, setViewIdx] = useState(0)

  const handleToggle = () => {
    const viewer = viewerRef.current
    if (!viewer || viewer.isDestroyed()) return

    const nextIdx = (viewIdx + 1) % VIEWS.length
    setViewIdx(nextIdx)
    const view = VIEWS[nextIdx]

    viewer.scene.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(103.8198, 1.3521, view.height),
      orientation: {
        heading: Cesium.Math.toRadians(view.heading),
        pitch: Cesium.Math.toRadians(view.pitch),
        roll: 0,
      },
      duration: 1.5,
    })
  }

  const currentView = VIEWS[viewIdx]

  return (
    <div className="perspective-btn-container" aria-label="Camera perspective">
      <button 
        className="perspective-btn" 
        onClick={handleToggle} 
        title="Cycle View Perspective"
      >
        <span className="perspective-icon">{currentView.icon}</span>
        <span className="perspective-label">{currentView.label}</span>
      </button>
    </div>
  )
}
