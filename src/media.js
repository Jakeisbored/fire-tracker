const axios = require('axios'),
      cheerio = require('cheerio'),
      errors = require('./errors.js'),
      urls = {
      	wallpapers : 'http://ff.garena.com/wallpaper/en.html',
      	videos : 'https://www.youtube.com/channel/UC4AB0_ectRryjCF_ugD0U8w/videos'
      };
/**
 * A function that gets videos / wallpapers about Free Fire
 * @function
 * @param {string} type Type of media scraped (wallpapers,videos)
 *
 * If chosen (wallpapers) . You'll need this param
 *
 * @param {string} platform The platform of the wallpaper (pc,mobile,pop,all)
 * @example <caption>Example about scraping wallpapers</caption>   
   fire_tracker.charactersScrap('wallpapers','all').then(r=>{
    console.log(r);
   }).catch(e=>{
    console.log(e);
   });
 * @returns {Promise} Promise object represents the array of videos / wallpapers
 */
mediaScrap = async (type,platform) => {
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
              switch(platform){
                 case 'pc':
                      data.push({
                                        'pc':$(a).data('pc')
                                            });
                      return data; 
                 break;
                 case 'mobile':
                      data.push({
                                        'mobile':$(a).data('mobile')
                                            });
                      return data; 
                 break;
                 case 'pop':
                      data.push({
                                        'pop':$(a).data('pop')
                                            });
                      return data; 
                 break;
                 case 'all':
                      data.push({
                                            'pc':$(a).data('pc'),
                                            'mobile':$(a).data('mobile'),
                                            'pop':$(a).data('pop')
                                            });
                      return data;
                 break;
                 default:
                      return alert('P');            
              };
             });
            });
           });

		 });
		 break;
		 default:
		   return alert('P');
	};
}
module.exports = mediaScrap;
