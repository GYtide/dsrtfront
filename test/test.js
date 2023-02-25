let a = 150082

for(let i = 0 ; i < Math.sqrt(a) ; ++i){
    if(Number.isInteger(a/i)){
        console.log(i,a/i)
    }
}