import { TextToSpeech } from '@capacitor-community/text-to-speech'

// ====== Native TTS (ưu tiên) ======
let nativeVoiceIndex: number | undefined
let nativeReady: boolean | undefined

// Khởi tạo native TTS: kiểm tra khả dụng, tìm giọng nữ en-US
const initNativeTTS = async (): Promise<boolean> => {
  try {
    const { voices } = await TextToSpeech.getSupportedVoices()
    const idx = voices.findIndex(
      (v) => v.lang.startsWith('en') && /female/i.test(v.name),
    )
    if (idx >= 0) nativeVoiceIndex = idx
    return true
  } catch {
    return false
  }
}

// Đọc bằng native TTS (Capacitor), fallback Web Speech API nếu không được
export const speak = async (text: string, lang = 'en-US'): Promise<void> => {
  // Thử native TTS trước
  if (nativeReady === undefined) nativeReady = await initNativeTTS()
  if (nativeReady) {
    try {
      await TextToSpeech.speak({
        text,
        lang,
        rate: 0.7,              // Chậm cho trẻ em
        pitch: 1.4,             // Cao hơn, thân thiện
        volume: 1.0,
        voice: nativeVoiceIndex,// undefined = giọng mặc định (thường là nữ)
      })
      return
    } catch {
      // Native thất bại → fallback Web Speech
    }
  }
  // Fallback: Web Speech API
  await speakWeb(text, lang)
}

// ====== Web Speech API (fallback + dev browser) ======
let cachedVoice: SpeechSynthesisVoice | null | undefined

const waitForVoices = (): Promise<SpeechSynthesisVoice[]> =>
  new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) { resolve(voices); return }
    window.speechSynthesis.onvoiceschanged = () => {
      resolve(window.speechSynthesis.getVoices())
      window.speechSynthesis.onvoiceschanged = null
    }
  })

const pickFemaleVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined =>
  voices.find((v) => v.name === 'Microsoft Zira - English (United States)') ||
  voices.find((v) => v.name === 'Google US English') ||
  voices.find((v) => /female|UK\s*Female/i.test(v.name)) ||
  voices.find((v) => v.lang === 'en-US' && /female/i.test(v.name)) ||
  voices.find((v) => v.lang.startsWith('en') && v.name.includes('Female'))

const speakWeb = async (text: string, lang = 'en-US'): Promise<void> => {
  if (!window.speechSynthesis) throw new Error('SpeechSynthesis not supported')
  if (cachedVoice === undefined) {
    const voices = await waitForVoices()
    cachedVoice = pickFemaleVoice(voices) ?? null
  }
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.6
    utterance.pitch = 1.3
    if (cachedVoice) utterance.voice = cachedVoice
    utterance.onend = () => resolve()
    utterance.onerror = (e) => reject(e)
    window.speechSynthesis.speak(utterance)
  })
}

// Lắng nghe giọng nói qua Web Speech API
export const startListening = (lang = 'en-US'): Promise<string> => {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  if (!SpeechRecognition) {
    return Promise.reject(new Error('SpeechRecognition not supported'))
  }
  return new Promise((resolve, reject) => {
    const recognition = new SpeechRecognition()
    recognition.lang = lang
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.onresult = (e: any) => resolve(e.results[0][0].transcript)
    recognition.onerror = (e: any) => reject(e)
    recognition.start()
  })
}
