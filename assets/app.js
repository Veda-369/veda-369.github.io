const q=(s,c=document)=>c.querySelector(s), qa=(s,c=document)=>[...c.querySelectorAll(s)];
const progress=q('.progress');
const updateProgress=()=>{const h=document.documentElement.scrollHeight-innerHeight; if(progress) progress.style.width=`${h?scrollY/h*100:0}%`};
addEventListener('scroll',updateProgress,{passive:true}); updateProgress();

// Intro shutter screen (home only)
const intro=q('#intro-screen');
const shutterBtn=q('#shutter-btn');
if(intro && shutterBtn){
  const alreadySeen=sessionStorage.getItem('vedaIntroSeen')==='1';
  if(alreadySeen){
    intro.classList.add('hidden');
    intro.setAttribute('aria-hidden','true');
  }else{
    document.body.classList.add('pre-intro');
    shutterBtn.addEventListener('click',()=>{
      intro.classList.add('capturing');
      setTimeout(()=>{
        intro.classList.add('hidden');
        intro.setAttribute('aria-hidden','true');
        document.body.classList.remove('pre-intro');
        sessionStorage.setItem('vedaIntroSeen','1');
      },860);
    },{once:true});
  }
}

// Cursor
const cursor=q('.cursor'), dot=q('.cursor-dot');
if(cursor&&dot&&matchMedia('(pointer:fine)').matches){
  let x=-100,y=-100,cx=-100,cy=-100;
  addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;dot.style.left=x+'px';dot.style.top=y+'px'});
  const loop=()=>{cx+=(x-cx)*.14;cy+=(y-cy)*.14;cursor.style.left=cx+'px';cursor.style.top=cy+'px';requestAnimationFrame(loop)};loop();
  qa('a,button,.shot').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('big'));el.addEventListener('mouseleave',()=>cursor.classList.remove('big'))});
}

// Reveal
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
qa('.reveal').forEach(el=>io.observe(el));

// Mobile menu
const menuBtn=q('.menu-toggle'), mobile=q('.mobile-menu');
if(menuBtn&&mobile) menuBtn.addEventListener('click',()=>{mobile.classList.toggle('open');menuBtn.setAttribute('aria-expanded',mobile.classList.contains('open'))});

// active nav
const page=document.body.dataset.page; qa(`[data-nav="${page}"]`).forEach(a=>a.classList.add('active'));

// page transition on internal links
qa('a[href]').forEach(a=>a.addEventListener('click',e=>{
  const href=a.getAttribute('href');
  if(!href||href==='#'||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('http')||a.target==='_blank') return;
  e.preventDefault(); const wipe=q('.page-transition'); if(!wipe){location.href=href;return} wipe.className='page-transition in'; setTimeout(()=>location.href=href,520);
}));
addEventListener('pageshow',()=>{const wipe=q('.page-transition');if(wipe){wipe.className='page-transition out';setTimeout(()=>wipe.className='page-transition',800)}});

// subtle parallax for hero
const beam=q('.hero-beam');
if(beam&&matchMedia('(pointer:fine)').matches) addEventListener('mousemove',e=>{
  qa('.hero-beam').forEach((b,i)=>{
    const dx=(e.clientX/innerWidth-.5)*(i===0?18:-14),dy=(e.clientY/innerHeight-.5)*(i===0?20:-16);
    b.style.transform=`translate(${dx}px,${dy}px)`;
  });
});

// Photography lightbox
const lb=q('.lightbox');
if(lb){
  const shots=qa('.shot'), img=q('.lightbox img'), close=q('.lb-close'), prev=q('.lb-prev'), next=q('.lb-next'); let idx=0;
  const show=i=>{idx=(i+shots.length)%shots.length;img.src=q('img',shots[idx]).src;img.alt=q('img',shots[idx]).alt||`Frame ${idx+1}`;lb.classList.add('open');document.body.style.overflow='hidden'};
  shots.forEach((s,i)=>s.addEventListener('click',()=>show(i)));
  close.addEventListener('click',()=>{lb.classList.remove('open');document.body.style.overflow=''});
  prev.addEventListener('click',()=>show(idx-1));
  next.addEventListener('click',()=>show(idx+1));
  lb.addEventListener('click',e=>{if(e.target===lb){lb.classList.remove('open');document.body.style.overflow=''}});
  addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')close.click();if(e.key==='ArrowLeft')prev.click();if(e.key==='ArrowRight')next.click()});
}

// contact form status
const form=q('#contact-form'), status=q('#form-status');
if(form&&status) form.addEventListener('submit',()=>{status.textContent='Sending…';setTimeout(()=>status.textContent='Message submitted. Thank you.',1800)});
