$(function () {

  $("#button").on("click", function () {
    $("#secondModel").modal('show');

    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        // console.log(info)
        $(".dropdown-menu").html(template('tpl', info));
      }
    })
  })

  $(".dropdown-menu").on('click', 'li', function () {
    $(".kk").text($(this).children().text());
    $("[name=categoryId]").val($(this).data("id"))
    $("#form").data('bootstrapValidator').updateStatus('categoryId', 'VALID');

  })
  // $.ajax({

  // })


  // 发送ajax请求
  var page = 1;
  var pageSize = 5;
  second();
  function second() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log(info);
        var htmlStr = template('secondTmp', info);
        $("tbody").html(htmlStr);
        $("#secondUl").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, p) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            page = p;
            second();
          }
        });
      }
    })
  }

  // //使用表单校验插件
  // $("#secondForm").bootstrapValidator({
  //   //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
  //   excluded: [':disabled', ':hidden', ':not(:visible)'],

  //   //2. 指定校验时的图标显示，默认是bootstrap风格
  //   feedbackIcons: {
  //     valid: 'glyphicon glyphicon-ok',
  //     invalid: 'glyphicon glyphicon-remove',
  //     validating: 'glyphicon glyphicon-refresh'
  //   },

  //   //3. 指定校验字段
  //   fields: {
  //     //校验用户名，对应name表单的name属性
  //     brandName: {
  //       validators: {
  //         //不能为空
  //         notEmpty: {
  //           message: '请输入二级分类名称'
  //         }


  //       }
  //     },
  //   }

  // });


  // 上传图片
  $("#file").fileupload({
    
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data.result.picAddr);
      var res = data.result.picAddr;
      // console.log(res)
      $(".imgq").attr('src',res);
      $("[name=brandLogo]").val(res);
      $("#form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID');

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
    categoryId: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请选择一级分类'
        },
       
      }
    },
    brandName: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请输入二级分类名称'
        },
       
      }
    },
    brandLogo: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请上传图片'
        },
       
      }
    }
  }
});

    $("#form").on('success.form.bv', function (e) {
      e.preventDefault();
      //使用ajax提交逻辑
      $.ajax({
        type:'post',
        url:'/category/addSecondCategory',
        data:$("#form").serialize(),
        success:function(info){
          // console.log(info);
          if(info.success) {
            $("#form").data('bootstrapValidator').resetForm(true);
            $(".kk").text('请选择一级分类');
            $(".imgq").attr('src','images/none.png');
            $("#secondModel").modal('hide');
            page=1;
            second();
          }
        }
      })
  });

})