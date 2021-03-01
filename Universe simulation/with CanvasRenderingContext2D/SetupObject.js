class PObj{
	constructor(m,r,color,name="",bounciness=1,friction=0){
		this.m=m;
		this.r=r;
		this.color=color;
		this.rshow=r+2;
		this.name=name;
		
		
		this.bounciness=bounciness;
		this.friction=friction;
		
		this.pos=new V3();
		this.v=new V3();
		this.a=new V3();
	}
	isCollidingWith(o,r,vthis,vo){
		if(o instanceof PObj){
			r=o.pos.sub(this.pos);
			if(r.length>this.r+o.r)return false;
			r=r.normalize();
			vthis=this.v.dot(r);
			vo=o.v.dot(r);
			
			if(vthis>0&&vo>0&&abs(vthis)>abs(vo))return true;
			else if(vthis<0&&vo<0&&abs(vthis)<abs(vo))return true;
			else if(vthis>0&&vo<0)return true;
		}
		return false;
	}
	collidingBorder(){
		if(this.v.x<0&&this.pos.x-this.r<-can.width/2)return "xl";
		else if(this.v.x>0&&this.pos.x+this.r>can.width/2)return "xr";
		else if(this.v.y>0&&this.pos.y+this.r>can.height/2)return "yd";
		else if(this.v.y<0&&this.pos.y-this.r<-can.height/2)return "yt";
	}
	conserveMomentumWall(wtb,wtf){
		wtb=wall.bounciness*this.bounciness;
		//wtf=(1-wall.friction)*(1-this.friction);
		wtf=1-wall.friction*this.friction;
		switch(this.collidingBorder()){
			case "xl":this.v.x=abs(this.v.x)*wtb;this.v.y*=wtf;break;
			case "xr":this.v.x=-abs(this.v.x)*wtb;this.v.y*=wtf;break;
			case "yt":this.v.y=abs(this.v.y)*wtb;this.v.x*=wtf;break;
			case "yd":this.v.y=-abs(this.v.y)*wtb;this.v.x*=wtf;break;
		}
	}
	conserveMomentum(o,r,vthisx,vox,vthisy,voy,M,tob,tof){
		if(!this.isCollidingWith(o))return;
		r=o.pos.sub(this.pos).normalize();
		
		vthisx=r.scale(this.v.dot(r));
		vox=r.scale(o.v.dot(r));
		vthisy=this.v.sub(vthisx);
		voy=o.v.sub(vox);
		M=this.m+o.m;
		
		tob=this.bounciness*o.bounciness;
		tof=1-this.friction*o.friction;
		//wtf=(1-wall.friction)*(1-this.friction);
		
		this.v=vthisy.scale(tof).add(
			vthisx.scale((this.m-o.m)/M*tob),
			vox.scale(2*o.m/M*tob)
		);
		o.v=voy.scale(tof).add(
			vthisx.scale(2*this.m/M*tob),
			vox.scale((o.m-this.m)/M*tob)
		);
	}
}
class Force{
	constructor(name,f,mode=ForceMode.Force){
		this.name=name;
		this.f=f;
		this.mode=mode;
	}
}
ForceMode={
	Accerelation:0,
	Force:1
}
function randomRange(a,b){
	return a+random()*(b-a);
}
V2.prototype.len=V3.prototype.len=function(){
	return sqrt(this.dotSelf);
}
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
Object.prototype.toText=function(){
	return "rgb("+this.r+","+this.g+","+this.b+")";
}