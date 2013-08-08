// JavaScript Document

$(document).ready(function () {
	readlist('spotlight');
	
	$('nav li a').click(function(){
		var id = $(this).attr('id');
		readlist(id);
	})
	

});

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
			output = output + '<div class="item"><a class="node-image" href="article.html?nid=' + value.nid + '">' + value.Image + '</a>';
			output = output + '<div class="node-title"><h1>' + value.node_title + '</h1></div>';
			output = output + '<div class="node-date">' + value.Date + '</div>';
			output = output + '<div class="node-teaser">' + value.teaser + '</div></div>';
			
		}); 
		
		output = output + '</div>';
		$('#content').html(output);
	  }
	});
}