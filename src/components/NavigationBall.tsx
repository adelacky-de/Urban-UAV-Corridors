/** PerspectiveButton: Bottom-right container with multiple direction buttons. */
import type { RefObject } from 'react'
import * as Cesium from 'cesium'

type Props = {
  viewerRef: RefObject<Cesium.Viewer | null>
}

const VIEWS = [
  { id: 'bird', label: 'Bird View', icon: '🗺️', height: 25000, pitch: -90, heading: 0 },
  { id: 'north', label: 'Face North', icon: '⬆️', height: 350, pitch: -15, heading: 0 },
  { id: 'east', label: 'Face East', icon: '➡️', height: 350, pitch: -15, heading: 90 },
  { id: 'south', label: 'Face South', icon: '⬇️', height: 350, pitch: -15, heading: 180 },
  { id: 'west', label: 'Face West', icon: '⬅️', height: 350, pitch: -15, heading: 270 },
]

export default function PerspectiveButton({ viewerRef }: Props) {
  const handleFlyTo = (view: typeof VIEWS[0]) => {
    const viewer = viewerRef.current
    if (!viewer || viewer.isDestroyed()) return

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

  return (
    <div className="perspective-btn-container" aria-label="Camera perspectives">
      {VIEWS.map((view) => (
        <button
          key={view.id}
          className="perspective-btn"
          onClick={() => handleFlyTo(view)}
          title={view.label}
        >
          <span className="perspective-icon">{view.icon}</span>
          <span className="perspective-label">{view.label}</span>
        </button>
      ))}
    </div>
  )
}
