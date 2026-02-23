/** NavigationBall: Camera orbit control widget (bottom-right, above corner note). */
import type { RefObject } from 'react'
import * as Cesium from 'cesium'

type Props = {
  viewerRef: RefObject<Cesium.Viewer | null>
}

function rotate(viewer: Cesium.Viewer, headingDelta: number, pitchDelta: number) {
  const camera = viewer.scene.camera
  camera.rotate(Cesium.Cartesian3.UNIT_Z, headingDelta)
  if (pitchDelta !== 0) {
    camera.lookUp(pitchDelta)
  }
}

function resetCamera(viewer: Cesium.Viewer) {
  viewer.scene.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(103.8198, 1.3521, 25000),
    orientation: {
      heading: 0,
      pitch: Cesium.Math.toRadians(-60),
      roll: 0,
    },
  })
}

export default function NavigationBall({ viewerRef }: Props) {
  const step = Cesium.Math.toRadians(15)

  const handleKey = (headingDelta: number, pitchDelta: number) => {
    const viewer = viewerRef.current
    if (!viewer || viewer.isDestroyed()) return
    rotate(viewer, headingDelta, pitchDelta)
  }

  const handleReset = () => {
    const viewer = viewerRef.current
    if (!viewer || viewer.isDestroyed()) return
    resetCamera(viewer)
  }

  return (
    <div className="nav-ball" aria-label="Camera navigation">
      <button className="nav-btn nav-btn-n" onClick={() => handleKey(0, step)} title="Tilt up">▲</button>
      <button className="nav-btn nav-btn-w" onClick={() => handleKey(step, 0)} title="Rotate left">◀</button>
      <button className="nav-btn nav-btn-c" onClick={handleReset} title="Reset view">⌖</button>
      <button className="nav-btn nav-btn-e" onClick={() => handleKey(-step, 0)} title="Rotate right">▶</button>
      <button className="nav-btn nav-btn-s" onClick={() => handleKey(0, -step)} title="Tilt down">▼</button>
    </div>
  )
}
