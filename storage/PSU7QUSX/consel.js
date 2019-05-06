(function($){$('.consel_dropdown').change(function(){var classes=$(this).attr('class').split(' ');var classname='';for(var i=0;i<classes.length;i++){if(classes[i].indexOf('consel_name_')>-1){classname=classes[i];}}
$('.'+classname).not("select").hide();$('.consel_sel_'+$(this).val()).show();$('.consel_dropdown').filter('.'+classname).val($(this).val());if($('a.ftwp-anchor').length)
{$('a.ftwp-anchor').each(function(){if($($(this).attr('href')).is(':visible'))
$(this).parent().show();else
$(this).parent().hide();});}}).trigger("change");})(jQuery);