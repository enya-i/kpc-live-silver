import './visual-defaults.js';
const key='kpc-live:hero-background';
export const heroBackgrounds=[
 {id:'orbit',name:'银冠悬境',description:'悬浮皇冠 · 拉丝与镜面',kind:'AI · 3D 渲染概念',src:'/assets/hero-orbit-v4.webp',thumb:'/assets/hero-orbit-v4-thumb.webp',alt:'3D 渲染概念：悬浮倾斜的铂银皇冠与石墨色金属曲面'},
 {id:'monolith',name:'荣耀之形',description:'雕塑奖杯 · 曲面与光影',kind:'AI · 3D 渲染概念',src:'/assets/hero-monolith-v4.webp',thumb:'/assets/hero-monolith-v4-thumb.webp',alt:'3D 渲染概念：银色流线奖杯与交叠的深色金属弧面'},
 {id:'silver',name:'银光切面',description:'金属局部 · 现场光影',kind:'AI 摄影方向概念',src:'/assets/hero-silver-v3.webp',thumb:'/assets/hero-silver-v3-thumb.webp',alt:'摄影方向概念：银色冠军奖杯的切面与背景虚焦赛事灯光'},
 {id:'champion',name:'冠军加冕',description:'银色奖杯 · 夺冠情绪',kind:'AI 摄影方向概念',src:'/assets/hero-champion-v2.webp',thumb:'/assets/hero-champion-v2-thumb.webp',alt:'摄影方向概念：选手在观众面前举起银色冠军奖杯'},
 {id:'crowd',name:'全场沸腾',description:'胜负揭晓 · 情绪与共鸣',kind:'AI 摄影方向概念',src:'/assets/hero-crowd-v2.webp',thumb:'/assets/hero-crowd-v2-thumb.webp',alt:'摄影方向概念：赛桌选手与现场观众在胜负揭晓时自然庆祝'}
];
let selected='crowd';
try{const saved=localStorage.getItem(key);if(heroBackgrounds.some(b=>b.id===saved))selected=saved;else if(saved)localStorage.setItem(key,selected)}catch{}
export function getHeroBackground(){return heroBackgrounds.find(b=>b.id===selected)}
export function setHeroBackground(id,save=false){
 const item=heroBackgrounds.find(b=>b.id===id);if(!item)return false;
 selected=id;document.documentElement.dataset.heroBackground=id;
 const image=document.querySelector('.hero-art');
 if(image){image.src=item.src;image.alt=item.alt}
 let saved=true;if(save){try{localStorage.setItem(key,id)}catch{saved=false}}
 return saved;
}
setHeroBackground(selected);
