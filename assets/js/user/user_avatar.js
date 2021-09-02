 $(function() {
     var layer = layui.layer
         // 1.1 获取裁剪区域的 DOM 元素
     var $image = $('#image')
         // 1.2 配置选项
     const options = {
         // 纵横比
         aspectRatio: 1,
         // 指定预览区域
         preview: '.img-preview'
     }

     // 1.3 创建裁剪区域
     $image.cropper(options)

     $('#btn_choose_img').on('click', function() {
         $('#file').click()
     })

     $('#file').change(function(e) {
         console.log(e);
         var filelist = e.target.files
         if (filelist.lenght === 0) {
             return layer.msg('请选择文件')
         }
         var file = filelist[0]
             //转换路径
         var imgURL = URL.createObjectURL(file)
         $image.cropper('destroy').attr('src', imgURL).cropper(options)
     })
     $('#btn_upload').click(function() {
         var dataURL = $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
             width: 100,
             height: 100
         }).toDataURL('image/png')

         $.ajax({
             method: 'POST',
             url: '/my/update/avatar',
             data: {
                 avatar: dataURL
             },
             success: function(res) {
                 if (res.status !== 0) {
                     return layer.smg(res.message)
                 }
                 layer.msg('头像更改成功')
                 window.parent.getUserInfo()
             }
         })
     })
 })