//每个$.ajx()时候，会先调用这个函数
$.ajaxPrefilter(function(opt) {
    console.log(opt.url);
    opt.url = 'http://api-breakingnews-web.itheima.net' + opt.url;
    // opt.url = 'http://127.0.0.1:3007' + opt.url;
    if (opt.url.indexOf('my') != -1) { //部分接口加header
        opt.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局挂在 成功失败回调
    opt.complet = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})

// http://ajax.frontend.itheima.net

//Authorization:token

//http://api-breakingnews-web.itheima.net