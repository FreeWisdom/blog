const ctx=require.context("./styles/to-css",false,/\.scss$/);
ctx.keys().forEach(key=>{
    ctx(key);
})