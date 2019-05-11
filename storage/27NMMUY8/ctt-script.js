jQuery(document).ready(function($){
    var prev_hbox_type = $("#ctt-prev-hintbox").attr("data-design");
    if(prev_hbox_type){
            hbox_type = "";
        if(prev_hbox_type == "background"){
            hbox_type = 0;
        }else if(prev_hbox_type == "underline"){
            hbox_type = 1;
            $(".row.hbox-colvar").hide();
        }else if(prev_hbox_type == "highlighted"){
            hbox_type = 2;
            $(".row.hbox-colvar").hide();
        }
        $('select[name=hbox-type] > option').eq(hbox_type).attr('selected','selected')
    }

    //$(".row.author-nm").hide();

    /*Box Design Template Setting*/
    $("#templ-select option:eq(0)").prop('selected', true);
    $("#templ-select, #author-select").change(function(){
        $("input[name=cta-txt]").val("Click To Tweet");
        var ind = $(this).val();
        var pre_size    = $("#col-pe-"+ind+"").attr("data-fsize");
        var cta         = $("#col-pe-"+ind+" span.cta-pr").attr("data-cta");
        if(cta){
            $("input[name=cta-txt]").val(cta);
        }

        if(pre_size){
                size_index = "";
            if(pre_size == "original"){
                size_index = 0;
            }else if(pre_size == "small"){
                size_index = 1;
            }else if(pre_size == "large"){
                size_index = 2;
            }
            $('select[name=ctt-font] > option').eq(size_index).attr('selected','selected')
        }

        if(ind < 6){
            n  = 0;
            $(".ctt-color-group .color-variation").each(function(){
            n++;
            if(n == ind){
                $(".ctt-color-group #colo-group-"+ind+".color-variation").show();
            }else{
                $(".ctt-color-group #colo-group-"+n+".color-variation").hide();
            }
            });
            $(".txt-color-opt").show();
        }else{
            $(".txt-color-opt").hide();
        }
        var selected_tpl = $(this).val();
        $(".set-output .col-preview").each(function(){
            $(this).hide();
            $("#col-pe-"+ind+".col-preview").show();
        })
    });


    $("input[name=cta-txt]").bind("change paste keyup", function() {
        var _sel_template = $("#templ-select").val();
        $("#col-pe-"+_sel_template+ " span.cta-pr").text($(this).val());
    });

    $("input[name=cta-author]").bind("change paste keyup", function() {
        var _sel_template = $("#author-select").val();
        $("#col-pe-"+_sel_template+" label.auth-lbl").text($(this).val());
    });
    $(".txt-color-opt a").on("click", function(){
        $(".txt-color-opt a").each(function(){
            $(".txt-color-opt a").removeClass("active");
        });
        $(this).addClass("active");

        var tpl = "#col-pe-"+$("#templ-select").val();
        var color = "ctt-color-"+$(this).attr('data-val');

        if($(tpl+" .tweet-box").hasClass("ctt-color-0") || $(tpl+" .tweet-box").hasClass("ctt-color-1") || $(tpl+" .tweet-box").hasClass("ctt-color-2")){
            $(tpl+" .tweet-box").removeClass("ctt-color-0");
            $(tpl+" .tweet-box").removeClass("ctt-color-1");
            $(tpl+" .tweet-box").removeClass("ctt-color-2");
            $(tpl+" .tweet-box").addClass(color);
        }else{
            $(tpl+" .tweet-box").addClass(color);
        }
        $("input[name=cta-txt-color]").val($(this).attr('data-val'));
    });

    $("select[name=ctt-font]").change(function(){
        var tpl = $("#templ-select").val();
        var val = "ctt-font-"+$(this).val();
            var ch_font = "#col-pe-"+tpl;
            $(ch_font+" p").attr('class', '');
            $(ch_font+" p").addClass(val);
    });

    $("select[name=auth-ctt-font]").change(function(){
        var tpl = $("#author-select").val();
        var val = "ctt-font-"+$(this).val();
            var ch_font = "#col-pe-"+tpl;
            $(ch_font+" p").attr('class', '');
            $(ch_font+" p").addClass(val);
    });


    /*Image Box Template Setting*/
    $("#ibox-tpl option:eq(0)").prop('selected', true);
    $("#ibox-tpl").change(function(){
        var itpl = $(this).val();
        var cta_text    = $("#ctt-pre-img-"+itpl).attr("data-cta");
        var btnsize     = $("#ctt-pre-img-"+itpl).attr("data-btnsize");
        var btn_pos     = $("#ctt-pre-img-"+itpl).attr("data-position");
        var onhover     = $("#ctt-pre-img-"+itpl).attr("data-onhover");

        if(cta_text){
            $("input[name=ibox-cta]").val(cta_text);
        }

        if(btnsize){
            indx = "";
            if(btnsize == "original"){
                indx = 0;
            }else if(btnsize == "large"){
                indx = 1;
            }
            $('select[name=ibox-button] > option').eq(indx).attr('selected','selected');
        }

        if(onhover){
            hindex = "";
            if(onhover == "no_hover_action"){
                hindex = 0;
            }else if(onhover == "light"){
                hindex = 1;
            }else if(onhover == "dark"){
                hindex = 2;
            }else if(onhover == "pattern"){
                hindex = 3;
            }else if(onhover == "zoom"){
                hindex = 4;
            }
            $('select[name=ibox-hover] > option').eq(hindex).attr('selected','selected');
        }

        $('select[name=ibox-position]').empty();
        $("#ctt-itpl-con .image-preview").each(function(){
            $(this).hide();
            $("#ctt-itpl-con #ctt-pre-img-"+itpl+".image-preview").show();
        });
        var group_one   = '<option value="center">Center</option><option value="bottom_right">Bottom right</option><option value="top_right">Top right</option>';
        var group_two   = '<option value="left">Left</option><option value="right">Right</option><option value="center">Center</option>';
        var group_three = '<option value="left">Left</option><option value="right">Right</option>';
        if(itpl == 1){
            $('select[name=ibox-position]').append(group_one);
        }else if((itpl == 2) || (itpl == 5) || (itpl == 6)){
            $('select[name=ibox-position]').append(group_two);
        }else if((itpl == 3) || (itpl == 4)){
            $('select[name=ibox-position]').append(group_three);
        }

        if(btn_pos){
            pindex = "";
            if((btn_pos == "center") || btn_pos == "left"){
                pindex = 0;
            }else if((btn_pos == "bottom_right") || btn_pos == "right"){
                pindex = 1;
            }else if((btn_pos == "top_right") || btn_pos == "center"){
                pindex = 2;
            }
            $('select[name=ibox-position] > option').eq(pindex).attr('selected','selected')
        }

    });

    $("select[name=ibox-button]").on('change', function(){
        var val = "btn_"+$(this).val();
        var tpl = "#ctt-pre-img-"+$("#ibox-tpl").val();
        if($(tpl+" a.click_image_link").hasClass("btn_large") || $(tpl+" a.click_image_link").hasClass("btn_original")){
            $(tpl+" a.click_image_link").removeClass("btn_large");
            $(tpl+" a.click_image_link").removeClass("btn_original");
            $(tpl+" a.click_image_link").addClass(val);
        }else{
            $(tpl+" a.click_image_link").addClass(val);
        }
    });

    $("select[name=ibox-position]").on('change', function(){
        var val = "position_"+$(this).val();
        var tpl = "#ctt-pre-img-"+$("#ibox-tpl").val();
        if($(tpl+" .twitter_standard").hasClass("position_center") || $(tpl+" .twitter_standard").hasClass("position_left") || $(tpl+" .twitter_standard").hasClass("position_right") || $(tpl+" .twitter_standard").hasClass("position_bottom_right") || $(tpl+" .twitter_standard").hasClass("position_top_right")){
            $(tpl+" .twitter_standard").removeClass("position_center");
            $(tpl+" .twitter_standard").removeClass("position_left");
            $(tpl+" .twitter_standard").removeClass("position_right");
            $(tpl+" .twitter_standard").removeClass("position_bottom_right");
            $(tpl+" .twitter_standard").removeClass("position_top_right");
            $(tpl+" .twitter_standard").addClass(val);
        }else{
            $(tpl+" .twitter_standard").addClass(val);
        }
    });

    $("select[name=ibox-hover]").on('change', function(){
        var val = "ctt_hover_"+$(this).val();
        var tpl = "#ctt-pre-img-"+$("#ibox-tpl").val();
        if($(tpl+" .ctt_img_container").hasClass("ctt_hover_light") || $(tpl+" .ctt_img_container").hasClass("ctt_hover_dark") || $(tpl+" .ctt_img_container").hasClass("ctt_hover_pattern") || $(tpl+" .ctt_img_container").hasClass("ctt_hover_zoom")){
            $(tpl+" .ctt_img_container").removeClass("ctt_hover_light");
            $(tpl+" .ctt_img_container").removeClass("ctt_hover_dark");
            $(tpl+" .ctt_img_container").removeClass("ctt_hover_pattern");
            $(tpl+" .ctt_img_container").removeClass("ctt_hover_zoom");
            $(tpl+" .ctt_img_container").addClass(val);
        }else{
            $(tpl+" .ctt_img_container").addClass(val);
        }
    });

    $("input[name=ibox-cta]").bind("change paste keyup", function() {
        var tpl = "#ctt-pre-img-"+$("#ibox-tpl").val();
        $(tpl+" span.click_action").text($(this).val());
    }); /*Image Box script Ends*/

    /*hind Box script here*/
    $(".hbox-colvar a.col-color").on("click", function(){
        var hval = $(this).attr("data-val");
        $(".hbox-colvar a").each(function(){
            $(".hbox-colvar a").removeClass("active");
        });
        $(this).addClass("active");
        if($(".hint-box-container span.click_hint a").hasClass("color_0") || $(".hint-box-container span.click_hint a").hasClass("color_1") || $(".hint-box-container span.click_hint a").hasClass("color_2")){
            $(".hint-box-container span.click_hint a").removeClass("color_0");
            $(".hint-box-container span.click_hint a").removeClass("color_1");
            $(".hint-box-container span.click_hint a").removeClass("color_2");
            $(".hint-box-container span.click_hint a").addClass("color_"+hval);
        }else{
            $(".hint-box-container span.click_hint a").addClass("color_"+hval);
        }
        $("input[name=hbox-color]").val(hval);
    });

    $("select[name=hbox-type]").on("change", function(){
        var hval = $(this).val();
        if(hval == "background"){
            $(".hbox-colvar").show();
        }else{
            $(".hbox-colvar").hide();
        }
        if($(".hint-box-container span.click_hint a").hasClass("background-type") || $(".hint-box-container span.click_hint a").hasClass("underline-type") || $(".hint-box-container span.click_hint a").hasClass("highlighted-type")){
            $(".hint-box-container span.click_hint a").removeClass("background-type");
            $(".hint-box-container span.click_hint a").removeClass("underline-type");
            $(".hint-box-container span.click_hint a").removeClass("highlighted-type");
            $(".hint-box-container span.click_hint a").addClass(hval+"-type");
        }else{
            $(".hint-box-container span.click_hint a").addClass(hval+"-type");
        }
    });

})

function save_template_setting(e){
    jQuery(".dis-hint .set-settings .ctt-loader").show();
    var ajx_url = jQuery(e).attr('data-ajxurl');
    var data    = {
            action: 'ctt_tpl_settings',
            data: jQuery(e).serialize()
        };
        jQuery.post(ajx_url, data, function (response){
            jQuery("#resp_ajx").html("Setting Saved");
            setTimeout(function(){
               jQuery("#resp_ajx").html("");
            }, 1000);
            jQuery(".dis-hint .set-settings .ctt-loader").hide();
        });
    return false;
}

function save_auth_box_setting(e){
    jQuery(".dis-hint .set-settings .ctt-loader").show();
    var ajx_url = jQuery(e).attr('data-ajxurl');
    var data    = {
            action: 'ctt_auth_settings',
            data: jQuery(e).serialize()
        };
        jQuery.post(ajx_url, data, function (response){
            jQuery("#auth_resp_ajx").html(response);
            setTimeout(function(){
               jQuery("#auth_resp_ajx").html("");
            }, 1500);
        jQuery(".dis-hint .set-settings .ctt-loader").hide();
        });
    return false;
}

function save_image_box_setting(e){
    jQuery(".dis-hint .set-settings .ctt-loader").show();
    var ajx_url = jQuery(e).attr('data-ajxurl');
    var data    = {
            action: 'ctt_image_settings',
            data: jQuery(e).serialize()
        };
        jQuery.post(ajx_url, data, function (response){
            jQuery(".resp_ajx").html(response);
            setTimeout(function(){
                jQuery(".resp_ajx").html("");
            }, 1500);
            jQuery(".dis-hint .set-settings .ctt-loader").hide();
        });
    return false;
}

function save_hind_box_setting(e){
    jQuery(".dis-hint .set-settings .ctt-loader").show();
    var ajx_url = jQuery(e).attr('data-ajxurl');
    var data    = {
            action: 'ctt_hint_box_settings',
            data: jQuery(e).serialize()
    };
    jQuery.post(ajx_url, data, function (response){
        jQuery(".hbox-response").text(response);
        setTimeout(function(){
            jQuery(".hbox-response").text("");
        }, 1500);
        jQuery(".dis-hint .set-settings .ctt-loader").hide();
    });
    return false;
}

function ctt_tweet_settings(e){
    var ajx_url = jQuery(e).attr('data-ajxurl');
    var data    = {
            action: 'ctt_tweet_settings',
            data: jQuery(e).serialize()
    };
    jQuery.post(ajx_url, data, function (response){
            jQuery(".hbox-response").html(response);
             setTimeout(function(){
                jQuery(".hbox-response").text("");
            }, 1500);
    });
    return false;
}