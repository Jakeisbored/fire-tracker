const axios = require('axios'),
      cheerio = require('cheerio'),
      errors = require('./errors.js'),
      urls = {
      	wallpapers : 'http://ff.garena.com/wallpaper/en.html',
      	videos : 'http://ff.garena.com/video/en.html'
      };
/**
 * A function that gets videos / wallpapers about Free Fire
 * @function
 * @param {string} Type of media scraped (wallpapers,videos)
 * @example <caption>Example about scraping wallpapers</caption>   
   fire_tracker.charactersScrap('wallpapers',(r,e)=>{
   if(e) return;
   console.log(r)
 })
 * @example <caption>Example about scraping wallpapers</caption>   
   fire_tracker.charactersScrap('videos',(r,e)=>{
   if(e) return;
   console.log(r)
 })  
 * @returns {Promise} Promise object represents the array of videos / wallpapers
 */
mediaScrap = (type,callback) => {
	return new Promise((resolve,reject)=>{
		switch (type){
		case 'wallpapers':
		// Requesting the page and fetching html
		 axios.get(urls.wallpapers).then((response) => {
           const $ = cheerio.load(response.data),
                 data = [];
           $('#J_wallpaper').each((i, ul) => {
              const children = $(ul).children();
              children.each((i, li) => {
              const children = $(li).children();
              children.each((i, a) => {
                data.push({
                	'pc':$(a).data('pc'),
                	'mobile':$(a).data('mobile'),
                	'pop':$(a).data('pop')
                })
             });
            });
              resolve(data);
              return callback(data);
           });

		 });
		 break;
		 /*
		 case 'videos':
		 // Requesting the page and fetching html
		 axios.get(urls.videos).then((response) => {
           const $ = cheerio.load(response.data),
                 data = [];
           $('#m-video').each((i, ul) => {
              const children = $(ul).children();
              children.each((i, li) => {
                data.push($(li).data('video'))
              });
              return data && console.log(data);
           });
		 });
		 break;
		 */
		 default:
		   reject(alert('P'));
		   return callback(alert('P'));
	};
	});
}
module.exports = mediaScrap;
