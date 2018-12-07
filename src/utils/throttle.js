export default function(fn,needTime) {
    var now, lastTime = +new Date();
    var timer = null;
    var remainTime = 0;
    return function(){
        now = +new Date();
        remainTime = needTime - (now - lastTime)
        var args = arguments;
        var ctx = this;
        if (remainTime<=0) {
            if(timer){
                clearTimeout(timer)
                timer = null;
            }
            lastTime = now;
            fn.apply(ctx, args)
        }else{
            timer = setTimeout(function () {
                lastTime = +new Date();
                timer = null;
                fn.apply(ctx, args)
            }, remainTime)
        }
    }
}