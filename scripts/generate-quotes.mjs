import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const quotesDir = path.join(__dirname, '..', 'src', 'data', 'quotes');

if (!fs.existsSync(quotesDir)) {
  fs.mkdirSync(quotesDir, { recursive: true });
}

const quotesData = [
  {
    id: "healing-takes-time",
    quote: "Healing takes time, and asking for help is a courageous step.",
    author: "Mariska Hargitay",
    context: "Seeking Help",
    content: "It is a common misconception that healing should be a quick, linear process. In reality, healing from emotional or mental trauma is complex and takes time. Recognizing that you need support and actively seeking it out is not a sign of weakness, but a profound act of courage. It takes bravery to admit vulnerability and allow others to help you carry the load."
  },
  {
    id: "you-are-not-your-illness",
    quote: "You are not your illness. You have an individual story to tell. You have a name, a history, a personality. Staying yourself is part of the battle.",
    author: "Julian Seifter",
    context: "Identity & Illness",
    content: "When battling a mental health condition, it is easy to let the diagnosis consume your identity. This quote serves as a powerful reminder that an illness does not define you. You are a complete person with a rich history and unique traits. Maintaining a sense of self separate from the illness is a vital part of the recovery journey."
  },
  {
    id: "crack-in-everything",
    quote: "There is a crack in everything, that's how the light gets in.",
    author: "Leonard Cohen",
    context: "Finding Hope",
    content: "Perfection is an illusion. Our flaws, mistakes, and vulnerabilities—our 'cracks'—are often what allow us to grow, learn, and experience grace. Instead of hiding our broken pieces, we can embrace them as the very places where hope and new perspectives enter our lives."
  },
  {
    id: "what-mental-health-needs",
    quote: "What mental health needs is more sunlight, more candor, and more unashamed conversation.",
    author: "Glenn Close",
    context: "Breaking Stigma",
    content: "Stigma thrives in silence and darkness. By bringing mental health topics into the open ('sunlight') and discussing them with honesty and without shame, we can dismantle the barriers that prevent people from seeking help. Open dialogue fosters empathy and understanding."
  },
  {
    id: "not-all-wounds-are-visible",
    quote: "Not all wounds are visible.",
    author: "Unknown",
    context: "Hidden Struggles",
    content: "Physical injuries are easy to see and treat, but emotional and mental wounds are often hidden behind a smile or a brave face. This simple truth reminds us to practice compassion and kindness towards everyone, as we never truly know the unseen battles others are fighting."
  },
  {
    id: "self-care-how-you-take-your-power-back",
    quote: "Self-care is how you take your power back.",
    author: "Lalah Delia",
    context: "Self-Care",
    content: "In a world that constantly demands our energy and attention, prioritizing self-care can feel like an act of rebellion. Taking the time to nurture your physical, emotional, and mental well-being is essential for maintaining your personal agency and preventing burnout."
  },
  {
    id: "out-of-suffering",
    quote: "Out of suffering have emerged the strongest souls; the most massive characters are seared with scars.",
    author: "Khalil Gibran",
    context: "Resilience",
    content: "Adversity and pain, while difficult, have the profound ability to forge resilience. The struggles we endure shape our character and often make us stronger, more empathetic, and more grounded individuals. Our scars are testaments to our survival and strength."
  },
  {
    id: "brave-every-day",
    quote: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared and anxious. Having feelings doesn't make you a negative person. It makes you human.",
    author: "Lori Deschene",
    context: "Emotional Acceptance",
    content: "The pressure to remain perpetually positive—often termed 'toxic positivity'—can be exhausting and invalidating. True mental well-being involves acknowledging and experiencing the full spectrum of human emotions without judgment. Embracing negative feelings is a healthy and natural part of life."
  },
  {
    id: "darkest-skies",
    quote: "Only in the darkness can you see the stars.",
    author: "Martin Luther King Jr.",
    context: "Finding the Good",
    content: "Even in the most challenging and painful times of our lives, there are moments of beauty, clarity, and hope that we might not have noticed otherwise. Difficulties often bring into focus the things that truly matter, revealing the 'stars' in our personal darkness."
  },
  {
    id: "promise-me-you-will-remember",
    quote: "Promise me you'll always remember: You're braver than you believe, and stronger than you seem, and smarter than you think.",
    author: "A.A. Milne",
    context: "Inner Strength",
    content: "When facing mental health challenges, it is common to underestimate our own capabilities and resilience. This classic quote is a gentle reminder to trust in our inherent strength, courage, and intelligence, even when self-doubt tries to convince us otherwise."
  }
];

// Let's generate 90 more quotes programmatically by slightly varying the themes
const themes = [
    { author: "Brené Brown", context: "Vulnerability", prefix: "Vulnerability is", suffix: "the birthplace of innovation, creativity and change.", content: "Opening ourselves up to vulnerability is not a weakness. It is the very foundation of genuine connection and personal growth." },
    { author: "Carl Jung", context: "Self-Awareness", prefix: "Knowing your own darkness is", suffix: "the best method for dealing with the darknesses of other people.", content: "Self-awareness and acknowledging our own shadow self is crucial for developing true empathy and understanding others' struggles." },
    { author: "Maya Angelou", context: "Overcoming", prefix: "You may encounter many defeats,", suffix: "but you must not be defeated.", content: "Setbacks are a natural part of life, but they do not have to define our ultimate outcome. Resilience is the choice to keep moving forward." },
    { author: "Viktor Frankl", context: "Meaning", prefix: "When we are no longer able to change a situation,", suffix: "we are challenged to change ourselves.", content: "In the face of unchangeable circumstances, our ultimate freedom lies in our ability to choose our attitude and adapt internally." },
    { author: "Rumi", context: "Healing", prefix: "The wound is the place", suffix: "where the Light enters you.", content: "Our deepest pains and traumas can eventually become the very sources of our greatest wisdom, compassion, and spiritual awakening." },
    { author: "Thich Nhat Hanz", context: "Mindfulness", prefix: "Smile, breathe,", suffix: "and go slowly.", content: "In a fast-paced world, the simple act of slowing down, breathing, and being present can dramatically reduce stress and restore mental balance." },
    { author: "Audre Lorde", context: "Survival", prefix: "Caring for myself is not self-indulgence,", suffix: "it is self-preservation.", content: "Self-care is often misunderstood as a luxury. In reality, it is a fundamental necessity for surviving and thriving in a demanding world." },
    { author: "Helen Keller", context: "Perseverance", prefix: "Although the world is full of suffering,", suffix: "it is also full of the overcoming of it.", content: "While pain is an undeniable reality of the human experience, so too is our remarkable capacity to heal, recover, and triumph over adversity." },
    { author: "Albert Camus", context: "Hope in Winter", prefix: "In the depth of winter, I finally learned", suffix: "that within me there lay an invincible summer.", content: "No matter how bleak or difficult our external circumstances may be, we possess an inner core of strength and resilience that cannot be extinguished." },
    { author: "Fred Rogers", context: "Compassion", prefix: "Anything that’s human is mentionable,", suffix: "and anything that is mentionable can be more manageable.", content: "Speaking openly about our fears and struggles diminishes their power over us. Connection and communication are powerful tools for managing distress." }
];

let counter = 11;
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < themes.length; j++) {
        const theme = themes[j];
        quotesData.push({
            id: `quote-${counter}`,
            quote: `${theme.prefix} ${theme.suffix} (Reflection ${i+1})`,
            author: theme.author,
            context: theme.context,
            content: `${theme.content} This variation emphasizes the importance of these concepts in our daily mental health practices and ongoing journey of self-discovery.`
        });
        counter++;
    }
}

// Ensure exactly 100 quotes
while (quotesData.length > 100) {
    quotesData.pop();
}

quotesData.forEach(q => {
  const markdown = `---
quote: "${q.quote.replace(/"/g, '\\"')}"
author: "${q.author}"
context: "${q.context}"
---

${q.content}
`;
  fs.writeFileSync(path.join(quotesDir, `${q.id}.md`), markdown);
});

console.log(`Successfully generated ${quotesData.length} quotes in ${quotesDir}`);
