
    NProgress.start();
    setTimeout(function() {
        NProgress.done();
    },500)
    $(document).ajaxStart(function() {
        NProgress.start();
    })
    $(document).ajaxStop(function() {
        setTimeout(function() {
            NProgress.done();
        },500)
    })
    $(".nn").on('click',function() {

        $('.non').stop().slideToggle()
      // console.log(1)
      })
      var as = $("aside a");
      
  
  
  
  
      $(".top .zuo").on('click',function() {
        $('.aside').toggleClass('xiao');
        $('.top').toggleClass('ye');
        $('.main').toggleClass('ye');
      })
  
  
      $('.top .you .out').on('click',function() {
        $('#myModel').modal('show')
      })
  
  
      $('.tui').on('click',function() {
        $.ajax({
          type:'get',
          url:'/employee/employeeLogout',
          success:function(info){
            // console.log(info)
              if(info.success) {
                location.href = 'login.html';
              }
          }
        })
      })