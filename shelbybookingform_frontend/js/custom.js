
var $selected_day;
var $selected_monday;

var $date_selector_array = new Array();
$date_selector_array[0] = '.day-monday';
$date_selector_array[1] = '.day-tuesday';
$date_selector_array[2] = '.day-wednesday';
$date_selector_array[3] = '.day-thursday';
$date_selector_array[4] = '.day-friday';
$date_selector_array[5] = '.day-saturday';
$date_selector_array[6] = '.day-sunday';

var $month_list = new Array();
$month_list[0] = 'JAN';
$month_list[1] = 'FEB';
$month_list[2] = 'MAR';
$month_list[3] = 'APR';
$month_list[4] = 'MAY';
$month_list[5] = 'JUN';
$month_list[6] = 'JUL';
$month_list[7] = 'AUG';
$month_list[8] = 'SEP';
$month_list[9] = 'OCT';
$month_list[10] = 'NOV';
$month_list[11] = 'DEC'; 


$(document).ready(function() {
    
	
	/*var calendarPicker2 = $(".date-container").calendarPicker({
		monthNames:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		//useWheel:true,
		//callbackDelay:500,
		years:1,
		months:1,
		days:7,
		callback:function(cal) {
		  $(".data-value").html("Selected date: " + cal.currentDate);

    }});  */
    function set_active_state() {
        $temp = new Date($selected_monday);
        
        for (x in $date_selector_array) {
            $('.datesofweek ' + $date_selector_array[x] + ' .daynumber-container').removeClass('active'); 
            
            if($temp.toDateString() == $selected_day.toDateString())
            {
                $('.datesofweek ' + $date_selector_array[x] + ' .daynumber-container').addClass('active');  
            }
        
            $temp.setDate($temp.getDate() + 1); 
        }
        
        $('.monthofdate').text($month_list[$selected_day.getMonth()]+' '+$selected_day.getFullYear());
        
        var dd = $selected_day.getDate();
        var mm = $selected_day.getMonth() + 1;
        var y = $selected_day.getFullYear();
        $('.selected-date').val(y + '-'+ mm + '-'+ dd);    
    }
    
    function set_datesofweek() {
        $temp = new Date($selected_monday);
        var dd = $selected_monday.getDate();
        
        for (x in $date_selector_array) {
            dd = $temp.getDate();
            $('.datesofweek ' + $date_selector_array[x] + ' .daynumber').text(dd); 
            $('.datesofweek ' + $date_selector_array[x] + ' .date-string').text($temp.toString()); 
            $temp.setDate($temp.getDate() + 1); 
        }
        
        set_active_state();
    }
    
    function init() {
        var $today = new Date();
        $selected_monday = new Date();
        $dayofweek = $today.getDay();
        $selected_monday.setDate($selected_monday.getDate() - $dayofweek + 1); 
        $selected_day = new Date();
        
        var dd = $selected_day.getDate();
        var mm = $selected_day.getMonth() + 1;
        var y = $selected_day.getFullYear();
        $('.selected-date').val(y + '-'+ mm + '-'+ dd);
        
        set_datesofweek();
        
        for (x in $date_selector_array) {
            $('.datesofweek ' + $date_selector_array[x] + ' .daynumber-container').click(function(){
                $date = $('.date-string', $(this)).text();
                $date = $date.trim();
                $selected_day = new Date($date);
                set_active_state();      
            }); 
        }
        $('.time-container .time-item:not(.disabled)').each(function() {
            if($(this).hasClass('active'))
            {
                $('.time-container .selected-time').val($('span', $(this)).text().trim());   
            }
                
        });
        
        
        $('.time-container .time-item:not(.disabled)').click(function() { 
            $('.time-container .selected-time').val($('span', $(this)).text().trim());
            
            $('.time-container .time-item:not(.disabled)').each(function() {
                $(this).removeClass('active');
            });
            
            $(this).addClass('active');
        });
    }
    
    $('.cal-right-arrow').click(function() {
        $selected_monday.setDate($selected_monday.getDate() + 7); 
        
        set_datesofweek();      
    });
    
    $('.cal-left-arrow').click(function() {
        $selected_monday.setDate($selected_monday.getDate() - 7); 
        
        set_datesofweek();     
    });
    
    init();
});