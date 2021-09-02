$(function() {
    initCate()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                var htmlStr = template('tpl-cateId', res)
                $('[name=cate_id]').html(htmlStr)
                layui.form.render()
            }
        })
    }

    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#fileBtn').click(function() {
        $('#coverFile').click()
    })

    $('#coverFile').change(function(e) {
        var files = e.target.files
        if (files.lenght === 0) {
            return layui.layer.msg('请选择封面')
        }
        var imgURL = URL.createObjectURL(files[0])
        console.log(imgURL);
        $image.cropper('destroy').attr('src', imgURL).cropper(options) // 重新初始化裁剪区域
    })

    var art_state = null;


    $('#pubBtn').click(function() {
        art_state = '草稿'
    })

    $('#saveBtn').click(function() {
        art_state = '已发布'
    })

    $('.layui-form').submit(function(e) {
        e.preventDefault()

        var fd = new FormData($(this)[0])
        fd.append('state', art_state)

        $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 400,
            height: 280
        }).toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作
            fd.append('cover_img', blob)

        })

        publishArticle(fd)

    })

    function publishArticle(fd) {
        //跨域了，需要后台支持
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }

                layui.layer.msg('发布成功')
                location.href = '/article/art_list.html'
            }
        })
    }
})