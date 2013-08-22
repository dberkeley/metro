$(document).ready(function(){
	<!--------------------------------->
	list();
	var page=0;
	$('#more').click(function(){
		page++;
		var section=getURLParameters('id') 	
		if (section !=null){
			morelist(section+'?page='+page+1);
		}else{
			morelist('spotlight'+'?page='+page+1);		
		}
	})
	//end document load
	

	var $this = $( this ),
	theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
	msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
	textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
	textonly = !!$this.jqmData( "textonly" );
	html = $this.jqmData( "html" ) || "";
	
	$.mobile.loading( 'show', {
		text: msgText,
		textVisible: textVisible,
		theme: theme,
		textonly: textonly,
		html: html
	});

});
         
		


function list(){
   window.setTimeout(function() {
 		$.mobile.loading( 'hide');
	}, 1000);
	
	var id = getURLParameters('id');
	if (id !=null){
	readlist(id);
	}else{
		readlist('spotlight');		
	}	
}

function article(nid){
	$.mobile.changePage( "story.html?nid="+nid,  { reloadPage : true, transition: "slide", changeHash: true });
}



function share(){
	$('.social').toggle();
}

function loadarticle(nid){
readarticle(nid);
facebook(nid);
}

//displays current date on header
function showdate(){
		var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
	var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
	
	var newDate = new Date();
	newDate.setDate(newDate.getDate());    
	$('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + 	newDate.getFullYear());
}

//Gets varibles from urls by name
function getURLParameters(paramName) 
{
    var sURL = window.document.URL.toString();  
    if (sURL.indexOf("?") > 0)
    {
       var arrParams = sURL.split("?");         
       var arrURLParams = arrParams[1].split("&");      
       var arrParamNames = new Array(arrURLParams.length);
       var arrParamValues = new Array(arrURLParams.length);     
       var i = 0;
       for (i=0;i<arrURLParams.length;i++)
       {
        var sParam =  arrURLParams[i].split("=");
        arrParamNames[i] = sParam[0];
        if (sParam[1] != "")
            arrParamValues[i] = unescape(sParam[1]);
        else
            arrParamValues[i] = "No Value";
       }

       for (i=0;i<arrURLParams.length;i++)
       {
                if(arrParamNames[i] == paramName){
            //alert("Param:"+arrParamValues[i]);
                return arrParamValues[i];
             }
       }
       return "No Parameters Found";
    }
}


// display more articles
function morelist(cat){
	var feed = 'http://www.metro.co.tt/mobile/' + cat;
	var output = '<div>';
	$.ajax({
	  dataType: 'jsonp',
	  url: feed,
	  success: function (data) {
		$.each( data, function( key, value ) {
			//$('#result_table').html(data[0].node_title);
			//$('#result_table').append(value.node_title + '<br />');
			output = output + '<a class="item" onClick="article('+value.nid+')">';
			if (value.Image!=''){
			output = output + '<div class="node-image">' + value.Image + '</div>';}
			output = output + '<div class="node-title"><h1>' + value.node_title + '</h1></div>';
			output = output + '<div class="node-date">' + value.Date + '</div>';
			output = output + '<div class="node-teaser">' + value.teaser + '</div></a>';			
		}); 
		
		output = output + '</div>';
		$('#content .list #list').append(output);
	  }
	});
}

//Displays list for stories
function readlist(cat){
	var feed = 'http://www.metro.co.tt/mobile/' + cat;
	var output = '<div>';
	$.ajax({
	  dataType: 'jsonp',
	  url: feed,
	  success: function (data) {
		$.each( data, function( key, value ) {
			//$('#result_table').html(data[0].node_title);
			//$('#result_table').append(value.node_title + '<br />');
			
			output = output + '<a class="item" onClick="article('+value.nid+')">';
			//output = output + '<a class="item" onClick="article('+value.nid+')" data-transition="pop" rel="external"  href="story.html?nid='+value.nid +'" >';
			if (value.Image!=''){
			output = output + '<div class="node-image">' + value.Image + '</div>';}
			output = output + '<div class="node-title"><h1>' + value.node_title + '</h1></div>';
			output = output + '<div class="node-date">' + value.Date + '</div>';
			output = output + '<div class="node-teaser">' + value.teaser + '</div></a>';			
		}); 
		
		output = output + '</div>';
		$('#content .list #list').html(output);
	  }
	});
}

///Place social shares for articles
function facebook(nid){
		var feed = 'http://www.metro.co.tt/mobile/nodes/' + nid;
	$.ajax({
	  dataType: 'jsonp',
	  url: feed,
	  success: function (data) {
		  
		get_short_url(data.path, function(short_url) {
			
			var sharebuttons='<a  class=" back ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c" data-theme="c" data-rel="back" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-rel="back"><span class="ui-btn-inner"><span class="ui-btn-text"> Back </span></span></a><a onclick="share();" class=" share ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c" data-theme="c" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span"><span class="ui-btn-inner"><span class="ui-btn-text"> Share </span></span></a>';
			sharebuttons= sharebuttons + '<div class="social" ><a onclick="share();" class="facebook_share" href="https://www.facebook.com/sharer/sharer.php?u='+short_url+ '" target="_blank"></a>';
			sharebuttons= sharebuttons + '<a onclick="share();" class="google_share" href="https://plus.google.com/share?text=test&url='+short_url+ '" target="_blank"></a>';
			sharebuttons= sharebuttons + '<a onclick="share();" class="tweet_share" href="http://twitter.com/intent/tweet?text='+data.title+'&url='+short_url+ '" target="_blank"></a>';
			sharebuttons= sharebuttons + '<a onclick="share();" class="email_share" href="Mailto:?subject='+data.title+'&body=Read this article '+data.title+', by clicking on the link '+short_url+' %0A Message sent using the Metro Mobile App."></a></div>';		
		
		$('#content #sharebar').html(sharebuttons).delay(2800);;
		});
		}
	});
}


//Displays content for articles
function readarticle(nid){
	var feed = 'http://www.metro.co.tt/mobile/article?nid=' + nid;
	var output = '<div id="article">';
	$.ajax({
	  dataType: 'jsonp',
	  url: feed,
	  success: function (data) {
			$.each( data, function( key, value ) {
			output = output + '<div id="media"><div class="node-image">' + value.image + '</div>';
			output = output + '<div class="node-image-caption">' + value.caption + '</div></div>';
			output = output + '<div class="node-title"><h1>' + value.node_title + '</h1></div>';
			output = output + '<div class="node-author"><h4>' + value.author + '</h4></div>';
			output = output + '<div class="node-date"><h4>' + value.date + '</h4></div>';
			output = output + '<div class="node-body">'+ value.body + '</div>';	
			
			var feed = 'http://www.metro.co.tt/mobile/nodes/' + value.nid;
			$.ajax({
			  dataType: 'jsonp',
			  url: feed,
			  success: function (data) {
				  
				loadComments("metromag", data.path, value.node_title, value.nid);
					
			  }
			});
			
		}); 
		output = output + '</div>';
		$('#content .article .story').html(output);
	  }
	});	
}

//get short urls
function get_short_url(long_url, func)
{
    $.getJSON(
        "http://api.bitly.com/v3/shorten?callback=?", 
        { 
            "format": "json",
            "apiKey": 'R_5f8edd82014924213d42bb9567dbb823',
            "login": 'guardiantt',
            "longUrl": long_url
        },
        function(response)
        {
            func(response.data.url);
        }
    );
}

<!----------------------------------->
function loadComments(shortname, url, title, identifier) {

disqus_url = url;
disqus_title = title;
disqus_shortname = shortname;
disqus_identifier = identifier;

(function() {
var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = false;
dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();

}