	/*
		<summary>用JQ組出LI的內容值，取代傳統的select</summary>
		<param name="array" type="string">畫面上使用的文字+要往下頁傳的值</param>
		<param name="Title" type="string">popup的title</param>
		<param name="UlMenu" type="string">memu的jq object</param>
		<param name="funClickName" type="string">onClick&onTouchEnd觸發的function</param>	
	*/	
	function genUlMenu_NoAjax(array,Title,UlMenu,funClickName) {
			UlMenu.html("");			
			   UlMenu.append("<p>"+Title+"</p>");
			   for(var i=0;i<array.length;i++)
			   {
				    UlMenu.append('<li onclick="'+funClickName+'(\''+array[i]+'\',\''+i+'\')">'+array[i]+'</li>')
               }
	}
	function genUlMenuData_NoAjax(array,arrayVal,Title,UlMenu,funClickName) {
			//alert(Title);
			//alert(UlMenu);
			UlMenu.html("");	
			   UlMenu.append("<p>"+Title+"</p>");
			   for(var i=0;i<array.length;i++)
			   {
				    UlMenu.append('<li onclick="'+funClickName+'(\''+array[i]+'\',\''+arrayVal[i]+'\')">'+array[i]+'</li>')
               }
	}