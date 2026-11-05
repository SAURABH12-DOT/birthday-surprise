const $=id=>document.getElementById(id);

const colors=["#ff68b5","#ffd978","#a98cff","#ffffff","#ffb4dc"];

function burst(x,y,count=55){
  for(let i=0;i<count;i++){
    const p=document.createElement("i");
    p.className="p";
    p.style.left=x+"px";p.style.top=y+"px";
    p.style.color=colors[Math.floor(Math.random()*colors.length)];
    const a=Math.random()*Math.PI*2;
    const d=70+Math.random()*190;
    p.style.setProperty("--x",Math.cos(a)*d+"px");
    p.style.setProperty("--y",Math.sin(a)*d+"px");
    $("particles").appendChild(p);
    setTimeout(()=>p.remove(),1600);
  }
}

function hearts(){
  for(let i=0;i<24;i++){
    setTimeout(()=>{
      const h=document.createElement("i");
      h.className="heart";
      h.textContent=["♡","🤍","💗","✨"][Math.floor(Math.random()*4)];
      h.style.left=Math.random()*100+"%";
      h.style.setProperty("--x",(Math.random()*160-80)+"px");
      h.style.color=colors[Math.floor(Math.random()*colors.length)];
      $("particles").appendChild(h);
      setTimeout(()=>h.remove(),5200);
    },i*100);
  }
}

function sparkleSound(){
  try{
    const C=window.AudioContext||window.webkitAudioContext;
    const a=new C();
    [523.25,659.25,783.99,1046.5].forEach((f,i)=>{
      const o=a.createOscillator(),g=a.createGain();
      o.type="sine";o.frequency.value=f;
      const t=a.currentTime+i*.09;
      g.gain.setValueAtTime(.0001,t);
      g.gain.exponentialRampToValueAtTime(.05,t+.02);
      g.gain.exponentialRampToValueAtTime(.0001,t+.25);
      o.connect(g);g.connect(a.destination);
      o.start(t);o.stop(t+.28);
    });
  }catch(e){}
}

function toast(){
  $("toast").classList.add("show");
  setTimeout(()=>$("toast").classList.remove("show"),1800);
}

$("startBtn").onclick=()=>{
  $("startBtn").blur();
  document.querySelector(".intro").classList.add("hidden");
  setTimeout(()=>document.querySelector(".gift-screen").classList.remove("hidden"),650);
  toast();
};

let opened=false;

$("gift").onclick=()=>{
  if(opened)return;
  opened=true;
  $("gift").classList.add("open");
  sparkleSound();

  const r=$("gift").getBoundingClientRect();
  burst(r.left+r.width/2,r.top+r.height/2,80);

  setTimeout(()=>{
    document.querySelector(".gift-screen").classList.add("hidden");
    document.querySelector(".birthday").classList.remove("hidden");
    setTimeout(()=>{
      burst(innerWidth/2,innerHeight*.35,100);
      hearts();
      toast();
    },500);
  },1250);
};

$("againBtn").onclick=()=>{
  for(let i=0;i<4;i++){
    setTimeout(()=>burst(
      80+Math.random()*(innerWidth-160),
      80+Math.random()*(innerHeight*.45),
      65
    ),i*250);
  }
  hearts();
  sparkleSound();
  toast();
};

window.addEventListener("resize",()=>{});