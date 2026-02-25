import { articlesEn } from './articlesEn'

export const articles = [
    {
        slug: "ia-cybersecurite-allie-ou-menace",
        title: "L'IA dans la Cybersécurité : Allié ou Menace ?",
        category: "Technologie",
        date: "24 Fév 2026",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        excerpt: "Exploration des usages de l'intelligence artificielle pour renforcer la sécurité des systèmes.",
        featured: true,
        author: "Shark Tech",
        content: `
L'intelligence artificielle transforme la cybersécurité : elle permet de détecter des menaces en temps réel, d'automatiser la réponse aux incidents et d'anticiper les attaques. Mais elle peut aussi être utilisée par des acteurs malveillants pour concevoir des attaques plus sophistiquées.

Dans cet article, nous explorons les deux faces de la médaille : comment l'IA renforce la défense (détection d'anomalies, analyse de logs, orchestration) et quels risques nouveaux elle introduit (deepfakes, phishing automatisé, évasion des contrôles). Nous donnons des pistes concrètes pour intégrer l'IA dans votre stratégie de sécurité tout en restant vigilant.
        `.trim(),
    },
    {
        slug: "top-5-certifications-it-2026",
        title: "Top 5 des certifications IT en 2026",
        category: "Carrière",
        date: "20 Fév 2026",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
        excerpt: "Les certifications les plus demandées pour booster votre carrière.",
        featured: false,
        author: "Shark Tech",
        content: `
CompTIA Security+, CISSP, CCNA, Linux LPIC-1 et CEH restent en tête des certifications les plus valorisées par les employeurs en 2026. Nous détaillons pour chacune : le public cible, le coût, la durée de validité et les rôles typiques auxquels elles mènent.

Que vous soyez débutant ou déjà en poste, une certification bien choisie peut accélérer votre évolution. Nous vous aidons à prioriser selon votre profil et vos objectifs (réseau, sécurité, cloud, exploitation).
        `.trim(),
    },
    {
        slug: "securiser-son-cloud-bonnes-pratiques",
        title: "Sécuriser son Cloud : Les bonnes pratiques",
        category: "Cloud",
        date: "15 Fév 2026",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
        excerpt: "Checklist et recommandations pour un déploiement cloud sécurisé.",
        featured: false,
        author: "Shark Tech",
        content: `
Un déploiement cloud réussi repose sur la sécurité dès la conception : identité et accès (IAM), chiffrement des données au repos et en transit, segmentation réseau et journalisation centralisée. Nous passons en revue une checklist opérationnelle applicable à AWS, Azure et GCP.

Nous abordons aussi la conformité (RGPD, ISO 27001) et les pièges courants (configurations par défaut trop ouvertes, clés exposées, absence de politique de rotation). Des bonnes pratiques simples peuvent réduire drastiquement la surface d'attaque.
        `.trim(),
    },
    {
        slug: "guide-pentesting-debutants",
        title: "Le guide du Pentesting pour débutants",
        category: "Sécurité",
        date: "10 Fév 2026",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
        excerpt: "Premiers pas en test d'intrusion : méthodologie et outils.",
        featured: false,
        author: "Shark Tech",
        content: `
Le pentest (test d'intrusion) vise à identifier les vulnérabilités avant qu'un attaquant ne les exploite. Nous présentons les phases classiques : reconnaissance, scan, exploitation, post-exploitation et rapport. Chaque phase est illustrée avec des outils courants (Nmap, Burp Suite, Metasploit) dans un cadre légal et éthique.

Nous insistons sur l'importance du périmètre défini et de l'autorisation écrite, ainsi que sur la rédaction d'un rapport actionnable pour les équipes techniques et la direction. Idéal pour une première approche avant de se former en profondeur (ex. certification Ethical Hacking).
        `.trim(),
    },
]

const ARTICLES_KEY = 'shark_articles'

function getStoredArticles() {
    try {
        const raw = localStorage.getItem(ARTICLES_KEY)
        if (raw) {
            const data = JSON.parse(raw)
            if (Array.isArray(data) && data.length) return data
        }
    } catch (_) {}
    return null
}

/** @param {'fr'|'en'} [lang] - Language; if not provided, uses French list (stored or default). */
export function getArticles(lang) {
    const stored = getStoredArticles()
    if (stored) return stored
    return lang === 'en' ? articlesEn : articles
}

/** @param {string} slug - Article slug. @param {'fr'|'en'} [lang] - Language for default lists. */
export const getArticleBySlug = (slug, lang) => getArticles(lang).find((a) => a.slug === slug)
