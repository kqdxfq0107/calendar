var week=['日','一','二','三','四','五','六'];
var d=new Date();
var curTime=document.getElementById("curTime");
var today=document.getElementById("today");
var timer1;
//实时获取时间及日期
timer1=setInterval(gettime,1000);
function gettime(){
	var d=new Date();
	var zeroHour=d.getHours()<10?'0':'';
	var zeroMinute=d.getMinutes()<10?'0':'';
	var zeroSecond=d.getSeconds()<10?'0':'';
	
	curTime.innerHTML=zeroHour+d.getHours()+':'+zeroMinute+d.getMinutes()+':'+zeroSecond+d.getSeconds();
	today.innerHTML=d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日'+' , '+'星期'+week[d.getDay()];
	getdays(year,month);		//??
}
gettime();


var year=d.getFullYear();
var month=d.getMonth();
var zeroMonth=month<10?'0':'';
var thisMonth=document.getElementById("thisMonth");
thisMonth.innerHTML=year+'年'+zeroMonth+(month+1)+'月';


var prev=document.getElementById("prev");
var cur=document.getElementById("cur");
var next=document.getElementById("next");

//本月有几天
function getTotalDay(year,month){
	return new Date(year,month,0).getDate();
}
//本月第一天是星期几
function getFirst(year,month){
	return new Date(year,month-1,1).getDay()
}
//获取该月日期（42个）
function getdays(y,m){
	var daysStr='';
	var n=1;
	
	var totalDay=getTotalDay(y,m+1);	//该月天数
	var firstDay=getFirst(y,m+1);		//该月第一天星期几
	var getLastEnd=getTotalDay(y,m);	//上月天数
	firstDay=firstDay==0?7:firstDay;

	for(i=1;i<=42;i++){
		if(i<=firstDay){
			daysStr='<span style="color:#8fabe3">'+getLastEnd+'</span>'+daysStr;
			getLastEnd--;
		}else if(i>firstDay+totalDay){
			daysStr+='<span style="color:#8fabe3">'+n+'</span>';
			n++;
		}else{
			var todayClass=(i-firstDay)==d.getDate()&m==d.getMonth()?'active':''
			daysStr+='<span class='+todayClass+'>'+(i-firstDay)+'</span>';
		}
	}
	return daysStr;
}


var up=document.getElementById("up");
var down=document.getElementById("down");
var days=document.getElementById("days");
function refreshDays(){
		//运动完更新days内容
		prev.innerHTML=getdays(year,month-1);
		cur.innerHTML=getdays(year,month);
		next.innerHTML=getdays(year,month+1)
}
refreshDays();
up.onclick=function(){
	month--;
	if(month<0){
		month=11;
		year--;
	}
	move(days,{top:0},600,'linear',function(){
		refreshDays();
		//将days拉回原位置
		days.style.top='-240px';
	});
	zeroMonth=month<9?'0':'';
	thisMonth.innerHTML=year+'年'+zeroMonth+(month+1)+'月';
}
down.onclick=function(){
	month++;
	if(month>11){
		month=0;
		year++;
	}
	move(days,{top:-480},600,'linear',function(){
		refreshDays();
		//将days拉回原位置
		days.style.top='-240px';
	});
	zeroMonth=month<9?'0':'';
	thisMonth.innerHTML=year+'年'+zeroMonth+(month+1)+'月';
}