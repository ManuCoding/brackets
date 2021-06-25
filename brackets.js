class A {
	constructor(t) {
		this.l=t.length;
		this.z=t[0]+"";
		this.s="";
		this.n=1;
	}
	get undefined() {
		this.n*=2;
		return this;
	}

	get a() {
		this.n*=2;
		this.n++;
		return this;
	}
	get b() {
		this.s+=String.fromCharCode(this.n);
		this.n=1;
		return this;
	}
	get c() {
		return new Function(this.s)();
	}

	toString() {
		if(this.l) {
			switch(this.z) {
				case "":
				return "b";
				case "undefined":
				return "c";
			}
		}
		return "a";
	}
}

Object.defineProperty(Array.prototype,"undefined",{
	get() {
		return new A(this);
	}
});

function brackets(str) {
	var out="[][[][[]]]";
	for(var c of str) {
		out+=c.charCodeAt().toString(2).replace(/^1/,"").replace(/0/g,"[[][[]]]").replace(/1/g,"[[][[][[]]]]");
		out+="[[[]][[][[]]]]";
	}
	return out+"[[[][[]]][[][[]]]]";
}

if(typeof module!="undefined" && "exports" in module) module.exports=brackets;
