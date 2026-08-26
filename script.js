(() => {
  const body = document.body;
  const current = body.dataset.page;

  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === current) link.classList.add('active');
  });

  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  menuBtn?.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Cursor aura
  const glow = document.querySelector('.cursor-glow');
  if (glow && matchMedia('(pointer:fine)').matches) {
    let x = -1000, y = -1000, gx = x, gy = y;
    addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; });
    const animateGlow = () => {
      gx += (x - gx) * .09; gy += (y - gy) * .09;
      glow.style.transform = `translate3d(${gx}px,${gy}px,0)`;
      requestAnimationFrame(animateGlow);
    };
    animateGlow();
  }

  // Magnetic controls
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width/2)) * .12;
      const dy = (e.clientY - (r.top + r.height/2)) * .12;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });

  // Subtle card tilt
  if (matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (py - .5) * -4.5;
        const ry = (px - .5) * 5.5;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  // Animated counters
  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1300;
      const start = performance.now();
      const tick = now => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      numberObserver.unobserve(el);
    });
  }, { threshold:.5 });
  document.querySelectorAll('[data-count]').forEach(el => numberObserver.observe(el));

  // Interactive background particles / network
  const canvas = document.querySelector('#particle-field');
  if (canvas && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let w, h, dpr, points = [];
    let mouse = {x:-9999,y:-9999};
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      canvas.width = w*dpr; canvas.height = h*dpr;
      canvas.style.width = w+'px'; canvas.style.height = h+'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const count = Math.min(85, Math.max(38, Math.floor(w*h/22000)));
      points = Array.from({length:count},()=>({
        x:Math.random()*w,y:Math.random()*h,
        vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,
        r:Math.random()*1.3+.45
      }));
    };
    addEventListener('resize', resize); resize();
    addEventListener('pointermove', e => { mouse.x=e.clientX; mouse.y=e.clientY; });
    addEventListener('pointerleave', () => { mouse.x=-9999; mouse.y=-9999; });
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      for (let i=0;i<points.length;i++) {
        const p=points[i]; p.x+=p.vx; p.y+=p.vy;
        if(p.x<-20)p.x=w+20;if(p.x>w+20)p.x=-20;if(p.y<-20)p.y=h+20;if(p.y>h+20)p.y=-20;
        const md=Math.hypot(p.x-mouse.x,p.y-mouse.y);
        if(md<130){ p.x+=(p.x-mouse.x)*.002; p.y+=(p.y-mouse.y)*.002; }
        ctx.beginPath(); ctx.fillStyle='rgba(135,225,255,.42)'; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
        for(let j=i+1;j<points.length;j++){
          const q=points[j], dist=Math.hypot(p.x-q.x,p.y-q.y);
          if(dist<105){ ctx.strokeStyle=`rgba(120,205,255,${(1-dist/105)*.105})`; ctx.lineWidth=.6; ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke(); }
        }
      }
      requestAnimationFrame(draw);
    };
    draw();
  }

  // Photography lightbox
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  document.querySelectorAll('.photo-frame img').forEach(img => {
    img.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      body.style.overflow = 'hidden';
    });
  });
  const closeLightbox = () => { if(lightbox){ lightbox.classList.remove('open'); body.style.overflow=''; } };
  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });
  addEventListener('keydown', e => { if(e.key==='Escape') closeLightbox(); });

  // Contact: preserve working hidden iframe behavior while giving immediate feedback
  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  form?.addEventListener('submit', () => {
    if(status) status.textContent = 'Message sent — thank you. I’ll get back to you soon.';
  });
})();
