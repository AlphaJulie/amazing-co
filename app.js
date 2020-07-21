
const Checkout = require('./lib/components/checkout');
const DataImport = require('./lib/services/data-import');

async function backendApp() {

  try {
    const dataImport = new DataImport();
    await dataImport.doImportData();

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'Please type eventIds \n 1) kp for Kids Party \n 2) wt for Wine Tour \n 3) tb for Team Building \n 4) pc for Picnic \n as comma separated (eg: kp,wt,wt,pc): '
  })
  readline.prompt();
  for await (const value of readline) {
      const scannedEvents = value.replace(/\s/g, '');
      const userSelectedEvents = scannedEvents.includes(',') ? scannedEvents.split(',') : [scannedEvents];
      const checkout = new Checkout();
      const checkoutPrice = await checkout.doCheckout(userSelectedEvents);
      console.log('Total cost after discount : $' +checkoutPrice)

  }

  } catch (err) {
    console.error(`Error: ${err}`)
  }

}
backendApp();