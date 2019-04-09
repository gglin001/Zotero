jQuery(function(b){var a=false;
if(CQ.WCM){if(CQ.utils.WCM.isEditMode()&&CQ.utils.WCM.isDesignMode()){a=true
}}if(!a){var c=b("input[name='00N30000008uNgz']").parent().parent().parent();
c.addClass("salesforce-form-hidden");
b("select[name='00N30000003ofDn']").change(function(){var d=b("select[name='00N30000003ofDn']").val();
if(d==="Yes"){c.removeClass("salesforce-form-hidden")
}else{c.addClass("salesforce-form-hidden")
}})
}});