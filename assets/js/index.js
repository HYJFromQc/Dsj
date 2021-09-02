$(function() {
    getUserInfo();

    $('#btn_logout').on('click', function() {
        // 提示退出
        layui.layer.confirm('是否退出？', { icon: 3, title: '提示' }, function(idx) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layui.close(idx)
        });
    })
})

function getUserInfo() {
    var layer = layui.layer;

    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function(res) {
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            console.log(res);
            renderAvatar(res.data)
        },

    })
}

//渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()
    }
}