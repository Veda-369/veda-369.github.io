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

// Home entry gate. Show once per browser session; bypass on anchored returns or photo->data returns.
const entry=q('#site-entry'),shutter=q('#shutter-btn');
if(entry&&shutter){
  const params=new URLSearchParams(location.search);
  const sessionEntered=sessionStorage.getItem('veda_entered')==='1';
  const skipIntro=sessionEntered||Boolean(location.hash)||params.get('from')==='photo';
  if(skipIntro){
    sessionStorage.setItem('veda_entered','1');
    entry.remove();document.body.classList.remove('entry-locked');document.body.classList.add('site-entered');
    if(params.get('from')==='photo'){history.replaceState({},'',location.pathname+(location.hash||''));}
  }else{
    document.body.classList.add('entry-locked');
    shutter.addEventListener('click',()=>{
      if(entry.classList.contains('capturing'))return;
      playShutter();entry.classList.add('capturing');shutter.disabled=true;
      sessionStorage.setItem('veda_entered','1');
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
addEventListener('pageshow',()=>{const wipe=q('.page-transition');if(wipe){const currentMap={home:'to-home',experience:'to-experience',work:'to-work',skills:'to-skills',contact:'to-contact',photography:'to-photo'};wipe.className=`page-transition ${currentMap[document.body.dataset.page]||'to-home'} out`;setTimeout(()=>wipe.className='page-transition',730)}});

// Photo metadata. Known captions are matched by filename first, then by logical photo number.
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
const exactPhotoMeta={
  'photo 26 (5)':{title:'Bear Rock Shadow',place:'',categories:'nature landscapes'},
  'photo 26(5)':{title:'Bear Rock Shadow',place:'',categories:'nature landscapes'},
  'photo 26 (6)':{title:'Tuckaleechee Caverns',place:'Tennessee',categories:'nature travel'},
  'photo 26(6)':{title:'Tuckaleechee Caverns',place:'Tennessee',categories:'nature travel'}
};

const imageExt=/\.(jpe?g|png|webp)$/i;
const fileStem=name=>name.replace(/\.[^.]+$/,'').trim().toLowerCase();
function logicalPhotoIndex(name){
  const stem=fileStem(name);
  const dup=stem.match(/^photo\s*(\d+)\s*\(\s*(\d+)\s*\)$/i);
  if(dup)return Number(dup[1])+Number(dup[2]);
  const direct=stem.match(/^photo\s*(\d+)$/i);
  return direct?Number(direct[1]):Number.MAX_SAFE_INTEGER;
}
function metaForFile(name){
  const stem=fileStem(name);
  return exactPhotoMeta[stem]||photoMeta[logicalPhotoIndex(name)]||{title:'',place:'',categories:''};
}
function naturalPhotoSort(a,b){
  const ai=logicalPhotoIndex(a.name),bi=logicalPhotoIndex(b.name);
  if(ai!==bi)return ai-bi;
  return a.name.localeCompare(b.name,undefined,{numeric:true,sensitivity:'base'});
}
function priorityRank(file){
  const priority=[1,14,24,17,3,21,12,8];
  const idx=logicalPhotoIndex(file.name),rank=priority.indexOf(idx);
  return rank===-1?999:rank;
}
function arrangePhotos(files){
  return [...files].sort((a,b)=>{
    const pa=priorityRank(a),pb=priorityRank(b);
    if(pa!==pb)return pa-pb;
    return naturalPhotoSort(a,b);
  });
}

function setOrientation(img){
  const fig=img.closest('.shot');if(!fig||!img.naturalWidth||!img.naturalHeight)return;
  const ratio=img.naturalWidth/img.naturalHeight;
  fig.classList.remove('is-portrait','is-landscape','is-panorama');
  fig.classList.add(ratio<.92?'is-portrait':ratio>1.75?'is-panorama':'is-landscape');
  fig.dataset.orientation=ratio<.92?'portrait':ratio>1.75?'panorama':'landscape';
}

function createPhotoFigure(file,position){
  const meta=metaForFile(file.name);
  const fig=document.createElement('figure');
  fig.className='shot photo-item reveal';
  fig.dataset.photo=file.name;
  fig.dataset.category=meta.categories||'';
  const img=document.createElement('img');
  img.src=file.url;
  img.alt=meta.place?`${meta.title} — ${meta.place}`:(meta.title||file.name.replace(/\.[^.]+$/,''));
  img.loading=position<8?'eager':'lazy';
  img.decoding='async';
  img.setAttribute('draggable','false');
  const cap=document.createElement('figcaption');
  if(meta.title||meta.place)cap.innerHTML=`${meta.title?`<strong>${meta.title}</strong>`:''}${meta.place?`<span>${meta.place}</span>`:''}`;
  else cap.hidden=true;
  fig.append(img,cap);
  img.addEventListener('load',()=>setOrientation(img));
  img.addEventListener('error',()=>fig.classList.add('image-missing'));
  return fig;
}

async function getGitHubPhotos(){
  const endpoint='https://api.github.com/repos/Veda-369/veda-369.github.io/contents/photos';
  const response=await fetch(endpoint,{headers:{Accept:'application/vnd.github+json'},cache:'no-store'});
  if(!response.ok)throw new Error(`GitHub photo listing failed: ${response.status}`);
  const items=await response.json();
  return items.filter(item=>item.type==='file'&&imageExt.test(item.name)&&item.download_url)
    .map(item=>({name:item.name,url:item.download_url}));
}

// Local fallback for offline previews / temporary GitHub API failures.
function localFallbackPhotos(){
  const order=[1,14,24,17,3,21,12,8,0,2,4,5,6,7,9,10,11,13,15,16,18,19,20,22,23,25,26,27,28,29,30,31,32,33,34,35,36,37];
  return order.map(i=>({name:`photo ${i}.jpg`,url:`photos/photo ${i}.jpg`}));
}

// Hero image remains photo 0; the main gallery below is populated dynamically from the GitHub /photos folder.
const heroPhoto=q('.hero-shot img[data-photo-index="0"]');
if(heroPhoto){
  heroPhoto.addEventListener('load',()=>setOrientation(heroPhoto));
  heroPhoto.addEventListener('error',()=>heroPhoto.closest('.shot')?.classList.add('image-missing'));
}

const gallery=q('#photo-grid');
if(gallery){
  (async()=>{
    let files=[];
    try{
      files=arrangePhotos(await getGitHubPhotos());
    }catch(err){
      console.warn(err);
      files=localFallbackPhotos();
    }
    gallery.innerHTML='';
    files.forEach((file,i)=>gallery.appendChild(createPhotoFigure(file,i)));
    if('IntersectionObserver'in window){
      const photoIO=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');photoIO.unobserve(e.target)}}),{threshold:.04});
      qa('.photo-item').forEach(el=>photoIO.observe(el));
    }else qa('.photo-item').forEach(el=>el.classList.add('visible'));
  })();
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

// Best-effort image protection (cannot fully stop screenshots/downloads on the web).
document.addEventListener('contextmenu',e=>{if(e.target.closest('.photo-grid img,.photo-feature img,.lightbox img'))e.preventDefault()});
document.addEventListener('dragstart',e=>{if(e.target.closest('.photo-grid img,.photo-feature img,.lightbox img'))e.preventDefault()});
document.addEventListener('copy',e=>{if(document.body.dataset.page==='photography'){const sel=String(document.getSelection()).trim();if(sel){e.preventDefault();}}});
qa('.photo-grid img,.photo-feature img').forEach(img=>img.setAttribute('draggable','false'));


// Photography page: gentle cue + optional auto-scroll after 5 seconds.
if(document.body.dataset.page==='photography'){
  const hint=q('#photo-scroll-hint');
  let interacted=false;
  const stopAuto=()=>{interacted=true; if(hint) hint.classList.add('hide')};
  addEventListener('scroll',()=>{if(scrollY>40) stopAuto()},{passive:true});
  ['wheel','touchstart','keydown','mousedown'].forEach(evt=>addEventListener(evt,stopAuto,{passive:true}));
  setTimeout(()=>{
    if(!interacted && scrollY < 40){
      const target=q('#gallery');
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
      stopAuto();
    }
  },5000);
}

// V9.5: stronger best-effort photo protection.
if(document.body.dataset.page==='photography'){
  // Block browser context menus, drag/save gestures, and common Save Page/Image shortcuts.
  document.addEventListener('contextmenu',e=>e.preventDefault(),{capture:true});
  document.addEventListener('dragstart',e=>e.preventDefault(),{capture:true});
  document.addEventListener('selectstart',e=>{
    if(e.target.closest('.photo-grid,.photo-feature,.lightbox'))e.preventDefault();
  },{capture:true});
  document.addEventListener('keydown',e=>{
    const save=(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s';
    if(save){e.preventDefault();e.stopPropagation();}
  },{capture:true});

  // Some desktop capture utilities move focus away from the browser. Obscure photographs on blur.
  // This may stop some capture workflows, but OS-level screenshots can still bypass browser code.
  const obscure=()=>document.body.classList.add('photo-obscured');
  const reveal=()=>setTimeout(()=>document.body.classList.remove('photo-obscured'),90);
  window.addEventListener('blur',obscure);
  window.addEventListener('focus',reveal);
  document.addEventListener('visibilitychange',()=>document.hidden?obscure():reveal());
}
