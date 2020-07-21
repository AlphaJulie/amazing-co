/* This class is to import the incoming data from csv file and save it to Postgresql Database */

const neatCsv = require('neat-csv');
const fs = require('fs');
const csv_path = '../amazing-co/events.csv';
const Models = require('../db/sequelize.js');

class DataImport {


  async doImportData() {
    try {
        let csvData = [];
        // Read csvFile from the given path
         fs.readFile(csv_path, async (err, data) => {
            if (err) {
              console.error(err)
              return;
            }
            csvData = await neatCsv(data);
            for(let value of csvData){
               value.cost = value.cost.replace('$','').trim();
            }
            for(let data of csvData){
              // Insert event data to 'events' table in Postgres Db
              await Models.Event.findOrCreate({
                where: {
                  event_id:data.event_id,
                  event_name:data.event_name,
                  cost:data.cost
                }
              })
            }
           // await Models.Event.bulkCreate(csvData).catch(err => console.log(err));
          });
          return csvData;

    } catch (err) {
      console.error(`DataImport.doImportData() Error: ${err}`)
    }
  }


}
module.exports = DataImport;