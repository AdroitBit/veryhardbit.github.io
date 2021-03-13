[Window].qDefPro({
	isA:Array.isArray||function(a){
		return{}.prototype.toString.call(a).slice(8,-1)=="Array";
	},powSet:function(a,h,b,i,j,s,l){
		if(!isA(h)||h==undefined)h=[];
		if(isA(a))
			for(i=0,s=a.length,l=Math.pow(2,s);i<l;++i){
				b=[];
				for(j=0;j<s;++j){
					if(i&(1<<j))b.push(a[j])
				}
				h.push(b);
			}
		return h;
	},toStrSet:function(a,s,l,i,j){
		s='';
		if(isA(a)){
			l=a.length;
			if(l==0)return'';
			for(i=0;i<l;++i){
				s+=(isA(a[i])?"{"+toStrSet(a[i])+"}":a[i]);
				if(i<l-1){
					s+=','
				}else break;
			}
		}
		return s;
	},prim:function(n,a,i,j,b){
		if(a==null||a==undefined)a=[];
		b=Math.abs(n-=0);
		if(b<2||b%1||b==Infinity||b!=b){
			a[0]=n;a[1]=1;return a;
		}
		if(n<0){
			n=-n;a[j=0]=-1;a[1]=1;
		}else{
			a[1]=0;j=-2;
		}
		for(i=2,b=Math.sqrt(n)+1;i<b;i=i==2?3:i+2)
			while(n%i==0){
				if(a[j]==i)++a[j+1];
				else{a[j+=2]=i;a[j+1]=1;}
				n=Math.trunc(n/i);
			}
		if(n>2){a[j+2]=n;a[j+3]=1;}
	},
/****************
Matrix
*****************/
/*
Pat of matrix : 
A=[
	[1,2,3],
	[4,5,6],
	2,3
]
*/
	det:function(A,v,m,i,j,bj,n){//det like 3x3
		m=A[A.length-1];
		if(m==1){
			return A[0][0];
		}
		if(m==2){
			return A[0][0]*A[1][1]-A[1][0]*A[0][1];
		}
		if(m==3){
			//increase v
			bj=0;v=0;
			while(bj<m){
				i=0;j=bj;n=1;
				while(i<m){
					n*=A[i][j];
					++i;j=(j+1)%m;
				}
				v+=n;++bj;
			}
			//decrease v;
			bj=0;
			while(bj<m){
				i=m-1;j=bj;n=1;
				while(i>=0){
					n*=A[i][j];
					--i;j=(j+1)%m;
				}
				v-=n;++bj;
			}
		}
		if(m>3){
			//a11*C11+a12*C12+a13*C13+a14*C14+a15*C15+a16*C16...
			i=0;
			j=0;
			v=0;
			while(j<m){
				v+=A[0][j]*cofij(A,1,j+1);
				//alert(cofij(A,1,j+1));
				++j;
			};
		}
		return v;
	},minorMat:function(A,B,R,i,j,ci,cj,m,n){
		/*if(round(abs(i))!=i||round(abs(j))!=j){
			return NaN;
		}*/
		/*
		B temp matrix
		iB placed in B
		jB placed in B
		R return matrix
		ci current chosen operate i of A
		cj current chosen operate j of A
		*/
		m=A.lastArr;
		if(m==2){
			return[
				[A[1][1],A[1][0]],
				[A[0][1],A[0][0]],
				2,2
			]
		}
		if(m>2){
			//make B 2*2
			
			R=(new Array(m)).fill(0).map(function(){
				return new Array(m);
			});
			R.push(m);
			R.push(m);
			ci=0;cj=0;
			while(ci<m){
				cj=0;
				while(cj<m){
					B=(new Array(m-1)).fill(0).map(function(){
					return new Array(m-1);
					});
					B.push(m-1);B.push(m-1);
					i=0;j=0;iB=0;jB=0
					while(i<m){
						j=0;
						while(j<m){
			/*alert(
				i+":"+j+"\n"+ci+":"+cj
			)*/
							if(ci!=i&&cj!=j){
								//alert()
								B[iB][jB]=A[i][j];
								jB=(jB+1)
								if(jB>=m-1){
									jB-=m-1;
									iB+=1;
								}
							}
							++j
						}
						++i;
					}
					//alert(B.join("\n"));
					R[ci][cj]=det(B);
					++cj;
				}
				++ci;
			}
			return R;
		}
	},cofMat:function(A,B,m,i,j){
		m=A.lastArr;
		/*if(m>1&&m<5){
			B=(new Array(m)).fill(0).map(function(){
				return new Array(m);
			});
			B=minorMat(A);
			//alert(B.join("\n"))
			i=0;
			while(i<m){
				j=0;
				while(j<m){
					if((i+j)&1)B[i][j]*=-1;
					++j;
				}
				++i;
			}
			return B;
		}*/
		if(m==2){
			return[
				[A[1][1],-A[1][0]],
				[-A[0][1],A[0][0]],
				2,2
			]
		}
		if(m>2){
			R=(new Array(m)).fill(0).map(function(){
				return new Array(m);
			});
			R.push(m);
			R.push(m);
			ci=0;cj=0;
			while(ci<m){
				cj=0;
				while(cj<m){
					B=(new Array(m-1)).fill(0).map(function(){
					return new Array(m-1);
					});
					B.push(m-1);B.push(m-1);
					i=0;j=0;iB=0;jB=0
					while(i<m){
						j=0;
						while(j<m){
			/*alert(
				i+":"+j+"\n"+ci+":"+cj
			)*/
							if(ci!=i&&cj!=j){
								//alert()
								B[iB][jB]=A[i][j];
								jB=(jB+1)
								if(jB>=m-1){
									jB-=m-1;
									iB+=1;
								}
							}
							++j
						}
						++i;
					}
					//alert(B.join("\n"));
					R[ci][cj]=((ci+cj)&1?-1:1)*det(B);
					++cj;
				}
				++ci;
			}
			return R;
		}
	},transMat:function(A,B,i,j,m,n){
		m=A[A.length-2];
		n=A[A.length-1];
		B=(new Array(n)).fill(0).map(function(){
			return new Array(m)
		});
		B.push(n);
		B.push(m);
		i=0;
		while(i<m){
			j=0;
			while(j<n){
				B[j][i]=A[i][j]
				++j;
			}
			++i;
		}
		return B;
	},adjMat:function(A){
		return transMat(cofMat(A));
	},nAddMat:function(a,A,i,j,m,n){
		m=A[A.length-2];
		n=A[A.length-1];
		i=0;
		while(i<m){
			j=0;
			while(j<n){
				A[i][j]+=a;
				++j
			}
			++i;
		}
	},nMulMat:function(a,A,B,i,j,m,n){
		m=A[A.length-2];
		n=A[A.length-1];
		B=(new Array(m)).fill(0).map(function(){
			return new Array(n);
		});
		B.push(m)
		B.push(n)
		i=0;
		while(i<m){
			j=0;
			while(j<n){
				B[i][j]=A[i][j]*a;
				//alert(i+":"+j)
				++j;
			}
			++i;
		}
		return B;
	},matAddMat:function(A,B,C,i,j,m,n){
		m=A[A.length-2];
		n=A[A.length-1];
		if(m==B[B.length-2]&&n==B[B.length-1]){
			C=(new Array(m)).fill(0).map(function(){
				return new Array(n);
			});
			C.push(m);
			C.push(n);
			i=0;
			while(i<m){
				j=0;
				while(j<n){
					C[i][j]=A[i][j]+B[i][j];
					++j;
				}
				++i;
			}
			return C;
		}
	},matSubMat:function(A,B,C,i,j,m,n){
		m=A[A.length-2];
		n=A[A.length-1];
		if(m==B[B.length-2]&&n==B[B.length-1]){
			C=(new Array(m)).fill(0).map(function(){
				return new Array(n);
			});
			C.push(m);
			C.push(n);
			i=0;
			while(i<m){
				j=0;
				while(j<n){
					C[i][j]=A[i][j]-B[i][j];
					++j;
				}
				++i;
			}
			return C;
		}
	},matMulMat:function(A,B,C,n,mA,nA,mB,nB,iA,jA,iB,jB){
		mA=A[A.length-2]
		nA=A[A.length-1]
		mB=B[B.length-2]
		nB=B[B.length-1]
		if(nA==mB){
			C=(new Array(mA)).fill(0).map(function(){
				return new Array(nB);
			});
			C.push(mA);
			C.push(nB);
			iA=0;
			while(iA<mA){
				jB=0;
				while(jB<nB){
					n=0;
					jA=0;iB=0
					while(jA<nA&&iB<mB){// or iB<mB
						n+=A[iA][jA]*B[iB][jB];
						//alert(A[iA][jA]+":"+B[jA][iA])
						++jA;
						++iB;
					}
					//alert(n)
					C[iA][jB]=n;
					++jB
				}
				++iA;
			}
			return C;
		}
	},invertMat:function(A,dA){
		dA=det(A);
		if(dA!=0&&dA==dA)
		return nMulMat(1/det(A),adjMat(A));
	},minorij:function(A,ci,cj,i,j,B,iB,jB,m){
		m=A[A.length-1];
		ci-=1;cj-=1;
		if(ci>=m||cj>=m||ci<0||cj<0){
			return NaN;
		}
		if(m>1){
			B=(new Array(m-1)).fill(0).map(function(){
				return new Array(m-1);
			});
			B.push(m-1);B.push(m-1);
			iB=jB=i=0;
			while(i<m){
				j=0;
				while(j<m){
					if(ci!=i&&cj!=j){
						B[iB][jB]=A[i][j];
						++jB
						if(jB>=m-1){
							jB-=m-1;
							++iB;
						}
					}
					++j;
				}
				++i;
			}
			return det(B)
		}
	},cofij:function(A,ci,cj,i,j,B,iB,jB,m){
		m=A[A.length-1];
		ci-=1;cj-=1;
		if(ci!=round(ci)||cj!=round(cj)||ci>=m||cj>=m||ci<0||cj<0){
			return NaN;
		}
		if(m>1){
			B=(new Array(m-1)).fill(0).map(function(){
				return new Array(m-1);
			});
			B.push(m-1);B.push(m-1);
			iB=jB=i=0;
			while(i<m){
				j=0;
				while(j<m){
					if(ci!=i&&cj!=j){
						B[iB][jB]=A[i][j];
						++jB
						if(jB>=m-1){
							jB-=m-1;
							++iB;
						}
					}
					++j;
				}
				++i;
			}
			return((ci^cj)&1?-1:1)*det(B);
		}
	},powerMat:function(A,x,m,n,R,ci,cj,i,j,v){
		m=A[A.length-2]
		n=A[A.length-1]
		if(m==n){
			if(x!=round(x)||x<1){return undefined}
			if(x==1){return A;}
			R=A;
			while(--x){
				R=matMulMat(R,A);
			}
			return R;
		}
	}
});
/*
det(6x6)=a11*C11+a12*C12+a13*C13+a14*C14+a15*C15+a16*C16
det(6x6)=a11*M11(5x5)-a12*M12(5x5)+a13*M13(5x5)-a14*M14(5x5)+a15*M15(5x5)-a16*M16(5x5)
det(6x6)=(a11*det11(4x4))-(a12*det12(4x4))+(a13*det13(4x4))-(a14*det14(4x4))+(a15*det15(4x4))-(a16*det(4x4))
det(6x6)=(a11*det11(4x4))-(a12*det12(4x4))+(a13*det13(4x4))-(a14*det14(4x4))+(a15*det15(4x4))-(a16*det(4x4))
*/


function Complex(real,imaginary){
	if(!(this instanceof Complex))return null;
	if(arguments.length==0){
		this.real=this.imaginary=0;
	}else if(arguments.length==1){
		this.real=real;this.imaginary;
	}else if(arguments.length==2){
		this.real=real;
		this.imaginary=imaginary;
	}
	this.toArray=function(format){
		return [this.real,this.imaginary];
	}
	this.multiply=function(n){
		if(n instanceof Complex){
			return new Complex(
				this.real*n.real-this.imaginary*n.imaginary,
				this.real*n.imaginary+
				this.imaginary*n.real
			);
		}
		else if(n instanceof Number||typeof n=="number"){
		   return new Complex(
			   this.real*n,this.imaginary*n
		   );
		}
		else return undefined;
	}
	this.rotateDeg=function(a){
		return Complex.multiply(this,Complex.fromDeg(a))
	}
	this.rotateRad=function(a){
		return Complex.multiply(this,Complex.fromRad(a))
	}
	this.addRad=function(a,x,y){
		/*
		(x+yi)(cos+isin)
		=xcos+xisin+yicos-ysin
		=(xcos-ysin)+(xsin+ycos)i
		*/
		x=this.real;y=this.imaginary;
		this.real=x*Math.cos(a)-y*Math.sin(a);
		this.imaginary=x*Math.sin(a)+y*Math.cos(a);
		return this;
	}
	this.addDeg=function(a){
		return this.addRad(a/180*PI);
	}
	this.pow=function(n,r,rn,rz){
		r=this.scale;
		rn=Math.pow(r,n);
		rz=new Complex(
			Math.cos(n*this.angle),
			Math.sin(n*this.angle)
		);
		rz.scale*=rn;
		return rz;
	}
	this.toString=function(a){
		a-=0;
		if(a!=a)
			return this.real+"+"+this.imaginary+"i";
		else
			return this.real.toFixed(a)+"+"+this.imaginary.toFixed(a)+"i";
	}
	this.add=function(a,r,i){
		a=[].slice.call(arguments);
		for(i=0;i<a.length;++i){
			if(a[i] instanceof Complex){
				this.real+=a[i].real;
				this.imaginary+=a[i].imaginary;
			}
			else{
				this.real+=a[i]-0;
			}
			if(Number.isNaN(this.real-this.imaginary)){this.real=this.imaginary=NaN;break;}
		}
		return this;
	}
	this.sub=function(a,r,i){
		a=[].slice.call(arguments);
		for(i=0;i<a.length;++i){
			if(a[i] instanceof Complex){
				this.real-=a[i].real;
				this.imaginary-=a[i].imaginary;
			}else{
				this.real-=a[i];
			}
			if(Number.isNaN(this.real-this.imaginary)){this.real=this.imaginary=NaN;break;}
		}
		return this;
	}
	this.multiply=function(a,r,i,x0,y0,xi,yi){
		a=[].slice.call(arguments);
		for(i=0;i<a.length;++i){
			if(a[i] instanceof Complex){
				x0=this.real;y0=this.imaginary;
				xi=a[i].real;yi=a[i].imaginary;
				this.real=x0*yi-y0*yi;
				this.imaginary=y0*xi+x0*yi;
			}else{
				this.real*=a[i];
				this.imaginary*=a[i];
			}
			if(Number.isNaN(this.real-this.imaginary)){this.real=this.imaginary=NaN;break;}
		}
		return this;
	}
	this.divide=function(a,r,i,x0,y0,xi,yi){
		a=[].slice.call(arguments);
		for(i=0;i<a.length;++i){
			if(a[i] instanceof Complex){
				x0=this.real;y0=this.imaginary;
				xi=a[i].real;yi=a[i].imaginary;ri=Math.pow(a[i].scale,2);
				this.real=(x0*yi+y0*yi)/ri;
				this.imaginary=(y0*xi-x0*yi)/ri;
			}else{
				this.real/=a[i];
				this.imaginary/=a[i];
			}
			if(Number.isNaN(this.real-this.imaginary)){this.real=this.imaginary=NaN;break;}
		}
		return this;
	}
}
Object.assign(Complex,{
	pair:0,
	array:1
});
Complex.sqrt=function(z,r){
	r=new Complex(
		Math.sqrt((z.scale+z.real)/2),
		Math.sign(z.imaginary)*
			Math.sqrt((z.scale-z.real)/2)
	);
	return r;
};
Complex.fromDeg=function(a){
	return new Complex(Math.cos(a/180*Math.PI),Math.sin(a/180*Math.PI));
};
Complex.cis=Complex.fromRad=function(a){
	return new Complex(Math.cos(a),Math.sin(a));
};
Complex.rootn=function(n,c,k,r){
	r=new Array(n);
	for(k=0;k<n;++k)r[k]=new Complex(
		Math.pow(c.scale,1/n)*cos((c.angle+Math.PI*2*k)/n),
		Math.pow(c.scale,1/n)*sin((c.angle+Math.PI*2*k)/n)
	);
	return r;
};

//var c=new Complex(2,3);
Object.defineProperty(Complex.prototype,'0',{
	get:function(){
		return this.real;
	},
	set:function(x){
		this.real=x;
	}
});
Object.defineProperty(Complex.prototype,'1',{
	get:function(){
		return this.imaginary;
	},
	set:function(x){
		this.imaginary=x;
	}
});
Object.defineProperty(Complex.prototype,'scale',{
	get:function(){
		return Math.hypot(this.real,this.imaginary);
	},
	set:function(x){
		r=Math.hypot(this.real,this.imaginary);
		if(r==0)r=1;
		this.real=this.real/r*x;
		this.imaginary=this.imaginary/r*x;
	}
});
Object.defineProperty(Complex.prototype,'copy',{
	get:function(){
		return new Complex(this.real,this.imaginary);
	}
});
Object.defineProperty(Complex.prototype,'angle',{
	get:function(){
		return Math.atan2(this.imaginary,this.real)
	},set:function(x,s){
		s=this.scale;
		if(s==0){
			this.real=0;
			this.imaginary=0;
		}
		this.real=s*cos(x);
		this.imaginary=s*sin(x);
	}
});
Object.defineProperty(Complex.prototype,'conjugate',{
	get:function(){
		return new Complex(this.real,-this.imaginary);
	}
});
Object.defineProperty(Complex.prototype,'invert',{
	get:function(a,b){
		//a=this.conjugate/this.scale/this.scale;
		a=this.conjugate.divide(this.scale,this.scale);
		return a;
	}
});

class V2{
    constructor(x,y){
        if(arguments.length==0){
            this.x=this.y=0;
        }
        else if(x instanceof Array){
            this.x=x[0];
            this.y=x[1];
        }
        else{this.x=x;this.y=y;}
    }
    dot(v){
        return this.x*v.x+this.y*v.y;
    }
    get dotSelf(){
    	return this.dot(this);
    }
    dotVec(v){
        v=[].slice.call(arguments);
        v.push(this);
        v=v.reduce(function(acc,cur,ind){
            if(ind==0)acc=acc.copy();
            acc.x=acc.x*cur.x;
            acc.y=acc.y*cur.y;
            return acc;
        });
        return v;
    }
    scale(v){
        v=this.copy();
        [].slice.call(arguments).forEach(function(i){
            v.x*=i;v.y*=i;
        });
        return this;
    }
    normalized(r,v){
        r=(v=this.copy()).length;
        v.x/=r;v.y/=r;
        return v;
    }
	normalize(r){
        r=this.length;
        this.x/=r;this.y/=r;
        return this;
    }
    scaleTo(v){
        this.length=v;
        return this;
    }
    copy(){
        return new V2(this.x,this.y);
    }
	project(v){
    	return v.copy().scaleTo(this.dot(v.normalized()));
    }
    add(v){
        v=[].slice.call(arguments);
        v.unshift(this.copy());
        return v.reduce(function(acc,cur,i){
            acc.x+=cur.x;acc.y+=cur.y;
            return acc;
        });
    }
    sub(v){
        v=[].slice.call(arguments);
        v.unshift(this.copy());
        return v.reduce(function(acc,cur,i){
            acc.x-=cur.x;acc.y-=cur.y;
            return acc;
        });
    }
	neg(){
		return this.copy().scale(-1);
	}
	zero(){
		this.x=this.y=0;
		return this;
	}
    toString(){
        return this.x+","+this.y;
    }
    toArray(){
        return[this.x,this.y];
    }
    toJSON(){
        return{x:this.x,y:this.y};
    }
    toV3(){
        return new V3(this.x,this.y,0);
    }
}
Object.defineProperty(V2.prototype,"length",{
    get:function(){
        return Math.hypot(this.x,this.y);
    },
    set:function(r){
        r/=this.length;
        this.x*=r;
        this.y*=r;
    }
});
V2.add=function(v){
    v=[].slice.call(arguments);
    v[0]=v[0].copy();
    return v.reduce(function(acc,cur,i){
        acc.x+=cur.x;
        acc.y+=cur.y;
        return acc;
    });
};

class V3{
    constructor(x,y,z){
        if(arguments.length==0)
            this.x=this.y=this.z=0;
        else if(x instanceof Array){
            this.x=x[0];
            this.y=x[1];
            this.z=x[2];
        }
        else{this.x=x;this.y=y;this.z=z;}
    }
    dot(v){
        return this.x*v.x+this.y*v.y+this.z*v.z;
    }
    get dotSelf(){
    	return this.dot(this);
    }
    cross(b,a){
        a=this;
        return new V3(
            a.y*b.z-b.y*a.z,
            -(a.x*b.z-b.x*a.z),
            a.x*b.y-b.x*a.y
        );
    }
    scale(a,r){
        a=[].slice.call(arguments)
        r=this.copy();
        a.forEach(function(i){
            r.x*=i;r.y*=i;r.z*=i;
        });
        return r;
    }
    invertScale(n){
    	return this.scaleTo(n/this.length);
    }
    normalize(r){
        r=this.length;
        this.x/=r;this.y/=r;this.z/=r;
        return this;
    }
    normalized(r){
        let v=this.copy();
        r=v.length;
        v.x/=r;v.y/=r;v.z/=r;
        return v;
    }
    scaleTo(v){
        this.length=v;
        return this;
    }
    copy(){
        return new V3(this.x,this.y,this.z);
    }
    project(v){
    	return v.copy().scaleTo(this.dot(v.normalized()));
    }
    add(v){
        v=[].slice.call(arguments);
        v.unshift(this.copy());
        return v.reduce(function(acc,cur,i){
            acc.x+=cur.x;
            acc.y+=cur.y;
            acc.z+=cur.z;
            return acc;
        });
    }
    sub(v){
        v=[].slice.call(arguments);
        v.unshift(this.copy());
        return v.reduce(function(acc,cur,i){
            acc.x-=cur.x;
            acc.y-=cur.y;
            acc.z-=cur.z;
            return acc;
        });
    }
    neg(){
        return this.copy().scale(-1);
    }
	zero(){
		this.x=this.y=this.z=0;
		return this;
	}
    toString(){
        return this.x+","+this.y+","+this.z;
    }
    toArray(){
        return[this.x,this.y,this.z];
    }
    toJSON(){
        return{x:this.x,y:this.y,z:this.z};
    }
}
Object.defineProperty(V3.prototype,"length",{
    get:function(){
        return Math.hypot(this.x,this.y,this.z);
    },
    set:function(r){
        r/=this.length;
        this.x*=r;
        this.y*=r;
        this.z*=r;
    }
});
V3.add=function(v){
    v=[].slice.call(arguments);
    v[0]=v[0].copy();
    return v.reduce(function(acc,cur,i){
        acc.x+=cur.x;
        acc.y+=cur.y;
        acc.z+=cur.z;
        return acc;
    });
};
[Touch].qDefProp({
	//need the css transformation apply for vertex accuracy
	offsetX:function(){
		var par=this.target;
		var x=this.pageX;
		while(par.offsetParent){
			x-=par.offsetWidth/2-par.clientWidth/2;
			x-=par.offsetLeft;
			console.log(par.offsetLeft==can.width/2);
			x+=par.scrollLeft;
			par=par.offsetParent;
		}
		if(getComputedStyle(par).position=="fixed"){
			x-=par.offsetLeft;
			x-=par.offsetWidth/2-par.clientWidth/2;
			x+=par.scrollLeft;
		}
		return x;
	},offsetY:function(){
		var par=this.target;
		var y=this.pageY;
		while(par.offsetParent){
			y-=par.offsetHeight/2-par.clientHeight/2;
			y-=par.offsetTop;
			y+=par.scrollTop;
			par=par.offsetParent;
		}
		if(getComputedStyle(par).position=="fixed"){
			y-=par.offsetTop;
			y-=par.offsetHeight/2-par.clientHeight/2;
			y+=par.scrollTop;
		}
		return y;
	}
});
/*[Date].qDefPro({
	add:function(a){
		a=[].slice.call(arguments);
		var d=new Date();
		for()
	}
	sub:function(){
		
	}
}).qDefProp({
	inSec:function(){
		
	}
})*/