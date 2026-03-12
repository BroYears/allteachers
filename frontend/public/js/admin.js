$("nav .gnb > .depth_menu > a").on("click", function(e){
    e.preventDefault();

    if($(this).hasClass("active")){
        $(this).removeClass("active");
        $(this).siblings("ul").slideUp(100);
    }else{
        $("nav .gnb > .depth_menu > a").removeClass("active");
        $("nav .gnb > .depth_menu ul").slideUp(100);
        $(this).addClass("active").siblings("ul").slideDown(100);
    }
});

$("nav .nav_top .hbg_btn > a").on("click", function(e){
    e.preventDefault();

    $(this).toggleClass("open");

    if($(this).hasClass("open") == true) {
        $(this).addClass("open");
        $("nav").addClass("open");
        $("body, html").css({"overflow-y" : "hidden" , "position" : "fixed"});
    } else {
        $(this).removeClass("open");
        $("nav").removeClass("open");
        $("nav .gnb > .depth_menu > a").removeClass("active");
        $("nav .gnb > .depth_menu ul").slideUp(100);
        $("body, html").css({"overflow-y" : "auto" , "position" : "relative"});
    }
});

// $(".admin_contents .top_area .util > a").on("click", function(e){
//     e.preventDefault();

//     $(this).parents(".util").toggleClass("out");
// });