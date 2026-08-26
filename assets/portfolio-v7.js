const q=(s,c=document)=>c.querySelector(s), qa=(s,c=document)=>[...c.querySelectorAll(s)];

const progress=q('.progress');
const updateProgress=()=>{const h=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=`${h?scrollY/h*100:0}%`};
addEventListener('scroll',updateProgress,{passive:true});updateProgress();

// Mirrorless-style electronic/mechanical shutter sound synthesized locally.
function playMirrorlessShutter(){
  try{
    const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
    const ctx=new AC();const master=ctx.createGain();master.gain.value=.15;master.connect(ctx.destination);
    const noiseClick=(start,duration,frequency,gain)=>{
      const length=Math.max(1,Math.floor(ctx.sampleRate*duration));
      const buffer=ctx.createBuffer(1,length,ctx.sampleRate);const data=buffer.getChannelData(0);
      for(let i=0;i<length;i++){const e=Math.exp(-i/(length*.16));data[i]=(Math.random()*2-1)*e}
      const src=ctx.createBufferSource();src.buffer=buffer;
      const filter=ctx.createBiquadFilter();filter.type='bandpass';filter.frequency.value=frequency;filter.Q.value=1.7;
      const g=ctx.createGain();g.gain.setValueAtTime(gain,ctx.currentTime+start);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+start+duration);
      src.connect(filter);filter.connect(g);g.connect(master);src.start(ctx.currentTime+start)
    };
    noiseClick(0,.042,3200,.62);noiseClick(.054,.052,1750,.50);noiseClick(.12,.036,3900,.22);
    const motor=ctx.createOscillator(),mg=ctx.createGain();motor.type='triangle';motor.frequency.setValueAtTime(330,ctx.currentTime+.02);motor.frequency.exponentialRampToValueAtTime(150,ctx.currentTime+.14);mg.gain.setValueAtTime(.035,ctx.currentTime);mg.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.16);motor.connect(mg);mg.connect(master);motor.start();motor.stop(ctx.currentTime+.17);
    setTimeout(()=>ctx.close?.(),420);
  }catch(_e){}
}

// Entry gate: show on every clean root visit. If returning to an anchor such as #projects, skip it.
const entry=q('#site-entry'),shutter=q('#shutter-btn');
if(entry&&shutter){
  const skipIntro=Boolean(location.hash);
  if(skipIntro){entry.remove();document.body.classList.remove('entry-locked');document.body.classList.add('site-entered')}
  else{
    document.body.classList.add('entry-locked');
    shutter.addEventListener('click',()=>{
      if(entry.classList.contains('capturing'))return;
      playMirrorlessShutter();entry.classList.add('capturing');shutter.disabled=true;
      setTimeout(()=>entry.classList.add('exit'),690);
      setTimeout(()=>{entry.remove();document.body.classList.remove('entry-locked');document.body.classList.add('site-entered')},1150)
    },{once:true})
  }
}

// Cursor
const cursor=q('.cursor'),dot=q('.cursor-dot');
if(cursor&&dot&&matchMedia('(pointer:fine)').matches){let x=-100,y=-100,cx=-100,cy=-100;addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;dot.style.left=x+'px';dot.style.top=y+'px'});const loop=()=>{cx+=(x-cx)*.14;cy+=(y-cy)*.14;cursor.style.left=cx+'px';cursor.style.top=cy+'px';requestAnimationFrame(loop)};loop();qa('a,button,.shot,.project-card').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('big'));el.addEventListener('mouseleave',()=>cursor.classList.remove('big'))})}

// Reveal
if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});qa('.reveal').forEach(el=>io.observe(el))}else qa('.reveal').forEach(el=>el.classList.add('visible'));

// Mobile menu
const menuBtn=q('.menu-toggle'),mobile=q('.mobile-menu');if(menuBtn&&mobile)menuBtn.addEventListener('click',()=>{mobile.classList.toggle('open');menuBtn.setAttribute('aria-expanded',mobile.classList.contains('open'))});

// Active nav
const page=document.body.dataset.page;qa(`[data-nav="${page}"]`).forEach(a=>a.classList.add('active'));

// Internal page transitions; same-page hashes stay native.
qa('a[href]').forEach(a=>a.addEventListener('click',e=>{const href=a.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('http')||a.target==='_blank')return;const url=new URL(href,location.href);if(url.pathname===location.pathname&&url.hash)return;e.preventDefault();const wipe=q('.page-transition');if(!wipe){location.href=href;return}wipe.className='page-transition in';setTimeout(()=>location.href=href,470)}));
addEventListener('pageshow',()=>{const wipe=q('.page-transition');if(wipe){wipe.className='page-transition out';setTimeout(()=>wipe.className='page-transition',730)}});

// Photography library. Use photos/photo1.jpg through photos/photo38.jpg.
// Category labels can contain more than one category; unassigned frames remain visible under All.
const photoMeta={
  1:{title:'Milky Way',place:'Zion National Park, Utah',categories:'astro landscapes'},
  3:{title:'Great Smoky Mountains',place:'Tennessee',categories:'landscapes nature travel'},
  12:{title:'Mount Washington',place:'Pittsburgh, Pennsylvania',categories:'travel landscapes'},
  14:{title:'Bryce Canyon National Park',place:'Utah',categories:'landscapes nature travel'},
  17:{title:'Grand Canyon National Park',place:'Arizona',categories:'landscapes nature travel'},
  21:{title:'Bubble Rock',place:'Acadia National Park, Maine',categories:'nature landscapes travel'},
  24:{title:'Bryce Canyon National Park',place:'Utah',categories:'landscapes nature travel'},
  31:{title:'Bear Rock Shadow',place:'',categories:'nature landscapes'},
  32:{title:'Tuckaleechee Caverns',place:'Tennessee',categories:'nature travel'}
};

const gallery=q('#photo-grid');
if(gallery){
  for(let i=2;i<=38;i++){
    const meta=photoMeta[i]||{title:`Frame ${String(i).padStart(2,'0')}`,place:'',categories:''};
    const fig=document.createElement('figure');fig.className='shot photo-item reveal';fig.dataset.photo=String(i);fig.dataset.category=meta.categories||'';
    const img=document.createElement('img');img.src=`photos/photo${i}.jpg`;img.alt=meta.place?`${meta.title} — ${meta.place}`:meta.title;img.loading=i<7?'eager':'lazy';img.decoding='async';
    const cap=document.createElement('figcaption');cap.innerHTML=`<strong>${meta.title}</strong>${meta.place?`<span>${meta.place}</span>`:''}<small>Photo ${String(i).padStart(2,'0')}</small>`;
    fig.append(img,cap);gallery.appendChild(fig);
  }

  // Natural-dimension orientation detection. Frames resize themselves to the actual photograph.
  const setOrientation=img=>{
    const fig=img.closest('.shot');if(!fig||!img.naturalWidth||!img.naturalHeight)return;
    const ratio=img.naturalWidth/img.naturalHeight;
    fig.classList.remove('is-portrait','is-landscape','is-panorama');
    fig.classList.add(ratio<.92?'is-portrait':ratio>1.75?'is-panorama':'is-landscape');
    fig.dataset.orientation=ratio<.92?'portrait':ratio>1.75?'panorama':'landscape';
  };
  qa('.shot img').forEach(img=>{if(img.complete)setOrientation(img);img.addEventListener('load',()=>setOrientation(img));img.addEventListener('error',()=>{const fig=img.closest('.shot');if(fig)fig.classList.add('image-missing')})});

  // Attach reveals for dynamically-generated frames.
  if('IntersectionObserver'in window){const photoIO=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');photoIO.unobserve(e.target)}}),{threshold:.04});qa('.photo-item').forEach(el=>photoIO.observe(el))}else qa('.photo-item').forEach(el=>el.classList.add('visible'));
}

// Photography category filters, supporting multiple categories per frame.
const filterButtons=qa('.filter-btn');
if(filterButtons.length){filterButtons.forEach(btn=>btn.addEventListener('click',()=>{filterButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const filter=btn.dataset.filter;qa('.photo-grid .shot').forEach(shot=>{const cats=(shot.dataset.category||'').split(/\s+/).filter(Boolean);shot.classList.toggle('is-hidden',filter!=='all'&&!cats.includes(filter))})}))}

// Photography lightbox; navigate through currently visible shots and show caption.
const lb=q('.lightbox');if(lb){const img=q('.lightbox img'),caption=q('.lightbox-caption'),close=q('.lb-close'),prev=q('.lb-prev'),next=q('.lb-next');let idx=0;const visible=()=>qa('.photo-feature .shot,.photo-grid .shot').filter(s=>!s.classList.contains('is-hidden')&&!s.classList.contains('image-missing'));const show=i=>{const shots=visible();if(!shots.length)return;idx=(i+shots.length)%shots.length;const source=q('img',shots[idx]);img.src=source.src;img.alt=source.alt||`Frame ${idx+1}`;const fc=q('figcaption',shots[idx]);if(caption)caption.innerHTML=fc?fc.innerHTML:'';lb.classList.add('open');document.body.style.overflow='hidden'};qa('.photo-feature .shot,.photo-grid .shot').forEach(s=>s.addEventListener('click',()=>{const shots=visible();show(shots.indexOf(s))}));close?.addEventListener('click',()=>{lb.classList.remove('open');document.body.style.overflow=''});prev?.addEventListener('click',()=>show(idx-1));next?.addEventListener('click',()=>show(idx+1));lb.addEventListener('click',e=>{if(e.target===lb)close?.click()});addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')close?.click();if(e.key==='ArrowLeft')prev?.click();if(e.key==='ArrowRight')next?.click()})}
