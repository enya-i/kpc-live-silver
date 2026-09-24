// Apply the updated visual defaults once per browser; later manual choices still persist.
try{
 const versionKey='kpc-live:visual-defaults-version';
 if(localStorage.getItem(versionKey)!=='2'){
  localStorage.setItem('kpc-live:hero-background','crowd');
  localStorage.setItem('kpc-live:english-heading-font','italiana');
  localStorage.setItem('kpc-live:player-carousel','spotlight');
  localStorage.setItem('kpc-live:event-style','immersive');
  localStorage.setItem(versionKey,'2');
 }
}catch{}
