import { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { MochiScene } from '../../game/MochiScene'

export default function PhaserGame({ width = 200, height = 200 }: { width?: number; height?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (gameRef.current || !containerRef.current) return

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width,
      height,
      parent: containerRef.current,
      transparent: true,
      scene: [MochiScene],
      scale: {
        mode: Phaser.Scale.NONE,
      },
      audio: {
        noAudio: true,
      },
    }

    gameRef.current = new Phaser.Game(config)

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [width, height])

  return (
    <div
      ref={containerRef}
      style={{ width, height, pointerEvents: 'none' }}
    />
  )
}
