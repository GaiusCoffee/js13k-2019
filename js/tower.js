class tw {
    go(){
        let u=window.ui;
        if(window.direction>0){ u.log('You start walking up the stairs.'); }
        else{ u.log('You start walking down the stairs.'); }
        this.s=['Step. Step. Step.',
            'Eyes forward, a step at a time..',
            'Don\'t look down the pit. Just move forward.',
            'The next platform is near..',
            'Did you just hear.. no, it\'s probably nothing..',
            'Continue walking. Step. Step.',
            '...'];
        this.st();
    }
    st(){
        let u=window.ui;
        let d1,d2;
        if(window.direction>0){d1='up';d2='left';}
        else{d1='down';d2='right';}
        u.tick(2,10,()=>{
            u.log(this.s[new Date()%this.s.length]);
            u.tick(()=>{
                let p=(new Date()%9);
                if(p==0){this.be();}
                else if(p==1||p==2){this.se();}
                else {
                    u.log(`You reach an empty platform. You quickly cross it, turn to the ${d2} and start climbing ${d1} again.`);
                    console.log('nothing!');this.st();
                }
                window.pcount++;
            });
        });
    }
    be(){
        let u=window.ui;
        u.log('You reach the next platform and to your surprise, there\'s a closed door in one of the walls!');
        u.addB('Open the door',()=>{
            u.remB('Open the door');
            let a=window.direction;
            window.direction=0;
            if(a>0){window.s2.go();}
            else{window.s1.go();}
        });
        u.tick(15,0,()=>{
            if(window.direction!==0){
                u.remB('Open the door');
                u.log('You ignore the door, and continue on your way.');
                this.st();
            }
        });
    }
    se(){
        console.log('small event!');this.st();
    }
}
window.tw=new tw();
