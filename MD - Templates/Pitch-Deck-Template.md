Master Prompt for generating Custom Pitch DecksCopy and paste everything below this line into your AI chat, filling in the bracketed information at the top:Brand Name: [Insert Brand Name Here, e.g., Nike]Brand Primary Color (Hex Code): [Insert Hex Code, e.g., #FF6600]Brand Vibe/Industry: [e.g., Gritty Streetwear, Clean Tech Startup, High-end Fashion]Pitch Goal: [e.g., Pitching a pre-launch funding campaign, Pitching a TikTok influencer strategy, etc.]Instructions:Act as an expert frontend developer, UI/UX designer, and copywriter. I need you to create a self-contained, interactive, mobile-optimized HTML pitch deck for the brand mentioned above.You must use the EXACT base HTML structure, Tailwind CSS, and pure JavaScript swipe logic provided below. Do not change the core functionality, the 100dvh mobile fixes, or the rendering engine.What you MUST change:Update the overall pitch copy in the slides array to match the Brand Name and Pitch Goal. Make it persuasive and professional.Change the primary accent color in the CSS selection tag, background glows, and JavaScript icons/buttons from the default pink to the Brand Primary Color provided above.Update the logoHtml variable to match the brand's name, styled cleanly using Tailwind classes.Replace the mockups in the ad-samples slide with high-quality, relevant Unsplash image URLs for this brand.CRITICAL: The very last slide in the slides array MUST ALWAYS be the "Benny & Penny" partnership slide exactly as provided in the template below. Do not alter the final slide's content, links, or logo.Base Template to modify (Output the ENTIRE updated file as a single index.html):<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Pitch Deck</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    html, body { 
      background-color: #09090b; margin: 0; padding: 0; width: 100vw; max-width: 100%;
      overflow-x: hidden !important; overscroll-behavior-x: none; height: 100vh; height: 100dvh; 
    }
    @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
    .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
    main { user-select: none; -webkit-user-select: none; overflow-x: hidden !important; }
  </style>
</head>
<body class="w-full flex flex-col font-sans text-white selection:bg-[PRIMARY_COLOR_HERE] selection:text-white">
  
  <header class="p-4 md:p-6 flex justify-between items-start w-full shrink-0 z-10">
    <div class="scale-50 md:scale-75 origin-top-left opacity-80 hover:opacity-100 transition-opacity" id="header-logo">
      <!-- UPDATE THIS LOGO HTML IN THE JS SCRIPT -->
    </div>
    <div class="text-zinc-500 text-sm font-semibold tracking-widest uppercase mt-2" id="slide-counter">Slide 1 / X</div>
  </header>

  <main id="swipe-zone" class="flex-grow flex items-center justify-center p-6 md:px-12 relative overflow-y-auto cursor-grab active:cursor-grabbing">
    <!-- UPDATE BG COLOR BELOW TO MATCH BRAND -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[PRIMARY_COLOR_HERE]/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none"></div>
    <div id="slide-container" class="max-w-4xl w-full flex flex-col justify-center relative z-10 py-4 animate-fade-in"></div>
  </main>

  <footer class="p-4 md:p-6 flex items-center justify-between border-t border-zinc-900 bg-[#09090b]/80 backdrop-blur shrink-0 z-10 pb-safe">
    <div class="text-zinc-600 text-xs font-bold tracking-widest uppercase hidden md:block" id="footer-tagline">
      <!-- UPDATE BRAND TAGLINE IN JS -->
    </div>
    
    <div class="flex items-center gap-4 mx-auto md:mx-0">
      <button id="btn-prev" class="p-3 rounded-full hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div id="dots-container" class="flex gap-2"></div>
      <button id="btn-next" class="p-3 rounded-full hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  </footer>

  <script>
    // UPDATE ICONS TO USE THE NEW PRIMARY COLOR INSTEAD OF #d62877
    const icons = {
      play: '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-[PRIMARY_COLOR_HERE] mb-6"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>',
      chart: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-zinc-500"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>',
      bag: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-zinc-200"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>',
      dollar: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-500"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
      target: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-[PRIMARY_COLOR_HERE]"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>',
      trending: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-zinc-200"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>',
      image: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-[PRIMARY_COLOR_HERE]"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'
    };

    // UPDATE LOGO HTML FOR THE NEW BRAND
    const logoHtml = \`
      <div class="flex items-center bg-white p-1.5 border-4 border-white inline-flex shadow-lg scale-75 md:scale-100 origin-center mb-8">
        <div class="bg-[PRIMARY_COLOR_HERE] text-white font-black text-4xl md:text-5xl px-3 tracking-tighter uppercase leading-none pb-1 pt-1">BRAND</div>
        <div class="text-black font-black text-4xl md:text-5xl px-2 tracking-tighter uppercase leading-none pb-1">NAME</div>
      </div>
    \`;

    document.getElementById('header-logo').innerHTML = logoHtml;
    document.getElementById('footer-tagline').innerText = 'BRAND MOTTO // 2024';

    // GENERATE 6-7 CUSTOM SLIDES HERE based on the prompt goals.
    const slides = [
      // [GENERATE TITLE SLIDE]
      // [GENERATE CONTENT SLIDE 1]
      // [GENERATE CONTENT SLIDE 2]
      // [GENERATE CONTENT SLIDE 3]
      // [GENERATE TIMELINE SLIDE]
      // [GENERATE AD-SAMPLES SLIDE]

      // FINAL SLIDE - DO NOT CHANGE THIS SLIDE AT ALL
      { 
        type: 'final', 
        title: 'Let\\'s Build Together', 
        subtitle: 'Your Launch Partnership', 
        logoUrl: 'https://www.bennyandpenny.com/images/logo-horizontal-transparent.png',
        website: 'bennyandpenny.com', 
        points: [
          'End-to-End Campaign Management from tease to cart-close.', 
          'High-converting ad creative framework tailored to your audience.', 
          'Cash-flow optimized funnel design to capture capital securely.'
        ] 
      }
    ];

    let currentSlide = 0;
    const container = document.getElementById('slide-container');
    const counter = document.getElementById('slide-counter');
    const dotsContainer = document.getElementById('dots-container');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    // Make sure to replace all instances of #d62877 below with the new PRIMARY_COLOR_HERE
    function renderSlide() {
      const slide = slides[currentSlide];
      container.classList.remove('animate-fade-in');
      void container.offsetWidth; 
      container.classList.add('animate-fade-in');
      let html = '';

      if (slide.type === 'title') {
        html = \`
          <div class="flex flex-col items-center text-center">
            \${logoHtml}
            \${slide.icon}
            <h1 class="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">\${slide.title}</h1>
            <p class="text-xl md:text-2xl text-zinc-400 font-medium max-w-2xl">\${slide.subtitle}</p>
          </div>
        \`;
      } else if (slide.type === 'content') {
        let pointsHtml = slide.points.map((point, i) => \`
          <div class="flex items-start gap-4 p-4 md:p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-[PRIMARY_COLOR_HERE]/50 transition-colors">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[PRIMARY_COLOR_HERE]/20 text-[PRIMARY_COLOR_HERE] flex items-center justify-center font-bold">\${i + 1}</div>
            <p class="text-[15px] md:text-xl text-zinc-300 leading-relaxed font-medium pt-0.5">\${point}</p>
          </div>
        \`).join('');

        html = \`
          <div class="w-full text-left">
            <div class="flex items-center gap-3 mb-2 md:mb-4">
              \${slide.icon}
              <span class="text-[PRIMARY_COLOR_HERE] font-bold tracking-widest uppercase text-xs md:text-sm">\${slide.subtitle}</span>
            </div>
            <h2 class="text-3xl md:text-5xl font-black mb-6 md:mb-12 tracking-tight uppercase">\${slide.title}</h2>
            <div class="space-y-3 md:space-y-6">\${pointsHtml}</div>
          </div>
        \`;
      } else if (slide.type === 'timeline') {
        let phasesHtml = slide.phases.map((phase) => \`
          <div class="p-5 md:p-8 bg-zinc-900/50 border border-zinc-800 rounded-xl relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-full h-1 bg-zinc-800 group-hover:bg-[PRIMARY_COLOR_HERE] transition-colors"></div>
            <h3 class="text-lg md:text-2xl font-black mb-1 md:mb-2 uppercase text-white">\${phase.name}</h3>
            <p class="text-[PRIMARY_COLOR_HERE] font-bold mb-2 md:mb-4 text-sm md:text-base">\${phase.time}</p>
            <p class="text-[13px] md:text-base text-zinc-400 font-medium leading-relaxed">\${phase.desc}</p>
          </div>
        \`).join('');

        html = \`
          <div class="w-full text-left">
            <div class="flex items-center gap-3 mb-2 md:mb-4">
              <span class="text-[PRIMARY_COLOR_HERE] font-bold tracking-widest uppercase text-xs md:text-sm">\${slide.subtitle}</span>
            </div>
            <h2 class="text-3xl md:text-5xl font-black mb-6 md:mb-12 tracking-tight uppercase">\${slide.title}</h2>
            <div class="grid md:grid-cols-3 gap-3 md:gap-6">\${phasesHtml}</div>
          </div>
        \`;
      } else if (slide.type === 'ad-samples') {
        let adsHtml = slide.ads.map(ad => \`
          <div class="relative rounded-xl md:rounded-2xl overflow-hidden aspect-[4/5] border border-zinc-800 shadow-xl group cursor-default">
            <img src="\${ad.img}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Ad concept" onerror="this.src='\${ad.fallback}'" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>
            <div class="absolute bottom-0 left-0 w-full p-2.5 md:p-6 text-left">
              <div class="inline-block px-1.5 py-0.5 md:px-3 md:py-1 bg-[PRIMARY_COLOR_HERE] text-white text-[8px] md:text-xs font-bold tracking-widest mb-1 md:mb-3 rounded-sm">\${ad.tag}</div>
              <h3 class="text-[11px] md:text-2xl font-black uppercase tracking-tight leading-none mb-1 md:mb-2 text-white">\${ad.headline}</h3>
              <p class="text-zinc-300 font-medium text-[9px] md:text-sm drop-shadow-md leading-tight">\${ad.sub}</p>
            </div>
          </div>
        \`).join('');

        html = \`
          <div class="w-full text-left">
            <div class="flex items-center gap-3 mb-2 md:mb-4">
              \${slide.icon}
              <span class="text-[PRIMARY_COLOR_HERE] font-bold tracking-widest uppercase text-xs md:text-sm">\${slide.subtitle}</span>
            </div>
            <h2 class="text-3xl md:text-5xl font-black mb-4 md:mb-8 tracking-tight uppercase">\${slide.title}</h2>
            <div class="grid grid-cols-2 gap-2 md:gap-6 max-w-3xl">\${adsHtml}</div>
          </div>
        \`;
      } else if (slide.type === 'final') {
        let pointsHtml = slide.points.map((point) => \`
          <div class="flex items-start gap-3 mb-4 last:mb-0">
            <div class="flex-shrink-0 mt-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-[PRIMARY_COLOR_HERE]">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p class="text-[14px] md:text-lg text-zinc-300 leading-relaxed font-medium">\${point}</p>
          </div>
        \`).join('');

        html = \`
          <div class="flex flex-col items-center text-center w-full mx-auto pb-8">
            <div class="mb-6 bg-gradient-to-br from-stone-100 to-stone-300 border border-stone-400/20 p-4 md:p-6 rounded-2xl shadow-xl flex items-center justify-center min-h-[100px] md:min-h-[140px] w-full max-w-xs md:max-w-sm">
              <img src="\${slide.logoUrl}" alt="Benny and Penny Logo" class="max-h-16 md:max-h-24 object-contain" onerror="this.style.display='none'" />
            </div>
            <h2 class="text-3xl md:text-5xl font-black mb-2 md:mb-4 tracking-tight uppercase">\${slide.title}</h2>
            <p class="text-base md:text-xl text-[PRIMARY_COLOR_HERE] font-bold mb-6 md:mb-8 tracking-widest uppercase">\${slide.subtitle}</p>
            <div class="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 md:p-8 w-full max-w-2xl text-left mb-6 md:mb-8 shadow-2xl relative overflow-hidden group">
              <div class="absolute top-0 left-0 w-full h-1 bg-zinc-800 group-hover:bg-[PRIMARY_COLOR_HERE] transition-colors"></div>
              <h3 class="text-lg md:text-xl font-black text-white mb-4 md:mb-6 uppercase tracking-wider">What You Get:</h3>
              <div>\${pointsHtml}</div>
            </div>
            <div class="bg-[PRIMARY_COLOR_HERE] text-white font-black px-6 py-3 md:px-8 md:py-4 rounded-xl uppercase tracking-widest text-xs md:text-base shadow-lg border border-[PRIMARY_COLOR_HERE]">
              Partner up with \${slide.website}
            </div>
          </div>
        \`;
      }

      container.innerHTML = html;
      counter.innerText = \`Slide \${currentSlide + 1} / \${slides.length}\`;
      btnPrev.disabled = currentSlide === 0;
      btnNext.disabled = currentSlide === slides.length - 1;
      dotsContainer.innerHTML = slides.map((_, idx) => \`
        <div class="h-2 rounded-full transition-all duration-300 \${idx === currentSlide ? 'w-4 md:w-8 bg-[PRIMARY_COLOR_HERE]' : 'w-1.5 md:w-2 bg-zinc-800'}"></div>
      \`).join('');
    }

    const nextSlide = () => { if (currentSlide < slides.length - 1) { currentSlide++; renderSlide(); } };
    const prevSlide = () => { if (currentSlide > 0) { currentSlide--; renderSlide(); } };
    btnNext.addEventListener('click', nextSlide);
    btnPrev.addEventListener('click', prevSlide);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });

    let touchStartX = 0, touchStartY = 0, touchEndX = 0, touchEndY = 0;
    const swipeZone = document.getElementById('swipe-zone');
    swipeZone.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    swipeZone.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      if (Math.abs(touchStartX - touchEndX) > Math.abs(touchStartY - touchEndY)) {
        if (touchStartX - touchEndX > 50) nextSlide();
        if (touchStartX - touchEndX < -50) prevSlide();
      }
    }, { passive: true });

    renderSlide();
  </script>
</body>
</html>
