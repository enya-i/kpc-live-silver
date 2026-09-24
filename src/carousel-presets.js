import './visual-defaults.js';
export const carouselPresets=[
 {id:'gallery',name:'精致画廊',description:'原版保留 · 四列肖像 / 平滑滑动'},
 {id:'spotlight',name:'聚光舞台',description:'中央聚焦 · 两侧退远 / 透视转场'},
 {id:'cinema',name:'电影长廊',description:'横幅构图 · 深色字幕 / 镜头视差'},
 {id:'deck',name:'银卡序列',description:'叠层卡组 · 银色轮廓 / 扇形展开'}
];
const key='kpc-live:player-carousel';
let current='spotlight';
try{const saved=localStorage.getItem(key);if(carouselPresets.some(p=>p.id===saved))current=saved}catch{}
export const getCarouselPreset=()=>current;
export function setCarouselPreset(id,save=false){
 if(!carouselPresets.some(p=>p.id===id))return false;
 current=id;document.documentElement.dataset.playerCarousel=id;
 let saved=true;if(save){try{localStorage.setItem(key,id)}catch{saved=false}}
 document.dispatchEvent(new CustomEvent('player-carousel-change'));
 return saved;
}
setCarouselPreset(current);
const autoplayKey='kpc-live:player-autoplay';
let autoplay=false;
try{autoplay=localStorage.getItem(autoplayKey)==='true'}catch{}
export const getCarouselAutoplay=()=>autoplay;
export function setCarouselAutoplay(value){
 autoplay=Boolean(value);let saved=true;
 try{localStorage.setItem(autoplayKey,String(autoplay))}catch{saved=false}
 document.dispatchEvent(new CustomEvent('player-autoplay-change'));
 return saved;
}
