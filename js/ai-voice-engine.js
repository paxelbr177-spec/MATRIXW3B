/**
 * AI Voice Engine with Text-to-Speech & Avatar Synchronization
 * Synthesizes voice audio for AI responses and syncs lip movements to Matrix Avatar
 */

class AIVoiceEngine {
  constructor() {
    this.synth = window.speechSynthesis;
    this.isMuted = false;
    this.currentUtterance = null;
    this.voices = [];
    
    this.voiceToggleBtn = document.getElementById('voice-toggle-btn');
    this.init();
  }

  init() {
    if (!('speechSynthesis' in window)) {
      console.warn('[AI Voice Engine] Web Speech API not supported in this browser.');
      return;
    }

    this.loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }

    if (this.voiceToggleBtn) {
      this.voiceToggleBtn.addEventListener('click', () => this.toggleMute());
    }
  }

  loadVoices() {
    this.voices = this.synth.getVoices();
  }

  getBestVoice(lang = 'es') {
    if (!this.voices || this.voices.length === 0) {
      this.voices = this.synth.getVoices();
    }

    const primaryCode = lang === 'pt' ? 'pt-BR' : (lang === 'en' ? 'en-US' : 'es-ES');
    const prefixCode = lang === 'pt' ? 'pt' : (lang === 'en' ? 'en' : 'es');

    // Filter all matching voices strictly
    let matchingVoices = this.voices.filter(v => 
      v.lang.startsWith(primaryCode) || 
      v.lang.startsWith(prefixCode) ||
      (lang === 'es' && (v.name.toLowerCase().includes('spanish') || v.name.toLowerCase().includes('español'))) ||
      (lang === 'pt' && (v.name.toLowerCase().includes('portuguese') || v.name.toLowerCase().includes('português')))
    );

    let selected = null;
    if (matchingVoices.length > 0) {
      // Prefer Google or Microsoft voices, else take the first valid match
      selected = matchingVoices.find(v => v.name.includes('Google')) || 
                 matchingVoices.find(v => v.name.includes('Microsoft')) || 
                 matchingVoices[0];
    } else {
      // Fallback only if absolutely no language match found
      selected = this.voices.length > 0 ? this.voices[0] : null;
    }
    
    return selected;
  }

  speak(text, lang = 'es') {
    if (this.isMuted || !('speechSynthesis' in window)) return;

    // Stop any ongoing speech
    this.stop();

    // Clean markdown symbols from text before speaking
    const cleanText = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/[#_*~]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.voice = this.getBestVoice(lang);
    utterance.rate = 1.05; // Slightly crisp pacing
    utterance.pitch = 0.95; // Deep cybernetic voice pitch

    utterance.onstart = () => {
      console.log('[AI Voice Engine] Speaking started...');
      if (window.matrixAvatarInstance) {
        window.matrixAvatarInstance.setSpeaking(true);
      }
    };

    utterance.onboundary = (e) => {
      if (window.matrixAvatarInstance) {
        window.matrixAvatarInstance.talkVolume = Math.random() * 0.9 + 0.1;
      }
    };

    utterance.onend = () => {
      console.log('[AI Voice Engine] Speaking finished.');
      if (window.matrixAvatarInstance) {
        window.matrixAvatarInstance.setSpeaking(false);
      }
    };

    utterance.onerror = (e) => {
      console.warn('[AI Voice Engine] Speech error:', e);
      if (window.matrixAvatarInstance) {
        window.matrixAvatarInstance.setSpeaking(false);
      }
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    if (window.matrixAvatarInstance) {
      window.matrixAvatarInstance.setSpeaking(false);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stop();
      if (this.voiceToggleBtn) {
        this.voiceToggleBtn.innerHTML = '🔇 <span data-i18n="voice_off">Voz Desactivada</span>';
        this.voiceToggleBtn.classList.remove('active');
      }
    } else {
      if (this.voiceToggleBtn) {
        this.voiceToggleBtn.innerHTML = '🔊 <span data-i18n="voice_on">Voz Activada</span>';
        this.voiceToggleBtn.classList.add('active');
      }
    }
  }
}

window.initAIVoiceEngine = function() {
  return new AIVoiceEngine();
};
