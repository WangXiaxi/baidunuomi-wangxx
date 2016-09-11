function addhotcity(allCity) {
	var len = allCity.length;
	for(var i = 0;i < len;i++){
		$(".AllHotCity").append("<a>" + allCity[i].tit + "</a>");
	}
}
function clickFix() {
	$(".fix").click(function(){
		$("body,html").animate({scrollTop:0});
	});
}
(function($){ //定时
	function setTime(){
		var interval = 1000,
			now, 
			prevYears,
			prevMonths,
			prevdays,
			endDate14,
			endDate21,
		 	startDate10,
			startDate17,
			$hours = $(".hours"),
			$minute = $(".minute"),
			$second = $(".second"),
			$desTime = $(".desTime");
		function numTwo(num){
			if (num < 10) {
				return num = "" + 0 + num;
			}else{
				return num;
			}
		}
		function ShowCountDown(hour, minute){ //计算剩余时间
			
			var endDate = new Date(prevYears, prevMonths, prevdays ,hour, minute); 
			var leftTime = endDate.getTime() - now.getTime(); 
			var leftsecond = parseInt(leftTime/1000); 
			var hour = Math.floor(leftsecond/3600); 
			var minute = Math.floor((leftsecond - hour*3600)/60); 
			var second = Math.floor(leftsecond - hour*3600 - minute*60); 
			prevHours = now.getHours();
			$hours.text(numTwo(hour));
			$minute.text(numTwo(minute));
			$second.text(numTwo(second));
		} 
		setInterval(function(){
			now = new Date(); 
			prevYears = now.getFullYear();
			prevMonths = now.getMonth();
			prevdays = now.getDate();
			endDate14 = new Date(prevYears, prevMonths, prevdays ,14, 0); 
			endDate21 = new Date(prevYears, prevMonths, prevdays ,21, 0); 
			startDate10 = new Date(prevYears, prevMonths, prevdays ,10, 0); 
			startDate17 = new Date(prevYears, prevMonths, prevdays ,17, 0); 
			if (startDate10 > now.getTime()) {
				ShowCountDown(10,0);
				$desTime.text("距开始");
			}
			if(startDate10 <= now.getTime()&endDate14 >= now.getTime()){
				ShowCountDown(14,0);
				$desTime.text("距结束");
			}
			if(endDate14 < now.getTime()&startDate17 > now.getTime()){
				ShowCountDown(17,0);
				$desTime.text("距开始");
			}
			if(startDate17 <= now.getTime()&endDate21 >= now.getTime()){
				ShowCountDown(21,0);
				$desTime.text("距结束");
			}
			if(endDate21 < now.getTime()){
				$desTime.text("已结束");
			}
		}, interval); 
	}

	setTime();
})(jQuery);
(function($){
	var $allUl = $(".allUl");
	var NumArr = [];
	var num = 15;
	var numScr = 15; 
	var data = hotpage.data;
	function scrollLoading(data){
		$(window).scroll(function(){
			var scrollTop = $(this).scrollTop();
			if (scrollTop > 100) {
				$(".fix").css("display","block");
			}else{
				$(".fix").css("display","none");
			}
			if(scrollTop >= ($(document).height()-$(this).height())){
				if (data.length < num) {
					return;
				}
			var numEnd = num + numScr;
				NumArr =data.slice(num,numEnd);
				num = numEnd;
				creatD(NumArr,NumArr.length);
			}
		});
	}
	function clickFreeApp(){
		var freeA = [];
		for(var i = 0;i < data.length;i++){
			if(data[i].appiont == "免预约"){
				freeA.push(data[i]);
			}
		}
		$(".freeApp").click(function(){
			$(this).find("i").addClass("on");
			$(this).siblings(".card").find("i").removeClass("on");
			num = 15;
			numScr = 15;
			$(window).scrollTop(0);
			$allUl.empty();
			creatD(freeA,num);
			$(window).unbind("scroll");
			scrollLoading(freeA);
		});
	}
	function clickCard(){
		var freeA = [];
		for(var i = 0;i < data.length;i++){
			if(data[i].des.indexOf("代金券") > 0){
				freeA.push(data[i]);
			}	
		}
		$(".card").click(function(){
			$(this).find("i").addClass("on");
			$(this).siblings(".freeApp").find("i").removeClass("on");
			num = 15;
			numScr = 15;
			$(window).scrollTop(0);
			$allUl.empty();
			creatD(freeA,num);
			$(window).unbind("scroll");
			scrollLoading(freeA);
		});
	}
	function creatD(data,len){
		for(var i = 0;i < len;i++){
			if (data[i].gold == "") {
				data[i].gold = "0人已评价";
			}
			$allUl.append(
				'<li class="list-item">'+
					'<a class="img-a">'+
						'<i class="free-appoint"></i>'+
						'<img src="' + data[i].imgs + '" onerror="this.src=\'img/loading.png\'" />'+
					'</a>'+
					'<a class="title">' + data[i].name + '</a>'+
					'<a class="des">' + data[i].des + '</a>'+
					'<div class="outPrice">'+
						'<span class="i-mon">¥</span><span class="curPrice">' + data[i].curPrice.replace(/¥/,"") + '</span>'+
						'<span class="prePriceOut">价值<span class="prePrice">' + data[i].prePrice + '</span></span>'+
						'<i class="ticket-icon"></i>'+
					'</div>'+
					'<div class="line"></div>'+
					'<div class="out-sold">'+
						'<span class="gold">' + data[i].sold + '</span>'+
						'<span class="sold">' + data[i].gold + '</span>'+
					'</div>'+
				'</li>'
			);
			if (data[i].appiont == "") {
				$allUl.find("li").eq(i+num-numScr).find("i.free-appoint").remove();
			}else if(data[i].des.indexOf("代金券") > 0){
				$allUl.find("li").eq(i+num-numScr).find("i.ticket-icon").addClass("on1");
			}
		}
	}
	clickFreeApp();
	clickCard();
	creatD(data,num);
	scrollLoading(data);
})(jQuery);