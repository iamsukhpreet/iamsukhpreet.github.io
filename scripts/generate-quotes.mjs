import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const quotesDir = path.join(__dirname, '..', 'src', 'data', 'quotes');

if (!fs.existsSync(quotesDir)) {
  fs.mkdirSync(quotesDir, { recursive: true });
}

// 20 Trending Tags + "random"
const trendingTags = [
    "work", "childhood", "relationships", "self-care", "resilience", 
    "mindfulness", "hope", "identity", "healing", "vulnerability", 
    "courage", "growth", "acceptance", "stigma", "inner-peace", 
    "motivation", "strength", "balance", "perspective", "gratitude"
];

const themes = [
    { author: "Brené Brown", context: "Vulnerability", prefix: "Vulnerability is", suffix: "the birthplace of innovation, creativity and change.", content: "Opening ourselves up to vulnerability is not a weakness. It is the very foundation of genuine connection and personal growth.", tags: ["vulnerability", "courage", "growth"] },
    { author: "Carl Jung", context: "Self-Awareness", prefix: "Knowing your own darkness is", suffix: "the best method for dealing with the darknesses of other people.", content: "Self-awareness and acknowledging our own shadow self is crucial for developing true empathy and understanding others' struggles.", tags: ["identity", "inner-peace", "growth"] },
    { author: "Maya Angelou", context: "Overcoming", prefix: "You may encounter many defeats,", suffix: "but you must not be defeated.", content: "Setbacks are a natural part of life, but they do not have to define our ultimate outcome. Resilience is the choice to keep moving forward.", tags: ["resilience", "motivation", "strength"] },
    { author: "Viktor Frankl", context: "Meaning", prefix: "When we are no longer able to change a situation,", suffix: "we are challenged to change ourselves.", content: "In the face of unchangeable circumstances, our ultimate freedom lies in our ability to choose our attitude and adapt internally.", tags: ["perspective", "acceptance", "growth"] },
    { author: "Rumi", context: "Healing", prefix: "The wound is the place", suffix: "where the Light enters you.", content: "Our deepest pains and traumas can eventually become the very sources of our greatest wisdom, compassion, and spiritual awakening.", tags: ["healing", "hope", "perspective"] },
    { author: "Thich Nhat Hanh", context: "Mindfulness", prefix: "Smile, breathe,", suffix: "and go slowly.", content: "In a fast-paced world, the simple act of slowing down, breathing, and being present can dramatically reduce stress and restore mental balance.", tags: ["mindfulness", "inner-peace", "balance"] },
    { author: "Audre Lorde", context: "Survival", prefix: "Caring for myself is not self-indulgence,", suffix: "it is self-preservation.", content: "Self-care is often misunderstood as a luxury. In reality, it is a fundamental necessity for surviving and thriving in a demanding world.", tags: ["self-care", "work", "balance"] },
    { author: "Helen Keller", context: "Perseverance", prefix: "Although the world is full of suffering,", suffix: "it is also full of the overcoming of it.", content: "While pain is an undeniable reality of the human experience, so too is our remarkable capacity to heal, recover, and triumph over adversity.", tags: ["resilience", "hope", "healing"] },
    { author: "Albert Camus", context: "Hope in Winter", prefix: "In the depth of winter, I finally learned", suffix: "that within me there lay an invincible summer.", content: "No matter how bleak or difficult our external circumstances may be, we possess an inner core of strength and resilience that cannot be extinguished.", tags: ["hope", "strength", "inner-peace"] },
    { author: "Fred Rogers", context: "Compassion", prefix: "Anything that’s human is mentionable,", suffix: "and anything that is mentionable can be more manageable.", content: "Speaking openly about our fears and struggles diminishes their power over us. Connection and communication are powerful tools for managing distress.", tags: ["stigma", "childhood", "relationships"] },
    { author: "Socrates", context: "Wisdom", prefix: "The unexamined life is", suffix: "not worth living.", content: "Deep self-reflection and questioning our own beliefs are essential for a life of purpose and authenticity.", tags: ["identity", "growth", "perspective"] },
    { author: "Lao Tzu", context: "Harmony", prefix: "Nature does not hurry,", suffix: "yet everything is accomplished.", content: "Finding our natural rhythm and resisting the urge to force outcomes can lead to a more balanced and peaceful existence.", tags: ["mindfulness", "balance", "inner-peace"] },
    { author: "Marcus Aurelius", context: "Stoicism", prefix: "Very little is needed to make a happy life;", suffix: "it is all within yourself, in your way of thinking.", content: "Our internal mindset and perceptions have a far greater impact on our well-being than any external circumstances.", tags: ["acceptance", "perspective", "strength"] },
    { author: "Confucius", context: "Persistence", prefix: "It does not matter how slowly you go", suffix: "as long as you do not stop.", content: "Consistent, gradual progress is often more sustainable and effective than short bursts of effort followed by burnout.", tags: ["resilience", "motivation", "growth"] },
    { author: "Ralph Waldo Emerson", context: "Self-Reliance", prefix: "To be yourself in a world that is constantly trying to make you something else", suffix: "is the greatest accomplishment.", content: "Authenticity and self-acceptance are powerful tools for resisting external pressures and maintaining mental integrity.", tags: ["identity", "courage", "acceptance"] },
    { author: "Eleanor Roosevelt", context: "Courage", prefix: "You must do the thing you think", suffix: "you cannot do.", content: "Facing our fears directly is the most effective way to build genuine self-confidence and expand our capabilities.", tags: ["courage", "strength", "motivation"] },
    { author: "Dalai Lama", context: "Happiness", prefix: "Happiness is not something ready made.", suffix: "It comes from your own actions.", content: "True contentment is a byproduct of how we choose to live, interact with others, and manage our own minds.", tags: ["gratitude", "relationships", "inner-peace"] },
    { author: "Mahatma Gandhi", context: "Change", prefix: "Be the change that you wish to see", suffix: "in the world.", content: "Personal transformation is often the most effective way to inspire and facilitate broader positive change in our communities.", tags: ["motivation", "growth", "courage"] },
    { author: "Oscar Wilde", context: "Authenticity", prefix: "Be yourself;", suffix: "everyone else is already taken.", content: "Embracing your unique traits and quirks is essential for mental health and genuine self-expression.", tags: ["identity", "acceptance", "childhood"] },
    { author: "Henry David Thoreau", context: "Simplicity", prefix: "Our life is frittered away by detail.", suffix: "Simplify, simplify.", content: "Reducing the complexity and distractions in our lives allows us to focus on what truly matters and find inner calm.", tags: ["mindfulness", "balance", "inner-peace"] }
];

const quotesData = [];
let counter = 1;

// Generate 1000 quotes
for (let i = 0; i < 50; i++) {
    for (let j = 0; j < themes.length; j++) {
        const theme = themes[j];
        const tags = [...new Set([...theme.tags, "random"])];
        
        // Add some variety to the quote and content
        const quoteVariation = i === 0 ? `${theme.prefix} ${theme.suffix}` : `${theme.prefix} ${theme.suffix} (Insight ${i + 1})`;
        const contentVariation = i === 0 ? theme.content : `${theme.content} As we explore the depths of ${theme.context.toLowerCase()}, we find new layers of meaning in our daily lives. This reflection ${i + 1} encourages us to look closer at our own journey.`;

        quotesData.push({
            id: `quote-${counter}`,
            quote: quoteVariation,
            author: theme.author,
            context: theme.context,
            content: contentVariation,
            tags: tags
        });
        counter++;
        if (counter > 1000) break;
    }
    if (counter > 1000) break;
}

// Clean directory first to remove old quotes
if (fs.existsSync(quotesDir)) {
    fs.readdirSync(quotesDir).forEach(file => {
        if (file.endsWith('.md')) {
            fs.unlinkSync(path.join(quotesDir, file));
        }
    });
}

quotesData.forEach(q => {
  const markdown = `---
quote: "${q.quote.replace(/"/g, '\\"')}"
author: "${q.author}"
context: "${q.context}"
tags: ${JSON.stringify(q.tags)}
---

${q.content}
`;
  fs.writeFileSync(path.join(quotesDir, `${q.id}.md`), markdown);
});

console.log(`Successfully generated ${quotesData.length} quotes in ${quotesDir}`);
