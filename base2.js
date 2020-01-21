var Base2 = {};

Base2.encode = function(str) {
    var arr = [];
    for(var i=0,len=str.length; i<len; i++,i++) {
        if(i + 1 < len) {
            arr.push(String.fromCharCode(((str.charCodeAt(i))<<7) + str.charCodeAt(i+1) - 4095));
        } else {
            arr.push(String.fromCharCode(((str.charCodeAt(i))<<7) + 32 - 4095));
        }
    }
    return arr.join('');
}

Base2.decode = function(str) {
    var arr = [];
    for(var i=0,l=str.length; i<l; i++) {
        var code = str.charCodeAt(i) + 4095;
        arr.push(String.fromCharCode(code>>7));
        arr.push(String.fromCharCode(code&127));
    }

    return arr.join('');
}

var str = 'abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ0123456789';
var str2 = Base2.encode(str);
var str3 = Base2.decode(str2);

console.log(str2);
console.log(str3);
