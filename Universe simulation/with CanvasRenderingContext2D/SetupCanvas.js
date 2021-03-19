var o=[];
var can=c1("canvas"),ctx=can.d2;
can.mouse=new V3();
can.on("mouseup",function(e){
	this.mouseHolding=false;
}).on("mousedown",function(e){
	this.mouseHolding=true;
	this.mouse=new V3(
		e.offsetX-can.width/2,
		e.offsetY-can.height/2,
		0
	);
}).on("mousemove",function(e){
	this.mouse=new V3(
		e.offsetX-can.width/2,
		e.offsetY-can.height/2,
		0
	);
})
var dt=1/60,precisionLevel=1;
var factorX=1,factorY=1;
var factor=1;
var pause=false;
var t=0;
var drshow=2;
var pullRadius=20
function draw(){
	can.resize(-1,-1);
	can.width*=factorX;
	can.height*=factorY;
	//factorX*=0.999;
	ctx.setTransform(1,0,0,1,can.width/2,can.height/2);
	ctx.fillRect(-can.width/2,-can.height/2,can.width,can.height);
	for(let i of o){
		ctx.openP.fillSty(i.color)
		.circle(i.pos.x,i.pos.y,i.r+drshow)
		.pack.offP;
	}
	
	if(can.mouseHolding){
		ctx.openP.strokSty("white").lineBig(5)
		.circle(can.mouse.x,can.mouse.y,pullRadius)
		.strok.offP;
	}
}