class ui {
    constructor() {
        this.d = document;
        this.l = this.d.querySelector`#logs`;
        this.b = this.d.querySelector`#buttons`;
    }
    log(m) {
        let p = this.d.createElement`p`;
        p.insertAdjacentHTML('afterbegin',`⚜️ ${m}`);
        this.l.insertBefore(p, this.l.firstChild);
        while(this.l.children.length>12) {
            this.l.removeChild(this.l.lastChild);
        }
        // window.scrollTo(0,0); // Do I need to?
    }
    addB(v,cb) {
        let n = this.d.createElement`button`;
        n.appendChild(this.d.createTextNode(v));
        n.onclick=cb;
        this.b.insertBefore(n, this.b.firstChild);
    }
    remB(v) {
        let n;
        this.b.childNodes.forEach((c)=>{
            if(c.textContent==v){n=c;}
        });
        if(n){
            this.b.removeChild(n);
        }
    }
    tick(min,max,cb){
        if(typeof min === "function") {
            cb=min;min=0;max=0;
        }
        if(max==0){
            if(min==0){ // default: 2000ms
                setTimeout(cb, 2000);
            } else { // if no max, call after min
                setTimeout(cb,min);
            }
        } else { // random range between min & max
            setTimeout(cb, (new Date()%(max-min)+min));
        }
    }
}
window.ui=new ui();
