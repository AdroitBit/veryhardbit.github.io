[Document,HTMLElement].qDefProp({
	svg:function(){
		return this.c('svg').toA();
	},canvas:function(){
		return this.c('canvas').toA();
	}
});
[HTMLCanvasElement].qDefProp({
	d2:function(){return this.getContext('2d')},
	webgl:function(){return this.getContext('webgl');}
}).qDefPro({
	ctx:function(a,b){
		return this.getContext(a,b);
	},resize:function(w,h,a){
		w*=1;h*=1;
		(a=this).width=w<0?w+innerWidth+1:w;
		a.height=h<0?h+innerHeight+1:h;
		return a;
	}
});
[CanvasRenderingContext2D].qDefPro({
	rec:function(x,y,w,h){
		this.rect(x,y,w,h);
		return this;
	},sprRec:function(x,y,w,h){
		return this.rec(x-w/2,y-h/2,w,h)
	},transXY:function(x,y){
		this.translate(x,y);
		return this;
	},untransXY:function(x,y){
		this.translate(-x,-y);
		return this;
	},sTran:function(a,b,c,d,e,f){
		if(DOMMatrix&&a instanceof DOMMatrix)this.setTransform(a);
		else this.setTransform(a,b,c,d,e,f);
		return this;
	},rot:function(a){
		this.rotate(a);
		return this;
	},unrot:function(a){
		this.rotate(-a);
		return this;
	},scl:function(x,y){
		this.scale(x,y);
		return this;
	},unscl:function(x,y){
		this.scale(1/x,1/y);
		return this;
	},trans:function(a,b,c,d,e,f){
		if(DOMMatrix&&a instanceof DOMMatrix){
			this.transform(a.a,a.b,a.c,a.d,a.e,a.f)
		}
		else this.transform(a,b,c,d,e,f);
		return this;
	},fillSty:function(a){
		this.fillStyle=a;
		return this;
	},drawRect:function(x,y,w,h,f,c,a){
		this.fillRect(x,y,w,h);
		return this;
	},strokSty:function(a){
		this.strokeStyle=a;
		return this;
	},drawStrokeRect:function(x,y,w,h,lw,c,ho,a){
		a=this;
		ho=a.strokeStyle;
		if(oo(w,Function))
			w=w(a.width,a.height,a);
		if(oo(h,Function))
			h=h(a.width,a.height,a);
		if(oo(lw,Function))
			lw=lw(a.lineWidth,a);
		if(arguments.length>5)
			a.strokeStyle=c;
		this.strokeRect(x,y,+w,+h)
		return a.strokeColor(ho);
	},imgSmooth:function(a,i){
		for(i=4,a=!!(a-0);i;)this[['mozI','webkitI','msI','i'][--i]+'mageSmoothingEnabled']=a;
		return this;
	},imgData:function(a,x,y,c,i){
		if(areValidCal(x-=0,y-=0))
			c=[x=x&&y,x,x,x];
		else c=this.getImageData((x|=0)<0?this.width+x:x,(y|=0)<0?this.height+x:x,1,1).data;
		for(i=0;i<4;++i)a[i]=c[i];
		return this;
	},lineSty:function(a,b){
		this.strokeStyle=a;this.lineWidth=b;
		return this;
	},lineBig:function(a){
		this.lineWidth=a;
		return this;
	},lineEdge:function(a){
		this.lineCap=a;
		return this;
	},swayTo:function(x,y,v,a,l){
		//v vertex keeper array aka result
		//t translate with array or f(x,y)
		a=[].slice.call(arguments,3);
		l=0;
		a.forEach(function(i,val){
				if(i instanceof Array){
					if(i[0]-0)x+=i[0];
					if(i[1]-0)y+=i[1];
				}else if(i instanceof Function){
					l=i(x,y);x=l[0];y=l[1];
				}
		});
		if(v instanceof Array){
			v.length=1;v[0]=[x,y];
		}
		this.currentVertex=[x,y];
		this.moveTo(x,y);
		return this;
	},dashTo:function(x,y,v,a,l){
		a=[].slice.call(arguments,3);
		l=0;
		a.forEach(function(i,val){
				if(i instanceof Array){
					if(i[0]-0)x+=i[0];
					if(i[1]-0)y+=i[1];
				}else if(i instanceof Function){
					l=i(x,y);x=l[0];y=l[1];
				}
		});
		if(v instanceof Array){
			v.push([x,y]);
		}
		this.currentVertex=[x,y];
		this.lineTo(x,y);
		return this;
	},dash:function(x,y,v,a,l){
		a=[].slice.call(arguments,3);
		l=0;
		a.forEach(function(i,val){
				if(i instanceof Array){
					if(i[0]-0)x+=i[0];
					if(i[1]-0)y+=i[1];
				}else if(i instanceof Function){
					l=i(x,y);x=l[0];y=l[1];
				}
		});
		this.currentVertex[0]+=x;
		this.currentVertex[1]+=y;
		if(v instanceof Array){
			v.push(this.currentVertex.slice());
		}
		this.lineTo(this.currentVertex[0],this.currentVertex[1]);
		return this;
	},alpha:function(a,b){
		b=this;
		if(arguments.length<1)return b.globalAlpha;
		if((a*=1)==a)b.globalAlpha=a.minMax(0,1);
		return b;
	},shadow:function(a,b,c,d,e){
		(e=this).shadowOffsetX=a;
		e.shadowOffsetY=b;
		e.shadowColor=c;
		e.shadowBlur=d;
		return e;
	},circle:function(x,y,r,v,d,a){
		a=[].slice.call(arguments,4);
		a.forEach(function(i,i2){
				if(i instanceof Array){
					if(i[0]-0)x+=i[0];
					if(i[1]-0)y+=i[1];
				}else if(i instanceof Function){
					i2=i(x,y);x=i2[0];y=i2[1];
				}
		});
		if(v instanceof Array){
			v.push([x,y]);
		}
		r*=1;d=this;
		if(!r||r<0)return d;
		d.arc(x,y,r,44/7,0,1);
		return d;
	},marc:function(x,y,r,s,e,a,c){
		c=this;
		if(r>0)c.arc(x,y,r,s,e,a);
		return c;
	},drawHorizontal:function(a,b,c,i){
		c=this;a=a-0|0;
		if(0>a)return c;
		c.beginPath();
		while(--a)
			c.swayTo(0,b*a).dashTo(c.canvas.width,b*a);
		c.stroke();
		c.closePath();
		return c;
	},drawVertical:function(a,b,c,i){
		c=this;a=a-0|0;
		if(0>a)return c;
		c.beginPath();
		for(i=a;--i;)
			c.swayTo(b*i,0).dashTo(b*i,c.canvas.height);
		c.stroke();
		c.closePath();
		return c;
	},axis:function(a,b){
		return this.drawHorizontal(a,b).drawVertical(a,b);
	},clearArc:function(a,b,c,d,e,f,g,h,i){
		h=(g=this).glCompOp();
		return g.glCompOp("destination-out").circle.apply(g,[].toA.call(arguments)).glCompOp(h);
	},glCompOp:function(a,b){
		b='globalCompositeOperation';
		if(arguments.length<1)return this[b];
		this[b]=a;
		return this;
	},yard:function(x,y,w,h,c){
    c=this;
    if((h/=2)>0&&(w/=2)>0)ctx.marc(x,y-(h-=w),w,Math.PI,0,0).dashTo(x+w,y+h).marc(x,y+h,w,0,Math.PI,0).dashTo(x-w,y-h);
		return c;
	},plusSign:function(x,y,w,l,c){
		c=this;if(orNan(x,y,w/=2,l)||w<=0||l<=0)return c;if(w>l)w=l;
		return c.swayTo(x-w,y-w).dashTo(x-w,y-l).dashTo(x+w,y-l).dashTo(x+w,y-w).dashTo(x+l,y-w).dashTo(x+l,y+w).dashTo(x+w,y+w).dashTo(x+w,y+l).dashTo(x-w,y+l).dashTo(x-w,y+w).dashTo(x-l,y+w).dashTo(x-l,y-w).dashTo(x-l,y-w).dashTo(x-w,y-w).dashTo(x-w,y-l);
	},scaleRec:function(x,y,t,r,b,l,c){
		c=this;
		if(arguments.length<6||orNan(x*=1,y*=1,t*=1,r*=1,b*=1,l*=1))return c;
		return c.swayTo(x-l,y-t).dashTo(x+r,y-t).dashTo(x+r,y+b).dashTo(x-l,y+b).dashTo(x-l,y-t);
	},clearPath:function(a,b,c){
		a=(b=this).glCompOp();
		return b.glCompOp('destination-out').pack.glCompOp(a);
	},drawImg:function(){
		this.drawImage.apply(this,[].slice.call(arguments));
		return this;
	},text:function(m,x,y,w){
		this.fillText(m,x,y,w);return this;
	},tText:function(a,b,c){
		this.font=a;this.textAlign=b;this.textBaseline=c;return this;
	},tont:function(a){
		this.font=a;return this;
	},align:function(a){
		this.textAlign=a;return this;
	},base:function(a){
		this.textBaseline=a;return this;
	}
}).qDefProp({
	width:function(){
		return this.canvas.width;
	},height:function(){
		return this.canvas.height;
	},clearA:function(a){
		(a=this).clearRect(0,0,a.width,a.height);
		return a;
	},pack:function(){
		this.fill();
		return this;
	},openP:function(){
		this.beginPath();
		return this;
	},offP:function(){
		this.closePath();
		return this;
	},strok:function(){
		this.stroke();
		return this;
	}
});
Math.detVertex2D=function(v,vi,a,i,l){
	if(v instanceof Array){
		a=i=0;
		if(vi instanceof Array){
			l=vi.length;
			while(i<l-1){
				a+=v[vi[i]][0]*v[vi[i+1]][1]-v[vi[i]][1]*v[vi[i+1]][0];
				++i;
			}
			return abs(a/2)
		}
		l=v.length;
		while(i<l-1){
			a+=v[i][0]*v[i+1][1]-v[i][1]*v[i+1][0];
			++i;
		}
		return abs(a/2);
	}
};
Math.detVertex2D2=function(v,a,i,l){
	a=i=0;l=v.length;
	while(i<l-1){
		a+=v[i]*v[i+3]-v[i+1]*v[i+2];
		i+=2;
	}
	return abs(a/2);
};
Math.centerVertex2D=function(v,x,y,i,l){
	l=v.length;x=y=a=i=0;
	while(i<l){
		x+=v[i][0]/l;y+=v[i][1]/l;
		++i;
	}
	return [x,y];
};
Math.centerVertex2D2=function(v,x,y,i,l){
	l=v.length;x=y=a=i=0;
	while(i<l){
		x+=v[i][0]/(l/2);y+=v[i][1]/(l/2);
		i+=2;
	}
	return [x,y];
};


function hue2rgb(p,q,t){
	if(t<0)t+=1;
	if(t>1)t-=1;
	if(6*t<1)return p+(q-p)*6*t;
	if(2*t<1)return q;
	if(3/2*t<1)return p+(q-p)*(2/3-t)*6;
	return p;
}
class ColorRGB{
	constructor(r,g,b){
		[this.r,this.g,this.b]=[r,g,b];
	}
	get rgb(){
		return [this.r,this.g,this.b];
	}
	set rgb(c){
		[this.r,this.g,this.b]=[c[0]|0,c[1]|0,c[2]|0];
	}
	toHSL(r,g,b,min,max,h,s,l,d){
		[r,g,b]=[this.r/255,this.g/255,this.b/255];
		[min,max]=[Math.min(r,g,b),Math.max(r,g,b)];
		h,s,l=(max+min)/2;
		if(max==min){
			h=s=0;			
		}else{
			d=max-min;
			s=2*l>1?d/(2-(2*l)):d/(2*l);
			switch(max){
				case r:h=(g-b)/d+(g<b?6:0);	break;
				case g:h=(b-r)/d+2;			break;
				case b:h=(r-g)/d+4;			break;
			}
			h/=6;
		}
		return new ColorHSL(h,s,l);
	}
	toHSV(r,g,b,min,max,h,s,v,d){
		[r,g,b]=[this.r/255,this.g/255,this.b/255];
		[min,max]=[Math.min(r,g,b),Math.max(r,g,b)];
		h,s,v=max;
		d=max-min;
		if(max==min){
			h=0;
		}else{
			switch(max){
				case r:h=(g-b)/d+(g<b?6:0);break;
				case g:h=(b-r)/d+2;break;
				case b:h=(r-g).d+4;break;
			}
			h/=6;
		}
		return new ColorHSV(h,s,v);
	}
}
class ColorHSL{
	constructor(h,s,l){
		[this.h,this.s,this.l]=[h,s,l];
	}
	set hsl(c){
		[this.h,this.s,this.l]=c;
	}
	get hsl(){
		return [this.h,this.s,this.l];
	}
	toRGB(r,g,b,h,s,l,q,p){
		[h,s,l]=[this.h,this.s,this.l];
		if(s==0){
			r=g=b=l;
		}else{
			q=l<0.5?l*(1+s):l+s-l*s;
			p=2*l-q;
			[r,g,b]=[
				hue2rgb(p,q,h+1/3),
				hue2rgb(p,q,h),
				hue2rgb(p,q,h-1/3)
			]
		}
		return new ColorRGB(r*255|0,g*255|0,b*255|0);
	}
	toHSV(){
		return this.toRGB().toHSV();
	}
}
//equivalent to hsb
class ColorHSV{
	constructor(h,s,v){
		[this.h,this.s,this.v]=[h,s,v];
	}
	set hsv(c){
		[this.h,this.s,this.l]=c;
	}
	get hsv(){
		return [this.h,this.s,this.v];
	}
	toRGB(r,g,b,h,s,v,i,f,p,q,t){
		i=h*6|0;
		f=h*6-i;
		p=v*(1-s);
		q=v*(1-f*s);
		t=v*(1-(1-f)*s);
		switch(i%6){
			case 0:r=v,g=t,b=p;break;
			case 1:r=q,g=v,b=p;break;
			case 2:r=p,g=v,b=t;break;
			case 3:r=p,g=q,b=v;break;
			case 4:r=t,g=p,b=v;break;
			case 5:r=v,g=p,b=q;break;
		}
		return new ColorRGB(r*255,g*255,b*255);
	}
	toHSL(){
		return this.toRGB().toHSL();
	}
}