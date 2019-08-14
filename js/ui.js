class ui {
    constructor() {
        this.d = document;
        this.l = this.d.querySelector`#logs`;
        this.b = this.d.querySelector`#buttons`;
    }
    log(m) {
        let p = this.d.createElement`p`;
        p.appendChild(this.d.createTextNode(`⚜️ ${m}`));
        this.l.insertBefore(p, this.l.firstChild);
        while(this.l.children.length>12) {
            this.l.removeChild(this.l.lastChild);
        }
        // window.scrollTo(0,0); // Do I need to?
    }
}
