const playGame = require('./lib');

let count = 0;
process.stdin.on("data", e => {
    let playerAction = e.toString().trim();
    const result = playGame(playerAction);
    if(result === 1) {
        count += 1;
    }
    if(count === 3) {
        console.log("sb，solute，太厉害了！");
        process.exit();
    }
})