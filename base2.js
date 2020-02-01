;(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.Base2 = factory();
    }
}(this, function () {
  　return {
        version: '1.0.0',
        encode: function(str, cn) {
            var arr = [];
            for(var i=0,len=str.length; i<len; i++,i++) {
                var code = null;
                if(i + 1 < len) {
                    code = ((str.charCodeAt(i)) << (!cn ? 7 : 8)) + str.charCodeAt(i + 1);
                    if(!cn) {
                        code -= 0x1000;
                    } else {
                        code += 0x1000;
                    }
                    switch(code) {
                        case 0x22:
                            code = 0x2F7F;
                            break;
                        case 0x27:
                            code = 0x2F80;
                            break;
                        case 0x60:
                            code = 0x2F81;
                            break;
                    }
                } else {
                    code = str.charCodeAt(i);
                    if(!cn) {
                        code += 0x2F81;
                    } else {
                        code += 0x8E81;
                    }
                }
                arr.push(String.fromCharCode(code));
            }
    
            return arr.join('');
        },
        decode: function(str, cn) {
            var arr = [];
            for(var i=0,l=str.length; i<l; i++) {
                var code = str.charCodeAt(i);
                var codeH = null;
                var codeL = null;
                if(0x8E81 < code) {
                    codeL = code - 0x8E81;
                } else if (0x2FFF < code && code < 0x8E81) {
                    code -= 0x1000;
                    codeH = code >> (!cn ? 7 : 8);
                    codeL = code & 0x7F;
                } else if (0x2F81 < code) {
                    codeL = code - 0x2F81;
                } else {
                    switch(code) {
                        case 0x2F7F:
                            codeH = 0x20;
                            codeL = 0x22;
                            break;
                        case 0x2F80:
                            codeH = 0x20;
                            codeL = 0x27;
                            break;
                        case 0x2F81:
                            codeH = 0x20;
                            codeL = 0x60;
                            break;
                        default:
                            code += 0x1000;
                            codeH = code >> (!cn ? 7 : 8);
                            codeL = code & 0x7F;
                            
                    }
                }
                codeH && arr.push(String.fromCharCode(codeH));
                arr.push(String.fromCharCode(codeL));
            }
    
            return arr.join('');
        }
    };
}));