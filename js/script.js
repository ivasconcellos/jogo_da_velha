var interval;
$(document).ready(function(){            
    $("#btn_comecar").click(function(){
        var player1 = $("input[name=player1").val();
        var player2 = $("input[name=player2").val();

        if(player1.trim().length > 0 && player2.trim().length > 0){
            $(".message").text("");
            GameStart();
        }else{
            $(".message").text("Os nomes dos jogadores não foram preenchidos!");
        }
    })
});

function GameStart(){
    var countClicks = 0;

    interval = setInterval(ElapsedTime, 500);

    $("table td").click(function(){
        countClicks++;

        if (countClicks <= 9){
            if (countClicks % 2 == 0){
                $(this).text("O");
            }else{
                $(this).text("X");
            }

            if(CheckWin() == true){
                countClicks = 9;
            }

            if (countClicks == 9){
                $(".message").append("<br>Jogo encerrado!");
                clearInterval(interval);
            }
        }
                        
        
    })

    function CheckWin(){
        var winner = [ [0, 1, 2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]];
        var X = new Array(9);
        var O = new Array(9);
        $("table td").each(function(key, value){

            if( $(this).text() == "X") {
                X[key] = key;
            }

            if( $(this).text() == "O") {
                O[key] = key;
            }
        });

        return SetWinner(X, O, winner);        
    }

    function SetWinner(X, O, winner){
        var player1 = $("input[name=player1").val();
        var player2 = $("input[name=player2").val();

        for(i=0; i < winner.length; i++){
            var countX = 0;
            var countO = 0;
            for(j=0 ; j < winner[i].length; j++){
                if( X[winner[i][j]] == winner[i][j]){
                countX++;
                }

                if( O[winner[i][j]] == winner[i][j]){
                countO++;
                }
            }

            if (countX == 3){
                $(".message").text("O jogador " + player1 + " ganhou!");
                return true;
            }

            if (countO == 3){
                $(".message").text("O jogador " + player2 + " ganhou!");
                return true;
            }
            
        }
    }
}

var start = null;
function ElapsedTime(){
    if (start == null){
        start = new Date();
    }
    setTimeout(() => {
        const millis = Date.now() - start;

        $("#time").text(`Tempo decorrido: ${Math.floor(millis / 1000)}`);
    }, 500);            

}