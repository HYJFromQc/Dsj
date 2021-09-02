$(function() {
    //点击去注册
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义输入验证
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(v) {
            return $('.reg-box [name=password]').val() !== v ? '两次密码不一致!' : ''
        }
    })


    var layer = layui.layer;

    // 注册事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var regData = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() };
        $.post('/api/reguser', regData, function(res) {
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            $('#link_login').click();
            $('#form_login [name=username]').val($('#form_reg [name=username]').val());

        })
    })

    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                console.log(res.token);
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})