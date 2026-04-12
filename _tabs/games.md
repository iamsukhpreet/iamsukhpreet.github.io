---
layout: page
title: Games
icon: fas fa-puzzle-piece
order: 6
---

## {{ site.data.games.section_title }}

{{ site.data.games.section_intro }}

### How To Add Your Own Game or Activity

Edit `_data/games.yml` and add another item under `activities` using the same structure.

Required fields:
- `title`
- `type`
- `goal`
- `duration`
- `audience`
- `steps`

Optional fields:
- `materials`
- `therapist_notes`
- `cta_label`
- `cta_url`

---

{% for activity in site.data.games.activities %}
### {{ activity.title }}

**Type:** {{ activity.type }}  
**Goal:** {{ activity.goal }}  
**Duration:** {{ activity.duration }}  
**Audience:** {{ activity.audience }}

{% if activity.materials and activity.materials.size > 0 %}
**Materials:**
{% for item in activity.materials %}
- {{ item }}
{% endfor %}
{% endif %}

**Steps:**
{% for step in activity.steps %}
- {{ step }}
{% endfor %}

{% if activity.therapist_notes %}
**Therapist Notes:** {{ activity.therapist_notes }}
{% endif %}

{% if activity.cta_label and activity.cta_url %}
[{{ activity.cta_label }}]({{ activity.cta_url }})
{% endif %}

---
{% endfor %}
