import Phaser from 'phaser'

export type MochiAnim = 'idle' | 'happy' | 'sad' | 'eat' | 'dance'

export class MochiScene extends Phaser.Scene {
  private mochi!: Phaser.GameObjects.Graphics
  private cx = 0
  private cy = 0
  private _evolution: 'baby' | 'child' | 'teen' | 'adult' = 'baby'
  private _animating = false
  private _idleTween: Phaser.Tweens.Tween | null = null
  private _danceTween: Phaser.Tweens.Tween | null = null

  constructor() {
    super({ key: 'MochiScene' })
  }

  set evolution(val: 'baby' | 'child' | 'teen' | 'adult') {
    if (this._evolution === val) return
    this._evolution = val
    if (this.mochi) {
      this.mochi.clear()
      this.drawBody()
    }
  }

  create() {
    this.cx = Number(this.game.config.width) / 2
    this.cy = Number(this.game.config.height) / 2 + 20
    this.mochi = this.add.graphics()
    this.drawBody()
    this.startIdleBreathe()
  }

  /* ===== Vẽ nhân vật ===== */

  private get sizeMultiplier(): number {
    const map = { baby: 1, child: 1.15, teen: 1.3, adult: 1.45 }
    return map[this._evolution]
  }

  private get bodyColor(): number {
    const map = { baby: 0xffe0b2, child: 0xffd9a8, teen: 0xffcc94, adult: 0xffbf80 }
    return map[this._evolution]
  }

  private get cheekColor(): number {
    const map = { baby: 0xffb3b3, child: 0xffa8a8, teen: 0xff9999, adult: 0xff8a8a }
    return map[this._evolution]
  }

  private drawBody() {
    const g = this.mochi
    const s = this.sizeMultiplier
    const cx = this.cx
    const cy = this._animating ? this.cy : this.cy
    const bw = 100 * s
    const bh = 80 * s

    g.clear()

    // Bóng đổ
    g.fillStyle(0x000000, 0.06)
    g.fillEllipse(cx, cy + bh * 0.5, bw * 0.8, 12 * s)

    // Thân
    g.fillStyle(this.bodyColor)
    g.fillEllipse(cx, cy, bw, bh)

    // Tai
    g.fillStyle(this.bodyColor)
    g.fillEllipse(cx - bw * 0.26, cy - bh * 0.3, bw * 0.22, bh * 0.35)
    g.fillEllipse(cx + bw * 0.26, cy - bh * 0.3, bw * 0.22, bh * 0.35)
    g.fillStyle(0xffcccb, 0.6)
    g.fillEllipse(cx - bw * 0.26, cy - bh * 0.28, bw * 0.12, bh * 0.2)
    g.fillEllipse(cx + bw * 0.26, cy - bh * 0.28, bw * 0.12, bh * 0.2)

    // Mắt
    const eyeY = cy - bh * 0.12
    const eyeR = 5 * s
    g.fillStyle(0x333333)
    g.fillCircle(cx - bw * 0.18, eyeY, eyeR)
    g.fillCircle(cx + bw * 0.18, eyeY, eyeR)
    // Highlight mắt
    g.fillStyle(0xffffff)
    g.fillCircle(cx - bw * 0.16, eyeY - eyeR * 0.4, eyeR * 0.4)
    g.fillCircle(cx + bw * 0.16, eyeY - eyeR * 0.4, eyeR * 0.4)

    // Má hồng
    g.fillStyle(this.cheekColor, 0.5)
    g.fillEllipse(cx - bw * 0.28, cy + bh * 0.08, bw * 0.14, bh * 0.1)
    g.fillEllipse(cx + bw * 0.28, cy + bh * 0.08, bw * 0.14, bh * 0.1)

    // Miệng cười
    g.lineStyle(2.5 * s, 0xcc6650)
    g.beginPath()
    g.arc(cx, cy + bh * 0.06, bw * 0.1, Phaser.Math.DegToRad(10), Phaser.Math.DegToRad(170), false)
    g.strokePath()

    // Chân
    g.fillStyle(0xffcc80)
    g.fillEllipse(cx - bw * 0.2, cy + bh * 0.45, bw * 0.18, bh * 0.12)
    g.fillEllipse(cx + bw * 0.2, cy + bh * 0.45, bw * 0.18, bh * 0.12)

    // Áo choàng nhỏ
    g.fillStyle(0xb3a0ff, 0.3)
    g.fillEllipse(cx, cy + bh * 0.38, bw * 0.6, bh * 0.16)
    g.fillStyle(0xc5b8ff, 0.25)
    g.fillEllipse(cx, cy + bh * 0.38, bw * 0.55, bh * 0.14)
  }

  /* ===== Animation helpers ===== */

  private startIdleBreathe() {
    if (this._idleTween) this._idleTween.destroy()
    this._idleTween = this.tweens.add({
      targets: this,
      cy: this.cy - 6,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      onUpdate: () => {
        if (!this._animating) {
          this.mochi.clear()
          this.drawBody()
        }
      },
    })
  }

  private stopCurrentAnim() {
    this._animating = false
    if (this._danceTween) {
      this._danceTween.destroy()
      this._danceTween = null
    }
    this.tweens.killTweensOf(this)
    this.mochi.clear()
    this.cy = Number(this.game.config.height) / 2 + 20
    this.drawBody()
    this.startIdleBreathe()
  }

  playHappy() {
    this.stopCurrentAnim()
    this._animating = true
    this.tweens.add({
      targets: this,
      cy: this.cy - 40,
      duration: 250,
      yoyo: true,
      ease: 'Back.easeOut',
      onYoyo: () => {
        this.mochi.clear()
        this.drawBody()
      },
      onComplete: () => this.stopCurrentAnim(),
    })
  }

  playSad() {
    this.stopCurrentAnim()
    this._animating = true
    // Rung nhẹ + giọt nước mắt
    this.tweens.add({
      targets: this,
      x: { from: -3, to: 3 },
      duration: 80,
      repeat: 5,
      yoyo: true,
      onComplete: () => this.stopCurrentAnim(),
    })
    // Giọt nước mắt
    const tear = this.add.graphics()
    tear.fillStyle(0x4fc3f7, 0.6)
    tear.fillEllipse(this.cx - 18, this.cy - 15, 8, 12)
    tear.fillEllipse(this.cx + 18, this.cy - 15, 8, 12)
    this.tweens.add({
      targets: tear,
      y: 20,
      alpha: 0,
      duration: 1000,
      delay: 200,
      onComplete: () => tear.destroy(),
    })
  }

  playEat() {
    this.stopCurrentAnim()
    this._animating = true
    const bw = 100 * this.sizeMultiplier
    const bh = 80 * this.sizeMultiplier
    // Nhấp nháy miệng
    let chewCount = 0
    const chewTimer = this.time.addEvent({
      delay: 150,
      repeat: 5,
      callback: () => {
        chewCount++
        this.mochi.clear()
        this.drawBody()
        const g = this.mochi
        if (chewCount % 2 === 0) {
          g.fillStyle(0xcc6650)
          g.fillEllipse(this.cx, this.cy + bh * 0.08, bw * 0.15, bh * 0.06)
        } else {
          g.lineStyle(2.5 * this.sizeMultiplier, 0xcc6650)
          g.beginPath()
          g.arc(this.cx, this.cy + bh * 0.06, bw * 0.1, Phaser.Math.DegToRad(10), Phaser.Math.DegToRad(170), false)
          g.strokePath()
        }
      },
    })
    // Nảy lên
    this.tweens.add({
      targets: this,
      cy: this.cy - 12,
      duration: 150,
      yoyo: true,
      onComplete: () => {
        chewTimer.destroy()
        this.stopCurrentAnim()
      },
    })
  }

  playDance() {
    this.stopCurrentAnim()
    this._animating = true
    this._danceTween = this.tweens.add({
      targets: this,
      x: { from: -12, to: 12 },
      duration: 200,
      yoyo: true,
      repeat: 5,
      ease: 'Sine.easeInOut',
      onUpdate: () => {
        this.mochi.clear()
        this.drawBody()
      },
      onComplete: () => this.stopCurrentAnim(),
    })
    // Nảy theo
    this.tweens.add({
      targets: this,
      cy: this.cy - 10,
      duration: 400,
      yoyo: true,
      repeat: 2,
      ease: 'Bounce.easeOut',
    })
  }
}
