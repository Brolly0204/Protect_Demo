function EventEmitter() {};
EventEmitter.prototype.on = function(type, fn) {
    if (!this["emitter" + type]) {
        this["emitter" + type] = [];
    }
    var ary = this["emitter" + type];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] == fn)
            return;
    }
    ary.push(fn);
    return this;
}

EventEmitter.prototype.run = function(type, e) {
    var ary = this["emitter" + type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            if (typeof ary[i] == "function") {
                ary[i].call(this, e);
            } else {
                ary.splice(i, 1);
                i--;
            }
        }
    }
}

EventEmitter.prototype.off = function(type, fn) {
    var ary = this["emitter" + type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] == fn) {
                ary[i] = null;
                return;
            }
        }
    }
    return this;
}

function Drag(ele) {
    this.ele = ele;
    this.x = null;
    this.y = null;
    this.mx = null;
    this.my = null;

    this.DOWN = Event.processThis(this.down, this); 
    this.MOVE = Event.processThis(this.move, this);
    this.UP = Event.processThis(this.up, this);
    Event.on(this.ele, "mousedown", this.DOWN);

}

Drag.prototype = new EventEmitter;

Drag.prototype.down = function(e) {
    this.x = this.ele.offsetLeft;
    this.y = this.ele.offsetTop;
    this.mx = e.pageX;
    this.my = e.pageY;

    if (this.ele.setCapture) {
        this.ele.setCapture();
        Event.on(this.ele, "mousemove", this.MOVE);
        Event.on(this.ele, "mouseup", this.UP);
    } else {
        Event.on(document, "mousemove", this.MOVE);
        Event.on(document, "mouseup", this.UP);
    }
    this.run("dragstart", e);
    e.preventDefault();
}

Drag.prototype.move = function(e) {
    this.ele.style.left = this.x + (e.pageX - this.mx) + "px";
    this.ele.style.top = this.y + (e.pageY - this.my) + "px";
    this.run("dragging", e);
}

Drag.prototype.up = function(e) {
    if (this.ele.releaseCapture) {
        this.ele.releaseCapture();
        Event.off(this.ele, "mousemove", this.MOVE);
        Event.off(this.ele, "mouseup", this.UP);
    } else {
        Event.off(document, "mousemove", this.MOVE);
        Event.off(document, "mouseup", this.UP);
    }
    this.run("dragend", e);
}

function increaseIndex() {
    this.ele.style.zIndex = ++zIndex;
}

function clearEffect() {
    clearTimeout(this.flyTimer);
    clearTimeout(this.dropTimer);
}

function getSpeed(e) {
    if (this.prevPosi) {
        this.flySpeed = e.pageX - this.prevPosi;
        this.prevPosi = e.pageX;
    } else {
        this.prevPosi = e.pageX;
    }

}

function fly() {
    this.flySpeed *= .98;
    var l = 0;
    var r = (document.documentElement.clientWidth || document.body.clientWidth) - this.ele.offsetWidth;
    var current = this.ele.offsetLeft + this.flySpeed;
    if (current <= l) {
        this.ele.style.left = 0;
        this.flySpeed *= -1;
    } else if (current >= r) {
        this.ele.style.left = r + "px";
        this.flySpeed *= -1;
    } else {
        this.ele.style.left = current + "px";
    }
    if (Math.abs(this.flySpeed) > 0.5) { 
        this.flyTimer = window.setTimeout(Event.processThis(fly, this), 20);
    }
}

function drop() {
    if (this.dropSpeed) {
        this.dropSpeed += 9.8;
    } else {
        this.dropSpeed = 9.8;
    }
    this.dropSpeed *= 0.98;
    var b = (document.documentElement.clientHeight || document.body.clientHeight) - this.ele.offsetHeight; //下边界
    var current = this.ele.offsetTop + this.dropSpeed;
    if (current >= b) {
        this.ele.style.top = b + "px";
        this.dropSpeed *= -1;
        this.flag++;
    } else {
        this.ele.style.top = current + "px";
        this.flag = 0;
    }
    if (this.flag < 2) {
        this.dropTimer = window.setTimeout(Event.processThis(drop, this), 20);
    }
}

function listToArray(likeAry) {
    if ("getComputedStyle" in window) {
        return Array.prototype.slice.call(likeAry, 0);
    }
    var ary = [];
    for (var i = 0; i < likeAry.length; i++) {
        ary[ary.length] = likeAry[i];
    }
    return ary;
}

function children(curEle, tagName) {
    var ary = [];
    if (!"getComputedStyle" in window) {
        var nodeList = curEle.childNodes;
        for (var i = 0, len = nodeList.length; i < len; i++) {
            var curNode = nodeList[i];
            curNode.nodeType === 1 ? ary[ary.length] = curNode : null;
        }
        nodeList = null;
    } else {
        ary = listToArray(curEle.children);
    }
    if (typeof tagName === "string") {
        for (var k = 0; k < ary.length; k++) {
            var curEleNode = ary[k];
            if (curEleNode.nodeName.toLowerCase() !== tagName.toLowerCase()) {
                ary.splice(k, 1);
                k--;
            }
        }
    }
    return ary;
}
