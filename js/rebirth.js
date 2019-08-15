class rb {
    go(){
        let u=window.ui;
        u.b.innerHTML=``;   // Clear all buttons
        window.pcount=0;    // Reset platform count
        window.direction=0; // Reset direction

        u.log('...');
        u.tick(()=>{
            u.log('You wake up');
            u.tick(()=>{
                u.log('You don\'t remember.. anything..');
                u.tick(()=>{
                    u.log('You feel this urge.. <strong>you have to go back..</strong>');
                    u.tick(this.a.bind(this));
                });
            });
        });
    }
    a(){
        let u=window.ui;
        
        u.log(`You stand up from the cold stone floor. You are on a square platform, with a staircase in front of you going up, and another to your right going down.`);
        u.tick(()=>{
            u.log(`To your back and to your left are stone walls, one of which has a torch. Both above and below, you can barely see that there are similar platforms with torches.`);
            u.tick(()=>{
                u.log(`You cannot see a ceiling, and both the platforms and the stairs have no hand rails. Aside from the stairs, platforms and torches, there is only darkness.`);
                u.tick(this.b.bind(this));
            });
        });
    }
    b(){
        let u=window.ui;

        u.addB('Check yourself.',()=>{
            u.remB('Check yourself.');
            u.log('You are wearing what you have always worn. Very faintly, you remember wearing the same clothes somewhere, sometime else.');
            u.tick(()=>{u.log('You have nothing in your pockets.');});
            // inventory.js?
        });
        setTimeout(()=>{u.remB('Check yourself.');},30000);

        u.log('You look at the torch on the wall, and find that it\'s somehow fused to the stone. It seems that you can only either go forward and up the stairs, or to your left and down the other set of stairs.');

        u.addB('Go down the other set of stairs.', ()=>{
            u.remB('Go up the stairs.');
            u.remB('Go down the other set of stairs.');
            window.direction=-1;
            window.tw.go();
        });
        u.addB('Go up the stairs.',()=>{
            u.remB('Go up the stairs.');
            u.remB('Go down the other set of stairs.');
            window.direction=1;
            window.tw.go();
        });
    }
}
window.rb=new rb();
