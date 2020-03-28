var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}, e = [ "湿垃圾", "干垃圾", "可回收物", "有害垃圾" ], n = [ "#6E4A3E", "#35312E", "#14518A", "#E83928" ], r = {
    official: "官方",
    weapp: "第三方",
    user: "用户",
    admin: "自查"
};

module.exports = {
    WasteArr: e,
    getWasteChineseFrom: function(t) {
        return r[t];
    },
    formatTime: function(e) {
        var n = e.getFullYear(), r = e.getMonth() + 1, o = e.getDate(), a = e.getHours(), i = e.getMinutes(), u = e.getSeconds();
        return [ n, r, o ].map(t).join("/") + " " + [ a, i, u ].map(t).join(":");
    },
    getWasteSoring: function(t) {
        return e[t - 1];
    },
    getWasteColor: function(t) {
        return n[t - 1];
    },
    getRandomInt: function(t, e) {
        return t = Math.ceil(t), e = Math.floor(e), Math.floor(Math.random() * (e - t + 1)) + t;
    }
};