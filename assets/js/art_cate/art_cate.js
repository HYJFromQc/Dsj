$(function() {
    getArticleList()

    var layer = layui.layer;
    var form = layui.form
        // 获取文章分类列表
    function getArticleList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }


    var dialogIdx = 0;
    //添加类别
    $('#btnAddCate').click(function() {
        dialogIdx = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialogAdd').html()
        });
    })

    //绑定那刻并未生成html，所以代理绑定
    $('body').on('submit', '.layui-form', function(e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('新增分类成功')
                getArticleList()
                layer.close(dialogIdx)
            }
        })
    })

    //通过代理给编辑按钮绑定时间
    $('tbody').on('click', '#btnEdit', function(e) {
        dialogIdx = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialogEdit').html()
        });

        var id = $(this).attr('data-id')
        $.ajax({
            method: "GET",
            url: '/my/article/cates/' + id,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('form-edit', res.data)
            }
        })
    })

    //编辑类别
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新分类数据成功')
                layer.close(dialogIdx)
                getArticleList()
            }
        })
    })

    //删除类别
    $('tbody').on('click', '#btnDel', function(e) {
        e.preventDefault()
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(idx) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功')
                    layer.close(idx)
                    getArticleList()
                }
            })
        })
    })
})