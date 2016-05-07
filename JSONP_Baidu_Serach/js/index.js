window.onload = function() {
    var text = document.getElementById('text');
    var btn = document.getElementById('btn');
    var oUl = document.getElementsByTagName('ul')[0];
    text.onkeyup = function() {
        var value = text.value; 
        if(value) {
            jsonp('https://gsp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', 
                   {wd: value},
                   'cb',
                   function(data){
                        var list = data.s;
                        if(list.length == 0) {
                            oUl.style.display = "none";
                        }else {
                            oUl.style.display = "block";
                        }
                        var fragement = document.createDocumentFragment();
                        oUl.innerHTML = "";
                        for(var str in list) {
                            var li = document.createElement('li');
                            li.innerHTML = list[str];
                            fragement.appendChild(li);
                        }
                        oUl.appendChild(fragement);
                   });
        }else {
            oUl.style.display = "none";
        }
    }
    oUl.onclick = function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        window.open('http://www.baidu.com/s?word=' + encodeURIComponent(target.innerHTML), '_blank');
    };
    document.documentElement.onclick = function(e) {
        oUl.style.display = "none";
        e = e || window.event;
        var target = e.target || e.srcElement;
        if(target.id == 'btn'){
            var value = text.value; 
            if(value) {
                window.open('http://www.baidu.com/s?word=' + encodeURIComponent(value), '_blank');
            }
        }
    }
}