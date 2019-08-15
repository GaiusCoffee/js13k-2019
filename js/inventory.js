class nv {
    constructor(){
        this.i = [];
    }
    l(){ // List all items
        if(this.i.length==0){return`You have nothing in your pockets`;} 
        else{return(`You have the following item(s): ${this.i.join(', ')}`);}
    }
    a(i){ // Add Item
        if(this.c(i)<0){this.i.push(i);}
    }
    r(i){ // Remove Item
        this.i=this.i.filter(c=>c!=i);
    }
    c(i){ // Check if you have Item
        return this.i.indexOf(i);
    }
}
window.nv=new nv();
