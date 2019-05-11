$(document).ready(function(){
//    pageCode
    var pg=pageCode.split('-');
    var country=pg[0];
    var pg1depth=pg[1];
    var pg2depth=pg[2];
    var pg3depth=pg[3];
    
    if(!country==0){
        $('#country li:nth-child('+country+') a').addClass('on');
        $('#gnb_title li:nth-child('+pg1depth+') a').addClass('on');
        var twoDepth=$('#gnb_sub_wrap>ul:nth-child('+pg1depth+')>li:nth-child('+pg2depth+')');
        twoDepth.children('a').addClass('on');
        $('.snb_2depth ul li').eq(pg2depth-1).children('a').addClass('on');
        $('.snb_3depth ul li').eq(pg3depth-1).children('a').addClass('on');
        
    }
    
    
//    header 높이, nav 위치변경    
    var defaultHeaderHeight=$('#header').height();
    var defaultSvisualHeight=$('#sub_visual').height();
    
    $(window).on('scroll',function(){
        var headerPos=$('#nav').position().top;
        var winScrollTop=$(this).scrollTop();
        var winWidth=$(this).width();
        if(winScrollTop>headerPos){
            $('#header').addClass('scrolling');
            $('#header.main').addClass('on');
            if(winWidth>641){
//                $('.lineMap').css({'margin-top':130})
//                $('.privacy').css({'margin-top':200})
//                $('.sub_cont_wrap h3').css({top:180})
//                $('#sub_visual').slideUp(1200,'easeOutBounce');
            }
            
        }else{
            $('#header').removeClass('scrolling');
            $('#header.main').removeClass('on');
            if(winWidth>641){
//                $('.lineMap').css({'margin-top':0})
//                $('.privacy').css({'margin-top':0})
//                $('.sub_cont_wrap h3').css({top:160})
//                $('#sub_visual').slideDown(800);
            }
                        
        }
    })
    

    
    
//    nav tab focus이동: 접근성
    $('#gnb_title li a').on('focus',function(){
       $('#gnb_sub').slideDown();
    })
    $('.gSub6 li:last-child a').on('blur',function(){
        $('#gnb_sub').slideUp();
    })

    $('#gnb_title li a').on('blur',function(){
        var twoDepthClass=$(this).parent('li').attr('class')
        twoDepthClass='.'+twoDepthClass.slice(0,5)
        $(twoDepthClass+'>li:first-child>a').focus();                
    })
    $('#gnb_sub_wrap>ul>li:last-child>a').on('blur',function(){
        var oneDepthClass=$(this).parent('li').parent('ul').next().attr('class')
        oneDepthClass='.'+oneDepthClass+'Title'
        $(oneDepthClass+' a').focus();                
    })
    
    
//------------------nav--------------------
    
    //2depth 열기
    $('#gnb_title').on('mouseenter',function(){
        if(!$('#gnb_sub').is(':animated')){
            $('#gnb_sub').slideDown();
            $('#gnb_sub').css({'border-bottom-left-radius':'20px','border-bottom-right-radius':'20px'})
            $('#header').css({'border-bottom-left-radius':'20px','border-bottom-right-radius':'20px'})
        }
    })
    //2depth 닫기
    $('#header_wrap,#container,section,#footer').on('mouseenter',function(){
        $('#gnb_sub').slideUp();
        $('#nav a').removeClass('over');
        $('#header').css({'border-bottom-left-radius':'0px','border-bottom-right-radius':'0px'})
        $('#gnb_sub').css({'border-bottom-left-radius':'0px','border-bottom-right-radius':'0px'})
    })
    $('body').on('mouseleave',function(){
        $('#gnb_sub').slideUp();
        $('#nav a').removeClass('over');
        $('#header').css({'border-bottom-left-radius':'0px','border-bottom-right-radius':'0px'})
        $('#gnb_sub').css({'border-bottom-left-radius':'0px','border-bottom-right-radius':'0px'})
    })
    
    
//gnb_title color 변경
    $('#gnb_sub ul').on('mouseenter',function(){
        var subClass=$(this).attr('class');
        var gnbClass=$('.'+subClass+'Title').children('a');
        var gnbSiClass=$('.'+subClass+'Title').siblings().children('a');
        
        gnbSiClass.removeClass('over');
        gnbClass.addClass('over');
    })
    $('#nav li').on('mouseenter',function(){
        $(this).siblings().children('a').removeClass('over')
    })
    
    
//    siteMap modal 창
    $('#btn_siteMap').on('click',function(e){
        e.preventDefault();
        $('#greyLayer').show().siblings('#siteMap_box').fadeIn(1000);        
    })
    
    $('.btn_close, #greyLayer').on('click',function(e){
        e.preventDefault();
        $('#siteMap_box').hide().siblings('#greyLayer').hide();
    })
    
    $('#siteMap li a').on('mouseenter',function(){
        var aWidth=$(this).width();
        $(this).siblings('.line').stop().animate({width:aWidth+4});
    })
    $('#siteMap li a').on('mouseleave',function(){
        $('#siteMap li .line').stop().animate({width:0});
    })
    
    function lineMake(){
        $('#siteMap li a').each(function(){
            $(this).after('<span class="line"></span>');
        })
    }
    lineMake();
    
    
//    sns menu open event
    $('.side_top').on('click',function(){
        $(this).parent().toggleClass('open');
    })
    
    
    
    
    

// mobile----------------------------------
    
    //   m_gnb height값 조정
    function re_gnb_height(){
        var re_gnb_height=$(window).height()-98;
        $('.m_gnb').css({height:re_gnb_height})
    }
    re_gnb_height();
    
    
    $('.m_country').on('click',m_country)
    function m_country(){
        $('#country').slideToggle();
    }

//    2depth 메뉴 slide 오픈
    $('.depth2open').on('click',depth2open)
    function depth2open(){
        $(this).children('ul').slideToggle();
    }

//    nav 열기
    $('.m_nav_btn').on('click',open_nav)
    function open_nav(){
        var doc_width=$(document).height();
        $('.m_modal').css({height:doc_width}).fadeIn();
        $('.m_nav').animate({right:0},1000)
        $(this).fadeOut().siblings('.m_close_btn').fadeIn();
    }
    
//    nav 닫기
    $('.m_close_btn').on('click',close_nav)
    $('.m_gnb a.menu').on('click',close_nav)
    function close_nav(){
        $('.m_nav').animate({right:"-100%"},300)
        $('.m_modal').fadeOut(200);
        $(this).fadeOut().siblings('.m_nav_btn').fadeIn();
    }
    
    
      
        
        

})


