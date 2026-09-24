import {setupPlayerCarousel} from './player-carousel.js';
import {getHeroBackground} from './hero-backgrounds.js';
import './font-config.js';
import './video-library.css';
import {players,news,categories,films} from './data.js';

const main=document.querySelector('#main');
const dialog=document.querySelector('#detail-dialog');
const dialogContent=document.querySelector('#dialog-content');
const arrow='<span class="arrow" aria-hidden="true"></span>';
const homeSections=['players','events','videos','news','about','contact'];
let disposePlayerCarousel=()=>{};
let activeCategory='全部',activeSeason='all',filmQuery='',filmLimit=6,month=9,year=2026;
const filmCategories=['全部',...categories];
const photo=(name,alt,cls='')=>`<img class="${cls}" src="/assets/${name}" alt="${alt}" loading="lazy" width="1024" height="683">`;
const sectionTitle=(english,title,action='')=>`<div class="section-heading"><div><p class="eyebrow">${english}</p><h2>${title}</h2></div>${action}</div>`;
const textLink=(url,text)=>`<a class="text-link" href="${url}">${text}${arrow}</a>`;
const playerCards=()=>players.map((p,i)=>`<button class="player-card" data-player="${i}" aria-label="查看 ${p.name} 选手详情"><div class="player-photo">${photo(p.image,p.name+' 的选手肖像（基于官方卡面 AI 重绘）')}<span class="photo-index">${String(i+1).padStart(2,'0')}</span><span class="card-open">${arrow}</span></div><div class="player-caption"><h3>${p.name}</h3><span>${p.title}</span></div></button>`).join('');
const newsRows=()=>news.map(n=>`<a class="news-row" href="#/news/${n.id}"><span class="news-category">赛事战报</span><h3>${n.title}</h3><time>${n.date}</time>${arrow}</a>`).join('');
const filters=()=>`<div class="film-filters"><div class="tabs" role="tablist" aria-label="视频分类">${filmCategories.map(c=>`<button role="tab" aria-selected="${c===activeCategory}" data-category="${c}">${c}</button>`).join('')}</div></div><div class="film-library-tools"><label>赛季<select id="season"><option value="all">全部赛季</option><option value="S3">济州杯 2026 S3</option><option value="S2">济州杯 2026 S2</option><option value="S1">济州杯 2026 S1</option></select></label><label class="film-search">搜索视频<input id="film-search" type="search" placeholder="输入标题关键词" autocomplete="off"></label></div><div id="film-results" aria-live="polite"></div>`;

function home(){
return `<section class="hero" aria-label="KPC LIVE 品牌介绍">
  <img class="hero-art" src="${getHeroBackground().src}" alt="${getHeroBackground().alt}" fetchpriority="high" width="1536" height="1024">
  <div class="hero-copy"><h1><span>ALL IN.</span><span class="eternal">FOR ETERNAL</span><em>GLORY.</em></h1><p><span>汇聚全球顶级 PRO</span><b class="desktop-dot"> · </b><span>高额 Cash Game · 巅峰博弈</span></p><a class="outline-button" href="#/events">探索赛事 ${arrow}</a></div>
  <div class="hero-bottom"><span>KING POKER CUP</span><a href="#/players">向下探索<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 7 5 5 5-5"/></svg></a><button data-dialog="calendar">赛事日历 ${arrow}</button></div>
</section>
<section class="section players-section" id="players">${sectionTitle('THE PLAYERS','每一种锋芒，<br class="mobile-break">都值得被看见。',textLink('#/players/all','全部选手'))}<div class="player-carousel" role="region" aria-roledescription="轮播" aria-label="选手风采"><div class="player-grid player-track" id="player-track" tabindex="0" aria-label="左右滑动或使用方向键浏览全部选手">${playerCards()}</div><div class="player-navigation"><div class="player-position"><span class="player-range" aria-live="polite" aria-atomic="true"></span><span class="player-progress" aria-hidden="true"><i></i></span></div><div class="player-arrows"><button type="button" data-player-prev aria-label="查看前面的选手" aria-controls="player-track">${arrow}</button><button type="button" data-player-next aria-label="查看后面的选手" aria-controls="player-track">${arrow}</button></div></div></div><div class="section-caption"><span>认识 KPC LIVE 的顶级 PRO</span><span>真实牌局 · 非凡人物</span></div></section>
<section class="section events-section" id="events">${sectionTitle('THE TOURNAMENTS','下一场，向荣耀而行。','<button class="text-link" data-dialog="calendar">赛事日历 '+arrow+'</button>')}
  <div class="event-feature"><div class="event-image">${photo('event-silver-sculpture-v5.webp','原创银色雕塑奖杯与环形舞台灯光，AI 绘制赛事概念海报')}<div class="event-image-title"><span>KING POKER CUP</span><strong>THE NEXT<br><em>CHAPTER.</em></strong><span class="image-caption">KPC 济州 · 赛事现场回顾</span></div></div><div class="event-copy"><span class="status"><i></i> 即将开始</span><h3>KPC<br><em>JEJU</em></h3><p class="event-date">2026.10.10 — 10.21</p><p class="event-location">韩国 · 济州岛</p><div class="fine-rule"></div><p class="muted">全球顶级赛事，下一段竞技篇章。<br>在济州，见证属于你的荣耀时刻。</p><button class="outline-button" data-dialog="event">了解赛事 ${arrow}</button></div></div>
  <div class="event-archives"><button data-dialog="archive"><img class="event-archive-art archive-trophy" src="/assets/event-silver-trophy-v2.webp" alt="银色奖杯概念封面，AI 绘制" loading="lazy"><span>2026</span><strong>济州系列赛</strong><small>已结束</small><span>查看回顾 ${arrow}</span></button><button data-dialog="archive2025"><img class="event-archive-art archive-sculpture" src="/assets/event-silver-sculpture-v5.webp" alt="银色雕塑奖杯概念封面，AI 绘制" loading="lazy"><span>2025</span><strong>济州系列赛</strong><small>已结束</small><span>查看回顾 ${arrow}</span></button></div>
</section>
<section class="section film-section" id="videos">${sectionTitle('THE FILM ROOM','胜负之外，洞见牌局。',textLink('#/videos','查看全部'))}${filters()}</section>
<section class="section news-section" id="news">${sectionTitle('THE JOURNAL','荣耀，正在发生。',textLink('#/news','全部资讯'))}<div class="news-list">${newsRows()}</div></section>
<section class="brand-section" id="about"><p class="eyebrow">THE KPC LIVE PHILOSOPHY</p><h2><span>A HIGHER</span><span>LEVEL OF <em>PLAY.</em></span></h2><div class="brand-bottom"><h3>为竞技而生，<br>为荣耀而聚。</h3><div><p>KPC LIVE 汇聚全球顶级职业牌手，以高规格制作记录真实牌局，让每一次决策，都值得被看见。</p><p>从高额 Cash Game 到巅峰对决，我们关注胜负，更关注牌桌之上，冷静、智慧与勇气交汇的每一个瞬间。</p><a class="text-link" href="https://www.kpcpoker.com/?lang=zh" target="_blank" rel="noopener">了解 KPC ${arrow}</a></div></div></section>
<section class="partners-section section"><div><p class="eyebrow">OUR PARTNERS</p><h2>与卓越同行。</h2></div><a href="https://www.kpcpoker.com/?lang=zh" target="_blank" rel="noopener" class="partner-wordmark">KPC<small>KING POKER CUP</small></a><p class="muted">携手全球伙伴<br>共创德州扑克新篇章</p></section>
<section class="contact-section section" id="contact"><div><p class="eyebrow">LET’S CONNECT</p><h2>下一次相遇，<br><em>由此开始。</em></h2><p class="muted">赛事咨询、品牌合作，或更多关于 KPC LIVE 的故事。</p></div><div class="contact-details"><span>联系我们</span><a class="contact-phone" href="tel:+85259852381">+852 5985 2381</a><p>周一至周五 · 09:00–18:00（GMT+8）</p><a class="outline-button" href="https://wa.me/85259852381" target="_blank" rel="noopener">WhatsApp 发送消息 ${arrow}</a></div></section>`;
}
function filmCard(f,featured=false){return `<button class="film-card ${featured?'film-featured':''}" data-film="${f.id}"><div class="film-photo">${photo(f.image,f.title+'，内容概念封面')}<span class="play-circle" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 6 9 6-9 6Z"/></svg></span><span class="film-cover-label">${featured?'本期精选':'KPC LIVE'} · ${f.season}</span></div><div class="film-caption"><span>${f.category} / ${f.season}</span><h3>${f.title}</h3>${arrow}</div></button>`}
function filmResults(){
 const el=document.querySelector('#film-results');if(!el)return;
 const isHome=!!document.querySelector('#videos');
 const selected=films.filter(f=>(activeCategory==='全部'||f.category===activeCategory)&&(isHome||activeSeason==='all'||f.season===activeSeason)&&(isHome||f.title.toLowerCase().includes(filmQuery.toLowerCase().trim())));
 const visible=selected.slice(0,isHome?5:filmLimit);
 el.innerHTML=selected.length?`${!isHome?`<p class="film-result-count">共 ${selected.length} 部 · 已展示 ${visible.length} 部</p>`:''}${isHome?`<div class="film-home-feature">${filmCard(visible[0],true)}<div class="film-feature-note"><p class="eyebrow">CURATED HIGHLIGHTS</p><h3>每一手，<br>都有值得回看的瞬间。</h3><p>从关键决策到赛场幕后，走近牌局中的思考与故事。</p>${textLink('#/videos','进入影像馆')}</div></div><div class="film-preview-grid">${visible.slice(1).map(f=>filmCard(f)).join('')}</div>`:`<div class="film-library-grid">${visible.map(f=>filmCard(f)).join('')}</div>${visible.length<selected.length?`<button class="outline-button film-load-more" data-more-films>加载更多 · 还有 ${selected.length-visible.length} 部 ${arrow}</button>`:'<p class="film-end">已展示全部视频</p>'}`}<p class="content-note">内容编排预览 · 封面含赛事照片与 AI 概念图 · 播放源待接入</p>`:`<div class="empty-state"><span class="serif">STAY TUNED.</span><h3>暂无匹配视频</h3><p>试试其他分类、赛季或关键词。</p><button class="text-link" data-reset-films>重置筛选 ${arrow}</button></div>`;
 document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-selected',b.dataset.category===activeCategory));
 const select=document.querySelector('#season');if(select)select.value=activeSeason;
 const search=document.querySelector('#film-search');if(search&&search.value!==filmQuery)search.value=filmQuery;
}

function route(){
 disposePlayerCarousel();
 const path=location.hash.slice(1)||'/';
 const section=path.startsWith('/home/')?path.slice(6):path.slice(1);
 const isHomeRoute=path==='/'||(['/players','/events','/about','/contact'].includes(path))||(path.startsWith('/home/')&&homeSections.includes(section));
 const alreadyHome=Boolean(main.querySelector('.hero'));
 closeMenu();document.querySelectorAll('.language').forEach(d=>d.open=false);
 if(dialog.open)dialog.close();
 if(isHomeRoute){
  if(!alreadyHome){main.innerHTML=home();filmResults()}
  document.body.classList.add('is-home');
  requestAnimationFrame(()=>{const target=path==='/'?null:document.getElementById(section);const behavior=alreadyHome&&!matchMedia('(prefers-reduced-motion: reduce)').matches?'smooth':'instant';if(target)target.scrollIntoView({behavior});else window.scrollTo({top:0,behavior});updateHeader()});
 }else{
  document.body.classList.remove('is-home');
  if(path==='/videos')main.innerHTML=`<section class="section interior"><a class="back-link" href="#/">KPC LIVE / 影像馆</a><div class="interior-heading"><p class="eyebrow">THE FILM ROOM</p><h1>胜负之外，<em>洞见牌局。</em></h1><p>回顾 KPC LIVE 精彩对局，感受每一个改变局势的瞬间。</p></div>${filters()}</section>`;
  else if(path==='/players/all')main.innerHTML=`<section class="section interior"><a class="back-link" href="#/">KPC LIVE / 选手风采</a><div class="interior-heading"><p class="eyebrow">THE PLAYERS</p><h1>顶级牌手，<em>非凡锋芒。</em></h1><p>认识 KPC LIVE 的官方选手阵容。</p></div><div class="player-grid">${playerCards()}</div><p class="content-note">展示当前 KPC LIVE 官网的全部 9 位选手。</p></section>`;
  else if(path==='/news')main.innerHTML=`<section class="section interior"><a class="back-link" href="#/">KPC LIVE / 活动资讯</a><div class="interior-heading"><p class="eyebrow">THE JOURNAL</p><h1>荣耀，<em>正在发生。</em></h1><p>赛场内外，记录值得铭记的时刻。</p></div><div class="journal-grid">${news.map(n=>`<a class="journal-card" href="#/news/${n.id}">${photo(n.image,n.title)}<time>${n.date} · 赛事战报</time><h2>${n.title}</h2><span class="text-link">阅读资讯 ${arrow}</span></a>`).join('')}</div></section>`;
  else if(path.startsWith('/news/')){
   const n=news.find(n=>String(n.id)===path.split('/')[2]);
   main.innerHTML=n?`<article class="article section interior"><a class="back-link" href="#/news">${arrow} 返回活动资讯</a><header><p class="eyebrow">KING POKER CUP · 赛事战报</p><h1>${n.full}</h1><time>${n.date}</time></header>${photo(n.image,n.full,'article-image')}<div class="article-body"><p>${n.body}</p><p class="muted">本文为所提供官网内容框架的摘要呈现。完整赛况可通过报道原文查阅。</p><a class="text-link" href="${n.source}" target="_blank" rel="noopener">阅读赛事报道原文 ${arrow}</a></div><h2 class="more-heading">更多资讯</h2><div class="news-list">${newsRows()}</div></article>`:notFound();
  }else if(path==='/login')main.innerHTML=`<section class="login-page"><div class="login-visual"><img src="/assets/platinum-chip.png" alt="KPC 铂银筹码"><p>ALL IN.<br><em>FOR GLORY.</em></p></div><div class="login-panel"><a class="back-link" href="#/">${arrow} 返回首页</a><p class="eyebrow">WELCOME TO KPC LIVE</p><h1>回到你的<br><em>竞技世界。</em></h1><form id="login-form"><label for="email">电子邮箱</label><input id="email" name="email" type="email" autocomplete="email" required placeholder="you@example.com"><label for="password">密码</label><input id="password" name="password" type="password" autocomplete="current-password" minlength="8" required placeholder="请输入至少 8 位密码"><button type="submit" class="outline-button">登录 ${arrow}</button><p id="login-message" role="status"></p></form><p class="content-note">设计预览，尚未连接账号服务。请勿输入真实密码。</p><a href="https://www.kpclive.com/zh/login" target="_blank" rel="noopener" class="text-link">前往官方站登录 / 注册 ${arrow}</a></div></section>`;
  else main.innerHTML=notFound();
  window.scrollTo({top:0,behavior:'instant'});filmResults();
 }
 document.title=path==='/videos'?'视频解说 · KPC LIVE':path.startsWith('/news')?'活动资讯 · KPC LIVE':path==='/login'?'登录 · KPC LIVE':'KPC LIVE — All In for Eternal Glory';
 disposePlayerCarousel=setupPlayerCarousel();
 setupReveal();updateHeader();
}
function notFound(){return `<section class="section interior empty-state"><h1>这一页，尚未开局。</h1><a class="outline-button" href="#/">返回首页 ${arrow}</a></section>`}
function showDialog(content){dialogContent.innerHTML=content;dialog.showModal();document.body.classList.add('dialog-open')}
dialog.addEventListener('close',()=>{if(!dialog.open)document.body.classList.remove('dialog-open')});
const modal=(label,title,body)=>`<p class="eyebrow">${label}</p><h2 id="dialog-title" class="${/^[A-Z .]+$/.test(title)?'english-heading':''}">${title}</h2>${body}`;
function calendar(){
 const start=(new Date(year,month,1).getDay()+6)%7;const days=new Date(year,month+1,0).getDate();
 showDialog(modal('THE TOURNAMENT CALENDAR','赛事日历',`<div class="calendar-controls"><button data-month="-1" aria-label="上个月">←</button><h3>${year} 年 ${month+1} 月</h3><button data-month="1" aria-label="下个月">→</button></div><div class="calendar-grid">${['一','二','三','四','五','六','日'].map(d=>`<span class="calendar-week">${d}</span>`).join('')}${Array(start).fill('<span></span>').join('')}${Array.from({length:days},(_,i)=>`<span class="calendar-day ${year===2026&&month===9&&i>=9&&i<=20?'scheduled':''}">${i+1}</span>`).join('')}</div>${year===2026&&month===9?'<div class="calendar-event"><span class="status"><i></i> 10.10 — 10.21</span><h3>KPC POKER · 济州赛事</h3><p>韩国 · 济州岛</p><button class="text-link" data-dialog="event">查看赛事信息 '+arrow+'</button></div>':'<p class="calendar-empty">当前内容框架未提供本月赛程。</p><button class="text-link" data-calendar-reset>返回 2026 年 10 月 '+arrow+'</button>'}<p class="content-note">日期来自提供的内容框架，正式安排请以官方公告为准。</p>`));
}
function generalDialog(type){
 if(type==='calendar'){month=9;year=2026;calendar();return}
 if(type==='event')showDialog(modal('UPCOMING · JEJU','下一场，向荣耀而行。',`<p class="event-date">2026.10.10 — 10.21</p><p>韩国 · 济州岛</p><p class="muted">赛事日期来自提供的内容框架。具体赛程、报名资格及报名渠道尚未确认，请联系赛事团队获取正式信息。</p><div class="dialog-actions"><a class="outline-button" href="https://wa.me/85259852381" target="_blank" rel="noopener">咨询赛事 ${arrow}</a><button class="text-link" data-download-calendar>加入我的日历 ${arrow}</button></div>`));
 else if(type==='archive')showDialog(modal('THE ARCHIVE · 2026','回到荣耀现场。',`<p class="muted">浏览 2026 年济州系列赛的冠军时刻与赛事战报。</p><div class="dialog-news">${news.map(n=>`<a href="#/news/${n.id}">${n.title}${arrow}</a>`).join('')}</div>`));
 else if(type==='archive2025')showDialog(modal('THE ARCHIVE · 2025','2025 济州系列赛',`<p class="muted">内容框架记录了 2025 年赛事，尚未提供详细赛程和回顾正文。可前往官方资讯页查阅。</p><a class="outline-button" href="https://www.kpclive.com/zh/news" target="_blank" rel="noopener">官方赛事资讯 ${arrow}</a>`));
 else if(type==='preview')showDialog(modal('PLATINUM ARENA','关于这一版设计',`<p>这是 KPC LIVE 银色品牌官网的可交互设计原型。</p><p class="muted">首屏摄影及 3D 渲染方向为 AI 生成的概念素材，不代表真实人物或赛事；选手肖像基于 KPC LIVE 官方卡面经 AI 重绘；赛事图片引自 SoMuchPoker 的 KPC 赛事报道，用于视觉提案。正式发布前需替换为品牌方授权原图。字体 Cormorant Garamond 来自 Google Fonts。</p><p class="muted">视频为内容选题与封面编排预览，尚无播放源。账号、报名、商城、应用下载及法律文本未接入；不产生注册或报名记录。</p><div class="dialog-news">${players.map(p=>`<a href="${p.source}" target="_blank" rel="noopener">${p.name} · 图片与赛事来源 ${arrow}</a>`).join('')}</div>`));
 else if(type==='community')showDialog(modal('STAY CONNECTED','与 KPC 保持连接',`<p class="muted">Telegram、YouTube、X、Instagram 的具体官方账号链接尚未提供。可通过官方网站确认，或直接联系 WhatsApp。</p><div class="dialog-actions"><a class="outline-button" href="https://wa.me/85259852381" target="_blank" rel="noopener">WhatsApp ${arrow}</a><a class="text-link" href="https://www.kpclive.com/zh" target="_blank" rel="noopener">访问官方站 ${arrow}</a></div>`));
 else if(type==='app')showDialog(modal('TAKE KPC WITH YOU','随时随地，连接竞技。',`<p>App Store · Google Play · Android APK</p><p class="muted">应用下载入口已在内容框架中预留，实际商店及安装包链接尚未提供。请通过 KPC 官方站获取正式版本。</p><a class="outline-button" href="https://www.kpclive.com/zh" target="_blank" rel="noopener">前往官方站 ${arrow}</a>`));
 else if(type==='shop')showDialog(modal('THE KPC COLLECTION','KPC 商城',`<p class="muted">品牌商城已预留，商品与购买渠道尚未确认。联系 KPC 团队，了解最新品牌周边信息。</p><a class="outline-button" href="https://wa.me/85259852381" target="_blank" rel="noopener">联系 KPC ${arrow}</a>`));
}
function closeMenu(){const menu=document.querySelector('#mobile-menu');menu.hidden=true;document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}
document.addEventListener('click',e=>{
 const link=e.target.closest('a[href^="#/"]');
 if(link){if(link.closest('#mobile-menu'))closeMenu();if(link.hash===location.hash){e.preventDefault();route()}}
 const b=e.target.closest('button');if(!b)return;
 if(b.classList.contains('dialog-close'))dialog.close();
 if(b.classList.contains('menu-toggle')){const menu=document.querySelector('#mobile-menu');menu.hidden=!menu.hidden;b.setAttribute('aria-expanded',String(!menu.hidden));document.body.classList.toggle('menu-open',!menu.hidden)}
 if(b.dataset.dialog)generalDialog(b.dataset.dialog);
 if(b.dataset.player!==undefined){const p=players[Number(b.dataset.player)];showDialog(modal('THE PLAYERS',p.name,`${photo(p.image,p.name,'dialog-image player-detail-image')}<h3>${p.title}</h3><p class="muted">${p.description}</p><a href="${p.source}" target="_blank" rel="noopener" class="text-link">${p.sourceLabel} ${arrow}</a>`))}
 if(b.dataset.category){activeCategory=b.dataset.category;filmLimit=6;filmResults()}
 if(b.hasAttribute('data-reset-films')){activeCategory='全部';activeSeason='all';filmQuery='';filmLimit=6;filmResults()}
 if(b.hasAttribute('data-more-films')){filmLimit+=6;filmResults()}
 if(b.dataset.film){const f=films.find(f=>f.id===Number(b.dataset.film));showDialog(modal('THE FILM ROOM',f.title,`${photo(f.image,f.title,'dialog-image')}<p>${f.category} · 济州杯 2026 ${f.season}</p><p class="muted">这是影像馆的内容编排预览，标题为示例编排，封面包含赛事照片与 AI 概念图，不代表对应视频画面。原始视频与播放地址尚未提供，请前往官方视频页观看。</p><a class="outline-button" href="https://www.kpclive.com/zh/videos" target="_blank" rel="noopener">前往官方视频 ${arrow}</a>`))}
 if(b.dataset.legal){const title={Terms:'使用条款',Privacy:'隐私政策',Disclaimer:'免责声明'}[b.dataset.legal];showDialog(modal('LEGAL',title,`<p class="muted">当前内容框架不包含${title}正文。这一版不生成或替代正式法律文本。</p><a class="outline-button" href="https://www.kpclive.com/zh/${b.dataset.legal}" target="_blank" rel="noopener">查看官方${title} ${arrow}</a>`))}
 if(b.dataset.month){month+=Number(b.dataset.month);if(month<0){month=11;year--}if(month>11){month=0;year++}dialog.close();calendar()}
 if(b.hasAttribute('data-calendar-reset')){month=9;year=2026;dialog.close();calendar()}
 if(b.hasAttribute('data-download-calendar')){const ics='BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//KPC LIVE Design Preview//ZH\r\nBEGIN:VEVENT\r\nUID:kpc-jeju-20261010-preview@local\r\nDTSTAMP:20260921T000000Z\r\nDTSTART;VALUE=DATE:20261010\r\nDTEND;VALUE=DATE:20261022\r\nSUMMARY:KPC JEJU（待官方确认）\r\nLOCATION:韩国 济州岛\r\nDESCRIPTION:日期来自官网内容框架。请以官方公告为准。\r\nSTATUS:TENTATIVE\r\nEND:VEVENT\r\nEND:VCALENDAR';const url=URL.createObjectURL(new Blob([ics],{type:'text/calendar;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='KPC-JEJU-2026.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);b.textContent='日历文件已下载'}
});
document.addEventListener('change',e=>{if(e.target.id==='season'){activeSeason=e.target.value;filmLimit=6;filmResults()}});
document.addEventListener('submit',e=>{if(e.target.id==='login-form'){e.preventDefault();document.querySelector('#login-message').textContent='表单格式验证通过。此原型未连接账号服务，请前往官方站登录。';e.target.querySelector('#password').value=''}});
document.addEventListener('input',e=>{if(e.target.id==='film-search'){filmQuery=e.target.value;filmLimit=6;filmResults()}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();if(e.target.matches('[data-category]')&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const i=filmCategories.indexOf(activeCategory);activeCategory=e.key==='Home'?filmCategories[0]:e.key==='End'?filmCategories.at(-1):filmCategories[(i+(e.key==='ArrowRight'?1:filmCategories.length-1))%filmCategories.length];filmLimit=6;filmResults();document.querySelector(`[data-category="${activeCategory}"]`).focus()}});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
let observer;
function setupReveal(){observer?.disconnect();if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}}),{threshold:.08});document.querySelectorAll('.section-heading,.brand-bottom,.contact-details').forEach(el=>{el.classList.add('reveal');observer.observe(el)})}
function updateHeader(){
 document.querySelector('.site-header').classList.toggle('scrolled',window.scrollY>40);
 let active='';
 if(document.body.classList.contains('is-home')){
  for(const id of homeSections){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=Math.max(180,innerHeight*.35))active=id}
 }else{const id=(location.hash.slice(1)||'/').split('/')[1];if(homeSections.includes(id))active=id}
 document.querySelectorAll('a[data-section]').forEach(a=>{if(a.dataset.section===active)a.setAttribute('aria-current',document.body.classList.contains('is-home')?'location':'page');else a.removeAttribute('aria-current')});
}
window.addEventListener('scroll',updateHeader,{passive:true});window.addEventListener('hashchange',route);route();
