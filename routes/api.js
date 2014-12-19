var express = require('express'),
	router = express.Router(),
	Twit = require('twit'),
	TwitAPI = new Twit({
		consumer_key:        'NiKlWXzjKW5yn8Qikr99z7CJr',
		consumer_secret:     'R2L7v09k1zn6gnCeJCWFwAhxVbKU1O9O8oqm2gBnT2i3hfRHQR',
		access_token:        '2935805221-OfCLCgzxci3BFU4qOMzrvQ913jkx0hUdXHEGHtn',
		access_token_secret: 'R4ykg8b27oHrJa9xTnWrJWzZG4TDnsfCj9U3dt9VfpTGT'
	});

router.post('/', function (req, res) {
	var arr = {};

	TwitAPI.get('statuses/user_timeline', {
			screen_name: req.body.screen_name,
			count: req.body.count
		},
	    function(err, data, response) {
		    if(!err) {

			    data.forEach(function (val, id, array) {
				    array[id] = {
					    id: val.id_str,
					    created_at: val.created_at,
					    text: val.text,
					    url: 'https://twitter.com/AppDirect/status/' + val.id_str,
					    name: val.retweeted_status === undefined ? val.user.name : val.retweeted_status.user.name,
					    screen_name: val.retweeted_status === undefined ? val.user.screen_name : val.retweeted_status.user.screen_name,
					    retweeted: val.retweeted_status === undefined ? ' ' : '@' + val.user.screen_name + ' retweeted:',
					    icon: val.retweeted_status === undefined ? val.user.profile_image_url : val.retweeted_status.user.profile_image_url
				    }
			    });
		    }
		    res.json(data);
	});
});

module.exports = router;
