$(function() {
    var page = 1;
    var pageSize = 5;
    dianji();
   function dianji() {
    $.ajax({
        type:'get',
        url:'/user/queryUser',
        data:{
            page:page,
            pageSize:pageSize
        },
        success:function(info) {
            // console.log(info)
            var htmlStr = template('tmp',info);
            $('tbody').html(htmlStr);
            $("#pagintor").bootstrapPaginator({
                bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                currentPage:page,//当前页
                totalPages:Math.ceil(info.total / info.size),//总页数
                size:"small",//设置控件的大小，mini, small, normal,large
                onPageClicked:function(event, originalEvent, type,p){
                  //为按钮绑定点击事件 page:当前点击的按钮值
                     page=p;
                     dianji();
                  
                }
              });
        }
    })
   }
   var $id;
   var isDelete;
   $('tbody').on('click','.btn',function() {
    //    console.log(1)
      $('#bodModel').modal('show');
       $id = $(this).data('id');
    //   console.log($id);
       isDelete = $(this).text() === '禁用' ? 0 : 1;
    //   console.log(isDelete)
   })
   $(".que").on('click',function() {
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
               id:$id,
               isDelete:isDelete
            },
            success:function(info) {
            //    console.log(info)
                if(info.success) {
                   $("#bodModel").modal('hide')
                   dianji();
                }
            }
        })
   })

})