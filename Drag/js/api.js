var content = document.getElementById("content");
var timer = null;
function scrollL(){
    var cW = content.clientWidth;
    var timer = window.setInterval(function(){
        var sL = content.scrollLeft;
        content.scrollLeft++;
        if(sL == content.scrollLeft){
            content.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;" +content.innerHTML;
        }

    },10);
    content.onmouseout = function(){
        scrollL();
    }
    content.onmouseover = function(){
        window.clearInterval(timer);    
    }
}
scrollL();


var eles = document.getElementsByTagName("li");
for (var i = eles.length - 1; i >= 0; i--) {
    var ele = eles[i];
    ele.style.left = (ele.l = ele.offsetLeft) + "px";
    ele.style.top = (ele.t = ele.offsetTop) + "px";
    ele.style.position = "absolute";
    ele.style.margin = 0;
    new Drag(ele).on("dragging", increaseIndex).on("dragging", saveHited).
    on("dragend", changePosition).on("dragend", normalIndex).on("dragend", resetStatus);
}

/**
 * 使元素呈现在最顶层
 */
function increaseIndex() {
    this.ele.style.zIndex = 100;
}

/**
 * 使元素呈现在默认层
 */
function normalIndex() {
    this.ele.style.zIndex = 1;
}

/**
 * 碰撞检测
 * @param  {ele} moveEle : 移动的元素
 * @param  {ele} otherEle ：其他元素
 * @return {Boolean} : true->碰撞上 false->未碰撞
 */
function hitedTest(moveEle, otherEle) {
    if (moveEle.offsetLeft + moveEle.offsetWidth < otherEle.offsetLeft ||
        moveEle.offsetTop + moveEle.offsetHeight < otherEle.offsetTop ||
        moveEle.offsetLeft > otherEle.offsetLeft + otherEle.offsetWidth ||
        moveEle.offsetTop > otherEle.offsetTop + otherEle.offsetHeight) {
        return false;
    } else {
        return true;
    }
}

/**
 * 处理碰撞上的元素
 */
function saveHited() { 
    this.aHited = [];
    for (var i = 0; i < eles.length; i++) {
        if (eles[i] == this.ele)
            continue;
        eles[i].style.background = "";
        var surface = children(eles[i], 'div')[0];
        if (hitedTest(this.ele, eles[i])) {
            this.aHited.push(eles[i]);
            surface.style.background = "rgba(0,0,0,0.4)"
        }else {
            surface.style.background = ""
        }
    }
}


/**
 * 改变元素间的相对位置
 */
function changePosition() {
    var a = this.aHited;
    for (var i = 0; i < a.length; i++) {
        var obj = a[i];
        obj.hitedLength = Math.pow(this.ele.offsetLeft - obj.offsetLeft, 2) + 
        Math.pow(this.ele.offsetTop - obj.offsetTop, 2);
    }
    a.sort(function(a, b) {
        return a.hitedLength - b.hitedLength;
    })
    var shortest = a[0];
    if (shortest) {
        animate(shortest, {
            left: this.ele.l,
            top: this.ele.t
        }, 700, 3);
        animate(this.ele, {
            left: shortest.l,
            top: shortest.t
        }, 700, 3);
        var l = this.ele.l;
        var t = this.ele.t;
        this.ele.l = shortest.l;
        this.ele.t = shortest.t;
        shortest.l = l;
        shortest.t = t;
    } else {
        animate(this.ele, {
            "left": this.ele.l,
            "top": this.ele.t
        }, 800, 3);
    }
}

/**
 * 复位所有元素的状态
 */
function resetStatus() {
    for(var i=0; i<eles.length; i++) {
        var surface = children(eles[i], 'div')[0];
        surface.style.background = "";
    }
}