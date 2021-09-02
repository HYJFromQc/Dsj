$(function() {
    template.defaults.imports.dateFormat = function(date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = addZero(dt.getMonth() + 1)
        var d = addZero(dt.getDay())
        var hh = addZero(dt.getHours())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + addZero(dt.getMinutes()) + ':' + addZero(dt.getSeconds())
    }

    function addZero(n) {
        return n > 9 ? n : '0' + n
    }

    //定义分页查询参数对象
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    initTable()

    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;


    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                var testRes = {
                    "status": 0,
                    "message": "获取文章列表成功！",
                    "data": [{
                            "Id": 1,
                            "title": "abab",
                            "pub_date": "2020-01-03 12:19:57.690",
                            "state": "已发布",
                            "cate_name": "最新"
                        },
                        {
                            "Id": 2,
                            "title": "666",
                            "pub_date": "2020-01-03 12:20:19.817",
                            "state": "已发布",
                            "cate_name": "股市"
                        }
                    ],
                    "total": 5
                }

                console.log(res);
                //模板引擎渲染数据
                $('tbody').html(template('tpl-table', testRes))

                renderPage(res.total)
            }
        })
    }


    initCate()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败')
                }
                $('[name=cate_id]').html(template('tpl-slecet', res))
                form.render()
            }
        })
    }


    $('#form-search').submit(function(e) {
        e.preventDefault()
            // 获取表单选择值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
            //重新渲染
        initTable()
    })

    //分页
    function renderPage(total) {
        console.log('ifkfkf');
        laypage.render({
            elem: 'page-box',
            count: 5,
            limit: q.pagesize,
            limits: [2, 3, 5, 20],
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first) {
                if (!first) {
                    q.pagenum = obj.curr
                    q.pagesize = obj.limit

                    //判断当前页是否有剩余，若无则页码-1
                    var len = $('btnDel').length
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum--
                    }
                    initTable()
                }
            }
        });
    }

    $('tbody').on('click', '#btnDel', function() {
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {

            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + $(this).attr('data-id'),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功')
                    initTable()
                }
            })
            layer.close(index);
        });
    })





    function publish(data) {
        if (data === null) {
            return layer.msg('图片为空')
        }
        console.log(data);
        var formData = new FormData()
        var obj = {
            title: '我是标题' + Math.round(Math.random() * 10 + 20),
            cate_id: Math.round(Math.random() * 100 + 200),
            content: '我是内容' + Math.round(Math.random() * 1000 + 2000),
            state: ['已发布', '草稿'][Math.round(Math.random() * 0 + 1)],
            cover_img: data
        }

        console.log(obj);
        for (var key in obj) {
            formData.append({ key: obj[key] })
        }
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: formData,
            success: function(res) {
                console.log(res);
            }
        })
    }

    $('#tmp').click(function() {
        console.log(11);
        return;
        downloadBlob();
    })

    function downloadBlob() {

        var oReq = new XMLHttpRequest();

        var imgs = ['https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg11.51tietu.net%2Fpic%2F2016-071418%2F20160714181543xyu10ukncwf221991.jpg&refer=http%3A%2F%2Fimg11.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632387229&t=500ada25a6a49cca0e5a2f0ac44f8a34', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fy0.ifengimg.com%2Fd4a44fff10624b98%2F2013%2F1021%2Frdn_526466b752409.jpg&refer=http%3A%2F%2Fy0.ifengimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632387269&t=72d0ac5a45ef90bb6e3ad5634433e184', 'https://img1.baidu.com/it/u=211228414,420250473&fm=26&fmt=auto&gp=0.jpg', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fs9.sinaimg.cn%2Fbmiddle%2F4b07f87c590054b6227f8&refer=http%3A%2F%2Fs9.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632387294&t=9aadf1087eaeee4cbede7a25c036eac1', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg95.699pic.com%2Fphoto%2F40102%2F6822.gif_wh300.gif%21%2Fgifto%2Ftrue&refer=http%3A%2F%2Fimg95.699pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632387294&t=3ec0a4a343090c0beca1f3dc9c8d7341', 'https://img0.baidu.com/it/u=1330784235,4146572500&fm=26&fmt=auto&gp=0.jpg']


        var idx = Math.round(Math.random() * 0 + (imgs.length - 1));

        oReq.open("GET", imgs[idx], true);
        oReq.responseType = "blob";
        oReq.onreadystatechange = function() {
            console.log(111);
            var blob = oReq.response;
            if (blob !== null) {
                publish(blob)
            }
        }
        oReq.send();
    }
})