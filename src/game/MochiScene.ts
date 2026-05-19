import Phaser from 'phaser'

export class MochiScene extends Phaser.Scene {
  private mochi!: Phaser.GameObjects.Graphics
  private cx = 0
  private cy = 0

  constructor() {
    super({ key: 'MochiScene' })
  }

  create() {
    this.cx = Number(this.game.config.width) / 2
    this.cy = Number(this.game.config.height) / 2 + 20

    this.mochi = this.add.graphics()
    this.drawIdle()

    this.tweens.add({
      targets: this,
      cy: this.cy - 8,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      onUpdate: () => {
        this.mochi.clear()
        this.drawIdle()
      },
    })
  }

  private drawIdle() {
    this.drawMochi(this.cx, this.cy, 0x333333, 0xffffff)
  }

  private drawMochi(x: number, y: number, eyeColor: number, highlightColor: number) {
    const g = this.mochi

    g.fillStyle(0xffe0b2)
    g.fillEllipse(x, y, 100, 80)

    g.fillStyle(0xffcc80)
    g.fillEllipse(x - 25, y - 20, 20, 25)
    g.fillEllipse(x + 25, y - 20, 20, 25)

    g.fillStyle(eyeColor)
    g.fillCircle(x - 25, y - 22, 5)
    g.fillCircle(x + 25, y - 22, 5)

    g.fillStyle(highlightColor)
    g.fillCircle(x - 27, y - 24, 2)
    g.fillCircle(x + 23, y - 24, 2)

    g.fillStyle(0xff8a80)
    g.fillEllipse(x, y + 5, 16, 10)

    g.fillStyle(0xffab91)
    g.fillEllipse(x, y + 13, 20, 8)

    g.fillStyle(0xb3a0ff)
    g.fillEllipse(x, y + 30, 60, 12)
    g.setAlpha(0.3)
    g.fillStyle(0xc5b8ff)
    g.fillEllipse(x, y + 30, 60, 12)
    g.setAlpha(1)
  }

  playHappy() {
    this.tweens.add({
      targets: this,
      cy: this.cy - 40,
      duration: 300,
      yoyo: true,
      ease: 'Bounce.easeOut',
    })
  }

  playSad() {
    const g = this.add.graphics()
    g.fillStyle(0x4fc3f7, 0.5)
    g.fillEllipse(this.cx, this.cy + 30, 60, 15)

    this.tweens.add({
      targets: g,
      alpha: 0,
      duration: 1000,
      delay: 500,
      onComplete: () => g.destroy(),
    })
  }
}
