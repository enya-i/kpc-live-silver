import {getCarouselAutoplay} from './carousel-presets.js';

export function setupPlayerCarousel(){
 const region=document.querySelector('.player-carousel');
 if(!region)return ()=>{};
 const track=region.querySelector('.player-track');
 const originals=[...track.querySelectorAll('.player-card')];
 const count=originals.length;
 if(!count)return ()=>{};
 const clones=()=>originals.map(card=>{const clone=card.cloneNode(true);clone.dataset.loopClone='true';clone.tabIndex=-1;clone.setAttribute('aria-hidden','true');return clone});
 track.prepend(...clones());track.append(...clones());
 const cards=[...track.children];
 const prev=region.querySelector('[data-player-prev]'),next=region.querySelector('[data-player-next]');
 const range=region.querySelector('.player-range'),progress=region.querySelector('.player-progress i');
 const events=new AbortController(),options={signal:events.signal};
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let frame,styleFrame,settleTimer,autoplayTimer,hovered=false,inView=false,moving=false;
 let activeIndex=Number(region.dataset.activePlayer)||0;
 const centered=()=>['spotlight','deck'].includes(document.documentElement.dataset.playerCarousel);
 const mod=i=>(i%count+count)%count;
 const cycle=()=>cards[count].offsetLeft-cards[0].offsetLeft;
 const position=i=>cards[i].offsetLeft-(centered()?(track.clientWidth-cards[i].offsetWidth)/2:0);
 function update(){
  const x=track.scrollLeft,center=x+track.clientWidth/2;
  let nearest=0,distance=Infinity;
  cards.forEach((card,i)=>{
   const d=(card.offsetLeft+card.offsetWidth/2-center)/card.offsetWidth;
   if(Math.abs(d)<distance){distance=Math.abs(d);nearest=i}
   card.style.setProperty('--distance',Math.max(-2,Math.min(2,d)));
   card.style.setProperty('--depth',Math.min(1,Math.abs(d)));
   card.style.zIndex=String(10-Math.min(9,Math.round(Math.abs(d)*2)));
  });
  const first=Math.max(0,cards.findIndex(c=>c.offsetLeft+c.offsetWidth>x+4));
  activeIndex=mod(centered()?nearest:first);region.dataset.activePlayer=activeIndex;
  cards.forEach((c,i)=>c.classList.toggle('is-featured',i===nearest));
  range.textContent=`${String(activeIndex+1).padStart(2,'0')} / ${String(count).padStart(2,'0')}`;
  const width=100/count;
  progress.style.width=`${width}%`;progress.style.left=`${activeIndex*width}%`;
  prev.disabled=next.disabled=count<2;
 }
 function settle(){
  clearTimeout(settleTimer);moving=false;
  const span=cycle(),base=position(count),x=track.scrollLeft;
  if(span&& (x<base-1||x>=base+span-1)){
   // Jump to an identical copy only after momentum ends, preserving the visible offset.
   const offset=((x-base)%span+span)%span;
   track.scrollTo({left:base+offset,behavior:'instant'});
  }
  update();
 }
 function layout(){
  const index=activeIndex;
  track.style.setProperty('--stage-width',`${document.documentElement.clientWidth}px`);
  cancelAnimationFrame(styleFrame);
  styleFrame=requestAnimationFrame(()=>{
   if(!track.isConnected)return;
   clearTimeout(settleTimer);moving=false;
   track.scrollTo({left:position(count+index),behavior:'instant'});update();
  });
 }
 function move(direction){
  if(moving)return;
  cancelAnimationFrame(styleFrame);
  const step=cards[count+1].offsetLeft-cards[count].offsetLeft;
  const target=direction==='start'?position(count):direction==='end'?position(count*2-1):track.scrollLeft+direction*step;
  moving=true;
  track.scrollTo({left:target,behavior:reduced.matches?'instant':'smooth'});
  clearTimeout(settleTimer);settleTimer=setTimeout(settle,180);
 }
 function restartAutoplay(){
  clearInterval(autoplayTimer);
  if(!getCarouselAutoplay()||reduced.matches)return;
  autoplayTimer=setInterval(()=>{
   if(inView&&!hovered&&!document.hidden&&!region.contains(document.activeElement)&&!document.querySelector('dialog[open]')&&!moving)move(1);
  },6000);
 }
 prev.addEventListener('click',()=>{move(-1);restartAutoplay()},options);
 next.addEventListener('click',()=>{move(1);restartAutoplay()},options);
 track.addEventListener('keydown',e=>{
  const directions={ArrowLeft:-1,ArrowRight:1,Home:'start',End:'end'};
  if(e.key in directions){e.preventDefault();move(directions[e.key]);restartAutoplay()}
 },options);
 track.addEventListener('scroll',()=>{
  moving=true;cancelAnimationFrame(frame);frame=requestAnimationFrame(update);
  clearTimeout(settleTimer);settleTimer=setTimeout(settle,160);
 },{...options,passive:true});
 region.addEventListener('pointerenter',()=>{hovered=true},options);
 region.addEventListener('pointerleave',()=>{hovered=false;restartAutoplay()},options);
 region.addEventListener('focusout',restartAutoplay,options);
 track.addEventListener('pointerdown',restartAutoplay,options);
 document.addEventListener('visibilitychange',restartAutoplay,options);
 document.addEventListener('player-carousel-change',layout,options);
 document.addEventListener('player-autoplay-change',restartAutoplay,options);
 reduced.addEventListener('change',restartAutoplay,options);
 window.addEventListener('resize',layout,options);
 const resize=new ResizeObserver(layout);resize.observe(track);
 const visibility=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;restartAutoplay()},{threshold:.25});visibility.observe(track);
 // Set the middle copy before the first paint, including the spotlight's full-width stage.
 track.style.setProperty('--stage-width',`${document.documentElement.clientWidth}px`);
 track.scrollTo({left:position(count+activeIndex),behavior:'instant'});update();restartAutoplay();
 return ()=>{
  events.abort();resize.disconnect();visibility.disconnect();
  cancelAnimationFrame(frame);cancelAnimationFrame(styleFrame);clearTimeout(settleTimer);clearInterval(autoplayTimer);
  track.querySelectorAll('[data-loop-clone]').forEach(card=>card.remove());
 };
}
