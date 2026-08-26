const q=(s,c=document)=>c.querySelector(s), qa=(s,c=document)=>[...c.querySelectorAll(s)];

const progress=q('.progress');
const updateProgress=()=>{const h=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=`${h?scrollY/h*100:0}%`};
addEventListener('scroll',updateProgress,{passive:true});updateProgress();

function playShutter(){
  try{
    const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
    const ctx=new AC();const master=ctx.createGain();master.gain.value=.14;master.connect(ctx.destination);
    const click=(start,duration,frequency,gain)=>{
      const length=Math.max(1,Math.floor(ctx.sampleRate*duration));
      const buffer=ctx.createBuffer(1,length,ctx.sampleRate);const data=buffer.getChannelData(0);
      for(let i=0;i<length;i++){const e=Math.exp(-i/(length*.15));data[i]=(Math.random()*2-1)*e}
      const src=ctx.createBufferSource();src.buffer=buffer;
      const filter=ctx.createBiquadFilter();filter.type='bandpass';filter.frequency.value=frequency;filter.Q.value=1.6;
      const g=ctx.createGain();g.gain.setValueAtTime(gain,ctx.currentTime+start);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+start+duration);
      src.connect(filter);filter.connect(g);g.connect(master);src.start(ctx.currentTime+start);
    };
    click(0,.038,3400,.62);click(.048,.050,1850,.50);click(.112,.034,4100,.24);
    const motor=ctx.createOscillator(),mg=ctx.createGain();motor.type='triangle';motor.frequency.setValueAtTime(310,ctx.currentTime+.01);motor.frequency.exponentialRampToValueAtTime(145,ctx.currentTime+.14);mg.gain.setValueAtTime(.035,ctx.currentTime);mg.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.16);motor.connect(mg);mg.connect(master);motor.start();motor.stop(ctx.currentTime+.17);
    setTimeout(()=>ctx.close?.(),420);
  }catch(_e){}
}

// Home entry gate. Returning from photography or an anchored project bypasses the gate.
const entry=q('#site-entry'),shutter=q('#shutter-btn');
if(entry&&shutter){
  const params=new URLSearchParams(location.search);
  const skipIntro=Boolean(location.hash)||params.get('from')==='photo';
  if(skipIntro){
    entry.remove();document.body.classList.remove('entry-locked');document.body.classList.add('site-entered');
    if(params.get('from')==='photo'){history.replaceState({},'',location.pathname+(location.hash||''));}
  }else{
    document.body.classList.add('entry-locked');
    shutter.addEventListener('click',()=>{
      if(entry.classList.contains('capturing'))return;
      playShutter();entry.classList.add('capturing');shutter.disabled=true;
      setTimeout(()=>entry.classList.add('exit'),690);
      setTimeout(()=>{entry.remove();document.body.classList.remove('entry-locked');document.body.classList.add('site-entered')},1150);
    },{once:true});
  }
}

// Cursor
const cursor=q('.cursor'),dot=q('.cursor-dot');
if(cursor&&dot&&matchMedia('(pointer:fine)').matches){
  let x=-100,y=-100,cx=-100,cy=-100;
  addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;dot.style.left=x+'px';dot.style.top=y+'px'});
  const loop=()=>{cx+=(x-cx)*.14;cy+=(y-cy)*.14;cursor.style.left=cx+'px';cursor.style.top=cy+'px';requestAnimationFrame(loop)};loop();
  qa('a,button,.shot,.project-card').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('big'));el.addEventListener('mouseleave',()=>cursor.classList.remove('big'))});
}

// Reveal
if('IntersectionObserver'in window){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});
  qa('.reveal').forEach(el=>io.observe(el));
}else qa('.reveal').forEach(el=>el.classList.add('visible'));

// Mobile menu
const menuBtn=q('.menu-toggle'),mobile=q('.mobile-menu');
if(menuBtn&&mobile)menuBtn.addEventListener('click',()=>{mobile.classList.toggle('open');menuBtn.setAttribute('aria-expanded',mobile.classList.contains('open'))});

// Active nav
const page=document.body.dataset.page;qa(`[data-nav="${page}"]`).forEach(a=>a.classList.add('active'));

// Build richer transition overlay once per page.
const modeTransition=document.createElement('div');
modeTransition.className='mode-transition';
modeTransition.innerHTML='<div class="pipeline"></div>';
document.body.appendChild(modeTransition);

const targetClass=href=>{
  try{
    const u=new URL(href,location.href),p=u.pathname.split('/').pop()||'index.html';
    if(p==='experience.html')return'to-experience';
    if(p==='work.html')return'to-work';
    if(p==='skills.html')return'to-skills';
    if(p==='contact.html')return'to-contact';
    return'to-home';
  }catch{return'to-home'}
};

const runModeTransition=(mode,href)=>{
  modeTransition.className=`mode-transition ${mode}-mode active`;
  if(mode==='photo')playShutter();
  setTimeout(()=>{location.href=href},mode==='photo'?700:820);
};

// Internal navigation: photography gets a camera flash, return-to-data gets a pipeline load,
// and regular sections each use a different transition color.
qa('a[href]').forEach(a=>a.addEventListener('click',e=>{
  const href=a.getAttribute('href');
  if(!href||href.startsWith('#')||href.startsWith('http')||href.startsWith('mailto:')||a.target==='_blank')return;
  const url=new URL(href,location.href);
  if(url.pathname===location.pathname&&url.hash)return;

  const explicit=a.dataset.transition;
  const goingPhoto=url.pathname.endsWith('/photography.html')||url.pathname.endsWith('photography.html');
  if(explicit==='data'){
    e.preventDefault();runModeTransition('data',href);return;
  }
  if(explicit==='photo'||goingPhoto){
    e.preventDefault();runModeTransition('photo',href);return;
  }

  e.preventDefault();
  const wipe=q('.page-transition');
  if(!wipe){location.href=href;return}
  wipe.className=`page-transition ${targetClass(href)} in`;
  setTimeout(()=>location.href=href,470);
}));
addEventListener('pageshow',()=>{const wipe=q('.page-transition');if(wipe){const currentMap={home:'to-home',experience:'to-experience',work:'to-work',skills:'to-skills',contact:'to-contact',photography:'to-home'};wipe.className=`page-transition ${currentMap[document.body.dataset.page]||'to-home'} out`;setTimeout(()=>wipe.className='page-transition',730)}});

// Photo metadata. Numbers refer to the visible filenames: photo 0.jpg, photo 1.jpg, etc.
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

function photoCandidates(i){
  const list=[`photos/photo ${i}.jpg`,`photos/photo${i}.jpg`];
  if(i>=27){
    const n=i-26;
    list.push(`photos/photo 26(${n}).jpg`,`photos/photo 26 (${n}).jpg`,`photos/photo26(${n}).jpg`);
  }
  return [...new Set(list)];
}

function loadPhotoWithFallback(img,i,onFail){
  const candidates=photoCandidates(i);let at=0;
  const next=()=>{
    if(at>=candidates.length){onFail?.();return}
    img.src=candidates[at++];
  };
  img.addEventListener('error',next);
  next();
}

function setOrientation(img){
  const fig=img.closest('.shot');if(!fig||!img.naturalWidth||!img.naturalHeight)return;
  const ratio=img.naturalWidth/img.naturalHeight;
  fig.classList.remove('is-portrait','is-landscape','is-panorama');
  fig.classList.add(ratio<.92?'is-portrait':ratio>1.75?'is-panorama':'is-landscape');
  fig.dataset.orientation=ratio<.92?'portrait':ratio>1.75?'panorama':'landscape';
}

// Hero photo 0 supports the same filename fallbacks.
const heroPhoto=q('.hero-shot img[data-photo-index="0"]');
if(heroPhoto){
  const heroFig=heroPhoto.closest('.shot');
  loadPhotoWithFallback(heroPhoto,0,()=>heroFig?.classList.add('image-missing'));
  heroPhoto.addEventListener('load',()=>setOrientation(heroPhoto));
}

// Gallery supports photo 1 through photo 38 and silently hides files that do not exist.
// This accommodates 38-image sets that start at photo 0, as well as Windows-style photo 26(1) duplicates.
const gallery=q('#photo-grid');
if(gallery){
  for(let i=1;i<=38;i++){
    const meta=photoMeta[i]||{title:'',place:'',categories:''};
    const fig=document.createElement('figure');fig.className='shot photo-item reveal';fig.dataset.photo=String(i);fig.dataset.category=meta.categories||'';
    const img=document.createElement('img');img.alt=meta.place?`${meta.title} — ${meta.place}`:(meta.title||`Photo ${i}`);img.loading=i<6?'eager':'lazy';img.decoding='async';
    const cap=document.createElement('figcaption');
    if(meta.title||meta.place)cap.innerHTML=`${meta.title?`<strong>${meta.title}</strong>`:''}${meta.place?`<span>${meta.place}</span>`:''}`;
    else cap.hidden=true;
    fig.append(img,cap);gallery.appendChild(fig);
    loadPhotoWithFallback(img,i,()=>fig.classList.add('image-missing'));
    img.addEventListener('load',()=>setOrientation(img));
  }

  if('IntersectionObserver'in window){
    const photoIO=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');photoIO.unobserve(e.target)}}),{threshold:.04});
    qa('.photo-item').forEach(el=>photoIO.observe(el));
  }else qa('.photo-item').forEach(el=>el.classList.add('visible'));
}

// Photography lightbox.
const lb=q('.lightbox');
if(lb){
  const img=q('.lightbox img'),caption=q('.lightbox-caption'),close=q('.lb-close'),prev=q('.lb-prev'),next=q('.lb-next');let idx=0;
  const visible=()=>qa('.photo-feature .shot,.photo-grid .shot').filter(s=>!s.classList.contains('image-missing'));
  const show=i=>{
    const shots=visible();if(!shots.length)return;idx=(i+shots.length)%shots.length;
    const source=q('img',shots[idx]);img.src=source.src;img.alt=source.alt||`Frame ${idx+1}`;
    const fc=q('figcaption',shots[idx]);if(caption)caption.innerHTML=fc&&!fc.hidden?fc.innerHTML:'';
    lb.classList.add('open');document.body.style.overflow='hidden';
  };
  document.addEventListener('click',e=>{const shot=e.target.closest('.photo-feature .shot,.photo-grid .shot');if(shot){const shots=visible();show(shots.indexOf(shot))}});
  close?.addEventListener('click',()=>{lb.classList.remove('open');document.body.style.overflow=''});
  prev?.addEventListener('click',()=>show(idx-1));next?.addEventListener('click',()=>show(idx+1));
  lb.addEventListener('click',e=>{if(e.target===lb)close?.click()});
  addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')close?.click();if(e.key==='ArrowLeft')prev?.click();if(e.key==='ArrowRight')next?.click()});
}
