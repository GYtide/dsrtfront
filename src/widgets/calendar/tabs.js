
/**
 * 
 * @param {*} t 
 * 
 * tab 切换按钮
 */
document.getElementById('tablist').onclick = function (t) {
    var n = t.target;
    
    let btns = document.querySelectorAll('[role="tab"]');
    
    for (var btn of btns){
        btn.setAttribute("aria-selected",false)
    }
    n.setAttribute("aria-selected",true)
    
    if ("tab" === n.getAttribute("role")) {
        let contarget = document.getElementById(n.getAttribute("aria-controls"))
        
        let otabs = document.querySelectorAll('[role="tabpanel"]');
        for (var otab of otabs){ 
            otab.classList.add("hidden")
            otab.setAttribute("aria-hidden",true)
        }

        contarget.classList.remove("hidden")
        contarget.setAttribute("aria-hidden",false)

    }

}