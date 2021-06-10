module.exports = function (playerAction) {
    let aiAction = null;
    
    const random = Math.random() * 3;
    
    if(random < 1) {
        aiAction = "剪刀";
    } else if(random > 2) {
        aiAction = "布";
    } else {
        aiAction = "石头"
    }
    
    console.log("💻", aiAction, "🆚", "👨", playerAction);
    
    if(playerAction === aiAction) {
        console.log("平局");
        return 0;
    } else if(
        (playerAction === "剪刀" && aiAction === "石头") || 
        (playerAction === "石头" && aiAction === "布") || 
        (playerAction === "布" && aiAction === "剪刀")
    ) {
        console.log("你输了！");
        return -1;
    } else {
        console.log("你赢了！");
        return 1;
    }
}