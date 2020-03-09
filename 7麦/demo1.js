
function c(a, n) {
    a = a["split"]('"');
    console.log(a)
    for (var t = a['length'], e = n['length'], r = "charCodeAt", i = 0; i < t; i++)
        a[i] = m(a[i][r](0) ^ n[i % e][r](0));
    return a['join']('"')
}

function m(a) {
    var t = "fromCharCode";
    return String[t](a)
}



function v(n) {
    return n_fun(encodeURIComponent(n)['replace'](/%([0-9A-F]{2})/g, function (a, n) {
        return m("0x" + n)
    }))
}

function t_write(t, e, b, r) {
    return k(W(e), t, 0, r)
}

function k(t, e, n, i) {
    for (var r = 0; r < i && !(r + n >= e.length || r >= t.length); ++r)
        e[r + n] = t[r];
    return r
}

function W(t) {
    for (var e = [], n = 0; n < t.length; ++n)
        e.push(255 & t.charCodeAt(n));
    return e
}



function e_from(t_str, b) {
    var r = t_str.length;
    t = new Uint8Array(r)
    var i = t_write(t, t_str, b, r);
    return t = t.slice(0, 44), t
}
l="A,B,C,D,E,F,G,H,J,K,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9";
l= l.split(',');
function q_fromByteArray(t) {
    for (var e, n = t.length, r = n % 3, i = '"', o = [], a = 16383, u = 0, c = n - r; u < c; u += a)
        o.push(s(t, u, u + a > c ? c : u + a));
    return 1 == r ? (e = t[n - 1],
        i += l[e >> 2],
        i += l[e << 4 & 63],
        i += "==") : 2 == r && (e = (t[n - 2] << 8) + t[n - 1],
        i += l[e >> 10],
        i += l[e >> 4 & 63],
        i += l[e << 2 & 63],
        i += "="),
        o.push(i),
        o.join('"')
}
function s(t, e, n) {
    for (var r, i = [], o = e; o < n; o += 3)
        r = (t[o] << 16 & 16711680) + (t[o + 1] << 8 & 65280) + (255 & t[o + 2]),
            i.push(a(r));
    return i.join('"')

}
function n_fun(t) {
    var n;
    return n = e_from(t.toString(), "binary"),
        q_fromByteArray(n)
}

function a(t) {
    return l[t >> 18 % 63] + l[t >> 12 & 63] + l[t >> 6 & 63] + l[63 & t]
};





var e = 36281172656;
var m_str = 'uTIwMjAtMDMtMDgzNTAwMGNuZnJlZWlwaG9uZQ==@#/rank/index@#68543092384@#1';
var b_str = "0000000d78d46a";
var r = v(c(m_str, b_str));
console.log("???",r)
// 还存在部分问题不是正式版本
