$(document).ready(function(){
    
        
//  회사개요 tab 제목 클릭 : 해당 li show()처리
    $('.tab li').on('click',function(){
        var tabname=$(this).attr('id');        
        $('#'+tabname+"_intro").show();
        $('#'+tabname+"_intro").siblings('li').hide();
        
        var introHeight=$('#'+tabname+"_intro").height();
        $('.intro_wrap').css({height:introHeight})
    })
    $('#office').trigger('click');
    
    
//    제품 page_scroll 시 보여주기
    productShow()
    $(window).on('scroll',productShow)
    function productShow(){
        var winH=$(window).height();
        var nowScroll=$(this).scrollTop();
        $('.pd').each(function(index){
            var productH=$(this).height();
            var start=$(this).position().top;
            var end=start+productH;
            if(nowScroll>=(start-600) && nowScroll<end){
                $(this).animate({opacity:1,left:0,right:0},1000)
            }
        })
    }
    
    
//    제품 page : pd_contents
    $('.pd_contents dt').on('click',pd_show)
    function pd_show(){
        var pd_height=$(this).siblings('dd').innerHeight()+100;
        $('.pd_contents').height(pd_height);
        $('.pd_contents dl').removeClass('on');
        $(this).parent('dl').addClass('on');
    }
    $('.pd_contents dl:first-child dt').trigger('click');
    
    
//    faq 아코디언메뉴
    $('.acodi_wrap').on('click','.question',function(){
        var ansDiv=$(this).next('.answer').find('div');
        var ansHeight=parseInt(ansDiv.css('height'))+30;
        
        //answer open되어 있을 때 : on클래스 제거, slide닫고 height값 전체 크기에서 빼주기 
        if($(this).hasClass('on')){
            $(this).removeClass('on');
            ansDiv.slideUp().removeClass('on');
            $('.acodi_wrap').animate({'height':'-='+ansHeight+"px"})
        }else{  //answer close되어 있을 때 : on클래스 추가, slide열고 height값 전체 크기에 더해주기
            $(this).addClass('on');
            ansDiv.slideDown().addClass('on');
            $('.acodi_wrap').animate({'height':'+='+ansHeight+"px"})
        }
    })

    
//  faq 아코디언 tab 제목 클릭 : 해당 table show()처리
    $('.tab li').on('click',function(){
        var tabname=$(this).attr('id');        
        $('.question').removeClass('on');
        $('.answer div').slideUp().removeClass('on');
        
        $(this).addClass('on');
        $(this).siblings().removeClass('on');
        $('.acodi_wrap').css({'height':'700px'})
        
        $('#'+tabname+"_sub").show();
        $('#'+tabname+"_sub").siblings('table').hide();        
    })
    $('#faqIR').trigger('click');
    

    
//    회원가입 개인정보 동의 ------------------------------------
    
    $('.check_agree').on('click',check_agree);
    
    function check_agree(e){
        var checkboxLength=$('input[type="checkbox"]').length;
        var checkedLength=$('input[type="checkbox"]:checked').length;
//        console.log(checkboxLength,$('input[type="checkbox"]:checked').length)
        
        if(checkboxLength != checkedLength){
            alert("수집하는 개인정보 항목에 동의해야 가입하실 수 있습니다.");
            e.preventDefault();
        }else{
            location.href="../member/member_form.php";
        }
    }
    
    
    
})

