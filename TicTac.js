function play(){
    const playTitle = document.querySelector('.PlayTitle');
    const cells = document.querySelectorAll('.cell');
    const array = Array.from(cells)
    let rematchBtn = document.querySelector('.rematch')

    let track = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let player = 'playerX';

    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
           
            //player moves
            const index = array.indexOf(e.target);

            if(
                cells[index].classList.contains('playerX') ||
                cells[index].classList.contains('computer')
            ){
                return;
            };

            cells[index].classList.add('playerX');

            const spliceNr = track.indexOf(index + 1)
            track.splice(spliceNr, 1);

            //check win for the player
            if (CheckkWin('playerX', cells)) {
                playTitle.innerHTML = 'Player Wins!';
                document.body.classList.add('over');
                return;
            }

            //check for draw
            if(track.length === 0){
                playTitle.innerHTML = 'you are pretty good :3';
                document.body.classList.add('over');
                return;
            }

            //computer moves
            const moves = Math.floor(Math.random() * track.length);
            const computerIndex = track[moves];
            console.log('track:', track, 'moves:', moves);

            setTimeout(() => {
                console.log('computerIndex:', computerIndex, 'cells.length:', cells.length);
                cells[computerIndex - 1].classList.add('computer');

                track.splice(moves, 1);
                console.log('track:', track);
                
            
                //check win for the computer
                if (CheckkWin('computer', cells)) {
                    playTitle.innerHTML = 'Computer Won!';
                    document.body.classList.add('over');
                    return;
                }
            }, 250);
            
        });
    });
    
    //reset the game
    rematchBtn.addEventListener('click', () =>{
        location.reload();
    })
    
};

play();

function CheckkWin(playerName, cells){
    function check(pos1, pos2, pos3){
        if(
            cells[pos1].classList.contains(playerName) &&
            cells[pos2].classList.contains(playerName) && 
            cells[pos3].classList.contains(playerName)       
        ){
            console.log(cells[pos1].classList.contains(playerName));
            console.log(cells[pos2].classList.contains(playerName));
            console.log(cells[pos3].classList.contains(playerName));
            
            return true;
        } else {
            return false;
        }
    };

    if(check(0, 3, 6) ) return true;
    else if (check(1, 4, 7)) return true;
    else if (check(0, 1, 2)) return true;
    else if (check(2, 5, 8)) return true;
    else if (check(3, 4, 5)) return true;
    else if (check(6, 7, 8)) return true;
    else if (check(0, 4, 8)) return true;
    else if (check(2, 4, 6)) return true;
};



