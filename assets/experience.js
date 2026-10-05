/* WebAura immersive interaction layer. No build step required. */
(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav=document.querySelector('.nav');
  function navState(){if(nav)nav.classList.toggle('scrolled',window.scrollY>30)}
  navState(); window.addEventListener('scroll',navState,{passive:true});

  /* mobile menu */
  var menu=document.querySelector('.menu');
  var links=document.querySelector('.nav-links');
  if(menu&&links){
    menu.addEventListener('click',function(){
      var open=links.classList.toggle('mobile-open');
      links.style.cssText=open?'display:flex;position:absolute;top:78px;left:0;right:0;padding:22px 24px;background:rgba(7,7,10,.96);border-bottom:1px solid rgba(255,255,255,.1);flex-direction:column;align-items:flex-start;':'';
      menu.setAttribute('aria-expanded',open?'true':'false');
    });
  }

  /* reveal */
  if(!reduce&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})
    },{threshold:.12});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
  }else document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('visible')});

  /* Hero Three.js scene: lightweight, self-contained and gracefully optional. */
  var canvas=document.getElementById('hero-canvas');
  if(!canvas||!window.THREE||reduce)return;
  var THREE=window.THREE, renderer,scene,camera,group,clock=new THREE.Clock(),pointer={x:0,y:0},target={x:0,y:0};
  try{
    renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,alpha:true,powerPreference:'high-performance'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));
    renderer.setClearColor(0,0);
    scene=new THREE.Scene();
    camera=new THREE.PerspectiveCamera(35,1,.1,100);
    camera.position.z=6.8;
    group=new THREE.Group();
    scene.add(group);

    var ambient=new THREE.HemisphereLight(0xbfd5ff,0x08090d,1.8);scene.add(ambient);
    var key=new THREE.PointLight(0x82adff,18,12);key.position.set(3,2,4);scene.add(key);
    var fill=new THREE.PointLight(0xa78bfa,11,10);fill.position.set(-4,-2,1);scene.add(fill);

    var core=new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.45,5),
      new THREE.MeshPhysicalMaterial({color:0x10131b,metalness:.82,roughness:.2,clearcoat:1,clearcoatRoughness:.18,transmission:.12,transparent:true,opacity:.96})
    );
    group.add(core);

    var wire=new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.58,3),
      new THREE.MeshBasicMaterial({color:0x8db4ff,wireframe:true,transparent:true,opacity:.16})
    );
    group.add(wire);

    var ringMat=new THREE.MeshBasicMaterial({color:0x9fbfff,transparent:true,opacity:.24,side:THREE.DoubleSide});
    for(var i=0;i<3;i++){
      var ring=new THREE.Mesh(new THREE.TorusGeometry(1.95+i*.22,.008,8,180),ringMat.clone());
      ring.rotation.x=Math.PI*.42+i*.4; ring.rotation.y=i*.65; group.add(ring);
    }

    var starsGeo=new THREE.BufferGeometry(),count=260,arr=new Float32Array(count*3);
    for(var j=0;j<count;j++){var r=3+Math.random()*2.8,a=Math.random()*Math.PI*2,b=Math.acos(2*Math.random()-1);arr[j*3]=r*Math.sin(b)*Math.cos(a);arr[j*3+1]=r*Math.sin(b)*Math.sin(a);arr[j*3+2]=r*Math.cos(b)}
    starsGeo.setAttribute('position',new THREE.BufferAttribute(arr,3));
    var stars=new THREE.Points(starsGeo,new THREE.PointsMaterial({color:0xaec7ff,size:.018,transparent:true,opacity:.65}));
    scene.add(stars);

    function resize(){
      var rect=canvas.getBoundingClientRect(),w=Math.max(1,rect.width),h=Math.max(1,rect.height);
      renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
    }
    resize();window.addEventListener('resize',resize);
    canvas.parentElement.addEventListener('pointermove',function(e){
      var r=canvas.getBoundingClientRect();target.x=((e.clientX-r.left)/r.width-.5)*2;target.y=((e.clientY-r.top)/r.height-.5)*2;
    });
    canvas.parentElement.addEventListener('pointerleave',function(){target.x=0;target.y=0});
    window.addEventListener('scroll',function(){
      var y=Math.min(window.scrollY,900);
      group.position.z=-y*.00045;
      group.rotation.z=y*.00008;
    },{passive:true});

    function tick(){
      requestAnimationFrame(tick);
      var t=clock.getElapsedTime();
      pointer.x+=(target.x-pointer.x)*.035;pointer.y+=(target.y-pointer.y)*.035;
      group.rotation.y=t*.12+pointer.x*.22;group.rotation.x=Math.sin(t*.32)*.08+pointer.y*.13;
      group.position.y=Math.sin(t*.65)*.06;
      stars.rotation.y=t*.012;
      renderer.render(scene,camera);
    }
    tick();
  }catch(err){console.warn('WebAura 3D scene unavailable',err)}
})();
/* Micro-interactions */
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  document.querySelectorAll('.btn').forEach(function(btn){
    btn.addEventListener('pointermove',function(e){
      var r=btn.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.08,y=(e.clientY-r.top-r.height/2)*.08;
      btn.style.transform='translate('+x+'px,'+y+'px)';
    });
    btn.addEventListener('pointerleave',function(){btn.style.transform=''});
  });
})();
