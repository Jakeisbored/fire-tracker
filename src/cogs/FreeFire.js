const errors = require('../scripts/errors.js'),
    weaponJson = require('../data/weaponsData.js'),
    axios = require('axios'),
    cheerio = require('cheerio'),
    languages = ['pt', 'es', 'id', 'ru', 'kr', 'th', 'ar'],
    urls = {
        wallpapers: 'http://ff.garena.com/wallpaper/en.html',
        videos: 'https://www.youtube.com/channel/UC4AB0_ectRryjCF_ugD0U8w/videos'
    };
/** Class representing a free fire cog. */
class FreeFire {
    /**
     * Create a free fire cog.
     */
    constructor(name) {
        this.name = name;
    }
    /**
 * A method that gets weapon info in Free Fire
 * @param {string} type type of quantity of info scraped (all,specify,category)(not case sensitive)
 *
 * If chosen (specify or category) following param must be given :
 *
 * @param {string} name name of weapon / name of category
 * @example <caption>Example about scraping all weapons</caption>   
   const fire = require('fire-tracker'),
         fire_tracker = new fire.FreeFire();
   fire_tracker.weaponScrap('all').then(r=>{
        console.log(r);
   }).catch(e=>{
        console.log(e);
   });
 * @example <caption>Example about scraping specific weapons</caption>   
   fire_tracker.weaponScrap('specific','G18').then(r=>{
        console.log(r);
   }).catch(e=>{
        console.log(e);
   });
 * @returns {Promise} Promise object represents the object of weapon/weapons
 */
    async weaponScrap(type, name) {
        var data_pack = [],
            data_solo;
        switch (type.toLowerCase()) {
            case 'all':
                return weaponJson;
                break;
            case 'specify':
                if (!name) {
                    return alert('P', 404);
                };
                weaponJson.forEach(e => {
                    if (e['name'][language] == name) {
                        data_solo = e
                    };
                });
                return data_solo != null ? data_solo : alert('M');
                break;
            case 'category':
                if (!name) {
                    return alert('P', 404);
                };
                weaponJson.forEach(e => {
                    if (e['type'] === name) {
                        data_pack.push(e)
                    };
                });
                return data_pack.length > 1 ? data_pack : alert('Mc');
                break;
            default:
                return alert('P', 404);
        };
    }
    /**
 * A method that gets characters with their description , image and abillities
 * @param {string} language Language of description ('pt', 'es', 'id', 'ru', 'kr', 'th', 'ar')
 * @example    
   fire_tracker.charactersScrap().then(r=>{
      console.log(r);
   }).catch(e=>{
      console.log(e);
   });
 * @returns {Promise} Promise object represents the array of characters
 */
    async charactersScrap(language) {
        language = languages.includes(language) ? language : 'en';
        // Requesting the page and fetching html
        return axios.get(`http://ff.garena.com/character/${language}/character_list.html`).then(async r => {
            // Processing html with cheerio
            var $ = cheerio.load(r.data),
                cdata = [];
            // Looping through each ul element
            $('div.g-cont > ul').each((i, li) => {
                // Looping through each li element children of instance a
                $(li).children().each((i, a) => {
                    // Pushing data
                    cdata.push({
                        "description": $(a).find('div.txt > span').text(),
                        "img": $(a).find('div.imgBox > img').attr('src')
                    });
                });
            });
            // Returning data
            return cdata;
        });

    }
    /**
 * A method that gets videos / wallpapers about Free Fire
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
    async mediaScrap(type, platform) {
        switch (type) {
            case 'wallpapers':
                // Requesting the page and fetching html
                return axios.get(urls.wallpapers).then((response) => {
                    // Processing html with cheerio
                    const $ = cheerio.load(response.data),
                        data = [];
                    // Looping through each li element children
                    $('#J_wallpaper').each((i, ul) => {
                        // Looping through each ul element children
                        $(ul).children().each((i, li) => {
                            // Looping through each a element children
                            $(li).children().each((i, a) => {
                                // Creating a switch statement for -platform- param
                                switch (platform) {
                                    // 'pc' case
                                    case 'pc':
                                        // Pushing to data and returning it
                                        data.push({
                                            'pc': $(a).data('pc')
                                        });
                                        return data;
                                        break;
                                        // 'mobile' case
                                    case 'mobile':
                                        // Pushing to data and returning it
                                        data.push({
                                            'mobile': $(a).data('mobile')
                                        });
                                        return data;
                                        break;
                                        // 'pop' case
                                    case 'pop':
                                        // Pushing to data and returning it
                                        data.push({
                                            'pop': $(a).data('pop')
                                        });
                                        return data;
                                        break;
                                        // 'all' case
                                    case 'all':
                                        // Pushing to data and returning it
                                        data.push({
                                            'pc': $(a).data('pc'),
                                            'mobile': $(a).data('mobile'),
                                            'pop': $(a).data('pop')
                                        });
                                        return data;
                                        break;
                                        // 'default' case
                                    default:
                                        // Using the alert function from errors.js to alert the user
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
    /**
 * A method that displays current weapon names and categories available to seach for
 * @param {string} type Type stats displayed (byname,bycategory)
 * @example <caption>Example about viewing weapon names available</caption>   
   fire_tracker.listOfWeapons('byname').then(r=>{
    console.log(r);
   }).catch(e=>{
    console.log(e);
   });
 * @returns {Promise} Promise object represents the array of weapons
 */
    async listOfWeapons(type) {
        const data = [],
            numOfWeapons = weaponJson.length;
        type = type != null ? type : 'byname';
        switch (type.toLowerCase()) {
            case 'byname':
                weaponJson.forEach(e => {
                    data.push(e['name']);
                });
                return data;
                break;
            case 'bycategory':
                weaponJson.forEach(e => {
                    data.push(e['type']);
                });
                return data;
                break;
            default:
                return alert('P');
        };
    }
}
module.exports = FreeFire;