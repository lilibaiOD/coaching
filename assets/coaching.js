/* ==========================================================================
   LILI BAI — PERSONAL & EXECUTIVE COACHING SITE (Site 2)
   Interactive Self-Reflection, Coaching Programmes, Essay Reader & Enquiry
   ========================================================================== */

(function () {
  'use strict';

  /* ── 1. MOBILE NAV & SMOOTH SCROLL ──────────────────────────────────── */
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      const open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── 2. EXECUTIVE PRESENCE & VOICE SELF-REFLECTION ──────────────────── */
  const QUIZ_QUESTIONS = [
    {
      id: 'q1',
      pillar: 'inner',
      pillarLabel: 'Pillar I · Know Yourself (Inner Presence)',
      prompt: 'When you walk into a high-stakes room with senior decision-makers, what happens internally first?',
      options: [
        { score: 1, text: 'I over-prepare every detail and hold back until I am 100% certain my point is bulletproof.' },
        { score: 2, text: 'I contribute when asked on my specialist topic, but rarely challenge the wider strategic framing.' },
        { score: 3, text: 'I notice the pressure, ground myself in my perspective, and speak early to help shape the room.' }
      ]
    },
    {
      id: 'q2',
      pillar: 'inner',
      pillarLabel: 'Pillar I · Know Yourself (Inner Presence)',
      prompt: 'How clear are you on how your personality patterns and derailers show up under sustained pressure?',
      options: [
        { score: 1, text: 'I often realise only afterwards that stress made me go quiet, over-function, or rush.' },
        { score: 2, text: 'I know my strengths well, though certain triggers or authority dynamics still catch me off guard.' },
        { score: 3, text: 'I have clear language for my triggers and values, and can self-regulate in real time.' }
      ]
    },
    {
      id: 'q3',
      pillar: 'relational',
      pillarLabel: 'Pillar II · Know Others (Relational Presence)',
      prompt: 'When someone pushes back or the room feels politically tense, how do you typically respond?',
      options: [
        { score: 1, text: 'I either soften my point too quickly to keep harmony or retreat into data and slides.' },
        { score: 2, text: 'I hold my ground logically, but can find it hard to read the unspoken emotional currents.' },
        { score: 3, text: 'I stay curious about what others need, name the tension calmly, and build alignment across styles.' }
      ]
    },
    {
      id: 'q4',
      pillar: 'relational',
      pillarLabel: 'Pillar II · Know Others (Relational Presence)',
      prompt: 'Across cultures, functions, or seniority levels, how intentionally do you adapt your style?',
      options: [
        { score: 1, text: 'I tend to communicate the same way with everyone and hope the quality of my work speaks for itself.' },
        { score: 2, text: 'I adapt for key stakeholders, though cross-cultural or board-level nuances still feel draining.' },
        { score: 3, text: 'I tune in quickly to what different audiences value without losing my own authenticity.' }
      ]
    },
    {
      id: 'q5',
      pillar: 'express',
      pillarLabel: 'Pillar III · Express Yourself (Verbal & Executive Presence)',
      prompt: 'When you speak on something that matters, how does your pacing and delivery feel?',
      options: [
        { score: 1, text: 'Fear shows up in speed — I speak quickly, add too many caveats, or bury the headline.' },
        { score: 2, text: 'I am clear and structured in prepared updates, but less commanding in unscripted debate.' },
        { score: 3, text: 'I pause, land the headline cleanly, and allow silence to do its work without apologising.' }
      ]
    },
    {
      id: 'q6',
      pillar: 'express',
      pillarLabel: 'Pillar III · Express Yourself (Verbal & Executive Presence)',
      prompt: 'Looking ahead 6–12 months, what is the honest gap between your capability and your visibility?',
      options: [
        { score: 1, text: 'People trust me as a safe pair of hands, but do not yet see or hear me at the level I can operate.' },
        { score: 2, text: 'I am stepping into a bigger remit and need my voice and gravitas to catch up with my scope.' },
        { score: 3, text: 'I have a strong platform and want a thinking partner to sharpen my impact at the highest level.' }
      ]
    }
  ];

  const quizMount = document.getElementById('presence-quiz-mount');
  const quizResult = document.getElementById('presence-quiz-result');
  const answers = {};

  function renderQuiz() {
    if (!quizMount) return;
    quizMount.innerHTML = QUIZ_QUESTIONS.map(function (q, idx) {
      return (
        '<div class="quiz-q-card" data-qid="' + q.id + '">' +
          '<span class="quiz-q-pillar">' + q.pillarLabel + '</span>' +
          '<div class="quiz-q-title">' + (idx + 1) + '. ' + q.prompt + '</div>' +
          '<div class="quiz-options">' +
            q.options.map(function (opt, oIdx) {
              return (
                '<button type="button" class="quiz-opt-btn" data-qid="' + q.id + '" data-pillar="' + q.pillar + '" data-score="' + opt.score + '" data-oidx="' + oIdx + '">' +
                  '<span class="quiz-opt-radio" aria-hidden="true"></span>' +
                  '<span>' + opt.text + '</span>' +
                '</button>'
              );
            }).join('') +
          '</div>' +
        '</div>'
      );
    }).join('');

    quizMount.querySelectorAll('.quiz-opt-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const qid = btn.getAttribute('data-qid');
        const pillar = btn.getAttribute('data-pillar');
        const score = parseInt(btn.getAttribute('data-score'), 10);
        answers[qid] = { pillar: pillar, score: score };

        const parent = btn.closest('.quiz-q-card');
        parent.querySelectorAll('.quiz-opt-btn').forEach(function (b) {
          b.classList.remove('selected');
        });
        btn.classList.add('selected');
        updateQuizResult();
      });
    });
  }

  function updateQuizResult() {
    if (!quizResult) return;
    const count = Object.keys(answers).length;
    if (count < QUIZ_QUESTIONS.length) {
      quizResult.innerHTML =
        '<span class="quiz-result-label">Self-Reflection Progress (' + count + ' of ' + QUIZ_QUESTIONS.length + ' answered)</span>' +
        '<h4>Select one response in each card above to unlock your personalised Presence & Voice Reflection.</h4>' +
        '<p>There are no right or wrong answers — only an honest snapshot of where your capability and your presence are currently aligned, and where you may be going smaller than you need to.</p>';
      return;
    }

    const totals = { inner: 0, relational: 0, express: 0 };
    Object.keys(answers).forEach(function (k) {
      totals[answers[k].pillar] += answers[k].score;
    });

    const lowestPillar = Object.keys(totals).sort(function (a, b) {
      return totals[a] - totals[b];
    })[0];

    const profiles = {
      inner: {
        title: 'Your Primary Edge: Pillar I · Know Yourself (Inner Grounding & Identity)',
        body: 'You bring high conscientiousness and deep expertise, yet under high stakes your inner critic or desire for certainty can cause you to hold back until the moment has passed. Our coaching would begin inside: using psychometric insight (Hogan / MBTI / 360) and psychological inquiry to separate your capability from over-preparation, so you feel anchored before you even speak.',
        rec: 'Recommended Starting Point: The Executive Presence Journey (Stage 1: Know Yourself) or a Standalone Psychometric & Leadership Identity Debrief.'
      },
      relational: {
        title: 'Your Primary Edge: Pillar II · Know Others (Relational & Cross-Cultural Agility)',
        body: 'Your technical or operational judgement is clear, yet navigating unspoken political currents, authority dynamics, or cross-cultural boardrooms can feel exhausting. Together we work on reading the emotional temperature of a room, holding constructive tension without retreating into data or over-accommodating, and building genuine influence across diverse stakeholders.',
        rec: 'Recommended Starting Point: The Executive Presence Journey (6-Month 1:1) or Focused Leadership & Stakeholder Transition Coaching.'
      },
      express: {
        title: 'Your Primary Edge: Pillar III · Express Yourself (Verbal Gravitas & Pacing)',
        body: 'You know your craft and read people well, but when the spotlight turns to you, speed, caveats, or burying the headline can dilute the weight of your contribution. As the line from Dear England reminds us, "fear shows up in speed." Our work focuses on vocal pacing, strategic framing, and claiming space in unscripted executive conversations.',
        rec: 'Recommended Starting Point: The Executive Presence Journey or the Finding Your Voice at Work Coaching Intensive.'
      }
    };

    const p = profiles[lowestPillar];
    quizResult.innerHTML =
      '<span class="quiz-result-label">Personalised Reflection Complete</span>' +
      '<h4>' + p.title + '</h4>' +
      '<p>' + p.body + '</p>' +
      '<p style="margin-top:0.5rem;font-weight:600;color:#FAF8F6;">' + p.rec + '</p>' +
      '<div class="quiz-score-bars">' +
        '<div class="quiz-score-item">' +
          '<div class="quiz-score-head"><span>I. Know Yourself</span><span>' + totals.inner + ' / 6</span></div>' +
          '<div class="quiz-score-track"><div class="quiz-score-fill" style="width:' + Math.round((totals.inner / 6) * 100) + '%"></div></div>' +
        '</div>' +
        '<div class="quiz-score-item">' +
          '<div class="quiz-score-head"><span>II. Know Others</span><span>' + totals.relational + ' / 6</span></div>' +
          '<div class="quiz-score-track"><div class="quiz-score-fill" style="width:' + Math.round((totals.relational / 6) * 100) + '%"></div></div>' +
        '</div>' +
        '<div class="quiz-score-item">' +
          '<div class="quiz-score-head"><span>III. Express Yourself</span><span>' + totals.express + ' / 6</span></div>' +
          '<div class="quiz-score-track"><div class="quiz-score-fill" style="width:' + Math.round((totals.express / 6) * 100) + '%"></div></div>' +
        '</div>' +
      '</div>' +
      '<div style="margin-top:1.15rem;">' +
        '<a href="contact.html" class="btn btn-rose">Bring This Reflection to a Free 30-Min Chemistry Call →</a>' +
      '</div>';
  }

  renderQuiz();

  /* ── 3. COACHING PROGRAMME TABS ─────────────────────────────────────── */
  const progTabs = document.querySelectorAll('.prog-tab-btn');
  const progPanels = document.querySelectorAll('.prog-panel');
  progTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const target = tab.getAttribute('data-prog');
      progTabs.forEach(function (t) {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', String(t === tab));
      });
      progPanels.forEach(function (panel) {
        panel.classList.toggle('active', panel.id === 'prog-' + target);
      });
    });
  });

  /* ── 4. ESSAYS & REFLECTIONS MODAL READER ───────────────────────────── */
  const ESSAYS = {
    'go-small': {
      tag: 'Essay 01 · Voice & Executive Presence',
      title: 'Why Capable People Go Small — And How We Reclaim Our Full Stature',
      meta: 'By Lili Bai · Organisational Psychologist & Executive Coach · 5 min read',
      body: [
        'Across twenty years of sitting with leaders in London, Shanghai, and global virtual rooms — from newly promoted Directors to C-suite executives and elite athletes — I have noticed a quiet, recurring paradox. The people with the most thoughtful judgment are often the ones holding back in the moments that matter most.',
        'We rarely go small because we lack ability. We go small because, somewhere along the way, we learned that safety lies in being impeccable, agreeable, or invisible. If you grew up between cultures, or built your early career as the reliable technical expert who always had the right answer, stepping into an unscripted room where there is no single right answer feels like stepping onto thin ice.',
        'Going small has many disguises. Sometimes it looks like waiting until minute forty-eight of a sixty-minute meeting to offer the observation that could have reframed the entire discussion at minute five. Sometimes it looks like burying a bold recommendation beneath six slides of caveats. Sometimes it looks like speaking at double speed so you take up less of the room\'s airtime.',
        'True executive presence is never about putting on a louder persona or dominating the table. In Chinese philosophy there is a classic sequence of wisdom: 知人者智，自知者明 — to know others is intelligence; to know yourself is true clarity. When you combine deep self-knowledge with genuine curiosity about the people around you, expressing yourself stops feeling like a performance and becomes an act of service to the room.'
      ]
    },
    'dear-england': {
      tag: 'Essay 02 · Pacing & Psychological Safety',
      title: '"Fear Shows Up in Speed": Lessons on Presence from the National Theatre\'s Dear England',
      meta: 'By Lili Bai · Adapted from LinkedIn Reflections · 4 min read',
      body: [
        'Watching the National Theatre\'s production of Dear England — the story of Gareth Southgate and team psychologist Pippa Grange rebuilding the culture of the England men\'s football team — one line stayed with me long after the curtain fell: when players walk up to take a penalty under the weight of a nation\'s history, fear shows up in speed.',
        'They rush the walk. They rush the breath. They strike the ball before they have truly inhabited the moment, because they want the unbearable tension of being watched to be over as quickly as possible.',
        'How often do we do the exact same thing in our working lives? Watch a capable leader present to a challenging board or ask for what they need in a career conversation. When we feel exposed, we accelerate. We rush past our own headline, fill every pause with extra explanation, and answer our own question before the other person has had time to sit with it.',
        'Slowing down is not a theatrical trick; it is a nervous-system declaration that you belong in the room. In coaching, before we ever work on slide structure or boardroom phrasing, we look at what happens in the two seconds before you speak. When you allow yourself to pause, breathe, and claim your time, the room adjusts its rhythm to meet yours.'
      ]
    },
    'premier-league': {
      tag: 'Essay 03 · Psychometrics & High Performance',
      title: 'What Eight Premier League Footballers Taught Me About Self-Knowledge Under Pressure',
      meta: 'By Lili Bai · Psychometric Practice · 4 min read',
      body: [
        'Early in my psychometric practice, I had the privilege of administering and debriefing personality assessments for eight Premier League footballers. People often assume elite athletes operate purely on instinct and physical conditioning. What struck me most was their hunger for precise language to understand their own inner wiring.',
        'At the highest level of any craft — whether football, engineering, finance, or organisational leadership — technical skill is the entry ticket. What separates sustainable excellence from burnout or self-sabotage is knowing what happens to your strengths when the pressure triples.',
        'As a Hogan puts it, our bright-side strengths and our dark-side derailers are woven from the same thread. Intense drive can become micromanagement under stress; high conscientiousness can become perfectionist paralysis; warmth and diplomacy can become conflict avoidance when tough calls are needed.',
        'A great psychometric debrief is never a box-ticking label. It is a compassionate, objective mirror. Once a leader can name their default pattern without shame — "this is what my nervous system reaches for when stakes are high" — they regain the freedom to choose a different response.'
      ]
    },
    'how-are-you': {
      tag: 'Essay 04 · Relational Presence & Connection',
      title: 'When We Ask "How Are You?", Are We Actually Staying for the Answer?',
      meta: 'By Lili Bai · Connect & Clarity Series · 4 min read',
      body: [
        'In British professional culture, "How are you?" is most often a polite punctuation mark before we open the agenda. We say "Good, thanks — busy!" and move immediately to the metrics. Over months and years, teams can work side by side every day while feeling profoundly unseen.',
        'During my Connect & Clarity workshops and our monthly A Century of Connection reading circles, I often invite leaders to notice the difference between transactional listening (listening for the gap where I can insert my point) and generative listening (listening in a way that helps the other person think more clearly).',
        'Relational presence — the second pillar of our coaching work — starts here. People do not follow leaders simply because their logic is airtight; as Aristotle observed, human trust moves through Pathos (do I feel met and understood by you?), then Ethos (do I trust your character and grounding?), and only then Logos (does your strategy make sense?).',
        'The most influential leaders I coach are not the ones who talk the most in meetings. They are the ones whose attention is so undivided that when they finally speak, everyone in the room leans in.'
      ]
    }
  };

  const modalBackdrop = document.getElementById('essay-modal-backdrop');
  const modalContent = document.getElementById('essay-modal-body');
  const modalClose = document.getElementById('essay-modal-close');

  function openEssay(key) {
    const item = ESSAYS[key];
    if (!item || !modalBackdrop || !modalContent) return;
    modalContent.innerHTML =
      '<span class="essay-tag">' + item.tag + '</span>' +
      '<h3 style="font-size:1.65rem;margin:0.35rem 0 0.4rem;">' + item.title + '</h3>' +
      '<p style="font-size:0.84rem;color:#6E6A66;margin-bottom:1.25rem;padding-bottom:0.85rem;border-bottom:1px solid rgba(27,35,61,0.12);">' + item.meta + '</p>' +
      item.body.map(function (p) {
        return '<p style="font-size:1rem;line-height:1.8;color:#2E3548;margin-bottom:1.1rem;">' + p + '</p>';
      }).join('') +
      '<div style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid rgba(27,35,61,0.12);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;">' +
        '<span style="font-family:var(--font-serif);font-style:italic;color:#A8445D;">Know Yourself · Know Others · Express Yourself</span>' +
        '<a href="contact.html" class="btn btn-rose" onclick="document.getElementById(\'essay-modal-backdrop\').classList.remove(\'open\')">Reflect on This in a Chemistry Call →</a>' +
      '</div>';
    modalBackdrop.classList.add('open');
  }

  document.querySelectorAll('[data-essay]').forEach(function (el) {
    el.addEventListener('click', function () {
      openEssay(el.getAttribute('data-essay'));
    });
  });

  if (modalClose && modalBackdrop) {
    modalClose.addEventListener('click', function () {
      modalBackdrop.classList.remove('open');
    });
    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) modalBackdrop.classList.remove('open');
    });
  }

  /* ── 5. CHEMISTRY CALL ENQUIRY BUILDER ──────────────────────────────── */
  const enquiryForm = document.getElementById('coaching-enquiry-form');
  const enquiryStatus = document.getElementById('coaching-enquiry-status');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = (document.getElementById('enq-name') || {}).value || 'Prospective Client';
      const role = (document.getElementById('enq-role') || {}).value || '';
      const focus = (document.getElementById('enq-focus') || {}).value || 'The Executive Presence Journey (1:1 Coaching)';
      const note = (document.getElementById('enq-note') || {}).value || '';

      const message =
        'Hi Lili,\n\n' +
        'I visited your Executive Coaching website and would love to arrange a complimentary 30-minute Chemistry Call.\n\n' +
        '• Name: ' + name + (role ? ' (' + role + ')' : '') + '\n' +
        '• Area of Interest: ' + focus + '\n' +
        (note ? '• What I am navigating right now: ' + note + '\n\n' : '\n') +
        'Looking forward to connecting.\n' + name;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(message).catch(function () {});
      }
      if (enquiryStatus) {
        enquiryStatus.style.display = 'block';
        enquiryStatus.innerHTML =
          '<strong>Your personalized Chemistry Call note has been copied to your clipboard!</strong><br>' +
          'Paste it directly into a message on <a href="https://www.linkedin.com/in/llbai/" target="_blank" rel="noopener" style="text-decoration:underline;color:#FAF8F6;font-weight:600;">Lili\'s LinkedIn (@llbai) →</a> to book your 30-minute conversation.';
      }
    });
  }
})();

  /* ── 6. LIVE PORTRAIT PHOTO UPLOADER / PREVIEWER ────────────────────── */
  (function initPortraitPreviewer() {
    var savedPhoto = null;
    try { savedPhoto = sessionStorage.getItem('lb_custom_portrait'); } catch (e) {}
    if (savedPhoto) {
      document.querySelectorAll('.lili-portrait-img').forEach(function (img) {
        img.src = savedPhoto;
      });
    }
    document.querySelectorAll('.photo-upload-input').forEach(function (input) {
      input.addEventListener('change', function (e) {
        var file = e.target.files && e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (ev) {
          var dataUrl = ev.target.result;
          try { sessionStorage.setItem('lb_custom_portrait', dataUrl); } catch (err) {}
          document.querySelectorAll('.lili-portrait-img').forEach(function (img) {
            img.src = dataUrl;
          });
        };
        reader.readAsDataURL(file);
      });
    });
  })();
