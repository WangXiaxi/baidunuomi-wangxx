function addhotcity(allCity) {
	var len = allCity.length;
	for(var i = 0;i < len;i++){
		$(".AllHotCity").append("<a>" + allCity[i].tit + "</a>");
	}
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
			console.log(hour,minute,second,prevHours);		
	 
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