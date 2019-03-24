

$(function () {
    var page = 1;
    var pageSize = 2;
    var arr = [];
    aj();
    function aj() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                $("tbody").html(template('tmp3', info));
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: page,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    size: "small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, p) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        page = p;
                        aj();
                    }
                });
            }
        })
    }



    // 模态框
    $("#button").on('click', function () {
        $("#mModel").modal('show')
    })

    //    渲染二级分类
    $("#dropdownMenu1").on('click', function () {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                //   console.log(info)
                $(".dropdown-menu").html(template('tmp4', info));
            }
        })
    })

    $(".dropdown-menu").on('click','li',function() {
     
        $(".zi").text($(this).text());
        var res = $(".zi").text();
        $("[name=brandId]").val($(this).data('id'));
        $("#form").data('bootstrapValidator').updateStatus('brandId','VALID')
    })

    var picArr1;
    //  上传图片
    $("#file").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            //   console.log(data.result.picAddr);
            var imgSrc = data.result.picAddr;
            arr.unshift(data.result);
            // console.log(data.result)
            console.log(arr)
            if (arr.length > 3) {
                arr.pop()
                // console.log(arr);
            }
            $(".imgbox").prepend("<img src='" + imgSrc + "' width='100px' style='margin-right:5px'>");
            
            if ($(".imgbox").children().length > 3) {
                $(".imgbox").children().eq(3).remove();
            }
           picArr1 = JSON.stringify(arr);
           if(arr.length === 3) {
            $("#form").data('bootstrapValidator').updateStatus('picArr1','VALID')
           } else {
            $("#form").data('bootstrapValidator').updateStatus('picArr1','INVALID')
           }

        }
        
    });


    //表单验证
    //使用表单校验插件
    $("#form").bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            brandId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择二级分类'
                    },
                   
                }
            },
            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品名称'
                    },
                   
                }
            },
            proDesc: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品描述'
                    },
                   
                }
            },
            num: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                   
                }
            },
            size: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                   
                }
            },
            oldPrice: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品原价'
                    },
                   
                }
            },
            price: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品现价'
                    },
                   
                }
            },
            picArr1: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传三张图片'
                    },
                    //长度校验
                //  stringLength: {
                //      min: 3,
                   
                //      message: '请上传三张图片'
                //    },
                   
                }
            },
        }

    });


    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();

        var result = $("#form").serialize();
        result += '&picArr=' + picArr1;
        console.log(result);

        //使用ajax提交逻辑
        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:result,
            success:function(info) {
                // console.log(info);
                if(info.success) {
                    $("#form").data('bootstrapValidator').resetForm(true);
                    $(".zi").text('请选择二级分类')
                    $(".imgbox").children().remove();
                    $("#mModel").modal('hide');
                    aj();
                }
            }
        })
    });

})