// JavaScript Document

//设为首页 swj.wuhan.gov.cn
function SetHome(obj, url) {
	try {
		obj.style.behavior = 'url(#default#homepage)';
		obj.setHomePage(url);
	} catch (e) {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			} catch (e) {
				alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
			}
		} else {
			alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" + url + "】设置为首页。");
		}
	}
}

//收藏本站 swj.wuhan.gov.cn
function AddFavorite(title, url) {
	try {
		window.external.addFavorite(url, title);
	} catch (e) {
		try {
			window.sidebar.addPanel(title, url, "");
		} catch (e) {
			alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
		}
	}
}

$(function() {
	$(window).manhuatoTop({
		showHeight: 100, //设置滚动高度时显示
		speed: 500 //返回顶部的速度以毫秒为单位
	});
});

//表单验证信息
function chkSearch() {
	var siteId = 24;
	var pageSize = 10;
	if ($('#tx').val() == '' || $('#tx').val().length == 0) {
		alert('请输入关键字');
		return false;
	}
	$url = '/SITE/whs_70/search.html?searchWord=' + $('#tx').val() +
		'&siteId='+siteId+'&pageSize='+pageSize;
		window.open($url, '_blank');
	return false;
}

$('#tx').on('keypress', function(event) {
	if (event.keyCode === 13) {
		chkSearch();
	}
});
//外链跳转判断
function confirmAway(href) {
	layui.use(['form', 'layer'], function() {
		var layer = layui.layer;
		var duty_index = layer.confirm('武汉市商务局网站', {
			title: '武汉市商务局网站提醒您： ',
			content: '您所访问的页面将跳转到第三方网站，确定要继续吗！？',
			btn: ['确定', '取消'] //按钮
		}, function(index) {
			//window.location.href=href;
			window.open(href);
			layer.close(index);
		
		}, function(index) {
			layer.close(index);
			
		});
	});
}
window.onload = function() {
	var URL = 'http://sw.wuhan.gov.cn';
	$("a").each(function() {
		var a_url = $(this).attr("href");
		var a_c = $(this).attr("class");
		var par_div_c = $(this).parent().attr("class");
		if (a_url != undefined && a_url != null && a_url.length != 0) {
			if (a_url.indexOf(URL) < 0 && a_url.indexOf("/") != 0 && a_url.indexOf("./") != 0 && a_url.indexOf("../") != 0 &&
				a_url.indexOf("#") < 0 && a_url.indexOf("javascript:") < 0 && a_url.indexOf('.shtml') < 0 && a_c != "next" &&
				a_c != "prev" && par_div_c != "black") {
				var confirmAway = "confirmAway('" + a_url + "');return false;";
				//去除掉链接地址
				$(this).attr("href", "javascript:void(0);");
				$(this).attr("onclick", confirmAway);
			} else {
				if (a_url.indexOf('http://www.gov.cn/') == 0 || a_url.indexOf('http://www.hubei.gov.cn/') == 0 || a_url.indexOf(
						'http://www.wh.gov.cn/') == 0) {
					var confirmAway = "confirmAway('" + a_url + "');return false;";
					//去除掉链接地址
					$(this).attr("href", "javascript:void(0);");
					$(this).attr("onclick", confirmAway);
				}
			}
		}
	});
};
