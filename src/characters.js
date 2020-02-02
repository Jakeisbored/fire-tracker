//Declarations
const axios = require('axios'),
      cheerio = require('cheerio'),
      errors = require('./errors.js'),
      url = 'http://ff.garena.com/character/en/character_list.html';
/**
 * A function that gets characters with their description , image and abillities
 * @function
 * @example    
   fire_tracker.charactersScrap().then(r=>{
      console.log(r);
   }).catch(e=>{
      console.log(e);
   });
 * @returns {Promise} Promise object represents the array of characters
 */
charactersScrap = async (type)=>{
   	axios.get(url).then(response => {
    const $ = cheerio.load(response.data),
          data = [];
    type = type
    $('.g-char-list').each((i,li)=>{
      const children = $(li).children();
      children.each((i,a)=>{
      data.push({
        'desc': $(a).find('div.txt > span').text(),
        'image': $(a).find('div.imgBox > img').attr('src')
      });
      });
    });
      return data;
	});
};
module.exports = charactersScrap;