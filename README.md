A Little Twitter Page

We at AppDirect are interested in making a front-end with standards-compliant, asyncronous, api-driven, beautious javascript. Your task is to do just that with Twitter's REST api.

Please complete anynumber of the steps below within 5 daysof us sending you this document. You may put in as many hours as you wish, but we recommend a maximum of around 5 hours. Use any framework and languages you would like (evidence of native JavaScript use encouraged) to complete the task. We will accept an email attachment of files, a link to a github repo or a url of a website where your solution is posted.

We are looking for code quality, knowledge of cross-browser compatibility, quick load times, and innovation/thoughtfulness.

Part I: get it.

(Check out the User TimelineAPI)

Each tweet should include at minimum:

The tweet content
A well-formatted created_at date
A link to the tweet.
For retweets and mentions, the username should be included.
Please note that Twitter's REST api does not accept cross-domain requests. Feel free to use a simple proxy server, such asthis.

Bonuses/for fun

: Make the columns flexible for screen width so the columns fill 100% of the page width. Layout could be as small as 320px wide. Column arrangment isopen-ended.
Part II: Meta

Make an "edit layout" view that has a form to change the layout settings.

Use HTML5 LocalStorage to store and load the layout settings.

Configurable settings could possibly include:

The order of the columns.
The time range of the tweets shown.
The number of tweets shown in each column.
The overall palette/skin of the page.
The "edit layout" panel can appear either on the same page as the tweets page, on its own page, or embedded within the tweets layout - whichever you would like. There should be a straightforward way to toggle between edit and view modes, and it should be clear to the user which mode they are currently in.

Bonuses/for fun

: Use an interaction (like drag and drop) instead of a form field to order the columns.