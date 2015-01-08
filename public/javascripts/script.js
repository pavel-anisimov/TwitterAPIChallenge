(function(){
	'use strict';

	$.prototype.getTweets = function(obj){

		var $this = $(this),
			posting;

		$this.html('');

		posting = $.post( "./api", {
			screen_name: obj.accounts[obj.index],
			count: obj.tweets
		});

		posting.success(function( res, req ) {

			res.forEach(function(jsonTweet){
				var $div = '<div class="tweet" data-name="' + jsonTweet.name + '" data-id="' + jsonTweet.id + '">'
					+ '<div class="head"><div class="icon" style="background-image: url( ' + jsonTweet.icon + ')"></div>'
					+ '<div class="retweeted"><span>' + jsonTweet.retweeted + '</span></div>'
					+ '<div class="name"><span>' + jsonTweet.name + '</span></div><div class="screen_name">'
					+ '<span>@' + jsonTweet.screen_name + '</span><span> • ' + dateFormat(jsonTweet.created_at)
					+ '</span></div></div><div class="body"><div class="message">' + jsonTweet.text + '</div></div></div>';

				$this.append($.parseHTML( $div ));

			});

		}).fail(function() {

			$this.append($.parseHTML( '<p>Failed to load tweets from @' + obj.accounts[obj.index] + '</p>' ));
			console.log('Request failed.');
		}).always(function(res) {
			console.log('Request completed');
		});
	};

	function dateFormat(date){
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			date = new Date(date);

		return  months[date.getMonth() - 1] + ' ' + date.getDate();
	}

})();

$(function(){
	'use strict';

	var defaultVal = {
			accounts: ['appdirect', 'laughingsquid', 'techcrunch'],
			tweets: 30
		},
		objValues = {
			tweets: $.jStorage.get('tweets', defaultVal.tweets),
			accounts: $.jStorage.get('accounts', defaultVal.accounts)
		},
		$tweetBlock = $('.tweetBlock'),
		$panelButtons = $('.panel, .buttons');

	function PopulateTweets() {
		if ($tweetBlock !== undefined) {

			$('.tweetBlock').each(function(index) {
				objValues.index = index;
				$(this).attr('id', objValues.accounts[index]).getTweets(objValues);
			});
		}
	}

	$('#tweetsNum').val(objValues.tweets);

	$('.accounts').each(function(index, val){
		if(objValues.accounts[index] !== undefined)
			$(val).val(objValues.accounts[index]);
	});

	PopulateTweets();

	$('.down').on('click', function(){
		var $this     = $(this),
			$item     = $this.parents('.row'),
			$bigItem  = $('#' + $this.siblings('input').val()),
			$swapWith = $item.next(),
			$swapBig  = $bigItem.next();

		$item.before($swapWith.detach());
		$bigItem.before($swapBig.detach());

	});

	$('.up').on('click', function(){
		var $this     = $(this),
			$item     = $this.parents('.row'),
			$bigItem  = $('#' + $this.siblings('input').val()),
			$swapWith = $item.prev(),
			$swapBig  = $bigItem.prev();

		$item.after($swapWith.detach());
		$bigItem.after($swapBig.detach());
	});

	$('#edit').on('click', function(){
		$panelButtons.slideToggle();
	});

	$('#done').on('click', function(){

		objValues.tweets = $('#tweetsNum').val();
		$.jStorage.set('tweets', objValues.tweets);

		objValues.accounts = $(".accounts").map(function(){return $(this).val();}).get();
		$.jStorage.set('accounts', objValues.accounts);

		PopulateTweets();

		$panelButtons.slideToggle();
	});

	$tweetBlock.delegate('.tweet', 'click', function(){
		var id   = $(this).data('id'),
			name = $(this).data('name');
		window.location.href = 'https://twitter.com/' + name + '/status/' + id;
	});


});