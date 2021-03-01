//"use strict";
if(![].forEach)(function(a,b,i){
	a=['forEach','filter','map','every','reduce','reduceRight','entries','findIndex','find'];
	b=[function(a,b,i){
		if(typeof a=='function')for(i=0,b=this;i<b.length;++i)a(b[i],i,b);
	},function(a,b,c,i){
		b=[];c=this;if(typeof a=='function')
			for(i=0;i<c.length;++i)if(a(c[i],i,c))b[b.length]=c[i];
		return b;
	},function(a,b,c,i){
		b=[].slice.call(c=this);if(typeof a=='function')for(i=0;i<c.length;++i)b[i]=a(c[i],i,c);
		return b;
	},function(a,b,c,i){
		b=!1;if(typeof a=='function'){
			c=this;i=0;
			while((b=a(c[i],i,c))&&i<c.length)++i;
 		}
		return b;
	},function(a,b,c,d,i){
		c=this;i=0;d=c.length-1;
		if(d<2)return c[0];
		b=a(c[i],c[++i],i,c);
		while(i<d)b=a(b,c[++i],i,c);
		return b;
	},function(a,b,c,i){
		c=this;i=c.length-1;
		if(!i)return c[0];
		b=a(c[i],c[--i],i,c);
		while(i>0)b=a(b,c[--i],i,c);
		return b;
	},function(a){
		a={to:this,index:0};
		a.next=function(a){
			a=this;
			if(a.index<a.to.length)return{
				value:[a.index,a.to[a.index++]]
			};
		};return a;
	},function(a,b,i){
		b=this;i=-1;
		if(typeof a=='function')
			while(i<b.length)if(a(b[++i],i,b))return i;
		return-1;
	},function(a,b){
		b=this.findIndex(a);
		if(b<0)return;return this[b];
	}];i=9;while(i)Array.prototype[a[--i]]=b[i];
});
if(!Array.of)(function(a,b,i){
	a=['isArray','of'];
	b=[function(a){
		return{}.toString.call(a)=='[object Array]';
	},function(){
		return[].slice.call(arguments);
	}];i=2;
	while(i)Array[a[--i]]=b[i];
})();Array.prototype.defNor=function(a,b){
	this.forEach(function(i){
		a.replace(/^\s+|\s+$/g,"").split(/\s+/g).forEach(function(o){
			i[o]=b;
		});
	});
	return this;
};Array.prototype.defPro=function(a,b,i){
	this.map(function(i){return i.prototype;}).defNor(a,b);
	return this;
};Array.prototype.defProp=function(a){
	this.map(function(i){return i.prototype;}).forEach(function(i){
		Object.defineProperties(i,a);
	});
	return this;
};Array.prototype.qDefProp=function(a,c,n,i){
	for(n=Object.keys(a),i=n.length,c={};i;){
		c[n[--i]]={};
		if(a[n[i]].length!=0){
			c[n[i]].get=a[n[i]][0];
			c[n[i]].set=a[n[i]][1];
			c[n[i]].configurable=!a[n[i]][2];
		}else{
			c[n[i]].get=a[n[i]];
			c[n[i]].configurable=!0;
		}
	}
	return this.defProp(c);
};Array.prototype.qDefPro=function(a,b,i){
	b=Object.keys(a);
 	for(i=b.length;i;)this.defPro(b[--i],a[b[i]]);
	return this;
};Array.prototype.qDefNor=function(a,b,c,i){
	b=Object.keys(a);
	for(i=b.length;i;)this.defNor(b[--i],a[b[i]]);
	return this;
};
[Boolean].qDefProp({
	o:function(){return!(this*1);},
	t:function(){return!0;},
	f:function(){return!1;}
});[Window].qDefProp({
	body:function(){return dc.body;},
	ngt:function(){return navigator;},
	dc:function(){return this.document;},
	lastSS:function(){return dc.styleSheets.toA(1)[0];}
}).qDefPro({
	newImg:function(s,c,a){
		a=new Image();a.src=s;
		if(c>=0){
			a.onload=function(){
				a.width*=c;a.height*=c;
			}
		}
		return a;
	},'c compass':function(){
		return dc.c([].toA.call(arguments).join(','));
	},'compass1 c1':function(){
		return dc.c1([].toA.call(arguments).join(','));
	},nc:function(a){
		return dc.createElement(a);
	},reg:function(a,b){return new RegExp(a,b);},and:function(a,b,i,r){
		for(b=[].slice.call(arguments),i=b.length,r=1;i&&r;)r=b[--i]==a;
		return r;
	},or:function(a,b,i){
			b=[].slice.call(arguments,1);
			for(i=b.length;i;)if(b[--i]==a)return!0;
			return!1;
	},isNan:function(a){
		return(a*=1)!=a;
	},orNan:function(a,i,r){
		for(r=i=(a=[].slice.call(arguments)).length;i&&r;)if(r=(a[--i]*=1)!=a[i])i=0;
		return r;
	},allNan:function(a,i,r){
		for(r=i=(a=[].slice.call(arguments)).length;i&&(r=(a[--i]*=1)!=a[i]););
		return r;
	},areValidCal:function(a,i){
		a=[].slice.call(arguments);
		if(i=a.length){
			while(i&&(r=(a[--i]*=1).abs()!=Infinity&&a[i]==a[i]));
			return r;
		}
		return!1;
	},include:function(a,b){return a.indexOf(b)>-1;},'nc ncompass':function(a,b,c){
		a=a.replace(/^\s+|\s+$/g,"");
		if(typeof a!='string'||/[^A-z]|^[0-9]/.test(a))return null;
		a=dc.createElement(a);
		if(arguments.length>1&&!or(b,undefined,null))a.grip(b);
		return a.pegTo(-1,c);
	},parseFunction:function(a){
		return Function.parseFunction(a);
	},oo:function(a,i){
		return[].slice.call(arguments,1).every(function(i){return a instanceof i;});
	},rand:function(a){
		a=[].slice.call(arguments);
		a.push(Math.random());
		return a.reduce(function(i,i2){
			return i*i2;
		});
	},mRand:function(a,b,c){
		c=[].toA.call(arguments);
		if(!c.length)return NaN;
 		if(c.length<2)c=1;
 		else if(orNan(a*=1,b*=1))return NaN;
		else c=b-a;
		return Math.random()*c+a;
	}
});[Object].qDefProp({
	ownProp:function(){
		return Object.getOwnPropertyNames(this);
	},isJSON:function(){
		return/^\{.+\}$/.test(JSON.stringify(this));
	},keys:function(){
		return Object.keys(this);
	},allProp:function(){
		return Object.getAllProperty(this);
	}
}).qDefNor({
	assign:function(a,b,c,i){
		if(or(a,undefined,null)||or(b,undefined,null))return a;
		c=b.ownProp;
		for(i=c.length;i--;)try{a[c[i]]=b[c[i]];}catch(e){};
		return a;
	},deleteByValue:function(a,b,c,i,i2){
		b=[].slice.call(this);
		c=a.ownProp;
		for(i=c.length;i--;)b.each(function(i2){
			if(Object.is(a[c[i]],i2))
				delete a[c[i]];
		});
		return a;
	},deleteById:function(a,b,i){
		b=[].slice.call(arguments,1);
		for(i=b.length;i;delete a[b[--i]]);
		return a;
	},isJson:function(){
		return[].toA.call(arguments).every(function(i){
			return i.isJSON;
		});
	},getAllProperty:function(a,l,h){
		l={};
		h=this.getOwnPropertyNames;
		if(!or(a,null,undefined))
			h(a).concat(h(a.constructor.prototype)).forEach(function(i){
				l[i]=0;
			});
		return this.keys(l);
	}
}).defPro('oo',function(i){
	return oo.apply(null,[this].concat([].toA.call(arguments)));
});[Element].qDefProp({
	next:function(){
		return this.nextElementSibling;
	},prev:function(){
		return this.previousElementSibling;
	},child:function(){
		return this.c('*');
	},parent:[function(){
		return this.parentNode;
	},function(a){
		if(oo(a,Element))a.peg(this);
	}]
}).qDefPro({
	insertAfter:function(a,b){
		this.insertBefore(a,b.nextSibling);
	},peg:function(a,b,c,i){
		b=[].slice.call(arguments,1);
		c=this;
		a-=i=0;
		if(!a&&a!=0&&!b.length)return c;
		do if(oo(b[i],Node))c.insertBefore(b[i],c.childNodes[a<0?a:a+i]);while(i++<b.length);
		return c;
	}
});[Navigator].qDefProp({
	isUserOnPhone:function(){
		return/android|ios|iphone|ipad|windows phone|opera mini|web os|ie mobile|blackberry|playbook|htc|google nexus/i.test(this.userAgent);
	}
}).defPro('vibrate',ngt.vibrate||ngt.webkitVibrate||ngt.mozVibrate||ngt.msVibrate);
[Function].defPro('loop',function(a,b,i){
	a|=0;
	if(a>0)for(i=a;i--;)this.apply(null,[].toA.call(b));
	return this;
}).defNor('parseFunction',function(a,b,name,func,args){
	//Prefer to use old ES instead of new ES
	a=a.replace(/^\s+|\s+$/,"").replace(/\)\s+(\{)?/,"){");
	b=null;
	if(/^(function)(\s*)\(/.test(a)){
		a=a.replace(/^function/,"").replace(/^\s+/,"").slice(1);
		args=a.match(/.*?(?=\)\{)/)[0];
		a=a.slice(0,-1).replace(args,"").replace(/\)\s*?\{/,'');
		return new Function(args,a);
	}else if(/^(function)\s*([A-z]|[0-9])+\(/.test(a)){
		a=a.replace(/^function\s+/,"");
		name=a.match(/^([A-z]|[0-9])+/)[0];
		a=a.replace(name,"").replace(/^\s+/,"").replace(/\)\s+\{/g,"");
		args=a.slice(1).replace(/\).+/,"");
		func=a.replace(/^\(.*\)\{|\}$/g,"");
		b=new Function(args,func);
		if(/^[0-9]/.test(name).o)window[name]=b;
	}
	return b;
});[String].qDefPro({
	index:function(c,i,b,I){
		b=this+'';I=b.length;i=Math.trunc(!((i*=1)>1)?0:(i>I?I:i));if((c+='')=='')return i;for(c=c[0];i<I;++i)if(b[i]==c)return i;
	},del:function(a,b,c,sb,sf){
 		c=this;if(!(a*=1))return''+c;
 		if(!((b*=1)>0))b=c.length+b;
		sb=c.slice(0,b|=0);sf=c.slice(b);
		if(a<0)sb=sb.slice(0,a);
		else sf=sf.slice(a);
		return sb+sf;
	},slic:function(a,b){
		return[].slic.call(this+'',a,b).join('');
	},toFlipCase:function(){
		return this.replace(/[A-z]/g,function(i){
			return i.isUpper?i.lower:i.upper;
		});
	},reverse:function(){
		return this.toA(1).join('');
	},addBeginEnd:function(a,b){
		return a+this+b;
	},plot:function(a){
		a=[].toA.call(arguments);
		return this.replace(/\{[0-9]+\}/g,function(i){return a[i.slice(1,-1)];});
	},joint:function(a,b,c) {
		return this.slice(0,a)+c+this.slice(a+(b<0?0:b));
	},charLengthBy:function(a,b,f,i,s,o){
		s=this+'';b|=0;
		if(!arguments.length||s.length>b)return s;
		a+='';a=a[0];
		i=s.length;
		while(i++<b)if(f)s+=a;else s=a+s;
		return s;
	}
}).qDefProp({
	upperCaseInclude:function(){	
		return{str:this.match(/[a-z]/g),is:/[a-z]/.test(this)};
	},lowerCaseInclude:function(){
		return{str:this.match(/[A-Z]/g),is:/[A-Z]/.test(this)};
	},isUpper:function(){
		return this.upper==this;
	},isLower:function(){
		return this.lower==this;
	},lower:function(){
		return this.toLowerCase();
	},upper:function(){
		return this.toUpperCase();
	},lastArr:function(){
		return this.slice(-1)[0];
	},charCode:function(){
		return this.toA().map(function(i){
			return i.charCodeAt(0);
		});
	},asEvtN:function(){
		return this.replace(/@\S+/g,function(i,b,c,e){
		b=(i=i.slice(1)).lower+' ';
		c=["moz","webkit","ms","o"];e=c.length;
		while(e)b+=c[--e]+i+' ';
		return b;
		}).trim().split(/\s+/g);
	},avoidContent:function(){
		return this.toA(0,function(i){
			return/\'|\"|<|>/.test(i)?"&#"+i.charCode[0]+";":i;
		}).join("");
	},flip:function(){
		return this.toFlipCase();
	}
});[Array,TouchList,NamedNodeMap,HTMLCollection,NodeList,String,StyleSheetList,CSSRuleList].qDefPro({
	'toArray toA':function(a,b,c,d,e,f){
		f=[].slice.call(arguments);
		e=[].slice.call(this);if(f.length){
 			if(a)e.reverse();
			if(f.length>1){
				if(typeof b=='function')e=e.filter(b);
				if(f.length>2){
					if(typeof c=='function')e=e.map(c);
					if(f.length>3)
						if(typeof d=='function')e.forEach(d);
				}
			}
		}return e;
	},each:function(a,b,i){
		a=[].toA.call(arguments,i=0);
		for(;i<a.length;++i)if(typeof a[i]=='function')[].forEach.call(this,a[i]);
		return this;
	},take:function(a,b,i){
		b=[].toA.call(arguments,i=0);
		a=this.toA();
		for(;i<b.length;++i)a=typeof b[i]=='function'?[].filter.call(this,b[i]):a;
		return a;
	},put:function(a,b,i){
		b=[].toA.call(arguments,i=0);a=this.toA();
		for(;i<b.length;++i)a=typeof b[i]=='function'?[].map.call(this,b[i]):a;
		return a;
	},isAll:function(a,b,i){
		a=[].toA.call(arguments,i=0,b=1);
		for(;b&&i<a.length;++i)b=typeof b[i]=='function'?[].every.call(this,a[i]):b;
		return b;
	},seek:function(a,i,l){
		if(typeof a!="function"){
			l=this.length;
		}
	},index:function(a,i,b,c){
		for(b=(c=this).length,i=Math.trunc(!((i*=1)>1)?0:(i>b?b:i));i<b;++i)if(c[i]===a?!0:c[i]!==c[i]&&a!==a)return i;
	}
}).slice(0,1).qDefPro({
	slic:function(a,b,c,i,l){
		i=this.length;c=[];a=((a*=1)<0?i+a:a)|0;
		if(b==undefined)b=i-1;
		else b=((b*=1)<0?i+b:b)|0;
		if(a<b)for(i=b-a+1,b=this;i;c[--i]=b[i+a]);
		return c;
	},replaceEach:function(a,b){
		return this.map(function(i){
			return i.replace(a,b);
		});
	},addBeginEndEach:function(a,b){
		return this.map(function(i){
			return a+i+b;
		});
	},replaceAt:function(a,b,c){
		c=this.toA();a*=1;
		if(a<0)a=c.length+a;
		c[a]=b;
		return c;
	},modifyAt:function(a,b,c){
		a*=1;
		if(a<0)a=c.length+a;
		this[a]=b;
		return this;
	},randomNoRepeat:function(a,b,c){
		while((c=rand(a)|0)+1)
			if(this.length>=a){c=this[a]=NaN;break;}
			else if(!include(this,c)){this.push(c);break;}
		b*=1;
		return b.oo(Number)?c.toString(b):c;
	},rev:function(s,e,a,l){
		l=(a=this).length;
		if((s=s*1|0)<0)s+=l;
		if(e==undefined)e=l-1;
		else if((e=e*1|0)<0)e+=l;
		if(!(s<l&&e<l&&s>-1&&e>-1))while(s<e)a[s]=[a[e],a[e--]=a[s++]][0];
		return a;
	}
}).qDefProp({
	rnd:[function(){
		return this[rand(this.length)|0];
	},function(a){
		this[rand(this.length)|0]=a;
	}],lastArr:[function(){return this.slice(-1)[0];},function(a){this[this.length-1]=a;}]
});['Map'].concat('Uint8 Int8 Uint8Clamped Int16 Uint16 Int32 Uint32 Float32 Float64'.asEvtN).each(function(i){
	if(i=window[i+"Array"])['toArray','each','toA'].each(function(a){
		i.prototype[a]=Array.prototype[a];
	});
});[Document,HTMLElement].qDefPro({
	'compass c':function(){  
		return this.querySelectorAll([].toA.call(arguments).join(','))
	},'compass1 c1':function(){
		return this.querySelector([].toA.call(arguments).join(','))
	}
}).slice(1).qDefPro({
	css3:function(a,i){
		a=[].toA.call(arguments).join(";").split(";").replaceEach(/^(@(.*))/,function(r,tr,i){
			for(i=prefix.length,tr='';i;tr+=prefix[--i]+r.slic(1)+";");
			return tr;
		}).join(";").replace(/;{2,}/g,";").replace(/;$/,"").split(";");
		for(i=0;i<a.length;++i)
			try{
				if(!(a[i].indexOf(":")>-1)){throw'This is error from compass maker! You Missing ":" in property'}
				a[i]=a[i].split(":");
				this.style[a[i][0].replace(/(-)[A-Z]/g,function(x){return x.lower}).replace(/[A-Z]/g,function(x){return "-"+x.lower;})]=a[i].join(":").slice(a[i].join(":").indexOf(":",0)+1);
			}catch(e){console.error(e);break;};
		return this;
	},grip:function(a,b,c){
		c=this;
		if(typeof a=='string'){
			if(oo(b,Function))
				b=b(c.getAttribute(a),c[a],c);
			c.setAttribute(a,c[a]=b);
		}else if(or(a,undefined,null))return c;else a.ownProp.each(function(i){
			if(oo(a[i],Function))
				a[i]=a[i](c.getAttribute(i),c[i],c);
			c.setAttribute(i,c[i]=a[i]);
		});
		return c;
	},anim:function(a,b,c,d){
		d=Object.keys(b);//WipFunction
		if(d.indexOf('rate')<0)b.rate='ease';
		if(d.indexOf('rounds')<0)b.rounds=1;
		if(d.indexOf('time')<0)b.time=1;
		if(typeof a[i]=='function')
			a=a(getComputedStyle(this),this);
		if('c'==b.delay)b.delay=b.time;
			c=this.animate(a,{
				iterations:b.rounds,
				duration:b.time*1000,
				easing:b.rate,
				delay:b.delay
			});
		return{ele:this,anim:c};	
	},asBar:function(l,t,a,b){
		a=this;
		b=a.style;
		if(!l && !t)l=t=0;
		b.position="fixed";
		b.left=l;
		b.top=t;
		b.boxSizing="border-box";
		return a;
	},expel:function(a){
		(a=this).parent.removeChild(a);
		return a;
	},clone:function(a){
		return Object.assign(this.cloneNode(1),this).grip(a);
	},climb:function(a,b,c){
		c=this;
		a=+(oo(a,Function)?a(c.scrollLeft,c.scrollWidth):a);
		b=+(oo(a,Function)?b(c.scrollLeft,c.scrollWidth):b);
		c.scrollLeft=a;
		c.scrollTop=b;
		return c;
	},climbBy:function(a,b,c){
		(c=this).scrollLeft+=a;
		c.scrollTop+=b;
		return c;
	}
}).qDefProp({
	bl:function(){this.blur();return this;},fo:function(){this.focus();return this;}
}).replaceAt(1,CSSStyleRule).qDefPro({
	css3:function(a,i){
		a=[].toA.call(arguments).join(";").split(";").replaceEach(/^(@(.*))/,function(r,tr,i){
			for(i=prefix.length,tr='';i;tr+=prefix[--i]+r.slice(1)+";");
			return tr;
		}).join(";").replace(/;{2,}/g,";").replace(/;$/,"").split(";");
		for(i=0;i<a.length;++i)
			try{
				if(!(a[i].indexOf(":")>-1)){throw'This is error from compass maker! You Missing ":" in property'}
				a[i]=a[i].split(":");
				this.style[a[i][0].replace(/(-)[A-Z]/g,function(x){return x.lower}).replace(/[A-Z]/g,function(x){return "-"+x.lower;})]=a[i].join(":").slice(a[i].join(":").indexOf(":",0)+1);
			}catch(e){console.error(e);break;};
		return this;
	}
}).qDefProp({
	cstyle:function(){
		return getComputedStyle(this);
	}
});
[Array,NodeList,HTMLCollection].qDefPro({
	expel:function(a,i){
		this.toA(0,1,1,function(i){
			if(oo(i,Node))i.expel();
		});
		return this;
	},parent:function(){
		return this.toA().map(function(i){
			return i.parent;
		});
	},'attachEvent on':function(s,f){
		return this.each(function(i){
			i.on(s,f);
		});
	}
});
[HTMLInputElement,HTMLTextAreaElement].defPro('selectionText',function(a,b,c){
	a*=1;b*=1;
	(c=this).selectionStart=a<0?c.value.length+a:a;
	c.selectionEnd=b<0?c.value.length+b:b;
	return c;
});
[Node].qDefPro({
	pegTo:function(a,b){
		if(oo(b,Element))b.peg(a,this)
		return this;
	},before:function(a,b){
		a.parentElement.insertBefore(this,a);
		return this;
	},after:function(a,b){
		if(oo(a,Node))a.parentElement.insertBefore(this,a.nextElementSibling);
		return this;
	}
});
[EventTarget].qDefPro({
	addEvt:function(name,a,i){
		a=[].slice.call(arguments,1);
		for(i=0;i<a.length;++i){
			if((typeof a[i])=="function"||(a[i] instanceof Function))
				this.addEventListener(name,a[i]);
		}
		return this;
	},evt:function(a,b,c,d,f){
		a=a.asEvtN;
		c=this;
		d=function(e){
			this.evthandler[e.type].each(function(i){
				if(oo(i,Function))i(e)
			});
		};
		if(Object.keys(c).indexOf('evthandler')>-1){
			a.each(function(i){
				if(!oo(c.evthandler[i],Array))c.evthandler[i]=[];
				c.evthandler[i].push(b)
			});
			return c;
		}
		c.evthandler={};
		a.each(function(i){
			c.evthandler[i]=[b];
			c.removeEventListener(i,d);
			c.addEventListener(i,d);
		});
		return c;
	},constEvt:function(a,b,c){
		c=this;
		if(oo(b,Function)){
		a.asEvtN.forEach(function(i){
			c.addEventListener(i,new Function("e","("+b+")(e);"+rand(rand(720).sin(),rand())))
		});}
		return c;
	},expelEvt:function(a,b,c,d){
		a=a.asEvtN;
		d=this;
		a.each(function(i){
			d.evthandler[i][b*=1]=c;
		});
		return d;
	},rouse:function(a,b,c){
		c=this;
		if(typeof a=='string')
			a.asEvtN.each(function(i){
				c.dispatchEvent(new CustomEvent(i,b))
			});
		else[].toA.call(arguments,function(i){
				c.dispatchEvent(new CustomEvent(i.type,i));
		});
	return c;
	},'attachEvent on':function(a,b,c,i){
		a=a.asEvtN;c=this;if(!a)return c;	i=a.length;
		/*
if(oo(c,Element))while(i--)c.setAttribute("on"+a[i],oo(b,Function)?"("+b+").apply(this,[event])":null);
		else */while(i)c['on'+a[--i]]=b;
		return this;
	}
});[HTMLAudioElement,HTMLVideoElement].qDefPro({
	action:function(a,b,c,d,e,f,g){
		f=this;g=[].slice.call(arguments,0,5);
		if(e){
			f.action.apply(f,g.slice(0,-1));
			return f;
		}else{
			if(f.paused){
				f.play();
				if(oo(a,Function))return a.apply(f,oo(c,Array)?c:[]);
			}else{
				f.pause();
				if(oo(b,Function))return b.apply(f,oo(c,Array)?d:[]);
			}
		}
	},vol:function(a,b){
		b=this;
		if(!arguments.length)return b.volume;
		if(isNan(a*=1));
		else b.volume=a.minMax(0,1);
		return b;
	}
});[Number].qDefPro({
	isAround:function(a,b){
		a*=1;b*=1;
		if(a>b)b=[a,a=b][0];
		return this>a&&this<b;
	},go:function(){
		return Math.go.apply(0,[].toA.call(arguments).concat(this));
	},minMax:function(a,b,c){
		if(orNan(c=this-0,a*=1,b*=1)||a>b)return NaN;
		return c>b?b:c<a?a:c;
	},isBetW:function(a,b,c){
		return(c=this-0)>a&&c<b;
	}
}).qDefProp({
	isInt:function(){
		return(this^0)==this;
	},isNan:function(){
		return isNan(this);
	},fPoint:function(){
		return this%1;
	},isValid:function(a){
		return Math.abs(a=this-0)!=Infinity&&a==a;
	},char:function(){
		return String.fromCharCode(this);
	}
}).qDefNor({
	isEven:function(a){
		return this%2==0;
	},isOdd:function(a){
		return this%2==1;
	},toStrTime:function(a,hou,min,sec,mil){
		if(a==Infinity)a=new Date().getAllMilliseconds();
		else if(!(a|=0))return"00:00:00:000";
		mil=a%1000+'';
		sec=((a/=1000)|0)%60+'';
		min=((a/=60)|0)%60+'';
		hou=((a/=60)|0)%60+'';
		return hou.charLengthBy(0,2)+':'+min.charLengthBy(0,2)+':'+sec.charLengthBy(0,2)+':'+mil.charLengthBy(0,3);
	},fPoint:function(a){
		return a%1;
	}
});
[Math].qDefNor({
	logB:function(a,b){
		return Math.log(a)/Math.log(b);
	},isOdd:function(a){
		return a%2==1;
	},isEven:function(){
		return a%2==0;
	},go:function(a,b,c,i){
		b=[].slice.call(arguments,1);
		a=a.match(/^(<<|>>|&|\||\^|\+|-|\*|\/|\%)/);if(!a||!b.length)return NaN;
		c=new Function("a,b","return a"+a[0]+"b");
		for(a=b[i=0];a==a&&++i<b.length;)a=c(a,b[i]);
		return a;
	},mul:function(a,i){
		a=[].slice.call(arguments);
		for(a=[].slice.call(arguments),i=a.length;--i&&a[i]==a[i];a[i-1]*=a[i]);
		return a[i];
	},hcf:function(a,i,h,n1,n2){
		a=[].toA.call(arguments);
		for(i=a.length;i&&orNan(n1=a[--i]-0,n2=a[i-1]-0);)
			while(n2){
				n2=n1%(h=n2);
				n1=h;
				a[i-1]=n1;
			}
		return a[i]-0;
	},lcm:function(a){
		return Math.mul.apply(0,a=[].toA.call(arguments))/Math.hcf.apply(0,a);
	},fact:function(i,a){
		if(!((i*=1)>0||i.isInt))return NaN;
		a=1;while(a!=Infinity&&i>1)a*=i--;
		return a;
	},fib:function(l,a,r){
		if(!(l*=1).isInt||l<0)return NaN;
		for(r=[0,1],l+=2;--l;r[0]+=r[1],r=[r[1],r[0]])if(typeof a=="function")a(r[0],r[1]);
		return r[0];
	}/*,avg:function(a,i){		for(a=[].toA.call(arguments),i=a.length;i&&!orNan(a[--i-1]*=1,a[i]*=1);a[i-1]=a[i]+a[i-1]);
		return a[i]/a.length;
	}*/,root:function(n,p){
		return Math.abs(n*=1)==Infinity||!n?n:n/(n=Math.abs(n))*Math.pow(n,1/p);
	},csc:function(x){
		return 1/Math.sin(x);
	},sec:function(x){
		return 1/Math.cos(x);
	},cot:function(x){
		return 1/Math.tan(x);
	},acsc:function(b){
		return Math.asin(1/b);
	},asec:function(b){
		return Math.acos(1/b);
	},acot:function(b){
		return Math.atan(1/b);
	},acot2:function(x,y){
		return Math.atan2(x,y); 
	}
})[0].ownProp.each(function(i){
	if(Math[i].oo(Function)&&!/hypot|max|min|random|hcf|lcm|hcf2|lcm2|go/.test(i))
		[Number].defPro(i,function(){
			return Math[i].apply(0,[this].concat([].toA.call(arguments)));
		});
});
[Date].qDefProp({
	getAllMilliSeconds:function(a,b){
		return(a=this).getHours()*60*60*1000+a.getMinutes()*60*1000+a.getSeconds()*1000+a.getMilliSeconds();
	},isLeapYear:function(a){
		return(a=this.getFullYear()%400)?(a%100!=0&&a%4==0):true;
	}
});
[HTMLImageElement].defPro("to",function(a){this.src=a;});
(function(a,b,i){
	for(i=2,a=["min","max"];i;)Math[a[--i]+'Each']=new Function('a,b','return[].slice.call(arguments).map(function(i){return oo(i,Array)?Math.'+a[i]+'.apply(null,i):NaN})');
	for(i=2,a=["p","180","deg","rad"];i;)Math[a[--i+2]]=Function("p","p=Math.PI;return function(a){return a%360/"+a[i]+"*"+a[i^1]+";}")();
	if(!Object.is)Object.is=function(x,y){
		return x===y?x!==0||1/x===1/y:x!=x&&y!=y;
	};
for(a=['html','val','outhtml','innerHTML','value','outerHTML'],i=3;i;)[HTMLElement].defPro(a[--i],new Function('a','if(!arguments.length)return {1}.{0};if(typeof(a)=="function")a=a({1}.{0},{1}.{0}.length,{1});{1}.{0}=a;return {1};'.plot(a[i+3],'this')));
	for(i=2;i;)[Math].defNor(['max','min'][--i]+'Sort',new Function("a,j,i,l","l=(a=[].slice.call(arguments)).length-1;for(a[i=0]*=1;i"+"<>"[i]+"l;++i)for(j=0;j<l-i;++j){if((a[j]*=1)<(a[j+1]*=1))a[j]=[a[j+1],a[j+1]=a[j]][0];else if(orNan(a[j],a[j+1]))return[NaN];return a;"))
});
var prefix=["webkit","moz","o","ms","khtml"].addBeginEndEach("-","-");
prefix.push("");
[CSSRule,CSSStyleSheet].defPro('insertRules',function(a,i){
	a=[].toA.call(arguments);
	if(this.oo(CSSStyleSheet)||or(this.type,4,7,12)){for(i=a.length;i;)this.insertRule(a[--i]);}
	return this;
});
[CSSRule].qDefProp({
	name:[function(s){
		s=this.cssText;
		return s.slice(0,s.indexOf(" {"));
	},function(){}]
});
[CSSStyleSheet].qDefPro({
	selectRule:function(rule,a,i,l){
		i=0;a=this.cssRules;l=a.length;
		while(i<l){
			if(a[i].name==rule){
	   		 return a[i];
			}
			++i;
		}
		return -1;
	},selectRules:function(rule,a,i,l,r){
		r=[];i=0;a=this.cssRules;l=a.length;
		while(i<l){
			if(a[i].name.indexOf(rule)!=-1){
	  	 	 r.push(a[i]);
			}
			++i;
		}
		return r;
	}
});
[CSSRuleList].qDefPro({
	selectRule:function(rule,i,l){
		i=0;l=this.length;
		while(i<l){
			if(this[i].name==rule)
	   		 return this[i];
			++i;
		}
		return null;
	},selectRules:function(rule,i,l,r){
		r=[];i=0;l=a.length;
		while(i<l){
			if(this[i].name.indexOf(rule)!=-1)
	  	 		r.push(this[i]);
			++i;
		}
		return r;
	}
});