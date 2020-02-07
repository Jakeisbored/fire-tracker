const cheerio = require('cheerio'),
    axios = require('axios'),
    errors = require('../scripts/errors.js'),
    urls = {
        weapons: 'https://fortnitestats.com/weapons',
        solo: 'https://db.fortnitetracker.com/weapons/'
    },
    rarities = ['common', 'uncommon', 'rare', 'epic', 'legandary'];
/** Class representing a Fortnite cog */
class Fortnite {
    /**
     * Creating the cog 
     */
    constructor(name) {
        this.name = name;
    };
    /**
 * A method that displays current weapon names available to seach for
 * @example <caption>Example about viewing weapons</caption>   
   fire_tracker.listOfWeapons().then(r=>{
    console.log(r);
   }).catch(e=>{
    console.log(e);
   });
 * @returns {Promise} Promise object represents the array of weapons
 */
    async listOfWeapons() {
        return axios.get(urls['weapons']).then(response => {
            const $ = cheerio.load(response.data),
                cdata = [],
                children = $('body > div.container.content > div').children();
            children.each((i, div) => {
                cdata.push({
                    'img': $(div).find('a > img').attr('src'),
                    'name': $(div).find('#itemmeta > h4').text(),
                    'description': $(div).find('#itemmeta > p').text()
                });
            });
            return cdata;
        })
    }
    /**
 * A method that displays a weapon stats with its name given
 * @param {string} name The name of the weapon
 * @param {string} rarity The rarity of the weapon (Common,Uncommon,Rare,Epic,Legandary) . Default is common
 * @example <caption>Example about viewing info about a rare pump shotgun</caption>   
   fire_tracker.weaponScrap('Pump Shotgun','Rare').then(r=>{ // Not case sensitive
    console.log(r);
   }).catch(e=>{
    console.log(e);
   });
 * @returns {Promise} Promise object represents the array of weapons
 */
    async weaponScrap(name, rarity) {
        rarity = rarities.includes(rarity.toLowerCase()) ? rarity.toLowerCase() : 'common';
        return axios.get(`${urls['solo']}${name.toLowerCase().replace(' ','-')}${name.toLowerCase()=='rocket launcher'?'----':'-'}${rarity}`).then(response => {
            const $ = cheerio.load(response.data);
            var data = [{
                'img': 'https://db.fortnitetracker.com' + $('#data-nite > div.trn-scont > div > div.trn-card.ftr-locker-item__header > div.ftr-locker-item__image > img').attr('src'),
                'name': $('#data-nite > div.trn-scont > div > div.trn-card.ftr-locker-item__header > div.ftr-locker-item__header-details > div.trn-card__content.trn-card--light.ftr-locker-item__info > div > div > h1').text(),
                'description': $('#data-nite > div.trn-scont > div > div.trn-card.ftr-locker-item__header > div.ftr-locker-item__header-details > div:nth-child(2)').text(),
                'rarity': $('#data-nite > div.trn-scont > div > div.trn-card.ftr-locker-item__header > div.ftr-locker-item__header-details > div.trn-card__content.trn-card--light.ftr-locker-item__info > div > div > span').text(),
                'stats': {
                    'damage': $('#data-nite > div.trn-scont > div > div:nth-child(2) > div > div > div.trn-card__content.panel-body.panel-item-info > div > div:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(2)').text(),
                    'critical_hit_chance': $('#data-nite > div.trn-scont > div > div:nth-child(2) > div > div > div.trn-card__content.panel-body.panel-item-info > div > div:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2)').text(),
                    'critical_hit_damage': $('#data-nite > div.trn-scont > div > div:nth-child(2) > div > div > div.trn-card__content.panel-body.panel-item-info > div > div:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(2)').text(),
                    'fire_rate': $('#data-nite > div.trn-scont > div > div:nth-child(2) > div > div > div.trn-card__content.panel-body.panel-item-info > div > div:nth-child(1) > table > tbody > tr:nth-child(4) > td:nth-child(2)').text(),
                    'magazine_size': $('#data-nite > div.trn-scont > div > div:nth-child(2) > div > div > div.trn-card__content.panel-body.panel-item-info > div > div:nth-child(1) > table > tbody > tr:nth-child(5) > td:nth-child(2)').text(),
                    'range': $('#data-nite > div.trn-scont > div > div:nth-child(2) > div > div > div.trn-card__content.panel-body.panel-item-info > div > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2)').text(),
                    'durability': $('#data-nite > div.trn-scont > div > div:nth-child(2) > div > div > div.trn-card__content.panel-body.panel-item-info > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)').text(),
                    'reload_time': $('#data-nite > div.trn-scont > div > div:nth-child(2) > div > div > div.trn-card__content.panel-body.panel-item-info > div > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2)').text(),
                    'ammo_cost': $('#data-nite > div.trn-scont > div > div:nth-child(2) > div > div > div.trn-card__content.panel-body.panel-item-info > div > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2)').text(),
                    'impact': $('#data-nite > div.trn-scont > div > div:nth-child(2) > div > div > div.trn-card__content.panel-body.panel-item-info > div > div:nth-child(2) > table > tbody > tr:nth-child(5) > td:nth-child(2)').text()
                },
                'timing': {
                    'equip_animation': $('#data-nite > div.trn-scont > div > div:nth-child(3) > div > div > div.trn-card__content.panel-body > div.hidden-xs.hidden-sm > table > tbody > tr > td:nth-child(1)').text(),
                    'switch_cooldown': $('#data-nite > div.trn-scont > div > div:nth-child(3) > div > div > div.trn-card__content.panel-body > div.hidden-xs.hidden-sm > table > tbody > tr > td:nth-child(2)').text()
                },
                'spread': {
                    'base': $('#data-nite > div.trn-scont > div > div:nth-child(4) > div.col-md-9 > div > div.trn-card__content.panel-body > div.hidden-xs.hidden-sm > table > tbody > tr > td:nth-child(1)').text(),
                    'sprinting': $('#data-nite > div.trn-scont > div > div:nth-child(4) > div.col-md-9 > div > div.trn-card__content.panel-body > div.hidden-xs.hidden-sm > table > tbody > tr > td:nth-child(2)').text(),
                    'jump/fall': $('#data-nite > div.trn-scont > div > div:nth-child(4) > div.col-md-9 > div > div.trn-card__content.panel-body > div.hidden-xs.hidden-sm > table > tbody > tr > td:nth-child(3)').text(),
                    'down_sights': $('#data-nite > div.trn-scont > div > div:nth-child(4) > div.col-md-9 > div > div.trn-card__content.panel-body > div.hidden-xs.hidden-sm > table > tbody > tr > td:nth-child(4)').text(),
                    'standing_still': $('#data-nite > div.trn-scont > div > div:nth-child(4) > div.col-md-9 > div > div.trn-card__content.panel-body > div.hidden-xs.hidden-sm > table > tbody > tr > td:nth-child(5)').text(),
                    'crounching': $('#data-nite > div.trn-scont > div > div:nth-child(4) > div.col-md-9 > div > div.trn-card__content.panel-body > div.hidden-xs.hidden-sm > table > tbody > tr > td:nth-child(6)').text()
                },
                'firing_rate': {
                    'normal': $('#data-nite > div.trn-scont > div > div:nth-child(4) > div.col-md-3 > div > div.trn-card__content.panel-body > table > tbody > tr > td:nth-child(1)').text(),
                    'burst': $('#data-nite > div.trn-scont > div > div:nth-child(4) > div.col-md-3 > div > div.trn-card__content.panel-body > table > tbody > tr > td:nth-child(2)')
                },
                'range': {
                    'pb': $('#data-nite > div.trn-scont > div > div:nth-child(5) > div:nth-child(1) > div > div.trn-card__content.panel-body > table > tbody > tr > td:nth-child(1)').text(),
                    'mid': $('#data-nite > div.trn-scont > div > div:nth-child(5) > div:nth-child(1) > div > div.trn-card__content.panel-body > table > tbody > tr > td:nth-child(2)').text(),
                    'long': $('#data-nite > div.trn-scont > div > div:nth-child(5) > div:nth-child(1) > div > div.trn-card__content.panel-body > table > tbody > tr > td:nth-child(3)').text(),
                    'max': $('#data-nite > div.trn-scont > div > div:nth-child(5) > div:nth-child(1) > div > div.trn-card__content.panel-body > table > tbody > tr > td:nth-child(4)').text()
                },
                'damage_per_range': {
                    'pb': $('#data-nite > div.trn-scont > div > div:nth-child(5) > div:nth-child(2) > div > div.trn-card__content.panel-body > table > tbody > tr > td:nth-child(1)').text(),
                    'mid': $('#data-nite > div.trn-scont > div > div:nth-child(5) > div:nth-child(2) > div > div.trn-card__content.panel-body > table > tbody > tr > td:nth-child(2)').text(),
                    'long': $('#data-nite > div.trn-scont > div > div:nth-child(5) > div:nth-child(2) > div > div.trn-card__content.panel-body > table > tbody > tr > td:nth-child(3)').text(),
                    'max': $('#data-nite > div.trn-scont > div > div:nth-child(5) > div:nth-child(2) > div > div.trn-card__content.panel-body > table > tbody > tr > td:nth-child(4)').text()
                },
                'recoil': {
                    'horizontal': $('#data-nite > div.trn-scont > div > div:nth-child(7) > div > div > div.trn-card__content.panel-body > div.hidden-xs.hidden-sm > table > tbody > tr > td:nth-child(1)').text(),
                    'horizontal_gamepad': $('#data-nite > div.trn-scont > div > div:nth-child(7) > div > div > div.trn-card__content.panel-body > div.hidden-xs.hidden-sm > table > tbody > tr > td:nth-child(2)').text(),
                    'vertical': $('#data-nite > div.trn-scont > div > div:nth-child(7) > div > div > div.trn-card__content.panel-body > div.hidden-xs.hidden-sm > table > tbody > tr > td:nth-child(3)').text(),
                    'vertical_gamepad': $('#data-nite > div.trn-scont > div > div:nth-child(7) > div > div > div.trn-card__content.panel-body > div.hidden-xs.hidden-sm > table > tbody > tr > td:nth-child(4)').text(),
                    'angle_max': $('#data-nite > div.trn-scont > div > div:nth-child(7) > div > div > div.trn-card__content.panel-body > div.hidden-xs.hidden-sm > table > tbody > tr > td:nth-child(5)').text(),
                    'angle_min': $('#data-nite > div.trn-scont > div > div:nth-child(7) > div > div > div.trn-card__content.panel-body > div.hidden-xs.hidden-sm > table > tbody > tr > td:nth-child(6)').text(),
                    'down_sights': $('#data-nite > div.trn-scont > div > div:nth-child(7) > div > div > div.trn-card__content.panel-body > div.hidden-xs.hidden-sm > table > tbody > tr > td:nth-child(7)').text(),
                    'interp_speed': $('#data-nite > div.trn-scont > div > div:nth-child(7) > div > div > div.trn-card__content.panel-body > div.hidden-xs.hidden-sm > table > tbody > tr > td:nth-child(8)').text(),
                    'interp_speed_recovery': $('#data-nite > div.trn-scont > div > div:nth-child(7) > div > div > div.trn-card__content.panel-body > div.hidden-xs.hidden-sm > table > tbody > tr > td:nth-child(9)').text()
                }
            }];
            $('#data-nite > div.trn-scont > div > div:nth-child(8) > div.trn-table__container > table > tbody').children().each((i, tr) => {
                data.push([
                    $('#data-nite > div.trn-scont > div > div:nth-child(8) > div.trn-table__container > table > tbody > tr:nth-child(1) > td:nth-child(1) > a').text(), $('#data-nite > div.trn-scont > div > div:nth-child(8) > div.trn-table__container > table > tbody > tr:nth-child(1) > td:nth-child(2)').text(), $('#data-nite > div.trn-scont > div > div:nth-child(8) > div.trn-table__container > table > tbody > tr:nth-child(1) > td:nth-child(3)').text(), $('#data-nite > div.trn-scont > div > div:nth-child(8) > div.trn-table__container > table > tbody > tr:nth-child(1) > td:nth-child(4)').text()
                ]);
            });
            return data;
        }).catch(e => {
            return alert('M');
        });
    }
}
module.exports = Fortnite;