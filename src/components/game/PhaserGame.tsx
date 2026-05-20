import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import Phaser from 'phaser'
import { MochiScene, type MochiAnim } from '../../game/MochiScene'

// Handle expose ra ngoài để component cha gọi animation + set evolution
export interface PhaserGameHandle {
  play: (anim: MochiAnim) => void
  setEvolution: (val: 'baby' | 'child' | 'teen' | 'adult') => void
}

const PhaserGame = forwardRef<PhaserGameHandle, { width?: number; height?: number }>(
  function PhaserGame({ width = 200, height = 200 }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const gameRef = useRef<Phaser.Game | null>(null)
    const sceneRef = useRef<MochiScene | null>(null)

    useImperativeHandle(ref, () => ({
      play(anim: MochiAnim) {
        if (!sceneRef.current) return
        switch (anim) {
          case 'happy': sceneRef.current.playHappy(); break
          case 'sad': sceneRef.current.playSad(); break
          case 'eat': sceneRef.current.playEat(); break
          case 'dance': sceneRef.current.playDance(); break
        }
      },
      setEvolution(val) {
        if (sceneRef.current) sceneRef.current.evolution = val
      },
    }), [])

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

      gameRef.current.events.on('ready', () => {
        sceneRef.current = gameRef.current?.scene.getScene('MochiScene') as MochiScene
      })

      return () => {
        if (gameRef.current) {
          gameRef.current.destroy(true)
          gameRef.current = null
          sceneRef.current = null
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
)

export default PhaserGame
