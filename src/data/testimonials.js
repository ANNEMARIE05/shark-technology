export const defaultTestimonials = [
    { id: '1', name: 'ADAMA K.', role: 'Responsable informatique', text: "Je cherchais une formation sérieuse en protection des infrastructures réseau. La formation proposée par Shark Technology m'a permis de comprendre les vulnérabilités, les techniques d'attaque et surtout comment y répondre efficacement.", avatar: 'https://images.unsplash.com/photo-1542903660-f655848bb09a?auto=format&fit=crop&q=80&w=200', stars: 5 },
    { id: '2', name: 'SYLVIA N.', role: 'Administratrice Systèmes', text: "J'avais déjà un bagage en informatique, mais je voulais passer au niveau supérieur en hacking éthique. Le cursus 'Ethical Hacking' de Shark m'a donné les outils et la confiance nécessaires. Le suivi est rigoureux, le support toujours disponible — je recommande à tous ceux qui veulent faire carrière dans la cyber.", avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', stars: 5 },
    { id: '3', name: 'MICHEL D.', role: 'Ingénieur Réseau', text: "J'ai suivi la formation de sécurité cloud et aujourd'hui je suis expert cloud security certifié.", avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', stars: 5 },
]

export const defaultTestimonialsEn = [
    { id: '1', name: 'ADAMA K.', role: 'IT Manager', text: "I was looking for serious training in network infrastructure protection. The training offered by Shark Technology helped me understand vulnerabilities, attack techniques and above all how to respond effectively.", avatar: 'https://images.unsplash.com/photo-1542903660-f655848bb09a?auto=format&fit=crop&q=80&w=200', stars: 5 },
    { id: '2', name: 'SYLVIA N.', role: 'Systems Administrator', text: "I already had a background in IT, but I wanted to take it to the next level in ethical hacking. Shark's Ethical Hacking course gave me the tools and confidence I needed. The follow-up is rigorous, support is always available — I recommend it to anyone looking to build a career in cybersecurity.", avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', stars: 5 },
    { id: '3', name: 'MICHEL D.', role: 'Network Engineer', text: "I took the cloud security training and I am now a certified cloud security expert.", avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', stars: 5 },
]

const KEY = 'shark_testimonials'

export function getStoredTestimonials() {
    try {
        const raw = localStorage.getItem(KEY)
        if (raw) {
            const data = JSON.parse(raw)
            if (Array.isArray(data) && data.length) return data
        }
    } catch (_) {}
    return null
}

/** @param {'fr'|'en'} [lang] - Language for default testimonials when none stored. Omit for dashboard (uses FR). */
export function getTestimonials(lang) {
    const stored = getStoredTestimonials()
    if (stored) return stored
    return lang === 'en' ? defaultTestimonialsEn : defaultTestimonials
}

export function setTestimonials(list) {
    localStorage.setItem(KEY, JSON.stringify(list))
    window.dispatchEvent(new Event('shark-dashboard-update'))
}
