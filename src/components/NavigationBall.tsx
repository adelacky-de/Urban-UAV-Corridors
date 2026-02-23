/** PerspectiveButton: Bottom-right container with multiple direction buttons. */
import { useState, type RefObject } from 'react'
import * as Cesium from 'cesium'

type Props = {
  viewerRef: RefObject<Cesium.Viewer | null>
}

const VIEWS = [
  { id: 'bird', icon: 'Top', label: 'Bird View', height: 25000, pitch: -90, heading: 0 },
  { id: 'north', icon: 'N', label: 'Face North', height: 350, pitch: -15, heading: 0 },
  { id: 'east', icon: 'E', label: 'Face East', height: 350, pitch: -15, heading: 90 },
  { id: 'south', icon: 'S', label: 'Face South', height: 350, pitch: -15, heading: 180 },
  { id: 'west', icon: 'W', label: 'Face West', height: 350, pitch: -15, heading: 270 },
]

export default function PerspectiveButton({ viewerRef }: Props) {
  const [expanded, setExpanded] = useState(false)
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
    <div 
      className="perspective-btn-container" 
      aria-label="Camera perspectives"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className={`perspective-menu ${expanded ? 'expanded' : ''}`}>
        {VIEWS.map((view) => (
          <button
            key={view.id}
            className="perspective-icon-btn"
            onClick={() => handleFlyTo(view)}
            title={view.label}
            aria-label={view.label}
          >
            {view.icon}
          </button>
        ))}
      </div>
      <button 
        className="perspective-icon-btn main-perspective-btn" 
        onClick={() => setExpanded(!expanded)} 
        title="Perspectives"
        aria-label="Toggle Perspectives"
        aria-expanded={expanded}
      >
        ⌖
      </button>
    </div>
  )
}
