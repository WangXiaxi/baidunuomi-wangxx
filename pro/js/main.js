function addhotcity(allCity) {
	var len = allCity.length;
	for(var i = 0;i < len;i++){
		$(".AllHotCity").append("<a>" + allCity[i].tit + "</a>");
	}
}
function creatAllStore(allClass){
	var len = allClass.length;
	for(var i = 0;i < len;i++){
		$(".allStore .bigStoreUl").append("<li></li>");
		$(".allStore .bigStoreUl li").eq(i).append(
							'<div class="show">'+
								'<a class="bigTit">' +allClass[i].bigTit+ '</a>'+
								'<div class="smallTitOut">'+
								'</div>'+
							'</div>'+
							'<div class="vanish">'+
							'</div>'
							);
		if(allClass[i].h3.length==0&&allClass[i].aText.length==0){
			$(".allStore .bigStoreUl li").eq(i).find(".vanish").remove();
		}
		for(var j = 0,smallLen = allClass[i].smallTit.length;j < smallLen;j++){
			$(".allStore .bigStoreUl li").eq(i).find(".smallTitOut").append('<a class="smallTit">' + allClass[i].smallTit[j] + '</a>');
		}
		for(var z = 0,aTextLen = allClass[i].aText.length;z < aTextLen;z++){
			if (allClass[i].h3[z] == undefined) {
				allClass[i].h3[z] = "";
			}
			$(".allStore .bigStoreUl li").eq(i).find(".vanish").append(
										'<div class="inCl">'+
											'<h3 class="tit">' + allClass[i].h3[z] + '</h3>'+
										'</div>'
				);
			if(z == (aTextLen-1)){
				$(".allStore .bigStoreUl li").eq(i).find(".vanish .inCl").eq(z).css("border-bottom","none");
			}
			for(var y = 0,aTextInLen = allClass[i].aText[z].length;y < aTextInLen;y++){
				$(".allStore .bigStoreUl li").eq(i).find(".vanish .inCl").eq(z).append(
												'<a>' + allClass[i].aText[z][y] + '</a>'
					);
				if(y == (aTextInLen-1)){
				$(".allStore .bigStoreUl li").eq(i).find(".vanish .inCl").eq(z).find("a").eq(y).css("border-right","none");
			}
			}
		}
		
	}	
}
function creatInnerUl(allUlsele,$innerUlClass){
	var len = allUlsele.length;
	for(var i = 0;i < len;i++){
		$innerUlClass.append("<li><a class = \"" + allUlsele[i].className + "\">" + allUlsele[i].inner + "</a></li>");
	}	
}
function creatBrandImg(alllist){
	var len = alllist.length;
	var $BrandImg = $(".brand .allList");
	for(var i = 0;i < len;i++){
		$BrandImg.append("<a><img src=\"" + alllist[i].imgSrc + "\" /></a>")
	}
}
function clickRemove(){
	$(".topBanner i.remove").click(function(){
		$(".topBanner").animate({height:0},500,function(){
			$(".topBanner").remove();
		});
	});
}
(function($){ //topBanner
	var $topBanner = $(".topBanner"),
		$top = $topBanner.find(".top"),
		animated = false,
		previndex = 0,
		stopTop,
		$clickem = $topBanner.find(".buttons em"),
		setIndex = 1;
	function topSilder(_this){
			if (animated||index==previndex){
				return;
			}
			animated = true;
			var index = $(_this).index();
			clearInterval(stopTop);
			$(_this).addClass("cur").siblings().removeClass("cur");	
			$top.eq(previndex).animate({opacity:0},500,function(){
				$top.eq(index).animate({opacity:1},500,function(){
					animated = false;
					setIndex = index + 1;
					playTop();
				});
			});
			previndex = index;

	}
	function topClickem(){
		$top.eq(1).css("opacity",0);
		$clickem.click(function(){
			topSilder(this);
		});	
	}
	function playTop(){
		stopTop = setInterval(function(){
			if (setIndex > 1) {
				setIndex = 0;
			}
			topSilder($clickem.eq(setIndex));
			setIndex++;
		},3000);
	}
	playTop();
	topClickem();
})(jQuery);

(function($){ //smallbanner
	var $smallBanner = $(".smallBanner");
	var $smallButtons = $smallBanner.find(".buttons");
	var $smallContainer = $smallBanner.find(".container");
	var $imgA = $smallContainer.find("a");
	var $smallEm = $smallButtons.find("em");
	var animated = false;
	var setIndex = 1;
	var stopSmall;
	var previndex = 0;
	function anima(_this){
		previndex = $(_this).index();
		$imgA.eq($(_this).index()).animate({opacity:1},400,function(){
			setIndex = $(_this).index()+1;
		});
		$imgA.eq($(_this).index()).siblings("a").animate({opacity:0},400);
		$(_this).addClass("cur").siblings("em").removeClass("cur");
	}
	function mouse(){
		$imgA.css("opacity",0);
		$imgA.eq(0).css("opacity",1);
		$smallEm.eq(0).addClass("cur");
		$smallEm.mouseenter(function(){
			clearInterval(stopSmall);
			$imgA.eq(previndex).stop(); 
			$imgA.eq(previndex).siblings("a").stop();
			anima(this);
		}).mouseleave(function(){
			playSmall();
		});
	}
	function playSmall(){
		stopSmall = setInterval(function(){
			if(setIndex > 1){
				setIndex = 0;
			}
			anima($smallEm.eq(setIndex));
			setIndex ++;
		},5000);	
	}
	playSmall();
	mouse();
})(jQuery);

(function($,imgs){  //bigBanner
	var $width = 737,
		len = imgs.length,
		animated = 0,
		stop;
	function createDOM(){
		
		$(".bigBanner").append("<div class=\"container\"></div>"+
								"<div class=\"buttons\">"+
								"</div>"
				);
		$(".bigBanner .container").append("<a><img src=\"" +imgs[len-1].imgSrc + "\" /></a>");
		for(var i = 0;i < len;i++){
			$(".bigBanner .container").append("<a><img src=\"" +imgs[i].imgSrc + "\" /></a>");
			$(".bigBanner .buttons").append("<em></em>");
		}
		$(".bigBanner .container").append("<a><img src=\"" +imgs[0].imgSrc + "\" /></a>");
		$(".bigBanner .buttons em").eq(0).addClass("cur");

		var conWidth = $width*(len+2) + "px";
		$(".bigBanner .container").css("width",conWidth);
	}
	function banner(offset){
		if (animated) {
			return;
		}
		animated = 1;

		$(".bigBanner .container").animate({
			left : parseInt($(".bigBanner .container").css("left")) + offset
		},400,function(){
				animated = 0;
				var wid = parseInt($(".bigBanner .container").css("left"));
				if (wid < -len*$width) {
				$(".bigBanner .container").css("left","-" + $width + "px");
			}else if (wid > -1*$width) {
				$(".bigBanner .container").css("left","-" + len*$width + "px");
			}
			
		});
		
	}
	function play(){
		stop = setInterval(function(){
		banner(-$width);
		setIndex(1);
	},5000);
	}
	function setIndex(jue){
		var index = Math.abs(parseInt($(".bigBanner .container").css("left")) / $width) - 1 + jue;
			if (index == len) {
				index = 0;
			}else if (index == -1) {
				index = len-1;
			}
		$(".bigBanner .buttons em").eq(index).addClass("cur").siblings().removeClass("cur");
	}

	function clickSpan(){
		$(".bigBanner span.prev").click(function(){
			clearInterval(stop);
			if (animated) {
			return;
			}
			banner($width);
			setIndex(-1);
			play();
		});
		$(".bigBanner span.next").click(function(){
			clearInterval(stop);
			if (animated) {
			return;
			}
			banner(-$width);
			setIndex(1);
			play();
		});
	}

	function clickEm(){	
		$(".bigBanner .buttons em").click(function(){
			if (animated) {
			return;
			}
			animated = 1;
			clearInterval(stop);
			$(this).addClass("cur").siblings().removeClass("cur");
			var leftWidth = "-" + ($(this).index()+1)*$width;
			$(".bigBanner .container").animate({
				left : leftWidth
			},400,function(){
				animated = 0;
			});
			play();
		});
	}
	
	createDOM();
	clickEm();
	play();
	clickSpan();
})(jQuery,bigimgs);


(function($){
	var allflLen = allfloorStore.length;
	var $pubfloor = $(".pubFloor");
	function fil(){
		var $val = $("input[name=search]").val().toLowerCase();
		var $listItem = $(".pubFloor .allListItem>.list-item");
		var liLen = $listItem.length;
		for(var i = 0;i < liLen;i++){
			if($listItem.eq(i).find(".location").text().toLowerCase().indexOf($val)<0&
				$listItem.eq(i).find(".des").text().toLowerCase().indexOf($val)<0&
				$listItem.eq(i).find(".title").text().toLowerCase().indexOf($val)<0
				){
				$listItem.eq(i).css("display","none");
			}else{
				$listItem.eq(i).css("display","block");
			};
		}
	}
	function choose(){
		$("input[name=search2]").keyup(function(){
			$("input[name=search]").val($("input[name=search2]").val());
			fil();
		});
		$("input[name=search]").keyup(function(){
			$("input[name=search2]").val($("input[name=search]").val());
			fil();
		});
	}
	function createAllItem(){		
		for(var i = 0;i < allflLen;i++){
			$pubfloor.eq(i).append(
				'<div class="pubTitSele">'+
						'<i class="BigTit-icon" style = "background-image:url(' + pubflo[i].url + ');"></i>'+
						'<h3 class="pubTit">' + pubflo[i].tit + '</h3>'+
						'<ul class="choosePub">'+
							
						'</ul>'+
					'</div>'+
					'<ul class="allListItem">'+
						
					'</ul>'+
					'<a class="lookAllBuy"><span>查看全部团购</span><i class="gt"></i></a>'
				);
			for(var j = 0,ulLiLen = pubflo[i].ulLi.length;j<ulLiLen;j++){
				if (j == ulLiLen-1) {
					$pubfloor.eq(i).find(".choosePub").append(
					'<li><a><span>' + pubflo[i].ulLi[j].tit + '</span><i class="i-all"></i></a></li>'
					);
				}else{
					$pubfloor.eq(i).find(".choosePub").append(
						'<li><a>' + pubflo[i].ulLi[j].tit + '</a></li>'
						);
				}
			}
		}
	}
	function createLi(){
		for(var i = 0;i < allflLen;i++){
			for(var x = 0,storeLen = allfloorStore[i].length;x < storeLen;x++){
				var listItem = allfloorStore[i];
				    listItem[x].curPrice = listItem[x].curPrice.replace(/¥/,"");
				$pubfloor.eq(i).find(".allListItem").append(
						'<li class="list-item">'+
							'<a class="img-a">'+
								'<i class="free-appoint"></i>'+
								'<img src="https:' + listItem[x].imgSrc + '" onerror="this.src=\'img/loading.png\'" />'+
								'<div class="locate-opac">'+
									'<i class="locaIcon"></i>'+
									'<span class="location">' + listItem[x].location + '</span>'+
								'</div>'+
							'</a>'+
							'<a class="title">' + listItem[x].name + '</a>'+
							'<a class="des">' + listItem[x].des + '</a>'+
							'<div class="outPromo">'+
								'<span class="promo">' + listItem[x].code + '</span>'+
							'</div>'+
							'<div class="outPrice">'+
								'<span class="i-mon">¥</span><span class="curPrice">' + listItem[x].curPrice + '</span><span class="prePriceOut">价值<span class="prePrice">¥' + listItem[x].prePrice +'</span></span>'+
							'</div>'+
							'<div class="out-sold">'+
								'<span class="gold">' + listItem[x].gold +'</span>'+
								'<span class="sold">' + listItem[x].sold +'</span>'+
							'</div>'+
						'</li>'
						);
				if(listItem[x].ppint == ""){
					$pubfloor.eq(i).find(".allListItem li").eq(x).find(".free-appoint").remove();
				}
				if(listItem[x].gold == ""){
					$pubfloor.eq(i).find(".allListItem li").eq(x).find(".gold").text("暂无评分").css("color","#9e9e9e");
				}
				if(listItem[x].location == ""){
					$pubfloor.eq(i).find(".allListItem li").eq(x).find(".locate-opac").remove();
				}
				if(listItem[x].code == ""){
					$pubfloor.eq(i).find(".allListItem li").eq(x).find(".promo").remove();
				}
			}
			for (var j = 0,len = allfloorStore[i].length; j < len; j=j+5) {
				$pubfloor.eq(i).find(".allListItem li").eq(j).find(".out-sold").append('<div class ="lines"></div>');
			}
		}
		$pubfloor.find(".locate-opac").css("opacity","0");
	}
	function upSup(){
		$(".upSup").click(function(){
			$pubfloor.find(".allListItem").empty();
			for(var a = 0;a < allflLen;a++){
				for (var i = 0,len = allfloorStore[a].length; i < len; i++) {
					for(var j = 0;j < len; j++){
						if(Number(allfloorStore[a][i].curPrice) < Number(allfloorStore[a][j].curPrice)){
							var d = allfloorStore[a][i];
							allfloorStore[a][i] = allfloorStore[a][j];
							allfloorStore[a][j] = d;
						}
					}
				}
			}
			createLi();
			fil();
		});
	}
	function downSup(){
		$(".downSup").click(function(){
			$pubfloor.find(".allListItem").empty();
			for(var a = 0;a < allflLen;a++){
				for (var i = 0,len = allfloorStore[a].length; i < len; i++) {
					for(var j = 0;j < len; j++){
						if(Number(allfloorStore[a][i].curPrice) > Number(allfloorStore[a][j].curPrice)){
							var d = allfloorStore[a][i];
							allfloorStore[a][i] = allfloorStore[a][j];
							allfloorStore[a][j] = d;
						}
					}
				}
			}
			createLi();
			fil();
		});
	}
	createAllItem();
	createLi();
	choose();
	upSup();
	downSup();
})(jQuery);
function mouseLiLocateOpac(){
	$(".allListItem").delegate("li.list-item","mouseenter",function(){
		$(this).find(".locate-opac").stop().animate({opacity:.7},500);
	}).delegate("li.list-item","mouseleave",function(){
		$(this).find(".locate-opac").stop().animate({opacity:0},500);
	});
}
(function($){
	var $leftFix = $(".leftFixed"),
		$leftulFix = $(".leftFixed ul"),
		$leftulFixLi = $leftulFix.find("li");
	function leftF(){
		var left = ($(window).width()-1210)/2-50;
		if (left <= 0 ) {
			left = 0
		}
		left = left + "px";
		$leftFix.css("left",left);
	}
	function scrollLeft(){	
		var animate1 = false,
		    animate2 = false,
		    $pubTitSele = $(".pubTitSele"),
		    $topFixed = $(".topFixed"),
		    brandOffset = $(".brand").offset().top,
		    pubTitSele0 = $pubTitSele.eq(0).offset().top,
		    pubTitSele1 = $pubTitSele.eq(1).offset().top,
		    pubTitSele2 = $pubTitSele.eq(2).offset().top,
		    pubTitSele3 = $pubTitSele.eq(3).offset().top,
		    pubTitSele4 = $pubTitSele.eq(4).offset().top,
		    pubTitSele5 = $pubTitSele.eq(5).offset().top,
		    bottomEndOffset = $(".bottomEnd").offset().top,
		    $leftulFixLiI0 = $leftulFixLi.eq(0).find("i"),
		    $leftulFixLiI1 = $leftulFixLi.eq(1).find("i"),
		    $leftulFixLiI2 = $leftulFixLi.eq(2).find("i"),
		    $leftulFixLiI3 = $leftulFixLi.eq(3).find("i"),
		    $leftulFixLiI4 = $leftulFixLi.eq(4).find("i"),
		    $leftulFixLiI5 = $leftulFixLi.eq(5).find("i");
		$leftulFix.delegate("li","click",function(){
			var curIndex = $(this).index();
			if (curIndex == 6) {
				$("html,body").animate({scrollTop:0});
			}else{
				$("html,body").scrollTop($pubTitSele.eq(curIndex).offset().top);
			}
		});
		$(window).scroll(function(){
			var windowTop = $(window).scrollTop();
			if (windowTop >= pubTitSele0&windowTop < pubTitSele1) {
				$leftulFixLiI0.addClass("on");
			}else{
				$leftulFixLiI0.removeClass("on");
			}
			if (windowTop >= pubTitSele1&windowTop < pubTitSele2) {
				$leftulFixLiI1.addClass("on");
			}else{
				$leftulFixLiI1.removeClass("on");
			}
			if (windowTop >= pubTitSele2&windowTop < pubTitSele3) {
				$leftulFixLiI2.addClass("on");
			}else{
				$leftulFixLiI2.removeClass("on");
			}
			if (windowTop >= pubTitSele3&windowTop < pubTitSele4) {
				$leftulFixLiI3.addClass("on");
			}else{
				$leftulFixLiI3.removeClass("on");
			}
			if (windowTop >= pubTitSele4&windowTop < pubTitSele5) {
				$leftulFixLiI4.addClass("on");
			}else{
				$leftulFixLiI4.removeClass("on");
			}
			if (windowTop >= pubTitSele5&windowTop < bottomEndOffset) {
				$leftulFixLiI5.addClass("on");
			}else{
				$leftulFixLiI5.removeClass("on");
			}
			if (windowTop >= pubTitSele0){
				$leftFix.removeClass("remove").addClass("add");
			}else{
				$leftFix.removeClass("add").addClass("remove");
			}
			if(windowTop >= brandOffset){
				if (animate1) {
					return;
				}
				animate1 = true;
				$topFixed.animate({height:50},100,function(){
					animate1 = false;
				});
			}else{
				if (animate2) {
					return;
				}
				animate2 = true;
				$topFixed.animate({height:0},100,function(){
					animate2 = false;
				});
			}
		});
		$(window).resize(function(){
			leftF();
		});
	}
	leftF();
	scrollLeft();
})(jQuery);
(function($){
	function clickSure(){
		$(".enterSure").click(function(){
			$(".enterBg").css("display","block");
			$(".login").css("display","block");
			$("body,html").css("overflow","hidden");
		});
		$(".enterBg").click(function(){
			$(".enterBg").css("display","none");
			$(".login").css("display","none");
			$("body,html").css("overflow","");
		});
	}
	function login(){
		$("input[name=\"code\"]").click(function(){
			if($("input[name=\"password\"]")[0].value == ""){
				alert("请输入密码");
			}else{
				$.ajax({
					url:"http://www.ikindness.cn/api/test/message",
					type:"get",
					data:{
					tel:$("input[name=\"user\"]").val()
					},
					success:function(data){
						$("input[name=\"sureNum\"]").val(data.data);
					}
				});	
			}	
		});
		$("input[name=\"提交\"]").click(function(){
			if($("input[name=\"c\"]").val().toLowerCase() != $(".codeSure").text().toLowerCase()){
				alert("验证码错误");
			}else{
				$.ajax({
					url:"http://www.ikindness.cn/api/test/signUp",
					type:"post",
					data:{
					tel:$("input[name=\"user\"]").val(),
					password:$("input[name=\"password\"]").val(),
					code:$("input[name=\"sureNum\"]").val()
					},
					success:function(data){
						if (data.message=="success") {
							$(".enterSure").text($("input[name=\"user\"]").val());
							$(".enterBg").css("display","none");
							$(".login").css("display","none");
							$("body,html").css("overflow","visible");
							alert("注册成功");
						}else{
							alert("注册失败");
							sureCode();
						}
					}
				});
			}
		});
	}
	function sureCode(){
		var codeLength = 6,
			codeArr = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','a','b','c','d'],
			code = "";
			for(var i = 0;i < codeLength;i++){
				var codeIndex = Math.floor(Math.random()*18);
				code += codeArr[codeIndex];
			}
			$(".codeSure").text(code);
	}
	function codeClick(){
		$(".codeSure").click(function(){
			sureCode();
		});
	}
	codeClick();
	sureCode();
	clickSure();
	login();
})(jQuery);


					