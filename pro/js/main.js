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
				console.log(z);
				$(".allStore .bigStoreUl li").eq(i).find(".vanish .inCl").eq(z).css("border-bottom","none");
			}
			for(var y = 0,aTextInLen = allClass[i].aText[z].length;y < aTextInLen;y++){
				$(".allStore .bigStoreUl li").eq(i).find(".vanish .inCl").eq(z).append(
												'<a>' + allClass[i].aText[z][y] + '</a>'
					);
				if(y == (aTextInLen-1)){
				console.log(z);
				$(".allStore .bigStoreUl li").eq(i).find(".vanish .inCl").eq(z).find("a").eq(y).css("border-right","none");
			}
			}
		}
		console.log(allClass[i].h3);
		
	}	
}

				