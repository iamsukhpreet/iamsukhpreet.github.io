---
layout: page
title: Self-Check Tools
icon: fas fa-clipboard-list
order: 7
---

{% include language-toggle.html %}

## <span data-lang="en">Free Self-Check Tools</span><span data-lang="hi">मुफ़्त सेल्फ-चेक टूल्स</span>

<p data-lang="en">Use these quick non-diagnostic check-ins to understand your current stress or anxiety level. If your score is high, book a session for personalized support.</p>
<p data-lang="hi">अपने वर्तमान तनाव या चिंता स्तर को समझने के लिए ये त्वरित (गैर-नैदानिक) सेल्फ-चेक उपयोग करें। यदि स्कोर अधिक हो, तो व्यक्तिगत सहायता के लिए सेशन बुक करें।</p>

### <span data-lang="en">1) Stress Check (Last 2 Weeks)</span><span data-lang="hi">1) तनाव जांच (पिछले 2 सप्ताह)</span>

<form id="stress-check-form" class="self-check-form">
  <ol>
    <li>
      <label for="s1"><span data-lang="en">I felt mentally exhausted at the end of the day.</span><span data-lang="hi">दिन के अंत में मैं मानसिक रूप से बहुत थका हुआ/थकी हुई महसूस करता/करती हूं।</span></label>
      <select id="s1" name="s1" required>
        <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option>
      </select>
    </li>
    <li>
      <label for="s2"><span data-lang="en">I struggled to relax even in free time.</span><span data-lang="hi">खाली समय में भी मुझे आराम करने में कठिनाई हुई।</span></label>
      <select id="s2" name="s2" required>
        <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option>
      </select>
    </li>
    <li>
      <label for="s3"><span data-lang="en">I had trouble sleeping because of worries.</span><span data-lang="hi">चिंता के कारण मेरी नींद प्रभावित हुई।</span></label>
      <select id="s3" name="s3" required>
        <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option>
      </select>
    </li>
    <li>
      <label for="s4"><span data-lang="en">I felt irritated or overwhelmed by small issues.</span><span data-lang="hi">छोटी बातों से चिड़चिड़ापन या ओवरवेल्म महसूस हुआ।</span></label>
      <select id="s4" name="s4" required>
        <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option>
      </select>
    </li>
    <li>
      <label for="s5"><span data-lang="en">My stress affected work/study or relationships.</span><span data-lang="hi">तनाव का असर काम/पढ़ाई या रिश्तों पर पड़ा।</span></label>
      <select id="s5" name="s5" required>
        <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option>
      </select>
    </li>
  </ol>

  <button type="button" id="stress-submit" class="btn btn-primary">
    <span data-lang="en">Get Stress Result</span><span data-lang="hi">तनाव परिणाम देखें</span>
  </button>
  <p id="stress-result" class="mt-3 fw-semibold"></p>
</form>

---

### <span data-lang="en">2) Anxiety Check (Last 2 Weeks)</span><span data-lang="hi">2) चिंता जांच (पिछले 2 सप्ताह)</span>

<form id="anxiety-check-form" class="self-check-form">
  <ol>
    <li>
      <label for="a1"><span data-lang="en">I felt nervous or on edge most days.</span><span data-lang="hi">अधिकतर दिनों में मैं घबराहट या बेचैनी महसूस करता/करती रहा/रही।</span></label>
      <select id="a1" name="a1" required>
        <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option>
      </select>
    </li>
    <li>
      <label for="a2"><span data-lang="en">I could not stop worrying once it started.</span><span data-lang="hi">चिंता शुरू होने के बाद उसे रोकना मुश्किल लगा।</span></label>
      <select id="a2" name="a2" required>
        <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option>
      </select>
    </li>
    <li>
      <label for="a3"><span data-lang="en">I had physical symptoms (restlessness, fast heartbeat, sweating).</span><span data-lang="hi">मुझे शारीरिक लक्षण महसूस हुए (बेचैनी, धड़कन तेज, पसीना)।</span></label>
      <select id="a3" name="a3" required>
        <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option>
      </select>
    </li>
    <li>
      <label for="a4"><span data-lang="en">I avoided places or situations due to fear.</span><span data-lang="hi">डर के कारण मैंने कुछ जगहों या स्थितियों से बचाव किया।</span></label>
      <select id="a4" name="a4" required>
        <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option>
      </select>
    </li>
    <li>
      <label for="a5"><span data-lang="en">My anxiety affected daily functioning.</span><span data-lang="hi">मेरी चिंता ने दैनिक कार्यक्षमता को प्रभावित किया।</span></label>
      <select id="a5" name="a5" required>
        <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option>
      </select>
    </li>
  </ol>

  <button type="button" id="anxiety-submit" class="btn btn-primary">
    <span data-lang="en">Get Anxiety Result</span><span data-lang="hi">चिंता परिणाम देखें</span>
  </button>
  <p id="anxiety-result" class="mt-3 fw-semibold"></p>
</form>

<p class="mt-4 d-flex flex-wrap gap-2">
  <a class="btn btn-info" href="https://booking.iamsukhpreet.com/sukhpreet-kaur/discovery-call">
    <span data-lang="en">Book a Free Discovery Call</span><span data-lang="hi">मुफ्त डिस्कवरी कॉल बुक करें</span>
  </a>
  <a class="btn btn-success" href="https://booking.iamsukhpreet.com/sukhpreet-kaur/book-a-session">
    <span data-lang="en">Book a Personalized Session</span><span data-lang="hi">व्यक्तिगत सेशन बुक करें</span>
  </a>
</p>

{% include crisis-support.html %}

<script>
  (function() {
    const byId = (id) => document.getElementById(id);

    function sumFormValues(prefix) {
      let total = 0;
      for (let i = 1; i <= 5; i++) {
        total += Number(byId(prefix + i).value || 0);
      }
      return total;
    }

    function levelText(score, lang) {
      if (score <= 4) {
        return lang === 'hi' ? 'कम स्तर। अभी भी self-care जारी रखें।' : 'Low level. Keep up your self-care routine.';
      }
      if (score <= 8) {
        return lang === 'hi' ? 'मध्यम स्तर। सहायक रणनीतियाँ अपनाएँ और निगरानी रखें।' : 'Moderate level. Use coping strategies and monitor closely.';
      }
      return lang === 'hi' ? 'उच्च स्तर। प्रोफेशनल सपोर्ट लेने की सलाह दी जाती है।' : 'High level. Professional support is recommended.';
    }

    function currentLang() {
      return document.documentElement.getAttribute('data-site-lang') === 'hi' ? 'hi' : 'en';
    }

    function showResult(targetId, score) {
      const lang = currentLang();
      const prefix = lang === 'hi' ? 'स्कोर: ' : 'Score: ';
      byId(targetId).textContent = prefix + score + '/15 - ' + levelText(score, lang);
    }

    document.addEventListener('DOMContentLoaded', function() {
      const stressBtn = byId('stress-submit');
      const anxietyBtn = byId('anxiety-submit');

      if (stressBtn) {
        stressBtn.addEventListener('click', function() {
          showResult('stress-result', sumFormValues('s'));
        });
      }

      if (anxietyBtn) {
        anxietyBtn.addEventListener('click', function() {
          showResult('anxiety-result', sumFormValues('a'));
        });
      }
    });
  })();
</script>
