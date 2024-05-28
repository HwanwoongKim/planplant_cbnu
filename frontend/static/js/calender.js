'use strict'

function Calender(year, month, date) {
    this.monthlabel = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.weeklabel = ["Su","Mo","Tu","We","Th","Fr","Sa"];
    this.currentYear= year;
    this.currentMonth = month;
    this.yearInDisplay= year;
    this.monthInDisplay = month;
    this.dateInDisplay= date;
    this.daysInMonth = function (y,m) {
      return new Date(y, m, 0).getDate();
    };
    this.init = function(){
        var date = new Date();
        this.currentYear= date.getFullYear();
        this.currentMonth = date.getMonth();
        this.monthInDisplay = date.getMonth();
        this.yearInDisplay = date.getFullYear();
        this.dateInDisplay = date.getDate();
        this.getCalenderTable();
    };
    this.daysInMonth = function(year,month){
        return new Date(year, month + 1, 0).getDate();
    };
    this.previousMonth=function(){
        if(this.monthInDisplay>0)
        {
            this.monthInDisplay--;
        }
        else
        {
            this.yearInDisplay --;
            this.monthInDisplay = 11;
        }
        this.getCalenderTable();
    };
    this.nextMonth=function(){
        if(this.monthInDisplay<11)
        {
            this.monthInDisplay++;
        }
        else
        {
            this.yearInDisplay ++;
            this.monthInDisplay = 0;
        }
        this.getCalenderTable();
    };
    this.populateCalender=function(year, month)
    {
        console.log(year + "  " + this.monthlabel[month]);
        var day1 = new Date(year, month, 1).getDay();
        
        var totaldays = this.daysInMonth(year, month) + day1;
        var weeks = parseInt(totaldays/7) + ((totaldays%7)>0? 1:0);
        console.log(weeks);
        var dayoflast = this.daysInMonth(year, month-1);
        var data = [];
        for(var i=0;i<7*weeks;i++)
        {
            if(i<day1){
                data.push({day: dayoflast-day1+i+1, isCurrent: false});
            }
            else if(i>=totaldays){
                data.push({day: i-totaldays+1, isCurrent: false});
            }
            else{
                data.push({day: i-day1+1, isCurrent: true});
            }
        }
        
        return data;
    };
    this.getCalenderTable=function()
    {
        var data = this.populateCalender(this.yearInDisplay, this.monthInDisplay);
        
        var carlender = document.getElementById("cal-content");
        carlender.innerHTML=null;
        var table = document.createElement("table");

        var header = document.getElementById("caption");
        header.innerHTML = this.yearInDisplay+ "  "+this.monthlabel[this.monthInDisplay];

        
        //Header Row
        var hr = document.createElement('tr');
        hr.setAttribute("class","week");
        for(var i=0;i<7;i++)
        {
          var td = document.createElement('td');
          td.innerHTML = this.weeklabel[i];
            td.setAttribute("class","week");
          hr.appendChild(td);
        }
        table.appendChild(hr);
        
        //Data Rows
        var index = 0;
        for(var r = 0; r<data.length/7; r++){            
            var dr = document.createElement('tr');
            for(var i=0;i<7;i++)
            {
                var td = document.createElement('td');
                td.innerHTML = data[index].day;
                if(!data[index].isCurrent){
                    td.setAttribute("class","gray-text");
                } 
                if(data[index].isCurrent && data[index].day === this.dateInDisplay && this.monthInDisplay === this.currentMonth){
                    td.setAttribute("class","today");
                }
                dr.appendChild(td);
                index++;
            }
            table.appendChild(dr);
        }

        carlender.appendChild(table);
        console.log(table);
    };
}

var today = new Date();
var calender = new Calender(today.getYear(), today.getMonth(), today.getDate());

window.onload = function(){ calender.init(); };

var lastBtn = document.getElementById("last");
lastBtn.onclick = function(){
  calender.previousMonth();
};

var nextBtn = document.getElementById("next");
nextBtn.onclick = function(){ calender.nextMonth(); };
