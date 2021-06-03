let playerAction = process.argv[process.argv.length - 1];
let aiAction = null;
// Math.random() === 0 ~ 0.99999999
// Math.random() * 2 === 0 ~ 1.99999999
// Math.random() * 3  === 0 ~ 2.9999999

const random = Math.random() * 3;

// 1/3 * 3 === 1
// 2/3 * 3 === 2
// 3/3 * 3 === 3

if(random < 1) {
    aiAction = "剪刀";
} else if(random > 2) {
    aiAction = "布";
} else {
    aiAction = "石头"
}

console.log("ai:", aiAction, "🆚", "你:", playerAction);

if(playerAction === aiAction) {
    console.log("平局");
} else if(
    (playerAction === "剪刀" && aiAction === "石头") || 
    (playerAction === "石头" && aiAction === "布") || 
    (playerAction === "布" && aiAction === "剪刀")
) {
    console.log("你输了！")
} else {
    console.log("你赢了！")
}