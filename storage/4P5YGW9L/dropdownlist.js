(function(a){a(document).ready(function(){a(".dropdownlist button").click(function(){var b=a(this).innerWidth();
a(this).siblings(".dropdown-items").css({width:(b+2+"px")});
a(this).parent("div.dropdownlist").toggleClass("is-open")
})
})
})(jQuery);