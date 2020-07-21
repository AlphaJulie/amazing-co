/* This class is to process the checkout based on promotions*/
const Models = require('../db/sequelize');

class Checkout {

    async doCheckout(userSelectedEvents) {
        try {
            const priceList = [];
            // Get Events data from table 'events' stored in postgres Db
            const Events = await Models.Event.findAll({
                raw: true,
            }).catch(err => console.log(err));
            // Apply Promotion rules
            if (userSelectedEvents.length === 5) { // Apply 20% off for the last_item for count of 5 events
                const newList = userSelectedEvents.slice(0, -1); // Get first 4 events
                for (let value of Events) {
                    let count = newList.reduce((n, x) => n + (x === value.event_id), 0);
                    const eventCost = value.cost;
                    let price = Number(eventCost) * Number(count);
                    priceList.push(price);
                }
                const last_item = userSelectedEvents.slice(-1).pop();
                const obj = Events.find(o => o.event_id === last_item); // Get cost for last_item
                const new_price = obj.cost * (80 / 100); // Apply 20% off promotion
                priceList.push(new_price);
            }
            else {
                for (let value of Events) {
                    let count = userSelectedEvents.reduce((n, x) => n + (x === value.event_id), 0); // Get count of each event
                    const eventCost = value.cost;
                    let price = '';
                    if (value.event_id.includes('tb') && count === 2) { 
                        price = 1500;
                    }
                    else if ((value.event_id.includes('wt') || value.event_id.includes('pc')) && count === 4) {
                        price = Number(eventCost) * 3;
                    } else if (value.event_id.includes('pc') && count === 2) {
                        price = Number(eventCost);
                    }
                    else {
                        price = Number(eventCost) * Number(count);
                    }
                    priceList.push(price);
                }
            }
            return priceList.reduce((a, b) => a + b, 0);
        } catch (error) {
            throw console.error();
        }
    }
}
module.exports = Checkout;