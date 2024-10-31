// JavaScript Document
MenuClick = function(evnt) {
	obj = (document.all)?event.srcElement:evnt.target;
	if (obj.nodeName=="H2"){
		var NextNode = obj.nextSibling;
		while (NextNode.nodeType==3)
			NextNode=NextNode.nextSibling;
		if(NextNode.style.display=="none")
		{NextNode.style.display = "block";obj.className = "over_up"}else{NextNode.style.display = "none";obj.className = "over_down";}
	}
}
MenuOver = function(evnt) { 
	obj = (document.all)?event.srcElement:evnt.target;
	if (obj.nodeName=="H2"){
		obj.className =(obj.className=="")?"over_up":"over_down";
	}
}
MenuOut = function(evnt) {
	obj = (document.all)?event.srcElement:evnt.target;
	if (obj.nodeName=="H2"){
		obj.className =(obj.className=="over_up" || obj.className=="")?"":"over_down";
	}
}
MenuInitailize = function(){
if (document.all || document.getElementById) {
	var navNode = document.getElementById("leftmenu").childNodes;
	var extend = 17; //初始化打开的菜单数量
	var c=0;
	for(i=0;i<navNode.length;i++)
	{
		var subNode = navNode[i].childNodes;
		for(j=0;j<subNode.length;j++)
		{
			if (subNode[j].nodeName=="H2")
			{
				subNode[j].onclick		= MenuClick;
				subNode[j].onmouseover	= MenuOver;
				subNode[j].onmouseout	= MenuOut;
				c++;if (c<=extend) continue;
				var NextNode = subNode[j].nextSibling;
				while (NextNode.nodeType==3)
					NextNode=NextNode.nextSibling;
				NextNode.style.display = (NextNode.style.display=="none")?"block":"none";
			}
		}
	}
}}
window.onload=MenuInitailize;
