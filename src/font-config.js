import {carouselPresets,getCarouselPreset,setCarouselPreset,getCarouselAutoplay,setCarouselAutoplay} from './carousel-presets.js';
import {heroBackgrounds,getHeroBackground,setHeroBackground} from './hero-backgrounds.js';
import './fonts.css';
import './font-config.css';
import './event-styles.css';

const storageKey='kpc-live:english-heading-font';
const options=[
 {id:'cormorant',name:'Cormorant Garamond',style:'原版 · 优雅古典',family:'Cormorant',scale:1,weight:300,italic:'italic'},
 {id:'bodoni',name:'Bodoni Moda',style:'时装感 · 高对比衬线',family:'"Bodoni Moda"',scale:.87,weight:400,italic:'italic'},
 {id:'cinzel',name:'Cinzel',style:'纪念碑感 · 罗马铭文',family:'Cinzel',scale:.74,weight:400,italic:'normal'},
 {id:'italiana',name:'Italiana',style:'纤细感 · 意式简约',family:'Italiana',scale:.86,weight:400,italic:'normal'},
 {id:'manrope',name:'Manrope',style:'现代感 · 极简无衬线',family:'Manrope',scale:.76,weight:300,italic:'normal'}
];
let current='italiana';
try{const saved=localStorage.getItem(storageKey);if(options.some(o=>o.id===saved))current=saved}catch{}
const wrapper=document.createElement('div');
wrapper.className='font-config';
wrapper.innerHTML=`<aside class="font-config-panel" id="font-config-panel" aria-labelledby="font-config-title" hidden>
 <div class="font-config-header"><div><span>GLOBAL STYLE</span><h2 id="font-config-title">视觉配置</h2></div><button type="button" class="font-config-close" aria-label="收起视觉配置"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div>
 <div class="visual-config-tabs" role="tablist" aria-label="视觉配置分类"><button id="background-tab" type="button" role="tab" aria-selected="true" aria-controls="background-options-panel" data-config-tab="background">首屏背景</button><button id="font-tab" type="button" role="tab" aria-selected="false" aria-controls="font-options-panel" tabindex="-1" data-config-tab="font">英文字体</button><button id="carousel-tab" type="button" role="tab" aria-selected="false" aria-controls="carousel-options-panel" tabindex="-1" data-config-tab="carousel">选手轮播</button><button id="event-tab" type="button" role="tab" aria-selected="false" aria-controls="event-options-panel" tabindex="-1" data-config-tab="event">赛事样式</button></div>
 <section id="background-options-panel" role="tabpanel" aria-labelledby="background-tab">
 <p class="font-config-intro">先选画面，再搭配字体。仅更换首屏背景。</p>
 <fieldset class="background-options"><legend class="sr-only">选择首屏背景方案</legend>${heroBackgrounds.map(item=>`<label class="background-option" data-background-option="${item.id}"><input type="radio" name="hero-background" value="${item.id}"><span class="background-option-body"><img src="${item.thumb}" alt="" loading="lazy" width="132" height="88"><span class="background-option-text"><strong>${item.name}</strong><span>${item.description}</span><small>${item.kind}</small></span><span class="background-check" aria-hidden="true">✓</span></span></label>`).join('')}</fieldset>
 <p class="background-source-note">本组画面为 AI 视觉概念，包含摄影与 3D 渲染方向，不代表真实赛事。</p>
 <div class="font-config-shortcuts"><a href="#/">回到首屏预览 ↗</a><button type="button" class="background-reset">恢复默认首屏</button></div>
 <p class="background-status font-config-status" role="status" aria-live="polite"></p>
 </section>
 <section id="font-options-panel" role="tabpanel" aria-labelledby="font-tab" hidden>
 <p class="font-config-intro">点选字体，实时比较全站标题效果。</p>
 <fieldset class="font-options"><legend class="sr-only">选择英文大标题字体</legend>${options.map(o=>`<label class="font-option" data-font-option="${o.id}"><input type="radio" name="heading-font" value="${o.id}"><span class="font-option-body"><span class="font-option-meta"><span>${o.name}</span><span class="font-option-check" aria-hidden="true">✓</span></span><span class="font-option-example" style="font-family:${o.family.replaceAll('"',"'")};font-weight:${o.weight}">ALL IN. GLORY.</span><span class="font-option-style">${o.style}</span></span></label>`).join('')}</fieldset>
 <div class="font-config-shortcuts"><a href="#/">看首屏 ↗</a><a href="#/home/about">看品牌宣言 ↗</a><button type="button" class="font-config-reset">恢复默认</button></div>
 <p class="font-status font-config-status" role="status" aria-live="polite"></p>
 </section>
 <section id="carousel-options-panel" role="tabpanel" aria-labelledby="carousel-tab" hidden>
 <p class="font-config-intro">四套样式均支持无缝循环，原版随时可恢复。</p>
 <fieldset class="font-options"><legend class="sr-only">选择轮播风格</legend>${carouselPresets.map(o=>`<label class="font-option" data-carousel-option="${o.id}"><input type="radio" name="player-carousel" value="${o.id}"><span class="font-option-body"><span class="font-option-meta"><span>${o.name}</span><span class="font-option-check" aria-hidden="true">✓</span></span><span class="carousel-mini ${o.id}" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="font-option-style">${o.description}</span></span></label>`).join('')}</fieldset>
 <div class="font-config-shortcuts"><a href="#/home/players">前往选手模块预览 ↗</a><button type="button" class="carousel-reset">恢复默认</button></div>
 <label class="carousel-autoplay"><span>自动播放<small>每 6 秒切换 · 悬停或查看详情时暂停</small></span><input type="checkbox" name="carousel-autoplay" aria-label="自动播放选手轮播"></label>
 <p class="carousel-status font-config-status" role="status" aria-live="polite"></p>
 </section>
 <section id="event-options-panel" role="tabpanel" aria-labelledby="event-tab" hidden>
 <p class="font-config-intro">保留原版，比较两种赛事呈现。</p>
 <fieldset class="font-options"><legend class="sr-only">选择赛事样式</legend>
 ${[{id:'classic',name:'经典图文',description:'原版保留 · 左图右文 / 简洁回顾'},{id:'immersive',name:'沉浸赛事',description:'一体化主视觉 · 银色信息 / 往届胶片'}].map(o=>`<label class="font-option"><input type="radio" name="event-style" value="${o.id}"><span class="font-option-body"><span class="font-option-meta"><span>${o.name}</span><span class="font-option-check" aria-hidden="true">✓</span></span><span class="event-mini ${o.id}" aria-hidden="true"><i></i><b></b></span><span class="font-option-style">${o.description}</span></span></label>`).join('')}
 </fieldset>
 <div class="font-config-shortcuts"><a href="#/home/events">前往赛事模块预览 ↗</a><button type="button" class="event-reset">恢复默认</button></div>
 <p class="event-status font-config-status" role="status"></p>
 </section>
 </aside>
 <button type="button" class="font-config-toggle" aria-controls="font-config-panel" aria-expanded="false"><span aria-hidden="true">Aa</span>视觉配置<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 12 5-5 5 5"/></svg></button>`;
document.body.append(wrapper);
const panel=wrapper.querySelector('.font-config-panel');
const toggle=wrapper.querySelector('.font-config-toggle');
const status=wrapper.querySelector('.font-status');
function apply(id,save=false){
 const option=options.find(o=>o.id===id);if(!option)return;
 current=id;
 const root=document.documentElement;
 root.dataset.headingFont=id;
 root.style.setProperty('--heading-font',`${option.family}, Georgia, serif`);
 root.style.setProperty('--heading-scale',option.scale);
 root.style.setProperty('--heading-weight',option.weight);
 root.style.setProperty('--heading-italic',option.italic);
 wrapper.querySelectorAll('input[name="heading-font"]').forEach(input=>input.checked=input.value===id);
 let saved=true;
 if(save){try{localStorage.setItem(storageKey,id)}catch{saved=false}}
 status.textContent=save?(saved?'已应用全站 · 已保存到此浏览器':'已应用全站 · 当前浏览器无法保存选择'):'全站同步 · 仅调整英文标题，保留中文与 Logo';
}
function setOpen(open,returnFocus=false){panel.hidden=!open;toggle.setAttribute('aria-expanded',String(open));if(returnFocus)toggle.focus()}
toggle.addEventListener('click',()=>setOpen(panel.hidden));
wrapper.querySelector('.font-config-close').addEventListener('click',()=>setOpen(false,true));
wrapper.querySelector('.font-config-reset').addEventListener('click',()=>apply('italiana',true));
wrapper.addEventListener('change',e=>{if(e.target.name==='heading-font')apply(e.target.value,true)});
wrapper.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();setOpen(false,true)}});
apply(current);

function applyBackground(id,save=false){
 const saved=setHeroBackground(id,save);
 wrapper.querySelectorAll('input[name="hero-background"]').forEach(input=>input.checked=input.value===id);
 wrapper.querySelector('.background-status').textContent=save?(saved?'已应用首屏 · 已保存到此浏览器':'已应用首屏 · 当前浏览器无法保存选择'):'与字体独立保存 · 页面文案及布局保持不变';
}
function selectTab(name){
 wrapper.querySelectorAll('[data-config-tab]').forEach(tab=>{const active=tab.dataset.configTab===name;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1});
 wrapper.querySelector('#background-options-panel').hidden=name!=='background';
 wrapper.querySelector('#font-options-panel').hidden=name!=='font';
 wrapper.querySelector('#carousel-options-panel').hidden=name!=='carousel';
 wrapper.querySelector('#event-options-panel').hidden=name!=='event';
 panel.scrollTop=0;
}
wrapper.querySelectorAll('[data-config-tab]').forEach(tab=>{
 tab.addEventListener('click',()=>selectTab(tab.dataset.configTab));
 tab.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();e.stopPropagation();const tabs=['background','font','carousel','event'];const index=tabs.indexOf(tab.dataset.configTab);const name=e.key==='Home'?tabs[0]:e.key==='End'?tabs.at(-1):tabs[(index+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length];selectTab(name);wrapper.querySelector(`[data-config-tab="${name}"]`).focus()}});
});
wrapper.addEventListener('change',e=>{if(e.target.name==='hero-background')applyBackground(e.target.value,true)});
wrapper.querySelector('.background-reset').addEventListener('click',()=>applyBackground('crowd',true));
applyBackground(getHeroBackground().id);

function applyCarousel(id,save=false){
 const saved=setCarouselPreset(id,save);
 wrapper.querySelectorAll('input[name="player-carousel"]').forEach(input=>input.checked=input.value===id);
 wrapper.querySelector('.carousel-status').textContent=save?(saved?'已应用轮播 · 已保存到此浏览器':'已应用轮播 · 当前浏览器无法保存选择'):'默认手动循环 · 减少动态效果时暂停自动播放';
}
wrapper.addEventListener('change',e=>{if(e.target.name==='player-carousel')applyCarousel(e.target.value,true)});
wrapper.querySelector('.carousel-reset').addEventListener('click',()=>applyCarousel('spotlight',true));
applyCarousel(getCarouselPreset());

const autoplayInput=wrapper.querySelector('[name="carousel-autoplay"]');
autoplayInput.checked=getCarouselAutoplay();
autoplayInput.addEventListener('change',()=>{
 const saved=setCarouselAutoplay(autoplayInput.checked);
 wrapper.querySelector('.carousel-status').textContent=(autoplayInput.checked?'自动播放已开启':'已切换为手动循环')+(saved?' · 已保存':' · 当前浏览器无法保存');
});

function applyEventStyle(id,save=false){
 if(!['classic','immersive'].includes(id))return;
 document.documentElement.dataset.eventStyle=id;
 wrapper.querySelectorAll('[name="event-style"]').forEach(input=>input.checked=input.value===id);
 let saved=true;
 if(save){try{localStorage.setItem('kpc-live:event-style',id)}catch{saved=false}}
 wrapper.querySelector('.event-status').textContent=save?(saved?'已应用赛事样式 · 已保存到此浏览器':'已应用 · 当前浏览器无法保存'):'与首屏、字体及选手轮播独立保存';
}
let eventStyle='immersive';
try{const saved=localStorage.getItem('kpc-live:event-style');if(['classic','immersive'].includes(saved))eventStyle=saved}catch{}
applyEventStyle(eventStyle);
wrapper.addEventListener('change',e=>{if(e.target.name==='event-style')applyEventStyle(e.target.value,true)});
wrapper.querySelector('.event-reset').addEventListener('click',()=>applyEventStyle('immersive',true));

// Retire the experimental light theme, including previously saved selections.
try{localStorage.removeItem('kpc-live:theme')}catch{}
delete document.documentElement.dataset.theme;
document.documentElement.style.colorScheme='dark';
