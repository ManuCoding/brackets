function isalnum(c) {
	if(typeof c!="string") return false;
	const num=c.charCodeAt(c.length-1);
	return (47<num && num<58) || (64<num && num<91) || (96<num && num<123);
}

class A {
	constructor() {
		this.atlas=[];
	}
	get [""]() {
		return new B(this.atlas);
	}
	get undefined() {
		// TODO: smart function to add to Huffman table,
		//       for now simply push
		this.atlas.push(C.s);
		return this;
	}
}

class B {
	static atlas=[];
	constructor(atlas) {
		B.atlas=atlas;
		this.s="";
	}
	get [""]() {
		C.mode=0;
		return Function(this.s)();
	}
	get a() {
		C.n++;
		return this.N;
	}
	get N() {
		if(isalnum(this.s[this.s.length-2])) this.s+=" ";
		this.s+=B.atlas[C.n];
		return this;
	}
}

class C {
	static mode=0;
	static s="";
	constructor(arr) {
		this.arr=arr;
		this.n=1^C.mode;
		this.s="";
	}
	get a() {
		this.n*=2;
		this.n++;
		return this;
	}
	get b() {
		if(C.mode) {
			C.n=this.n;
			return "N";
		}
		this.s+=String.fromCharCode(this.n);
		this.n=1^C.mode;
		return this;
	}
	get [""]() {
		this.n*=2;
		return this;
	}
	get ["undefined"]() {
		console.log("get undefined");
		return this;
	}
	toString() {
		if(C.mode) return this.b;
		this.b;
		C.s=this.s;
		if(this.arr && this.arr instanceof Array && this.arr.length>0) {
			switch(this.arr[0].toString()) {
				case "":
					return "c";
				case "a":
					return "d";
				case "b":
					return "e";
				default:
					return this.arr[0].toString();
			}
		}
		return "undefined";
	}
}

Array.prototype.toString=function() {
	if(this.length==1 && this[0] instanceof Array) {
		if(this[0].length==0) return "a";
		if(this[0].length==1) {
			const inner=this[0][0];
			if(inner instanceof Array && inner.length==0) return "b";
		}
	}
	return Array.prototype.join.call(this,",");
};

Object.defineProperty(Array.prototype,"",{
	get() {
		if(this.length==0) return new C(this);
		if(this.length==1 && this[0] instanceof A) return new B(this[(C.mode=1)&2].atlas);
	}
});

Object.defineProperty(Array.prototype,"a",{
	get() {
		return new A();
	}
});

function encodestr(str) {
	var out="[][[]]";
	for(var i=0; i<str.length; i++) {
		out+=str[i].charCodeAt().toString(2).replace(/^1/,"").replace(/0/g,"[[]]").replace(/1/g,"[[[]]]");
		if(i+1<str.length) out+="[[[[]]]]";
	}
	return out;
}
function encodenum(num) {
	if(num==0) return "[][[]]";
	return "[][[]]"+num.toString(2).replace(/0/g,"[[]]").replace(/1/g,"[[[]]]");
}
function brackets(str="") {
	var tokens=[];
	for(var i=0; i<str.length; i++) {
		switch(true) {
			case isalnum(str[i]):
				var starti=i;
				while(isalnum(str[i])) i++;
				tokens.push(str.substring(starti,i));
				i--;
				break;
			case str[i]==" ":
			case str[i]=="\t":
			case str[i]=="\n":
			case str[i]=="\r":
				break;
			default:
				tokens.push(str[i]);
		}
	}
	console.log({tokens});
	var indexes=[];
	var atlas=[];
	for(var i=0; i<tokens.length; i++) {
		var idx=atlas.indexOf(tokens[i]);
		if(~atlas.indexOf(tokens[i])) {
			indexes.push(idx);
			continue;
		}
		indexes.push(atlas.push(tokens[i])-1);
	}
	return "[[][[[]]]["+
		atlas.map(encodestr).join("][")+
		"]][[]]["+
		indexes.map(encodenum).join("][")+
		"][[]]";
}

if(typeof module!="undefined" && "exports" in module) module.exports=brackets;
