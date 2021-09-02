$(function() {
    var form = layui.form
    form.verify({
        nickname: function(v) {
            if (v.length > 6) {
                return '昵称需在1-6之间';
            }
        }
    })

    initUserInfo();

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('用户信息获取失败')
                }
                console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }

    $('#btn_reset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('更新用户信息成功')
                    //调用父页面方法更新头像用户名信息

                window.parent.getUserInfo()

            }
        })
    })
})