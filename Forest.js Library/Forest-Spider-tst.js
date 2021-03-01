'use strict';(function(a,i){
Array.prototype.rev=function(s,e,a,l,c){
	l=(a=this).length;
	if((s=s*1|0)<0)s+=l;
	if(e==undefined)e=l-1;
	else if((e=e*1|0)<0)e+=l;
	if(s<l&&e<l)while(s<e){c=a[s];a[s++]=a[e];a[e--]=c;}
	return a;
};
Array.prototype.rol=function(d,a){
	return(d%=(a=this).length)?a.rev(d).rev(0,d-1).rev():a;
};
Array.prototype.C=function(r,f,a){
	a=[];
	while(r--){a[r]=r};
	r=a.length;
};
[Math].qDefNor({
	rndBet:function(a,b){
		if((b-=a-=0)>=0)return Math.random()*b+a;
		return NaN;
	},minSort:function(a,j,i,l){
			for(i=l=(a=[].slice.call(arguments)).length-1;i;)
			for(j=l- --i;j;){
				if(orNan(a[j]*=1,a[--j]*=1))return[NaN];
				if(a[j]>a[j+1])a[j]=a[j+1]-(0/(a[j+1]=a[j])|0);
			}
		return a;
	},maxSort:function(a,j,i,l){
		for(i=l=(a=[].slice.call(arguments)).length-1;i;)
			for(j=l- --i;j;){
				if(orNan(a[j]*=1,a[--j]*=1))return[NaN];
				if(a[j]<a[j+1])a[j]=a[j+1]-(0/(a[j+1]=a[j])|0);
			}
		return a;
	},median:function(a,j,i,l){
		for(i=l=(a=[].slice.call(arguments)).length-1;i;)
			for(j=l- --i;j;){
				if(orNan(a[j]*=1,a[--j]*=1))return NaN;
				if(a[j]<a[j+1])a[j]=a[j+1]-(0/(a[j+1]=a[j])|0);
			}
		return(a[floor(l=(l+2)/2)-1]+a[ceil(l)-1])/2;
	},mode:function(a,j,j1,i,l,r){
	if((l=(a=[].slice.call(arguments)).length-1)<2)return a[0]*1;
			for(i=l;i;)for(j=l- --i;j;){
				if(orNan(a[j]*=1,a[--j]*=1))return NaN;
				if(a[j]<a[j+1])a[j]=a[j+1]-(0/(a[j+1]=a[j])|0);
			}
		j1=1;j=0;
		for(i=l+1;--i;){
			if(a[i]!=a[i-1]){
				if(j<=j1){
					j=j1;r=a[i];
				}
				j1=1;
			}else++j1;
		}
		if(j<=j1){
			j=j1;r=a[i];
		}
		return r;
	},fact:function(n,s){
		s=n=ceil(n);
		if(n==1)return 1;
		if(n<0)return NaN;
		if(n==Infinity)return n;
		while(n>1)s*=--n;
		return s;
	},dfact:function(n,a){
		
	},C:function(n,r,a,b){
		n-=0;r-=0;
		if(n!=n||r!=r||n<0||r<0)return NaN;
		if(n==Infinity||r==Infinity)return Infinity;
		if(n==r)return 1;
		b=n=ceil(n);
		r=ceil(r);
		if(n<r)return 0;
		a=n-r;
		if(r>a){			
			/*while(++r<n)b*=r;
			return b/Math.fact(a)*/
			while(a>1){
				if(r<n-1)b*=++r;
				b/=a--;
			}
		}else{
			/*while(++a<n)b*=a;
			return b/Math.fact(r);*/
			while(r>1){
				if(a<n-1)b*=++a;
				b/=r--;
			}
		}
		return b;
	},P:function(n,r,b){
		n-=0;b-=0;
		if(n!=n||r!=r||n<0||r<0)return NaN;
		if(n==Infinity||r==Infinity)return Infinity;
		if(n==r)return 1;
		b=n=ceil(n);r=n-ceil(r);
		while(--n>r)b*=n;
		return b;
	},atan3:function(y,x){
		return((atan2(y,x)%PI2)+PI2)%PI2
	},isPrime:function(n,x){
		if(n<=0||n!=Math.round(n))return undefined;
		if(n==1)return false;
		if(n==2)return true;
		for(x=2;x*x<n;++x)if(n%x==0)return false;
		return true;
	}
});
a=["floor","round","ceil"],i=3;
while(i--)
		[Math].defNor("m"+a[i], Function("a,b","return(b-=0)*"+a[i]+"(a/b)"));
	for(a=Math.ownProp,i=a.length;i;)		[Window].defPro(a[--i],Math[a[i]]);
})();
[Window].qDefPro({
	PI2:2*PI,matan:function(y,x){
		if((y=atan(y/(x-=0)))!=y)return NaN;
		if(x<0)y-=PI;
		return(PI2+y)%(PI2);
	},rndBet:function(a,b){
		if((b-=a-=0)>=0)return random()*b+a;
		return NaN;
	},logB:function(a,b){return log(a)/log(b);},
	floor:function(a){return round(a-0.5);},ceil:function(a){return-round(-a-0.5);},sign:function(a){
		return abs(a*=1)==Infinity?(a>0?1:-1):(abs(a)/a||a);
	},trunc:function(a){
		return round((a*=1)-(sign(a)*0.5));
	},calc:function(){},parseFloa:function(n,b,I,i,i2,last,l){
		if(b==1||b<0||b>36)return NaN;s="0123456789abcdefghijklmnopqrstuvwxyz".slice(0,b=(b|0)?b:10);
		n=(n+'').replace(/^\s+|\s+$/g,"").replace(/^0+(?=[0-9])/g,"").replace(/^\./,"0.").lower;I=n.slice(0,n.index('.'));
		if(s.indexOf(I[i2=i=last=0])==-1)return NaN;for(l=I.length;i<l;last=last*b+s.indexOf(I[i++]))if(s.indexOf(I[i])==-1||last==Infinity)return last;
		I=n.slice(n.indexOf('.'));
		if(I[i=0]!='.')return last;
		l=(I=I.slice(1)).length;
		while(s.indexOf(I[i])!=-1)last+=s.indexOf(I[i])/pow(b,++i);
		return last;
	},isLeapYear:function(a){
		return(a%=400)==0||(a%100!=0&&a%4==0);
	},sigmaVec:function(a,l,t,s,x,y,an){
		a=[].slice.call(arguments);
		t=a.shift();x=y=0;
		if(t==0){
			l=floor(a.length/2);
			while(l--){
				x+=a[l*2]*cos(a[l*2+1]);
				if(a[l*2+1]!=PI)y+=a[l*2]*sin(a[l*2+1]);
			}
		}else if(t==1){
			while(l--){
				if(a[l][0]==a[l][0]&&a[l][1]==a[l][1]){
					x+=a[l][0]*cos(a[l][1]);
					if(a[l][1]!=PI)y+=a[l][0]*sin(a[l][1]);
				}
			}
		}
		return[hypot(y,x),atan2(y,x)];
	}
});
[Number].qDefProp({
	isInt:function(){
		return round(this)==this;
	},isValid:function(a){
		return abs(a=this*1)!=Infinity&&a==a;
	}
}).qDefPro({
	isMedian:function(){
		return this*1==Math.median.apply(0,[].slice.call(arguments));
	}
});