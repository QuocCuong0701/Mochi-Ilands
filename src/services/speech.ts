export function speak(text: string, lang = 'en-US'): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error('SpeechSynthesis not supported'))
      return
    }
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.9
    utterance.pitch = 1.1
    utterance.onend = () => resolve()
    utterance.onerror = (e) => reject(e)
    window.speechSynthesis.speak(utterance)
  })
}

export function startListening(lang = 'en-US'): Promise<string> {
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
