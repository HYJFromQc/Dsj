$(function() {
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function(v) {
            if (v === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function(v) {
            if (v !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })

    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('重置密码成功')
                    //重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})