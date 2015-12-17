!function(){"use strict";function t(i,s){return t.instance_?t.instance_:(t.instance_=this,this.outerContainerEl=document.querySelector(i),this.containerEl=null,this.config=s||t.config,this.dimensions=t.defaultDimensions,this.canvas=null,this.canvasCtx=null,this.tRex=null,this.distanceMeter=null,this.distanceRan=0,this.highestScore=0,this.time=0,this.runningTime=0,this.msPerFrame=1e3/g,this.currentSpeed=this.config.SPEED,this.obstacles=[],this.started=!1,this.activated=!1,this.crashed=!1,this.paused=!1,this.resizeTimerId_=null,this.playCount=0,this.audioBuffer=null,this.soundFx={},this.audioContext=null,this.images={},this.imagesLoaded=0,void this.loadImages())}function i(t,i){return Math.floor(Math.random()*(i-t+1))+t}function s(t){C&&window.navigator.vibrate(t)}function e(i,s,e,n){var h=document.createElement("canvas");return h.className=n?t.classes.CANVAS+" "+n:t.classes.CANVAS,h.width=s,h.height=e,i.appendChild(h),h}function n(t){for(var i=t.length/4*3,s=atob(t),e=new ArrayBuffer(i),n=new Uint8Array(e),h=0;i>h;h++)n[h]=s.charCodeAt(h);return n.buffer}function h(t,i,s,e){this.canvas=t,this.canvasCtx=t.getContext("2d"),this.canvasDimensions=e,this.textSprite=i,this.restartImg=s,this.draw()}function o(i,s,e){var n=(t.defaultDimensions.WIDTH+i.xPos,new d(s.xPos+1,s.yPos+1,s.config.WIDTH-2,s.config.HEIGHT-2)),h=new d(i.xPos+1,i.yPos+1,i.typeConfig.width*i.size-2,i.typeConfig.height-2);if(e&&r(e,n,h),c(n,h))for(var o=i.collisionBoxes,u=l.collisionBoxes,m=0;m<u.length;m++)for(var T=0;T<o.length;T++){var I=a(u[m],n),E=a(o[T],h),f=c(I,E);if(e&&r(e,I,E),f)return[I,E]}return!1}function a(t,i){return new d(t.x+i.x,t.y+i.y,t.width,t.height)}function r(t,i,s){t.save(),t.strokeStyle="#f00",t.strokeRect(i.x,i.y,i.width,i.height),t.strokeStyle="#0f0",t.strokeRect(s.x,s.y,s.width,s.height),t.restore()}function c(t,i){var s=!1,e=(t.x,t.y,i.x);i.y;return t.x<e+i.width&&t.x+t.width>e&&t.y<i.y+i.height&&t.height+t.y>i.y&&(s=!0),s}function d(t,i,s,e){this.x=t,this.y=i,this.width=s,this.height=e}function u(t,s,e,n,h,o){this.canvasCtx=t,this.image=e,this.typeConfig=s,this.gapCoefficient=h,this.size=i(1,u.MAX_OBSTACLE_LENGTH),this.dimensions=n,this.remove=!1,this.xPos=0,this.yPos=this.typeConfig.yPos,this.width=0,this.collisionBoxes=[],this.gap=0,this.init(o)}function l(t,i){this.canvas=t,this.canvasCtx=t.getContext("2d"),this.image=i,this.xPos=0,this.yPos=0,this.groundYPos=0,this.currentFrame=0,this.currentAnimFrames=[],this.blinkDelay=0,this.animStartTime=0,this.timer=0,this.msPerFrame=1e3/g,this.config=l.config,this.status=l.status.WAITING,this.jumping=!1,this.jumpVelocity=0,this.reachedMinHeight=!1,this.speedDrop=!1,this.jumpCount=0,this.jumpspotX=0,this.init()}function m(t,i,s){this.canvas=t,this.canvasCtx=t.getContext("2d"),this.image=i,this.x=0,this.y=5,this.currentDistance=0,this.maxScore=0,this.highScore=0,this.container=null,this.digits=[],this.acheivement=!1,this.defaultString="",this.flashTimer=0,this.flashIterations=0,this.config=m.config,this.init(s)}function T(t,s,e){this.canvas=t,this.canvasCtx=this.canvas.getContext("2d"),this.image=s,this.containerWidth=e,this.xPos=e,this.yPos=0,this.remove=!1,this.cloudGap=i(T.config.MIN_CLOUD_GAP,T.config.MAX_CLOUD_GAP),this.init()}function I(t,i){this.image=i,this.canvas=t,this.canvasCtx=t.getContext("2d"),this.sourceDimensions={},this.dimensions=I.dimensions,this.sourceXPos=[0,this.dimensions.WIDTH],this.xPos=[],this.yPos=0,this.bumpThreshold=.5,this.setSourceDimensions(),this.draw()}function E(t,i,s,e){this.canvas=t,this.canvasCtx=this.canvas.getContext("2d"),this.config=E.config,this.dimensions=s,this.gapCoefficient=e,this.obstacles=[],this.horizonOffsets=[0,0],this.cloudFrequency=this.config.CLOUD_FREQUENCY,this.clouds=[],this.cloudImg=i.CLOUD,this.cloudSpeed=this.config.BG_CLOUD_SPEED,this.horizonImg=i.HORIZON,this.horizonLine=null,this.obstacleImgs={CACTUS_SMALL:i.CACTUS_SMALL,CACTUS_LARGE:i.CACTUS_LARGE},this.init()}window.Runner=t;var f=600,g=60,p=window.devicePixelRatio>1,C=window.navigator.userAgent.indexOf("Mobi")>-1;"ontouchstart"in window;t.config={ACCELERATION:.001,BG_CLOUD_SPEED:.2,BOTTOM_PAD:10,CLEAR_TIME:3e3,CLOUD_FREQUENCY:.5,GAMEOVER_CLEAR_TIME:750,GAP_COEFFICIENT:.6,GRAVITY:.6,INITIAL_JUMP_VELOCITY:12,MAX_CLOUDS:6,MAX_OBSTACLE_LENGTH:3,MAX_SPEED:12,MIN_JUMP_HEIGHT:35,MOBILE_SPEED_COEFFICIENT:1.2,RESOURCE_TEMPLATE_ID:"audio-resources",SPEED:6,SPEED_DROP_COEFFICIENT:3},t.defaultDimensions={WIDTH:f,HEIGHT:150},t.classes={CANVAS:"runner-canvas",CONTAINER:"runner-container",CRASHED:"crashed",ICON:"icon-offline",TOUCH_CONTROLLER:"controller"},t.imageSources={LDPI:[{name:"CACTUS_LARGE",id:"1x-obstacle-large"},{name:"CACTUS_SMALL",id:"1x-obstacle-small"},{name:"CLOUD",id:"1x-cloud"},{name:"HORIZON",id:"1x-horizon"},{name:"RESTART",id:"1x-restart"},{name:"TEXT_SPRITE",id:"1x-text"},{name:"TREX",id:"1x-trex"}],HDPI:[{name:"CACTUS_LARGE",id:"2x-obstacle-large"},{name:"CACTUS_SMALL",id:"2x-obstacle-small"},{name:"CLOUD",id:"2x-cloud"},{name:"HORIZON",id:"2x-horizon"},{name:"RESTART",id:"2x-restart"},{name:"TEXT_SPRITE",id:"2x-text"},{name:"TREX",id:"2x-trex"}]},t.sounds={BUTTON_PRESS:"offline-sound-press",HIT:"offline-sound-hit",SCORE:"offline-sound-reached"},t.keycodes={JUMP:{38:1,32:1},DUCK:{40:1},RESTART:{13:1}},t.events={ANIM_END:"webkitAnimationEnd",CLICK:"click",KEYDOWN:"keydown",KEYUP:"keyup",MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",RESIZE:"resize",TOUCHEND:"touchend",TOUCHSTART:"touchstart",VISIBILITY:"visibilitychange",BLUR:"blur",FOCUS:"focus",LOAD:"load"},t.prototype={updateConfigSetting:function(t,i){if(t in this.config&&void 0!=i)switch(this.config[t]=i,t){case"GRAVITY":case"MIN_JUMP_HEIGHT":case"SPEED_DROP_COEFFICIENT":this.tRex.config[t]=i;break;case"INITIAL_JUMP_VELOCITY":this.tRex.setJumpVelocity(i);break;case"SPEED":this.setSpeed(i)}},loadImages:function(){for(var i=p?t.imageSources.HDPI:t.imageSources.LDPI,s=i.length,e=s-1;e>=0;e--){var n=i[e];this.images[n.name]=document.getElementById(n.id)}this.init()},loadSounds:function(){this.audioContext=new AudioContext;var i=document.getElementById(this.config.RESOURCE_TEMPLATE_ID).content;for(var s in t.sounds){var e=i.getElementById(t.sounds[s]).src;e=e.substr(e.indexOf(",")+1);var h=n(e);this.audioContext.decodeAudioData(h,function(t,i){this.soundFx[t]=i}.bind(this,s))}},setSpeed:function(t){var i=t||this.currentSpeed;if(this.dimensions.WIDTH<f){var s=i*this.dimensions.WIDTH/f*this.config.MOBILE_SPEED_COEFFICIENT;this.currentSpeed=s>i?i:s}else t&&(this.currentSpeed=t)},init:function(){document.querySelector("."+t.classes.ICON).style.visibility="hidden",this.adjustDimensions(),this.setSpeed(),this.containerEl=document.createElement("div"),this.containerEl.className=t.classes.CONTAINER,this.canvas=e(this.containerEl,this.dimensions.WIDTH,this.dimensions.HEIGHT,t.classes.PLAYER),this.canvasCtx=this.canvas.getContext("2d"),this.canvasCtx.fillStyle="#f7f7f7",this.canvasCtx.fill(),t.updateCanvasScaling(this.canvas),this.horizon=new E(this.canvas,this.images,this.dimensions,this.config.GAP_COEFFICIENT),this.distanceMeter=new m(this.canvas,this.images.TEXT_SPRITE,this.dimensions.WIDTH),this.tRex=new l(this.canvas,this.images.TREX),this.outerContainerEl.appendChild(this.containerEl),C&&this.createTouchController(),this.startListening(),this.update(),window.addEventListener(t.events.RESIZE,this.debounceResize.bind(this))},createTouchController:function(){this.touchController=document.createElement("div"),this.touchController.className=t.classes.TOUCH_CONTROLLER},debounceResize:function(){this.resizeTimerId_||(this.resizeTimerId_=setInterval(this.adjustDimensions.bind(this),250))},adjustDimensions:function(){clearInterval(this.resizeTimerId_),this.resizeTimerId_=null;var i=window.getComputedStyle(this.outerContainerEl),s=Number(i.paddingLeft.substr(0,i.paddingLeft.length-2));this.dimensions.WIDTH=this.outerContainerEl.offsetWidth-2*s,this.canvas&&(this.canvas.width=this.dimensions.WIDTH,this.canvas.height=this.dimensions.HEIGHT,t.updateCanvasScaling(this.canvas),this.distanceMeter.calcXPos(this.dimensions.WIDTH),this.clearCanvas(),this.horizon.update(0,0,!0),this.tRex.update(0),this.activated||this.crashed?(this.containerEl.style.width=this.dimensions.WIDTH+"px",this.containerEl.style.height=this.dimensions.HEIGHT+"px",this.distanceMeter.update(0,Math.ceil(this.distanceRan)),this.stop()):this.tRex.draw(0,0),this.crashed&&this.gameOverPanel&&(this.gameOverPanel.updateDimensions(this.dimensions.WIDTH),this.gameOverPanel.draw()))},playIntro:function(){if(this.started||this.crashed)this.crashed&&this.restart();else{this.playingIntro=!0,this.tRex.playingIntro=!0;var i="@-webkit-keyframes intro { from { width:"+l.config.WIDTH+"px }to { width: "+this.dimensions.WIDTH+"px }}";document.styleSheets[0].insertRule(i,0),this.containerEl.addEventListener(t.events.ANIM_END,this.startGame.bind(this)),this.containerEl.style.webkitAnimation="intro .4s ease-out 1 both",this.containerEl.style.width=this.dimensions.WIDTH+"px",this.touchController&&this.outerContainerEl.appendChild(this.touchController),this.activated=!0,this.started=!0}},startGame:function(){this.runningTime=0,this.playingIntro=!1,this.tRex.playingIntro=!1,this.containerEl.style.webkitAnimation="",this.playCount++,window.addEventListener(t.events.VISIBILITY,this.onVisibilityChange.bind(this)),window.addEventListener(t.events.BLUR,this.onVisibilityChange.bind(this)),window.addEventListener(t.events.FOCUS,this.onVisibilityChange.bind(this))},clearCanvas:function(){this.canvasCtx.clearRect(0,0,this.dimensions.WIDTH,this.dimensions.HEIGHT)},update:function(){this.drawPending=!1;var t=performance.now(),i=t-(this.time||t);if(this.time=t,this.activated){this.clearCanvas(),this.tRex.jumping&&this.tRex.updateJump(i,this.config),this.runningTime+=i;var s=this.runningTime>this.config.CLEAR_TIME;1!=this.tRex.jumpCount||this.playingIntro||this.playIntro(),this.playingIntro?this.horizon.update(0,this.currentSpeed,s):(i=this.started?i:0,this.horizon.update(i,this.currentSpeed,s));var e=s&&o(this.horizon.obstacles[0],this.tRex);e?this.gameOver():(this.distanceRan+=this.currentSpeed*i/this.msPerFrame,this.currentSpeed<this.config.MAX_SPEED&&(this.currentSpeed+=this.config.ACCELERATION)),this.distanceMeter.getActualDistance(this.distanceRan)>this.distanceMeter.maxScore&&(this.distanceRan=0);var n=this.distanceMeter.update(i,Math.ceil(this.distanceRan));n&&this.playSound(this.soundFx.SCORE)}this.crashed||(this.tRex.update(i),this.raq())},handleEvent:function(i){return function(t,s){switch(t){case s.KEYDOWN:case s.TOUCHSTART:case s.MOUSEDOWN:this.onKeyDown(i);break;case s.KEYUP:case s.TOUCHEND:case s.MOUSEUP:this.onKeyUp(i)}}.bind(this)(i.type,t.events)},startListening:function(){document.addEventListener(t.events.KEYDOWN,this),document.addEventListener(t.events.KEYUP,this),C?(this.touchController.addEventListener(t.events.TOUCHSTART,this),this.touchController.addEventListener(t.events.TOUCHEND,this),this.containerEl.addEventListener(t.events.TOUCHSTART,this)):(document.addEventListener(t.events.MOUSEDOWN,this),document.addEventListener(t.events.MOUSEUP,this))},stopListening:function(){document.removeEventListener(t.events.KEYDOWN,this),document.removeEventListener(t.events.KEYUP,this),C?(this.touchController.removeEventListener(t.events.TOUCHSTART,this),this.touchController.removeEventListener(t.events.TOUCHEND,this),this.containerEl.removeEventListener(t.events.TOUCHSTART,this)):(document.removeEventListener(t.events.MOUSEDOWN,this),document.removeEventListener(t.events.MOUSEUP,this))},onKeyDown:function(i){this.crashed||!t.keycodes.JUMP[String(i.keyCode)]&&i.type!=t.events.TOUCHSTART||(this.activated||(this.loadSounds(),this.activated=!0),this.tRex.jumping||(this.playSound(this.soundFx.BUTTON_PRESS),this.tRex.startJump())),this.crashed&&i.type==t.events.TOUCHSTART&&i.currentTarget==this.containerEl&&this.restart(),t.keycodes.DUCK[i.keyCode]&&this.tRex.jumping&&(i.preventDefault(),this.tRex.setSpeedDrop())},onKeyUp:function(i){var s=String(i.keyCode),e=t.keycodes.JUMP[s]||i.type==t.events.TOUCHEND||i.type==t.events.MOUSEDOWN;if(this.isRunning()&&e)this.tRex.endJump();else if(t.keycodes.DUCK[s])this.tRex.speedDrop=!1;else if(this.crashed){var n=performance.now()-this.time;(t.keycodes.RESTART[s]||i.type==t.events.MOUSEUP&&i.target==this.canvas||n>=this.config.GAMEOVER_CLEAR_TIME&&t.keycodes.JUMP[s])&&this.restart()}else this.paused&&e&&this.play()},raq:function(){this.drawPending||(this.drawPending=!0,this.raqId=requestAnimationFrame(this.update.bind(this)))},isRunning:function(){return!!this.raqId},gameOver:function(){this.playSound(this.soundFx.HIT),s(200),this.stop(),this.crashed=!0,this.distanceMeter.acheivement=!1,this.tRex.update(100,l.status.CRASHED),this.gameOverPanel?this.gameOverPanel.draw():this.gameOverPanel=new h(this.canvas,this.images.TEXT_SPRITE,this.images.RESTART,this.dimensions),this.distanceRan>this.highestScore&&(this.highestScore=Math.ceil(this.distanceRan),this.distanceMeter.setHighScore(this.highestScore)),this.time=performance.now()},stop:function(){this.activated=!1,this.paused=!0,cancelAnimationFrame(this.raqId),this.raqId=0},play:function(){this.crashed||(this.activated=!0,this.paused=!1,this.tRex.update(0,l.status.RUNNING),this.time=performance.now(),this.update())},restart:function(){this.raqId||(this.playCount++,this.runningTime=0,this.activated=!0,this.crashed=!1,this.distanceRan=0,this.setSpeed(this.config.SPEED),this.time=performance.now(),this.containerEl.classList.remove(t.classes.CRASHED),this.clearCanvas(),this.distanceMeter.reset(this.highestScore),this.horizon.reset(),this.tRex.reset(),this.playSound(this.soundFx.BUTTON_PRESS),this.update())},onVisibilityChange:function(t){document.hidden||document.webkitHidden||"blur"==t.type?this.stop():this.play()},playSound:function(t){if(t){var i=this.audioContext.createBufferSource();i.buffer=t,i.connect(this.audioContext.destination),i.start(0)}}},t.updateCanvasScaling=function(t,i,s){var e=t.getContext("2d"),n=Math.floor(window.devicePixelRatio)||1,h=Math.floor(e.webkitBackingStorePixelRatio)||1,o=n/h;if(n!==h){var a=i||t.width,r=s||t.height;return t.width=a*o,t.height=r*o,t.style.width=a+"px",t.style.height=r+"px",e.scale(o,o),!0}return!1},h.dimensions={TEXT_X:0,TEXT_Y:13,TEXT_WIDTH:191,TEXT_HEIGHT:11,RESTART_WIDTH:36,RESTART_HEIGHT:32},h.prototype={updateDimensions:function(t,i){this.canvasDimensions.WIDTH=t,i&&(this.canvasDimensions.HEIGHT=i)},draw:function(){var t=h.dimensions,i=this.canvasDimensions.WIDTH/2,s=t.TEXT_X,e=t.TEXT_Y,n=t.TEXT_WIDTH,o=t.TEXT_HEIGHT,a=Math.round(i-t.TEXT_WIDTH/2),r=Math.round((this.canvasDimensions.HEIGHT-25)/3),c=t.TEXT_WIDTH,d=t.TEXT_HEIGHT,u=t.RESTART_WIDTH,l=t.RESTART_HEIGHT,m=i-t.RESTART_WIDTH/2,T=this.canvasDimensions.HEIGHT/2;p&&(e*=2,s*=2,n*=2,o*=2,u*=2,l*=2),this.canvasCtx.drawImage(this.textSprite,s,e,n,o,a,r,c,d),this.canvasCtx.drawImage(this.restartImg,0,0,u,l,m,T,t.RESTART_WIDTH,t.RESTART_HEIGHT)}},u.MAX_GAP_COEFFICIENT=1.5,u.MAX_OBSTACLE_LENGTH=3,u.prototype={init:function(t){this.cloneCollisionBoxes(),this.size>1&&this.typeConfig.multipleSpeed>t&&(this.size=1),this.width=this.typeConfig.width*this.size,this.xPos=this.dimensions.WIDTH-this.width,this.draw(),this.size>1&&(this.collisionBoxes[1].width=this.width-this.collisionBoxes[0].width-this.collisionBoxes[2].width,this.collisionBoxes[2].x=this.width-this.collisionBoxes[2].width),this.gap=this.getGap(this.gapCoefficient,t)},draw:function(){var t=this.typeConfig.width,i=this.typeConfig.height;p&&(t=2*t,i=2*i);var s=t*this.size*(.5*(this.size-1));this.canvasCtx.drawImage(this.image,s,0,t*this.size,i,this.xPos,this.yPos,this.typeConfig.width*this.size,this.typeConfig.height)},update:function(t,i){this.remove||(this.xPos-=Math.floor(i*g/1e3*t),this.draw(),this.isVisible()||(this.remove=!0))},getGap:function(t,s){var e=Math.round(this.width*s+this.typeConfig.minGap*t),n=Math.round(e*u.MAX_GAP_COEFFICIENT);return i(e,n)},isVisible:function(){return this.xPos+this.width>0},cloneCollisionBoxes:function(){for(var t=this.typeConfig.collisionBoxes,i=t.length-1;i>=0;i--)this.collisionBoxes[i]=new d(t[i].x,t[i].y,t[i].width,t[i].height)}},u.types=[{type:"CACTUS_SMALL",className:" cactus cactus-small ",width:17,height:35,yPos:105,multipleSpeed:3,minGap:120,collisionBoxes:[new d(0,7,5,27),new d(4,0,6,34),new d(10,4,7,14)]},{type:"CACTUS_LARGE",className:" cactus cactus-large ",width:25,height:50,yPos:90,multipleSpeed:6,minGap:120,collisionBoxes:[new d(0,12,7,38),new d(8,0,7,49),new d(13,10,10,38)]}],l.config={DROP_VELOCITY:-5,GRAVITY:.6,HEIGHT:47,INIITAL_JUMP_VELOCITY:-10,INTRO_DURATION:1500,MAX_JUMP_HEIGHT:30,MIN_JUMP_HEIGHT:30,SPEED_DROP_COEFFICIENT:3,SPRITE_WIDTH:262,START_X_POS:50,WIDTH:44},l.collisionBoxes=[new d(1,-1,30,26),new d(32,0,8,16),new d(10,35,14,8),new d(1,24,29,5),new d(5,30,21,4),new d(9,34,15,4)],l.status={CRASHED:"CRASHED",JUMPING:"JUMPING",RUNNING:"RUNNING",WAITING:"WAITING"},l.BLINK_TIMING=7e3,l.animFrames={WAITING:{frames:[44,0],msPerFrame:1e3/3},RUNNING:{frames:[88,132],msPerFrame:1e3/12},CRASHED:{frames:[220],msPerFrame:1e3/60},JUMPING:{frames:[0],msPerFrame:1e3/60}},l.prototype={init:function(){this.blinkDelay=this.setBlinkDelay(),this.groundYPos=t.defaultDimensions.HEIGHT-this.config.HEIGHT-t.config.BOTTOM_PAD,this.yPos=this.groundYPos,this.minJumpHeight=this.groundYPos-this.config.MIN_JUMP_HEIGHT,this.draw(0,0),this.update(0,l.status.WAITING)},setJumpVelocity:function(t){this.config.INIITAL_JUMP_VELOCITY=-t,this.config.DROP_VELOCITY=-t/2},update:function(t,i){this.timer+=t,i&&(this.status=i,this.currentFrame=0,this.msPerFrame=l.animFrames[i].msPerFrame,this.currentAnimFrames=l.animFrames[i].frames,i==l.status.WAITING&&(this.animStartTime=performance.now(),this.setBlinkDelay())),this.playingIntro&&this.xPos<this.config.START_X_POS&&(this.xPos+=Math.round(this.config.START_X_POS/this.config.INTRO_DURATION*t)),this.status==l.status.WAITING?this.blink(performance.now()):this.draw(this.currentAnimFrames[this.currentFrame],0),this.timer>=this.msPerFrame&&(this.currentFrame=this.currentFrame==this.currentAnimFrames.length-1?0:this.currentFrame+1,this.timer=0)},draw:function(t,i){var s=t,e=i,n=this.config.WIDTH,h=this.config.HEIGHT;p&&(s*=2,e*=2,n*=2,h*=2),this.canvasCtx.drawImage(this.image,s,e,n,h,this.xPos,this.yPos,this.config.WIDTH,this.config.HEIGHT)},setBlinkDelay:function(){this.blinkDelay=Math.ceil(Math.random()*l.BLINK_TIMING)},blink:function(t){var i=t-this.animStartTime;i>=this.blinkDelay&&(this.draw(this.currentAnimFrames[this.currentFrame],0),1==this.currentFrame&&(this.setBlinkDelay(),this.animStartTime=t))},startJump:function(){this.jumping||(this.update(0,l.status.JUMPING),this.jumpVelocity=this.config.INIITAL_JUMP_VELOCITY,this.jumping=!0,this.reachedMinHeight=!1,this.speedDrop=!1)},endJump:function(){this.reachedMinHeight&&this.jumpVelocity<this.config.DROP_VELOCITY&&(this.jumpVelocity=this.config.DROP_VELOCITY)},updateJump:function(t){var i=l.animFrames[this.status].msPerFrame,s=t/i;this.speedDrop?this.yPos+=Math.round(this.jumpVelocity*this.config.SPEED_DROP_COEFFICIENT*s):this.yPos+=Math.round(this.jumpVelocity*s),this.jumpVelocity+=this.config.GRAVITY*s,(this.yPos<this.minJumpHeight||this.speedDrop)&&(this.reachedMinHeight=!0),(this.yPos<this.config.MAX_JUMP_HEIGHT||this.speedDrop)&&this.endJump(),this.yPos>this.groundYPos&&(this.reset(),this.jumpCount++),this.update(t)},setSpeedDrop:function(){this.speedDrop=!0,this.jumpVelocity=1},reset:function(){this.yPos=this.groundYPos,this.jumpVelocity=0,this.jumping=!1,this.update(0,l.status.RUNNING),this.midair=!1,this.speedDrop=!1,this.jumpCount=0}},m.dimensions={WIDTH:10,HEIGHT:13,DEST_WIDTH:11},m.yPos=[0,13,27,40,53,67,80,93,107,120],m.config={MAX_DISTANCE_UNITS:5,ACHIEVEMENT_DISTANCE:100,COEFFICIENT:.025,FLASH_DURATION:250,FLASH_ITERATIONS:3},m.prototype={init:function(t){var i="";this.calcXPos(t),this.maxScore=this.config.MAX_DISTANCE_UNITS;for(var s=0;s<this.config.MAX_DISTANCE_UNITS;s++)this.draw(s,0),this.defaultString+="0",i+="9";this.maxScore=parseInt(i)},calcXPos:function(t){this.x=t-m.dimensions.DEST_WIDTH*(this.config.MAX_DISTANCE_UNITS+1)},draw:function(t,i,s){var e=m.dimensions.WIDTH,n=m.dimensions.HEIGHT,h=m.dimensions.WIDTH*i,o=t*m.dimensions.DEST_WIDTH,a=this.y,r=m.dimensions.WIDTH,c=m.dimensions.HEIGHT;if(p&&(e*=2,n*=2,h*=2),this.canvasCtx.save(),s){var d=this.x-2*this.config.MAX_DISTANCE_UNITS*m.dimensions.WIDTH;this.canvasCtx.translate(d,this.y)}else this.canvasCtx.translate(this.x,this.y);this.canvasCtx.drawImage(this.image,h,0,e,n,o,a,r,c),this.canvasCtx.restore()},getActualDistance:function(t){return t?Math.round(t*this.config.COEFFICIENT):0},update:function(t,i){var s=!0,e=!1;if(this.acheivement)this.flashIterations<=this.config.FLASH_ITERATIONS?(this.flashTimer+=t,this.flashTimer<this.config.FLASH_DURATION?s=!1:this.flashTimer>2*this.config.FLASH_DURATION&&(this.flashTimer=0,this.flashIterations++)):(this.acheivement=!1,this.flashIterations=0,this.flashTimer=0);else if(i=this.getActualDistance(i),i>0){i%this.config.ACHIEVEMENT_DISTANCE==0&&(this.acheivement=!0,this.flashTimer=0,e=!0);var n=(this.defaultString+i).substr(-this.config.MAX_DISTANCE_UNITS);this.digits=n.split("")}else this.digits=this.defaultString.split("");if(s)for(var h=this.digits.length-1;h>=0;h--)this.draw(h,parseInt(this.digits[h]));return this.drawHighScore(),e},drawHighScore:function(){this.canvasCtx.save(),this.canvasCtx.globalAlpha=.8;for(var t=this.highScore.length-1;t>=0;t--)this.draw(t,parseInt(this.highScore[t],10),!0);this.canvasCtx.restore()},setHighScore:function(t){t=this.getActualDistance(t);var i=(this.defaultString+t).substr(-this.config.MAX_DISTANCE_UNITS);this.highScore=["10","11",""].concat(i.split(""))},reset:function(){this.update(0),this.acheivement=!1}},T.config={HEIGHT:13,MAX_CLOUD_GAP:400,MAX_SKY_LEVEL:30,MIN_CLOUD_GAP:100,MIN_SKY_LEVEL:71,WIDTH:46},T.prototype={init:function(){this.yPos=i(T.config.MAX_SKY_LEVEL,T.config.MIN_SKY_LEVEL),this.draw()},draw:function(){this.canvasCtx.save();var t=T.config.WIDTH,i=T.config.HEIGHT;p&&(t=2*t,i=2*i),this.canvasCtx.drawImage(this.image,0,0,t,i,this.xPos,this.yPos,T.config.WIDTH,T.config.HEIGHT),this.canvasCtx.restore()},update:function(t){this.remove||(this.xPos-=Math.ceil(t),this.draw(),this.isVisible()||(this.remove=!0))},isVisible:function(){return this.xPos+T.config.WIDTH>0}},I.dimensions={WIDTH:600,HEIGHT:12,YPOS:127},I.prototype={setSourceDimensions:function(){for(var t in I.dimensions)p?"YPOS"!=t&&(this.sourceDimensions[t]=2*I.dimensions[t]):this.sourceDimensions[t]=I.dimensions[t],this.dimensions[t]=I.dimensions[t];this.xPos=[0,I.dimensions.WIDTH],this.yPos=I.dimensions.YPOS},getRandomType:function(){return Math.random()>this.bumpThreshold?this.dimensions.WIDTH:0},draw:function(){this.canvasCtx.drawImage(this.image,this.sourceXPos[0],0,this.sourceDimensions.WIDTH,this.sourceDimensions.HEIGHT,this.xPos[0],this.yPos,this.dimensions.WIDTH,this.dimensions.HEIGHT),this.canvasCtx.drawImage(this.image,this.sourceXPos[1],0,this.sourceDimensions.WIDTH,this.sourceDimensions.HEIGHT,this.xPos[1],this.yPos,this.dimensions.WIDTH,this.dimensions.HEIGHT)},updateXPos:function(t,i){var s=t,e=0==t?1:0;this.xPos[s]-=i,this.xPos[e]=this.xPos[s]+this.dimensions.WIDTH,this.xPos[s]<=-this.dimensions.WIDTH&&(this.xPos[s]+=2*this.dimensions.WIDTH,this.xPos[e]=this.xPos[s]-this.dimensions.WIDTH,this.sourceXPos[s]=this.getRandomType())},update:function(t,i){var s=Math.floor(i*(g/1e3)*t);this.xPos[0]<=0?this.updateXPos(0,s):this.updateXPos(1,s),this.draw()},reset:function(){this.xPos[0]=0,this.xPos[1]=I.dimensions.WIDTH}},E.config={BG_CLOUD_SPEED:.2,BUMPY_THRESHOLD:.3,CLOUD_FREQUENCY:.5,HORIZON_HEIGHT:16,MAX_CLOUDS:6},E.prototype={init:function(){this.addCloud(),this.horizonLine=new I(this.canvas,this.horizonImg)},update:function(t,i,s){this.runningTime+=t,this.horizonLine.update(t,i),this.updateClouds(t,i),s&&this.updateObstacles(t,i)},updateClouds:function(t,i){var s=this.cloudSpeed/1e3*t*i,e=this.clouds.length;if(e){for(var n=e-1;n>=0;n--)this.clouds[n].update(s);var h=this.clouds[e-1];e<this.config.MAX_CLOUDS&&this.dimensions.WIDTH-h.xPos>h.cloudGap&&this.cloudFrequency>Math.random()&&this.addCloud(),this.clouds=this.clouds.filter(function(t){return!t.remove})}},updateObstacles:function(t,i){for(var s=this.obstacles.slice(0),e=0;e<this.obstacles.length;e++){var n=this.obstacles[e];n.update(t,i),n.remove&&s.shift()}if(this.obstacles=s,this.obstacles.length>0){var h=this.obstacles[this.obstacles.length-1];h&&!h.followingObstacleCreated&&h.isVisible()&&h.xPos+h.width+h.gap<this.dimensions.WIDTH&&(this.addNewObstacle(i),h.followingObstacleCreated=!0)}else this.addNewObstacle(i)},addNewObstacle:function(t){var s=i(0,u.types.length-1),e=u.types[s],n=this.obstacleImgs[e.type];this.obstacles.push(new u(this.canvasCtx,e,n,this.dimensions,this.gapCoefficient,t))},reset:function(){this.obstacles=[],this.horizonLine.reset()},resize:function(t,i){this.canvas.width=t,this.canvas.height=i},addCloud:function(){this.clouds.push(new T(this.canvas,this.cloudImg,this.dimensions.WIDTH))}}}(),new Runner(".interstitial-wrapper");