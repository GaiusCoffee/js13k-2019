class rb {
    go(){
        let u=window.ui;
        console.log('GAME START! (js/rebirth.js:rb:go())'); // TODO Remove this :D
        u.b.innerHTML=``; // Clear all buttons

        u.log('...');
        u.tick(()=>{
            u.log('You wake up');
            u.tick(()=>{
                u.log('You don\'t remember.. anything..');
                u.tick(()=>{
                    u.log('You feel this urge.. <strong>you have to go back..</strong>');
                    u.tick(this.a);
                });
            });
        });
    }
    a(){
        let u=window.ui;
        
        u.log(`You stand up from the cold concrete floor. You are on a square platform, with a staircase in front of you going up, and another to your right going down.`);
        u.tick(()=>{
            u.log(`To your back and to your left are stone walls, one of which has a torch. Both above and below, you can barely see that there are similar platforms with torches.`);
            u.tick(()=>{
                u.log(`You cannot see a ceiling, and both the platforms and the stairs have no hand rails. Aside from the stairs, platforms and torches, there is only darkness.`);
                u.tick(this.b);
            });
        });
    }
    b(){

    }
}
window.rb=new rb();
