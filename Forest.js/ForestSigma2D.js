"use strict";

var isOnPhone=navigator.isUserOnPhone;
//should add component system
//components class
/*
class Components{
	constructor(){
		this.lists=[];
	}
	getComponent(classFn){
		
	}
	getComponents(classFn1,classFn2,...){//also classFn can link to many components
		
	}
}
*/
//change ForestForest to ForestSigma2D or just Forest?
//add new object type:empty
//add component camera
/*class Camera2D{
	
}*/
class ForestSigma2D{
	constructor(cans=document.createElement("canvases")){
		this.element=cans;
		this.objs=[];
		this.cameras=[];
		this.deltaTime=0;
		this.time0=NaN;
		this.time1=NaN;
		this.input={};//this.input["A"].keyDown();
		this.divider=10;
		this.deltaTimeMode=DeltaTimeMode.realDeltaTime;
		this._loopFn=this._loop.bind(this);
		this.pausing=true;
		this.mouseHolding=false;
		this.mousesOnElement=[{x:NaN,y:NaN}];
		this.mousesPos=[{x:NaN,y:NaN}];//World space position
		this.mousesOnScreenPos=[{x:NaN,y:NaN}];
		this.mousesOnPagePos=[{x:NaN,y:NaN}];
	}
	makeCamera(f,w,h){
		let cam=ForestSigma2D.makeCamera(f,w,h);
		this.cameras.push(cam);
		this.element.appendChild(cam.canvas);
		cam.parent=this;
		return cam;
	}
	static makeCamera(f,w,h){
		return new ForestObject(ForestObjectType.camera,0,0,f,ShapeType.rect,w,h);
	}
	pushObj(a){
		a.parent=this;
		this.objs.push(a);
	}
	vertexCast(x,y){
		let r=[];
		for(let i=0;i<this.objs.length;++i){
			let obj=this.objs[i];
			let z=new Complex(x,y);
			z.real-=obj.transform.position.x;
			z.imaginary-=obj.transform.position.y;
			z.addRad(-obj.transform.rotation);
			switch(obj.shape.type){
				case ShapeType.rect:{
					let w=obj.shape.width/2*obj.transform.scale.x;
					let h=obj.shape.height/2*obj.transform.scale.y;
					if(
						-w<=z.real&&z.real<=w&&
						-h<=z.imaginary&&z.imaginary<=h
					)r.push(obj);
					break;
				}
				case ShapeType.circle:{
					z.real/=obj.transform.scale.x;
					z.imaginary/=obj.transform.scale.y;
					if(z.scale<=obj.shape.r)r.push(obj);
					break;
				}
				case ShapeType.polygon:{
					let verts=obj.shape.vertices;
					let check=0;
					for(let iv=0;iv<verts.length;++iv){
						let vert={x:NaN,y:NaN};
						let v1=verts[iv];v1={x:v1[0],y:v1[1]};
						let v2=verts[(iv+1)%verts.length];v2={x:v2[0],y:v2[1]};
						if(v1.x==v2.x&&v1.y==v2.y)continue;
						if(v1.y==v2.y){
							vert.x=Infinity;
							vert.y=z.imaginary;
						}else if(v1.x==v2.x){
							vert.x=v1.x;
							vert.y=z.imaginary;
						}else{
							/*
							m=(v2.y-v1.y)/(v2.x-v1.x)
							(y-v1.y)=m(x-v1.x)
							(y-z.imaginary)=0(x-z.real)
							
							(v2.x-v1.x)(z.imaginary-v1.y)=(v2.y-v1.y)(x-v1.x)
							(v2.x-v1.x)(z.imaginary-v1.y)/(v2.y-v1.y)=(x-v1.x)
							(v2.x-v1.x)(z.imaginary-v1.y)/(v2.y-v1.y)+v1.x=x
							*/
							vert.x=(v2.x-v1.x)*(z.imaginary-v1.y)/(v2.y-v1.y)+v1.x;
							vert.y=z.imaginary;
						}
						let d=hypot(v2.x-v1.x,v2.y-v1.y);
						if(hypot(vert.x-v1.x,vert.y-v1.y)<=d&&hypot(vert.x-v2.x,vert.y-v2.y)<=d&&vert.x>=z.real)++check;
					}
					if(check%2!=0)r.push(obj);
					break;
				}
			}
		}
		return r;
	}
	run(){
		this.pausing=false;
		requestAnimationFrame(this._loopFn);
		return this;
	}
	pause(){
		this.pausing=true;
		return this;
	}
	_loop(){//loop with rate of 60FPS
		//drawing
		
		switch(this.deltaTimeMode){
			case DeltaTimeMode.realDeltaTime:{
				this.time0=this.time1;
				this.time1=new Date().getTime();
				if(this.time0==this.time0)this.deltaTime=(this.time1-this.time0)/1000;
				else this.deltaTime=1/60;
				break;
			}
			case DeltaTimeMode.assumeDeltaTime:{
				this.deltaTime=1/60;
				this.time0=this.time1=NaN;
				break;
			}
		}
		if(this.pre_update)this.pre_update(this);
		for(let i=0;i<this.cameras.length;++i){
			let cam=this.cameras[i];
			let can=cam.canvas;
			let cs=getComputedStyle(this.element);
			can.width=cs.width.slice(0,-2)*cam.shape.width;
			can.height=cs.height.slice(0,-2)*cam.shape.height;
			
			/*can.style.left=((cam.x+0.5)*100)+"%";
			can.style.top=((cam.y+0.5)*100)+"%";*/
			can.style.left=(cam.x*100)+"%";
			can.style.top=(cam.y*100)+"%";
			
			let ctx=can.d2;
			ctx.setTransform(1,0,0,1,0,0);
			ctx.fillSty(cam.background).fillRect(
				0,0,
				can.width,can.height
			);
			ctx.translate(
				can.width/2-cam.transform.position.x*cam.transform.scale.x,
				can.height/2-cam.transform.position.y*cam.transform.scale.y
			);
			ctx.scale(
				cam.transform.scale.x,
				cam.transform.scale.y
			);
			ctx.rotate(-cam.transform.rotation);
			let bMat=ctx.getTransform();
			cam.matrix=bMat;
			for(let i2=0;i2<this.objs.length;++i2,ctx.setTransform(bMat)){
				let obj=this.objs[i2];
				let x=obj.transform.position.x,
				y=obj.transform.position.y;
				ctx.translate(x,y);
				ctx.rotate(obj.transform.rotation);
				ctx.scale(obj.transform.scale.x,obj.transform.scale.y);
				switch(obj.shape.type){
					case ShapeType.rect:{
						let w=obj.shape.width;
						let h=obj.shape.height;
						ctx.openP.rec(-w/2,-h/2,w,h);
						break;
					}
					case ShapeType.circle:{
						ctx.openP.circle(0,0,obj.shape.r);
						break;
					}
					case ShapeType.polygon:{
						if(obj.shape.length==0)break;
						ctx.openP;
						for(let i=0;i<obj.shape.vertices.length;++i){
							if(obj.shape.vertices[i]==0){
								ctx.swayTo(obj.shape.vertices[i+1][0],obj.shape.vertices[i+1][1]);
								++i;
								continue;
							}
							ctx.dashTo(obj.shape.vertices[i][0],obj.shape.vertices[i][1]);
						}
						break;
					}
					case ShapeType.text:{
						break;
					}
					default:continue;break;
				}
				if(obj.shape.type==ShapeType.text){
					ctx.textAlign=["left","center","right"][obj.shape.origin.x+1];
					ctx.textBaseline=["top","middle","bottom"][obj.shape.origin.y+1];
					//console.log(ctx.textAlign+":"+ctx.textBaseLine);
					ctx.font=obj.shape.font;
					if(obj.fill.enabled){
						ctx.fillSty(obj.fill.style)
						.alpha(obj.fill.alpha)
						.fillText(obj.shape.text,0,0);
					}
					if(obj.line.enabled){
						ctx.strokSty(obj.line.style)
						.lineBig(obj.line.width)
						.lineEdge(obj.line.cap)
						.alpha(obj.fill.alpha)
						.strokeText(obj.shape.text,0,0);
					}
				}else{
					if(obj.fill.enabled){
						ctx
						.fillSty(obj.fill.style)
						.alpha(obj.fill.alpha)
						.pack;
					}
					if(obj.line.enabled){
						ctx
						.strokSty(obj.line.style)
						.lineBig(obj.line.width)
						.lineEdge(obj.line.cap)
						.alpha(obj.fill.alpha)
						.strok;
					}
					ctx.offP;
				}
			}
			ctx.setTransform(1,0,0,1,0,0);
		}
		if(this.post_update_once)this.post_update_once(this);
		if(this.post_update)
			for(let dt=this.deltaTime,dtti=0,dtt=dt/this.divider;dtti<=dt;dtti+=dtt){
				this.post_update(dtt,this);
			}
		Input.keysDown.clear();
		Input.keysUp.clear();
		if(!this.pausing)requestAnimationFrame(this._loopFn);
	}
}
[ForestSigma2D].qDefProp({
	mouseOnElement:function(){return this.mousesOnElement[0];},
	mousePos:function(){return this.mousesPos[0];},
	mouseOnScreenPos:function(){return this.mousesOnScreenPos[0];},
	mouseOnPagePos:function(){return this.mousesOnPagePos[0];},
	touchesOnElement:function(){return this.mousesOnElement;},
	touchesPos:function(){return this.mousesPos;},
	touchesOnScreenPos:function(){return this.mousesOnScreenPos;},
	touchesOnPagePos:function(){return this.mousesOnPagePos;}
});
class ForestObject{
	constructor(type){
		let args=[].slice.call(arguments,1);
		switch(type){
			case ForestObjectType.camera:{//(x,y,background,shape,width,height)
				let shape;//camera will be full screen to canvas by default*/
				switch(args[3]){
					case ShapeType.rect:{//width:[4],height[5]
						shape={
							width:args[4],height:args[5]
						}
						break;
					}
					case ShapeType.full:{
						shape={
							width:1,height:1
						};
						break;
					}
					default:{
						shape=args[3];
						break;
					}
				}
				this.transform={
					position:{x:args[0],y:args[1]},
					rotation:0,
					scale:{x:1,y:1}
				};
				this.x=this.y=0;
				this.canvas=document.createElement("canvas");
				if(!navigator.isUserOnPhone){
					let fMouse=(function(e,t){
						let owner=this.parent;
						let can=e.target;
						owner.mousesOnElement=[
							{x:e.offsetX,y:e.offsetY,holding:t}
						];
						owner.mousesOnElement.element=can;
						owner.mousesPos=[
							Convert.convertPos(
								owner.mousesOnElement[0],
								Position.elementPos,
								Position.pos,
								this.matrix
							)
						];
						owner.mousesPos[0].holding=t;
						owner.mousesOnScreenPos=[
							{x:e.screenX,y:e.screenY,holding:t}
						];
						owner.mousesOnPagePos=[
							{x:e.pageX,y:e.pageY,holding:t}
						];
						//need to add movement property
					}).bind(this);
					this.canvas.addEvt("mousedown",(function(e){
						fMouse(e,this.mouseHolding=true);
					}).bind(this))
					.addEvt("mousemove",fMouse)
					.addEvt("mouseup",(function(e){
						fMouse(e,this.mouseHolding=false);
					}).bind(this));
				}else{
					let fMouse=(function(e,t){
						let owner=this.parent;
						let can=e.target;
						owner.mousesOnElement=[];
						owner.mousesOnElement.element=can;
						owner.mousesPos=[];
						owner.mousesOnScreenPos=[];
						owner.mousesOnPagePos=[];
						e=e.touches;
						/*console.log(
							e[0].offsetX,
							"\n",
							e[0].pageX
						);*/
						for(let i=0;i<e.length;++i){
							owner.mousesOnElement.push({x:e[i].offsetX,y:e[i].offsetY});
							owner.mousesPos.push(Convert.convertPos(
								owner.mousesOnElement[i],
								Position.elementPos,
								Position.pos,
								this.matrix
							));
							owner.mousesOnScreenPos.push({x:e[i].screenX,y:e[i].screenY});
							owner.mousesOnPagePos.push({x:e[i].pageX,y:e[i].pageY});
						}
					}).bind(this);
					this.canvas.addEvt("touchstart",(function(e){
						this.mouseHolding=true;
						fMouse(e);
					}).bind(this))
					.addEvt("touchmove",fMouse)
					.addEvt("touchend",(function(e){
						this.mouseHolding=false;
						//fMouse(e);
					}).bind(this));
				}
				
				//this.canvas.style.transform="translate(-50%,-50%)";
				this.canvas.style.position="absolute";
				this.background=args[2]?args[2]:"black";//lazy checking that's all
				this.shape=shape;
				break;
			}
			case ForestObjectType.object:{//(x,y,fill,shape,width,height)
				let shape;
				switch(args[3]){
					case ShapeType.rect:{
						shape={
							width:args[4],height:args[5],
							type:args[3]
						}
						break;
					}
					case ShapeType.circle:{
						shape={
							r:args[4],
							type:args[3]
						}
						break;
					}
					case ShapeType.text:{//(text,x-origin,y-origin,font(like ctx.font))
						args[5]=round(args[5]);
						if(args[5]>=1)args[5]=1;
						else if(args[5]<=-1)args[5]=-1;
						else args[5]=0;
						args[6]=round(args[6]);
						if(args[6]>=1)args[6]=1;
						else if(args[6]<=-1)args[6]=-1;
						else args[6]=0;
						shape={
							origin:{
								x:args[5],//(-1,0,1)
								y:args[6]//(-1,0,1)
							},
							text:args[4],
							font:args[7],
							type:args[3]
						}
						break;
					}
					default:{
						shape={vertices:args[4],type:ShapeType.polygon};//just all vertices
						/*[
							[x,y],
							[x,y]
						]*/
						break;
					}
					
				}
				this.transform={
					position:{x:args[0],y:args[1]},
					rotation:0,
					scale:{x:1,y:1}
				};
				this.fill={
					style:args[2]?args[2]:"white",
					alpha:1,
					enabled:true
				};
				this.line={
					style:"grey",
					cap:"square",
					width:2,
					alpha:1,
					enabled:false
				};
				this.shape=shape;
				break;
			}
			default:{
				type=0;//it is null object
				break;
			}
		}
		this.objType=type;
		
	}
}
var ForestObjectType={
	none:0,
	object:1,
	camera:2
};
var ShapeType={
	none:0,
	rect:1,
	circle:2,
	polygon:3,
	text:4,
	full:5
};
var DeltaTimeMode={
	realDeltaTime:0,
	assumeDeltaTime:1
};
var Position={
	pos:0,
	elementPos:1
}
var MatrixType={
	ForestMonkey:0,//It's not quite array
	DOMMatrix:1,
	GMatrix:2//or well supported matrix,have to be implemented later
}
function createDOMMatrix(a,b,c,d,e,f){
	try{
		return new DOMMatrix([a,b,c,d,e,f]);
	}catch(e){
		let ctx=document.createElement("canvas").d2;
		ctx.setTransform(a,b,c,d,e,f);
		return ctx.getTransform();
	}
}
function createRotationMatrix(a){
	return createDOMMatrix(
		cos(a),sin(a),-sin(a),cos(a),0,0
	);
}
function createRotationMatrix(a){
	return createDOMMatrix(
		cos(a),sin(a),-sin(a),cos(a),0,0
	);
}
function createScaleMatrix(a){
	return createDOMMatrix(
		cos(a),sin(a),-sin(a),cos(a),0,0
	);
}
function createTranslationMatrix(tx,ty){
	return createDOMMatrix(
		1,0,0,1,tx,ty
	);
}
class Convert{
	static convertPos(a,f,t,mat){
		let r;
		if(!(a instanceof Array)){
			r={x:NaN,y:NaN};
			if(f==Position.pos&&t==Position.elementPos){
				r.x=a.x*mat.a+a.y*mat.c+mat.e;
				r.y=a.y*mat.d+a.x*mat.b+mat.f;
				//scale+skew+translation
			}else if(f==Position.elementPos&&t==Position.pos){
				//reverse from before
				/*
				r[0]=a[0]*mat.a+a[1]*mat.c+mat.e;
				r[1]=a[1]*mat.d+a[0]*mat.b+mat.f;
				inverse
				a[0]=r[0]*mat.a+r[1]*mat.c+mat.e
				a[1]=r[1]*mat.d+r[0]*mat.b+mat.f
				look like we have to use matrix...fuck
				
				r[0]*mat.a+r[1]*mat.c=a[0]-mat.e
				r[0]*mat.b+r[1]*mat.d=a[1]-mat.f
				then we ready to apply to matrix
				*/
				let A=[
					[mat.a,mat.c],
					[mat.b,mat.d],
					2,2
				];
				let B=[
					[a.x-mat.e],
					[a.y-mat.f],
					2,1
				];
				let R=matMulMat(invertMat(A),B);
				r.x=R[0][0];r.y=R[1][0];
			}
		}else if(a instanceof Array){
			r=[];
			if(f==Position.pos&&t==Position.elementPos){
				r[0]=a[0]*mat.a+a[1]*mat.c+mat.e;
				r[1]=a[1]*mat.d+a[0]*mat.b+mat.f;
				
			}else if(f==Position.elementPos&&t==Position.pos){
				let A=[
					[mat.a,mat.c],
					[mat.b,mat.d],
					2,2
				];
				let B=[
					[a[0]-mat.e],
					[a[1]-mat.f],
					2,1
				];
				let R=matMulMat(invertMat(A),B);
				r[0]=R[0][0];r[1]=R[1][0];
			}

		}
		return r;
	}
	static convertMatrix(mat,t){//mat can be DOMMatrix or ForestMonkey Array Matrix or any other...
		switch(t){
			/*case Matrix.GMatrix:
				break;*/
			case MatrixType.DOMMatrix:{
				if(mat instanceof Array){
					return createDOMMatrix(mat[0][0],mat[1][0],mat[0][1],mat[1][1],mat[0][2],mat[1][2]);
				}
				break;
			}
			case MatrixType.ForestMonkey:{
				if(mat instanceof DOMMatrix){
					return[
						[mat.a,mat.c,mat.e],
						[mat.b,mat.d,mat.f],
						[0,0,1],
						3,3
					]
				}
				break;
			}
		}
	}
	//ex:
	/*
		Convert.convertPos(
			[x,y],
			Position.pos,
			Position.elementPos,
			cam
		);
		and then return r(x,y) which is mapped from pos in world to element
	*/
}
class Input{
	static _codesToArray(codes){
		let rcodes;
		if((codes instanceof String)||(typeof codes=="string")){
			rcodes=[];
			for(let i=0;i<codes.length;++i){
				rcodes.push(codes.charCodeAt(i));
			}
		}else if(Array.isArray(codes)){
			rcodes=[]
			for(let i=0;i<codes.length;++i){
				if(!isNaN(codes[i]-0)&&codes[i]==Infinity){
					rcodes.push(codes[i]);
				}
				if((codes instanceof String)||(typeof codes=="string")){
					rcodes.push(codes[i].charCodeAt(0));
				}
			}
		}else if((codes instanceof Number||(typeof codes=="number"))&&codes!=Infinity){
			rcodes=[codes];
		}
		return rcodes;
	}
	static getKeyDown(codes,caseSen=false){
		if(arguments.length==0)return false;
		let rcodes=Input._codesToArray(codes);
		for(let i=0;i<rcodes.length;++i){
			if(Input.keysDown.has(rcodes[i])){
				return true;
			}
			if(!caseSen&&Input.keysDown.has(rcodes[i].char.toFlipCase().charCodeAt(0))){
				return true;
			}
		}
		return false;
	}
	static getKeyPressing(codes,caseSen=false){
		if(arguments.length==0)return false;
		let rcodes=Input._codesToArray(codes);
		for(let i=0;i<rcodes.length;++i){
			if(Input.keysPressing.has(rcodes[i])){
				return true;
			}
			if(!caseSen&&Input.keysPressing.has(rcodes[i].char.toFlipCase().charCodeAt(0))){
				return true;
			}
		}
		return false;
	}
	static getKeyUp(codes,caseSen=false){
		if(arguments.length==0)return false;
		let rcodes=Input._codesToArray(codes);
		for(let i=0;i<rcodes.length;++i){
			if(Input.keysUp.has(rcodes[i])){
				return true;
			}
			if(!caseSen&&Input.keysUp.has(rcodes[i].char.toFlipCase().charCodeAt(0))){
				return true;
			}
		}
		return false;
	}
	static getHoldedKeyDown(codes,caseSen=false){
		if(arguments.length==0)return false;
		let rcodes=Input._codesToArray(codes);
		for(let i=0;i<rcodes.length;++i){
			if(Input.holdedKeysDown.has(rcodes[i])){
				return true;
			}
			if(!caseSen&&Input.holdedKeysDown.has(rcodes[i].char.toFlipCase().charCodeAt(0))){
				return true;
			}
		}
		return false;
	}
}
Input.keysDown=new Set();
Input.holdedKeysDown=new Set();//it's auto repeat thing like a....aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
Input.keysPressing=new Set();//fire in first pressed until you hold out
Input.keysUp=new Set();
Input.up=38;
Input.left=37;
Input.right=39;
Input.down=40;
window.addEventListener("keydown",function(e){
	let keyCode=e.key;
	if(e.key.length>1)keyCode=e.keyCode;
	else keyCode=keyCode.charCodeAt(0);
	if(!e.repeat){
		let keyCode=e.key;
		if(e.key.length>1)keyCode=e.keyCode;
		else keyCode=keyCode.charCodeAt(0);
		Input.keysDown.add(keyCode);
		Input.keysPressing.add(keyCode);
	}else{
		Input.holdedKeysDown.add(keyCode);
	}
});
//keydown keypress used the same function since it fire differently
//so the idea lower vs upper => always pick lower

//always clear keysDown & clear keypress with keyup

window.addEventListener("keyup",function(e){
	let keyCode=e.key;
	if(e.key.length>1)keyCode=e.keyCode;
	else keyCode=keyCode.charCodeAt(0);
	Input.keysUp.add(keyCode);
	//clear other stuff : keysDown,holdedKeysDown,keysUp,keysPressing
	for(let i of Input.keysUp){
		let li=String.fromCharCode(i).toLowerCase().charCodeAt(0);
		let ui=String.fromCharCode(i).toUpperCase().charCodeAt(0);
		
		Input.keysDown.delete(li);Input.keysDown.delete(ui);
		Input.holdedKeysDown.delete(li);Input.holdedKeysDown.delete(ui);
		Input.keysPressing.delete(li);Input.keysPressing.delete(ui);
	}
});

/*
	keypress=>return lower/upper case-sensitive&receive only string key
	keydown=>return ignore lower/upper case and return upper value
	keyup=>return ignore lower/upper case and return upper value
*/
Input.isMouseHolding=false;
Input.relativeMousePos=new Complex(0,0);
/*window.addEventListener("mousedown",function(){
	Input.isMouseHolding=true;
});
window.addEventListener("mousemove",function(){
	
});
window.addEventListener("mouseup",function(){
	Input.isMouseHolding=false;
});*/