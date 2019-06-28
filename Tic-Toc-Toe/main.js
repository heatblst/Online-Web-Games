(function Game() {
    var game = document.getElementById('game');
    var dot = document.querySelectorAll('li');
    var p1Score = document.getElementById('p1points');
    var p2Score = document.getElementById('p2points');
    var reset = document.getElementById('reset');
    var msg = document.getElementById('win');
    var arr = [];
    var p1Point = 0;
    var p2Point = 0;
    var round;
    var data;
    var context = { 'player1' : 'x', 'player2' : 'o' };
    
    function run() {
        return (round % 2 == 0) ? context.player1 : context.player2;
    }

    function clickEvent() {
        this.removeEventListener('click', clickEvent);
        this.className = data;
        this.innerHTML = data;
        
        var pos = this.getAttribute('pos').split(',');
        arr[pos[0]][pos[1]] = run() == 'x' ? 1 : 0;
        if(winner()) {
            Score();
        }
        round++;
        data = run();
    }

    function clearEvents() {
        for(var i = 0; i < dot.length; i++) {
            dot[i].removeEventListener('click', clickEvent);
        }
    }
    
    function winner() {
        var boxes = 0;
        for(var i = 0; i < arr.length; i++ ) {
            var row = 0;
            var column = 0;
            for(var j = 0; j < arr[i].length; j++) {
                row += arr[i][j];
                column += arr[j][i];
                if(typeof arr[i][j] !== "undefined") {
                    boxes++;
                }
            }
            var d1 = arr[0][0] + arr[1][1] + arr[2][2]; 
            var d2 = arr[0][2] + arr[1][1] + arr[2][0]; 
            if(d1 == 0 || d2 == 0 || d1 == 3 || d2 == 3) {
                return true;
            }
            if(row == 0 || column == 0 || row == 3 || column == 3) {
                return true;
            }
            if(boxes == 9) {
                draw();
            }
        }
    }

    function draw() {
        msg.className = 'draw';
        clearEvents();
    }

    function Score() {
        clearEvents();
                                                                                                                                            
        switch(run()) {
            case 'x':
                p1Score.innerHTML = ++p1Point;
                msg.className = 'Xwin';
                break;
            case 'o':
                p2Point+=2;
                p2Score.innerHTML = p2Point;
                msg.className = 'Owin';
        }
    }

    function restart() {
        clearEvents();
        start();
        for(var i = 0; i < dot.length; i++) {
            dot[i].className = '';
            dot[i].innerHTML = '';
        }
        msg.className = '';
    }

    function start() {
        round = 0;
        data = run();

        arr[0] = new Array(3);
        arr[1] = new Array(3);
        arr[2] = new Array(3);
        for(var i = 0; i < dot.length; i++) {
            dot[i].addEventListener('click', clickEvent, false);
        }
        reset.addEventListener('click', restart, false);
    }
    game && start();
})();
