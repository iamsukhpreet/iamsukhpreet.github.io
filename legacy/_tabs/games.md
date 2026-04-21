---
layout: page
title: Games
icon: fas fa-puzzle-piece
order: 6
---

{% include language-toggle.html %}

## {{ site.data.games.section_title }}

<p data-lang="en">{{ site.data.games.section_intro }}</p>
<p data-lang="hi">इस सेक्शन में आप काउंसलिंग के लिए मनोवैज्ञानिक गेम्स और गतिविधियाँ साझा कर सकते हैं।</p>

---

{% for activity in site.data.games.activities %}
### {{ activity.title }}

<span data-lang="en"><strong>Type:</strong></span><span data-lang="hi"><strong>प्रकार:</strong></span> {{ activity.type }}  
<span data-lang="en"><strong>Goal:</strong></span><span data-lang="hi"><strong>उद्देश्य:</strong></span> {{ activity.goal }}  
<span data-lang="en"><strong>Duration:</strong></span><span data-lang="hi"><strong>समय:</strong></span> {{ activity.duration }}  
<span data-lang="en"><strong>Audience:</strong></span><span data-lang="hi"><strong>किसके लिए:</strong></span> {{ activity.audience }}

{% if activity.materials and activity.materials.size > 0 %}
<span data-lang="en"><strong>Materials:</strong></span>
<span data-lang="hi"><strong>सामग्री:</strong></span>
{% for item in activity.materials %}
- {{ item }}
{% endfor %}
{% endif %}

<span data-lang="en"><strong>Steps:</strong></span>
<span data-lang="hi"><strong>कदम:</strong></span>
{% for step in activity.steps %}
- {{ step }}
{% endfor %}

{% if activity.therapist_notes %}
<span data-lang="en"><strong>Therapist Notes:</strong></span>
<span data-lang="hi"><strong>थेरेपिस्ट नोट्स:</strong></span> {{ activity.therapist_notes }}
{% endif %}

{% if activity.cta_label and activity.cta_url %}
[{{ activity.cta_label }}]({{ activity.cta_url }})
{% endif %}

---
{% endfor %}

{% include crisis-support.html %}
