(function(e){function n(e,t){return t*Math.floor(e/t)}function r(e,t,n,r){if(typeof e.strftime=="function"){return e.strftime(t)}var i=function(e,t){e=""+e;t=""+(t==null?"0":t);return e.length==1?t+e:e};var s=[];var o=false;var u=e.getHours();var a=u<12;if(n==null){n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}if(r==null){r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]}var f;if(u>12){f=u-12}else if(u==0){f=12}else{f=u}for(var l=0;l<t.length;++l){var c=t.charAt(l);if(o){switch(c){case"a":c=""+r[e.getDay()];break;case"b":c=""+n[e.getMonth()];break;case"d":c=i(e.getDate());break;case"e":c=i(e.getDate()," ");break;case"H":c=i(u);break;case"I":c=i(f);break;case"l":c=i(f," ");break;case"m":c=i(e.getMonth()+1);break;case"M":c=i(e.getMinutes());break;case"q":c=""+(Math.floor(e.getMonth()/3)+1);break;case"S":c=i(e.getSeconds());break;case"y":c=i(e.getFullYear()%100);break;case"Y":c=""+e.getFullYear();break;case"p":c=a?""+"am":""+"pm";break;case"P":c=a?""+"AM":""+"PM";break;case"w":c=""+e.getDay();break}s.push(c);o=false}else{if(c=="%"){o=true}else{s.push(c)}}}return s.join("")}function i(e){function t(e,t,n,r){e[t]=function(){return n[r].apply(n,arguments)}}var n={date:e};if(e.strftime!=undefined){t(n,"strftime",e,"strftime")}t(n,"getTime",e,"getTime");t(n,"setTime",e,"setTime");var r=["Date","Day","FullYear","Hours","Milliseconds","Minutes","Month","Seconds"];for(var i=0;i<r.length;i++){t(n,"get"+r[i],e,"getUTC"+r[i]);t(n,"set"+r[i],e,"setUTC"+r[i])}return n}function s(e,t){if(t.timezone=="browser"){return new Date(e)}else if(!t.timezone||t.timezone=="utc"){return i(new Date(e))}else if(typeof timezoneJS!="undefined"&&typeof timezoneJS.Date!="undefined"){var n=new timezoneJS.Date;n.setTimezone(t.timezone);n.setTime(e);return n}else{return i(new Date(e))}}function l(t){t.hooks.processDatapoints.push(function(t,i,u){e.each(t.getAxes(),function(e,t){var i=t.options;if(i.mode=="time"){t.tickGenerator=function(e){var t=[];var r=s(e.min,i);var u=0;var l=i.tickSize&&i.tickSize[1]==="quarter"||i.minTickSize&&i.minTickSize[1]==="quarter"?f:a;if(i.minTickSize!=null){if(typeof i.tickSize=="number"){u=i.tickSize}else{u=i.minTickSize[0]*o[i.minTickSize[1]]}}for(var c=0;c<l.length-1;++c){if(e.delta<(l[c][0]*o[l[c][1]]+l[c+1][0]*o[l[c+1][1]])/2&&l[c][0]*o[l[c][1]]>=u){break}}var h=l[c][0];var p=l[c][1];if(p=="year"){if(i.minTickSize!=null&&i.minTickSize[1]=="year"){h=Math.floor(i.minTickSize[0])}else{var d=Math.pow(10,Math.floor(Math.log(e.delta/o.year)/Math.LN10));var v=e.delta/o.year/d;if(v<1.5){h=1}else if(v<3){h=2}else if(v<7.5){h=5}else{h=10}h*=d}if(h<1){h=1}}e.tickSize=i.tickSize||[h,p];var m=e.tickSize[0];p=e.tickSize[1];var g=m*o[p];if(p=="second"){r.setSeconds(n(r.getSeconds(),m))}else if(p=="minute"){r.setMinutes(n(r.getMinutes(),m))}else if(p=="hour"){r.setHours(n(r.getHours(),m))}else if(p=="month"){r.setMonth(n(r.getMonth(),m))}else if(p=="quarter"){r.setMonth(3*n(r.getMonth()/3,m))}else if(p=="year"){r.setFullYear(n(r.getFullYear(),m))}r.setMilliseconds(0);if(g>=o.minute){r.setSeconds(0)}else if(g>=o.hour){r.setMinutes(0)}else if(g>=o.day){r.setHours(0)}else if(g>=o.day*4){r.setDate(1)}else if(g>=o.month*2){r.setMonth(n(r.getMonth(),3))}else if(g>=o.quarter*2){r.setMonth(n(r.getMonth(),6))}else if(g>=o.year){r.setMonth(0)}var y=0;var b=Number.NaN;var w;do{w=b;b=r.getTime();t.push(b);if(p=="month"||p=="quarter"){if(m<1){r.setDate(1);var E=r.getTime();r.setMonth(r.getMonth()+(p=="quarter"?3:1));var S=r.getTime();r.setTime(b+y*o.hour+(S-E)*m);y=r.getHours();r.setHours(0)}else{r.setMonth(r.getMonth()+m*(p=="quarter"?3:1))}}else if(p=="year"){r.setFullYear(r.getFullYear()+m)}else{r.setTime(b+g)}}while(b<e.max&&b!=w);return t};t.tickFormatter=function(e,t){var n=s(e,t.options);if(i.timeformat!=null){return r(n,i.timeformat,i.monthNames,i.dayNames)}var u=t.options.tickSize&&t.options.tickSize[1]=="quarter"||t.options.minTickSize&&t.options.minTickSize[1]=="quarter";var a=t.tickSize[0]*o[t.tickSize[1]];var f=t.max-t.min;var l=i.twelveHourClock?" %p":"";var c=i.twelveHourClock?"%I":"%H";var h;if(a<o.minute){h=c+":%M:%S"+l}else if(a<o.day){if(f<2*o.day){h=c+":%M"+l}else{h="%b %d "+c+":%M"+l}}else if(a<o.month){h="%b %d"}else if(u&&a<o.quarter||!u&&a<o.year){if(f<o.year){h="%b"}else{h="%b %Y"}}else if(u&&a<o.year){if(f<o.year){h="Q%q"}else{h="Q%q %Y"}}else{h="%Y"}var p=r(n,h,i.monthNames,i.dayNames);return p}}})})}var t={};var o={second:1e3,minute:60*1e3,hour:60*60*1e3,day:24*60*60*1e3,month:30*24*60*60*1e3,quarter:3*30*24*60*60*1e3,year:365.2425*24*60*60*1e3};var u=[[1,"second"],[2,"second"],[5,"second"],[10,"second"],[30,"second"],[1,"minute"],[2,"minute"],[5,"minute"],[10,"minute"],[30,"minute"],[1,"hour"],[2,"hour"],[4,"hour"],[8,"hour"],[12,"hour"],[1,"day"],[2,"day"],[3,"day"],[.25,"month"],[.5,"month"],[1,"month"],[2,"month"]];var a=u.concat([[3,"month"],[6,"month"],[1,"year"]]);var f=u.concat([[1,"quarter"],[2,"quarter"],[1,"year"]]);e.plot.plugins.push({init:l,options:t,name:"time",version:"1.0"});e.plot.formatDate=r})(jQuery)