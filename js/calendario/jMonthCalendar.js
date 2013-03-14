

(function($) {
 var ids = {
 container: "#jMonthCalendar",
 head: "#CalendarHead",
 body: "#CalendarBody"
 };
 var _selectedDate;
 var _beginDate;
 var _endDate;
 var calendarEvents;
 var _oDiasBloqueados;
 var defaults = {
 height: 650,
 width: 980,
 navHeight: 25,
 labelHeight: 25,
 firstDayOfWeek: 0,
 calendarStartDate:new Date(),
 dragableEvents: false,
 activeDroppableClass: false,
 hoverDroppableClass: false,
 navLinks: {
 enableToday: true,
 enableNextYear: true,
 enablePrevYear: true,
 p:'&lsaquo; Prev',
 n:'Next &rsaquo;',
 t:'Today'
 },
 onMonthChanging: function(dateIn) { return true; },
 onMonthChanged: function(dateIn) { return true; },
 onEventLinkClick: function(event) { return true; },
 onEventBlockClick: function(event) { return true; },
 onEventBlockOver: function(event) { return true; },
 onEventBlockOut: function(event) { return true; },
 onDayLinkClick: function(date) { return true; },
 onDayCellClick: function(date) { return true; },
 onDayCellDblClick: function(dateIn) { return true; },
 onEventDropped: function(event, newDate) { return true; },
 locale: {
 days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
 daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
 daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
 months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
 monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
 weekMin: 'wk'
 }
 };
 
 var getDateFromId = function(dateIdString) {
 //c_01012009
 return new Date(dateIdString.substring(6, 10), dateIdString.substring(2, 4)-1, dateIdString.substring(4, 6));
 };
 var getDateId = function(date) {
 var month = ((date.getMonth()+1)<10) ? "0" + (date.getMonth()+1) : (date.getMonth()+1);
 var day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
 return "c_" + month + day + date.getFullYear();
 };
 var GetJSONDate = function(jsonDateString) {
 //check conditions for different types of accepted dates
 var tDt, k;
 if (typeof jsonDateString == "string") {
 
 //  "2008-12-28T00:00:00.0000000"
 var isoRegPlus = /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2}).([0-9]{7})$/;
 
 //  "2008-12-28T00:00:00"
 var isoReg = /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
 
 //"2008-12-28"
 var yyyyMMdd = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
 
 //  "new Date(2009, 1, 1)"
 //  "new Date(1230444000000)
 var newReg = /^new/;
 
 //  "\/Date(1234418400000-0600)\/"
 var stdReg = /^\\\/Date\(([0-9]{13})-([0-9]{4})\)\\\/$/;
 
 if (k = jsonDateString.match(isoRegPlus)) {
 return new Date(k[1],k[2]-1,k[3]);
 } else if (k = jsonDateString.match(isoReg)) {
 return new Date(k[1],k[2]-1,k[3]);
 } else if (k = jsonDateString.match(yyyyMMdd)) {
 return new Date(k[1],k[2]-1,k[3]);
 }
 
 if (k = jsonDateString.match(stdReg)) {
 return new Date(k[1]);
 }
 
 if (k = jsonDateString.match(newReg)) {
 return eval('(' + jsonDateString + ')');
 }
 
 return tdt;
 }
 };
 jQuery.jMonthCalendar = jQuery.J = function() {};
 
 
 
 jQuery.J.DrawCalendar = function(dateIn){
 var today = defaults.calendarStartDate;
 var d;
 
 if(dateIn == undefined) {
 //start from this month
 d = new Date(today.getFullYear(), today.getMonth(), 1);
 } else {
 //start from the passed in date
 d = dateIn;
 d.setDate(1);
 }
 
 
 // Create Previous Month link for later
 var prevMonth = d.getMonth() == 0 ? new Date(d.getFullYear()-1, 11, 1) : new Date(d.getFullYear(), d.getMonth()-1, 1);
 var prevMLink = jQuery('<div class="MonthNavPrev"><a href="" class="link-prev">'+ defaults.navLinks.p +'</a></div>').click(function() {
                                                                                                                            jQuery.J.ChangeMonth(prevMonth);
                                                                                                                            return false;
                                                                                                                            });
 
 //Create Next Month link for later
 var nextMonth = d.getMonth() == 11 ? new Date(d.getFullYear()+1, 0, 1) : new Date(d.getFullYear(), d.getMonth()+1, 1);
 var nextMLink = jQuery('<div class="MonthNavNext"><a href="" class="link-next">'+ defaults.navLinks.n +'</a></div>').click(function() {
                                                                                                                            jQuery.J.ChangeMonth(nextMonth);
                                                                                                                            return false;
                                                                                                                            });
 
 
 
 
 //Build up the Header first,  Navigation
 var navRow = jQuery('<tr><td colspan="7"><div class="FormHeader MonthNavigation"></div></td></tr>').css({ "height" : defaults.navHeight });
 var monthNavHead = jQuery('.MonthNavigation', navRow);
 
 monthNavHead.append(prevMLink, nextMLink);
 
 
 monthNavHead.append(jQuery('<div class="MonthName"></div>').append(defaults.locale.months[d.getMonth()] + " " + d.getFullYear()));
 
 
 
 
 //  Days
 var headRow = jQuery("<tr></tr>").css({
                                       "height" : defaults.labelHeight
                                       });
 
 for (var i=defaults.firstDayOfWeek; i<defaults.firstDayOfWeek+7; i++) {
 var weekday = i%7;
 var wordday = defaults.locale.days[weekday];
 headRow.append('<th title="' + wordday + '" class="DateHeader' + (weekday == 0 || weekday == 6 ? ' ' : '') + '"><span>' + wordday + '</span></th>');
 }
 
 headRow = jQuery("<thead id=\"CalendarHead\"></thead>").append(headRow);
 headRow = headRow.prepend(navRow);
 
 
 //Build up the Body
 var tBody = jQuery('<tbody id="CalendarBody"></tbody>');
 var isCurrentMonth = (d.getMonth() == today.getMonth() && d.getFullYear() == today.getFullYear());
 var maxDays = Date.getDaysInMonth(d.getFullYear(), d.getMonth());
 
 
 //what is the currect day #
 var curDay = defaults.firstDayOfWeek - d.getDay();
 if (curDay > 0) curDay -= 7
 //alert(curDay);
 
 var t = (maxDays + Math.abs(curDay));
 
 _beginDate = new Date(d.getFullYear(), d.getMonth(), curDay+1);
 _endDate = new Date(d.getFullYear(), d.getMonth()+1, (7-(t %= 7)) == 7 ? 0 : (7-(t %= 7)));
 var _currentDate = new Date(_beginDate.getFullYear(), _beginDate.getMonth(), _beginDate.getDate());
 
 
 // Render calendar
 //<td class=\"DateBox\"><div class=\"DateLabel\"><a href=\"#\">" + val + "</a></div></td>";
 var rowCount = 0;
 var rowHeight = (defaults.height - defaults.labelHeight - defaults.navHeight) / Math.ceil((maxDays + Math.abs(curDay)) / 7);
 //alert("rowHeight=" + rowHeight);
 
 do {
 var thisRow = jQuery("<tr></tr>");
 thisRow.css({
             "height" : rowHeight + "px"
             });
 
 for (var i=0; i<7; i++) {
 var weekday = (defaults.firstDayOfWeek + i) % 7;
 var atts = {'class':"DateBox" + (weekday == 0 || weekday == 6 ? '  ' : ''),
 'date':_currentDate.toString("M/d/yyyy"),
 'id': getDateId(_currentDate)
 };
 
 
 //DateBox Events
 var dateLink = jQuery('<div class="DateLabel">' + _currentDate.getDate() +'</div>').click(function(e) {
                                                                                           defaults.onDayLinkClick(new Date($(this).parent().attr("date")));
                                                                                           e.stopPropagation();
                                                                                           });
 
 var dateBox = jQuery("<td></td>").attr(atts).append(dateLink).dblclick(function(e) {
                                                                        defaults.onDayCellDblClick(new Date($(this).attr("date")));
                                                                        e.stopPropagation();
                                                                        }).click(function(e) {
                                                                                 defaults.onDayCellClick(new Date($(this).attr("date")));
                                                                                 e.stopPropagation();
                                                                                 });
 
 if (defaults.dragableEvents) {
 dateBox.droppable({
                   hoverClass: defaults.hoverDroppableClass,
                   activeClass: defaults.activeDroppableClass,
                   drop: function(e, ui) {
                   ui.draggable.attr("style", "position: relative; display: block;");
                   $(this).append(ui.draggable);
                   var event;
                   $.each(calendarEvents, function() {
                          if (this.EventID == ui.draggable.attr("id")) {
                          event = this;
                          }
                          });
                   defaults.onEventDropped(event, $(this).attr("date"));
                   return false;
                   }
                   });
 }
 
 thisRow.append(dateBox);
 
 curDay++;
 _currentDate.addDays(1);
 }
 
 rowCount++;
 tBody.append(thisRow);
 } while (curDay < maxDays);
 
 
 var a = jQuery(ids.container).css({ "width" : defaults.width + "px", "height" : defaults.height + "px" });
 var cal = jQuery('<table class="MonthlyCalendar" cellpadding="0" tablespacing="0"></table>').append(headRow, tBody);
 
 a.hide();
 a.html(cal);
 a.fadeIn("normal");
 
 
 }
 
 var DrawEventsOnCalendar = function() {
 
 }
 
 var ClearEventsOnCalendar = function() {
 
 }
 
 jQuery.J.ChangeMonth = function(dateIn) {
 defaults.onMonthChanging(dateIn);
 jQuery.J.DrawCalendar(dateIn);
 defaults.onMonthChanged(dateIn);
 
 for(iDia=0;iDia<_oDiasBloqueados.length;iDia++){
 $("#c_"+_oDiasBloqueados[iDia]).addClass("ko");
 $("#c_"+_oDiasBloqueados[iDia]+ " .DateLabel").addClass("ko");
 }
 
 }
 
 jQuery.J.Initialize = function(options, events, oDiasBloqueados) {
 
 _oDiasBloqueados = oDiasBloqueados;
 
 var today = new Date();
 
 options = jQuery.extend(defaults, options);
 
 jQuery.J.DrawCalendar();
 

 
 for(iDia=0;iDia<_oDiasBloqueados.length;iDia++){
 $("#c_"+_oDiasBloqueados[iDia]).addClass("ko");
 $("#c_"+_oDiasBloqueados[iDia]+ " .DateLabel").addClass("ko");
 }
 
 };
 })(jQuery);

Date.CultureInfo = {
name: "en-US",
englishName: "English (United States)",
nativeName: "English (United States)",
dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"],
monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
amDesignator: "AM",
pmDesignator: "PM",
firstDayOfWeek: 0,
twoDigitYearMax: 2029,
dateElementOrder: "mdy",
formatPatterns: {
shortDate: "M/d/yyyy",
longDate: "dddd, MMMM dd, yyyy",
shortTime: "h:mm tt",
longTime: "h:mm:ss tt",
fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt",
sortableDateTime: "yyyy-MM-ddTHH:mm:ss",
universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ",
rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT",
monthDay: "MMMM dd",
yearMonth: "MMMM, yyyy"
},
regexPatterns: {
jan: /^jan(uary)?/i,
feb: /^feb(ruary)?/i,
mar: /^mar(ch)?/i,
apr: /^apr(il)?/i,
may: /^may/i,
jun: /^jun(e)?/i,
jul: /^jul(y)?/i,
aug: /^aug(ust)?/i,
sep: /^sep(t(ember)?)?/i,
oct: /^oct(ober)?/i,
nov: /^nov(ember)?/i,
dec: /^dec(ember)?/i,
sun: /^su(n(day)?)?/i,
mon: /^mo(n(day)?)?/i,
tue: /^tu(e(s(day)?)?)?/i,
wed: /^we(d(nesday)?)?/i,
thu: /^th(u(r(s(day)?)?)?)?/i,
fri: /^fr(i(day)?)?/i,
sat: /^sa(t(urday)?)?/i,
future: /^next/i,
past: /^last|past|prev(ious)?/i,
add: /^(\+|after|from)/i,
subtract: /^(\-|before|ago)/i,
yesterday: /^yesterday/i,
today: /^t(oday)?/i,
tomorrow: /^tomorrow/i,
now: /^n(ow)?/i,
millisecond: /^ms|milli(second)?s?/i,
second: /^sec(ond)?s?/i,
minute: /^min(ute)?s?/i,
hour: /^h(ou)?rs?/i,
week: /^w(ee)?k/i,
month: /^m(o(nth)?s?)?/i,
day: /^d(ays?)?/i,
year: /^y((ea)?rs?)?/i,
shortMeridian: /^(a|p)/i,
longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i,
timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt)/i,
ordinalSuffix: /^\s*(st|nd|rd|th)/i,
timeContext: /^\s*(\:|a|p)/i
},
abbreviatedTimeZoneStandard: {
GMT: "-000",
EST: "-0400",
CST: "-0500",
MST: "-0600",
PST: "-0700"
},
abbreviatedTimeZoneDST: {
GMT: "-000",
EDT: "-0500",
CDT: "-0600",
MDT: "-0700",
PDT: "-0800"
}
};
Date.getMonthNumberFromName = function (name) {
    var n = Date.CultureInfo.monthNames,
    m = Date.CultureInfo.abbreviatedMonthNames,
    s = name.toLowerCase();
    for (var i = 0; i < n.length; i++) {
        if (n[i].toLowerCase() == s || m[i].toLowerCase() == s) {
            return i;
        }
    }
    return -1;
};
Date.getDayNumberFromName = function (name) {
    var n = Date.CultureInfo.dayNames,
    m = Date.CultureInfo.abbreviatedDayNames,
    o = Date.CultureInfo.shortestDayNames,
    s = name.toLowerCase();
    for (var i = 0; i < n.length; i++) {
        if (n[i].toLowerCase() == s || m[i].toLowerCase() == s) {
            return i;
        }
    }
    return -1;
};
Date.isLeapYear = function (year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};
Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};
Date.getTimezoneOffset = function (s, dst) {
    return (dst || false) ? Date.CultureInfo.abbreviatedTimeZoneDST[s.toUpperCase()] : Date.CultureInfo.abbreviatedTimeZoneStandard[s.toUpperCase()];
};
Date.getTimezoneAbbreviation = function (offset, dst) {
    var n = (dst || false) ? Date.CultureInfo.abbreviatedTimeZoneDST : Date.CultureInfo.abbreviatedTimeZoneStandard,
    p;
    for (p in n) {
        if (n[p] === offset) {
            return p;
        }
    }
    return null;
};
Date.prototype.clone = function () {
    return new Date(this.getTime());
};
Date.prototype.compareTo = function (date) {
    if (isNaN(this)) {
        throw new Error(this);
    }
    if (date instanceof Date && !isNaN(date)) {
        return (this > date) ? 1 : (this < date) ? -1 : 0;
    } else {
        throw new TypeError(date);
    }
};
Date.prototype.equals = function (date) {
    return (this.compareTo(date) === 0);
};
Date.prototype.between = function (start, end) {
    var t = this.getTime();
    return t >= start.getTime() && t <= end.getTime();
};
Date.prototype.addMilliseconds = function (value) {
    this.setMilliseconds(this.getMilliseconds() + value);
    return this;
};
Date.prototype.addSeconds = function (value) {
    return this.addMilliseconds(value * 1000);
};
Date.prototype.addMinutes = function (value) {
    return this.addMilliseconds(value * 60000);
};
Date.prototype.addHours = function (value) {
    return this.addMilliseconds(value * 3600000);
};
Date.prototype.addDays = function (value) {
    return this.addMilliseconds(value * 86400000);
};
Date.prototype.addWeeks = function (value) {
    return this.addMilliseconds(value * 604800000);
};
Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};
Date.prototype.addYears = function (value) {
    return this.addMonths(value * 12);
};
Date.prototype.add = function (config) {
    if (typeof config == "number") {
        this._orient = config;
        return this;
    }
    var x = config;
    if (x.millisecond || x.milliseconds) {
        this.addMilliseconds(x.millisecond || x.milliseconds);
    }
    if (x.second || x.seconds) {
        this.addSeconds(x.second || x.seconds);
    }
    if (x.minute || x.minutes) {
        this.addMinutes(x.minute || x.minutes);
    }
    if (x.hour || x.hours) {
        this.addHours(x.hour || x.hours);
    }
    if (x.month || x.months) {
        this.addMonths(x.month || x.months);
    }
    if (x.year || x.years) {
        this.addYears(x.year || x.years);
    }
    if (x.day || x.days) {
        this.addDays(x.day || x.days);
    }
    return this;
};
Date._validate = function (value, min, max, name) {
    if (typeof value != "number") {
        throw new TypeError(value + " is not a Number.");
    } else if (value < min || value > max) {
        throw new RangeError(value + " is not a valid value for " + name + ".");
    }
    return true;
};
Date.validateMillisecond = function (n) {
    return Date._validate(n, 0, 999, "milliseconds");
};
Date.validateSecond = function (n) {
    return Date._validate(n, 0, 59, "seconds");
};
Date.validateMinute = function (n) {
    return Date._validate(n, 0, 59, "minutes");
};
Date.validateHour = function (n) {
    return Date._validate(n, 0, 23, "hours");
};
Date.validateDay = function (n, year, month) {
    return Date._validate(n, 1, Date.getDaysInMonth(year, month), "days");
};
Date.validateMonth = function (n) {
    return Date._validate(n, 0, 11, "months");
};
Date.validateYear = function (n) {
    return Date._validate(n, 1, 9999, "seconds");
};
Date.prototype.set = function (config) {
    var x = config;
    if (!x.millisecond && x.millisecond !== 0) {
        x.millisecond = -1;
    }
    if (!x.second && x.second !== 0) {
        x.second = -1;
    }
    if (!x.minute && x.minute !== 0) {
        x.minute = -1;
    }
    if (!x.hour && x.hour !== 0) {
        x.hour = -1;
    }
    if (!x.day && x.day !== 0) {
        x.day = -1;
    }
    if (!x.month && x.month !== 0) {
        x.month = -1;
    }
    if (!x.year && x.year !== 0) {
        x.year = -1;
    }
    if (x.millisecond != -1 && Date.validateMillisecond(x.millisecond)) {
        this.addMilliseconds(x.millisecond - this.getMilliseconds());
    }
    if (x.second != -1 && Date.validateSecond(x.second)) {
        this.addSeconds(x.second - this.getSeconds());
    }
    if (x.minute != -1 && Date.validateMinute(x.minute)) {
        this.addMinutes(x.minute - this.getMinutes());
    }
    if (x.hour != -1 && Date.validateHour(x.hour)) {
        this.addHours(x.hour - this.getHours());
    }
    if (x.month !== -1 && Date.validateMonth(x.month)) {
        this.addMonths(x.month - this.getMonth());
    }
    if (x.year != -1 && Date.validateYear(x.year)) {
        this.addYears(x.year - this.getFullYear());
    }
    if (x.day != -1 && Date.validateDay(x.day, this.getFullYear(), this.getMonth())) {
        this.addDays(x.day - this.getDate());
    }
    if (x.timezone) {
        this.setTimezone(x.timezone);
    }
    if (x.timezoneOffset) {
        this.setTimezoneOffset(x.timezoneOffset);
    }
    return this;
};
Date.prototype.clearTime = function () {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);
    return this;
};
Date.prototype.isLeapYear = function () {
    var y = this.getFullYear();
    return (((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0));
};
Date.prototype.isWeekday = function () {
    return !(this.is().sat() || this.is().sun());
};
Date.prototype.getDaysInMonth = function () {
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};
Date.prototype.moveToFirstDayOfMonth = function () {
    return this.set({
                    day: 1
                    });
};
Date.prototype.moveToLastDayOfMonth = function () {
    return this.set({
                    day: this.getDaysInMonth()
                    });
};
Date.prototype.moveToDayOfWeek = function (day, orient) {
    var diff = (day - this.getDay() + 7 * (orient || +1)) % 7;
    return this.addDays((diff === 0) ? diff += 7 * (orient || +1) : diff);
};
Date.prototype.moveToMonth = function (month, orient) {
    var diff = (month - this.getMonth() + 12 * (orient || +1)) % 12;
    return this.addMonths((diff === 0) ? diff += 12 * (orient || +1) : diff);
};
Date.prototype.getDayOfYear = function () {
    return Math.floor((this - new Date(this.getFullYear(), 0, 1)) / 86400000);
};
Date.prototype.getWeekOfYear = function (firstDayOfWeek) {
    var y = this.getFullYear(),
    m = this.getMonth(),
    d = this.getDate();
    var dow = firstDayOfWeek || Date.CultureInfo.firstDayOfWeek;
    var offset = 7 + 1 - new Date(y, 0, 1).getDay();
    if (offset == 8) {
        offset = 1;
    }
    var daynum = ((Date.UTC(y, m, d, 0, 0, 0) - Date.UTC(y, 0, 1, 0, 0, 0)) / 86400000) + 1;
    var w = Math.floor((daynum - offset + 7) / 7);
    if (w === dow) {
        y--;
        var prevOffset = 7 + 1 - new Date(y, 0, 1).getDay();
        if (prevOffset == 2 || prevOffset == 8) {
            w = 53;
        } else {
            w = 52;
        }
    }
    return w;
};
Date.prototype.isDST = function () {
    console.log('isDST');
    return this.toString().match(/(E|C|M|P)(S|D)T/)[2] == "D";
};
Date.prototype.getTimezone = function () {
    return Date.getTimezoneAbbreviation(this.getUTCOffset, this.isDST());
};
Date.prototype.setTimezoneOffset = function (s) {
    var here = this.getTimezoneOffset(),
    there = Number(s) * -6 / 10;
    this.addMinutes(there - here);
    return this;
};
Date.prototype.setTimezone = function (s) {
    return this.setTimezoneOffset(Date.getTimezoneOffset(s));
};
Date.prototype.getUTCOffset = function () {
    var n = this.getTimezoneOffset() * -10 / 6,
    r;
    if (n < 0) {
        r = (n - 10000).toString();
        return r[0] + r.substr(2);
    } else {
        r = (n + 10000).toString();
        return "+" + r.substr(1);
    }
};
Date.prototype.getDayName = function (abbrev) {
    return abbrev ? Date.CultureInfo.abbreviatedDayNames[this.getDay()] : Date.CultureInfo.dayNames[this.getDay()];
};
Date.prototype.getMonthName = function (abbrev) {
    return abbrev ? Date.CultureInfo.abbreviatedMonthNames[this.getMonth()] : Date.CultureInfo.monthNames[this.getMonth()];
};
Date.prototype._toString = Date.prototype.toString;
Date.prototype.toString = function (format) {
    var self = this;
    var p = function p(s) {
        return (s.toString().length == 1) ? "0" + s : s;
    };
    return format ? format.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g, function (format) {
                                   switch (format) {
                                   case "hh":
                                   return p(self.getHours() < 13 ? self.getHours() : (self.getHours() - 12));
                                   case "h":
                                   return self.getHours() < 13 ? self.getHours() : (self.getHours() - 12);
                                   case "HH":
                                   return p(self.getHours());
                                   case "H":
                                   return self.getHours();
                                   case "mm":
                                   return p(self.getMinutes());
                                   case "m":
                                   return self.getMinutes();
                                   case "ss":
                                   return p(self.getSeconds());
                                   case "s":
                                   return self.getSeconds();
                                   case "yyyy":
                                   return self.getFullYear();
                                   case "yy":
                                   return self.getFullYear().toString().substring(2, 4);
                                   case "dddd":
                                   return self.getDayName();
                                   case "ddd":
                                   return self.getDayName(true);
                                   case "dd":
                                   return p(self.getDate());
                                   case "d":
                                   return self.getDate().toString();
                                   case "MMMM":
                                   return self.getMonthName();
                                   case "MMM":
                                   return self.getMonthName(true);
                                   case "MM":
                                   return p((self.getMonth() + 1));
                                   case "M":
                                   return self.getMonth() + 1;
                                   case "t":
                                   return self.getHours() < 12 ? Date.CultureInfo.amDesignator.substring(0, 1) : Date.CultureInfo.pmDesignator.substring(0, 1);
                                   case "tt":
                                   return self.getHours() < 12 ? Date.CultureInfo.amDesignator : Date.CultureInfo.pmDesignator;
                                   case "zzz":
                                   case "zz":
                                   case "z":
                                   return "";
                                   }
                                   }) : this._toString(); 
};



