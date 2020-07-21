const expect = require('chai').expect;

const Checkout = require('../lib/components/checkout');

describe('class Checkout', () => {

    describe('doCheckout()', async () => {
        
        it('should return $ 220 for input checkout: kp', async () => {
            const events = ['kp'];
            const checkout = new Checkout();
            const checkoutPrice = await checkout.doCheckout(events);
            expect(checkoutPrice).to.be.equal(220);
        }); 
        it('should return $ 440 for input checkout: wt', async () => {
            const events = ['wt'];
            const checkout = new Checkout();
            const checkoutPrice = await checkout.doCheckout(events);
            expect(checkoutPrice).to.be.equal(440);
        }); 
        it('should return $ 800 for input checkout: tb', async () => {
            const events = ['tb'];
            const checkout = new Checkout();
            const checkoutPrice = await checkout.doCheckout(events);
            expect(checkoutPrice).to.be.equal(800);
        }); 
        it('should return $ 110 for input checkout: pc', async () => {
            const events = ['pc'];
            const checkout = new Checkout();
            const checkoutPrice = await checkout.doCheckout(events);
            expect(checkoutPrice).to.be.equal(110);
        }); 
        it('should return $ 110 for Picnics Buy 2, get 1 free', async () => {
            const events = ['pc','pc'];
            const checkout = new Checkout();
            const checkoutPrice = await checkout.doCheckout(events);
            expect(checkoutPrice).to.be.equal(110);
        }); 
        it('should return $ 1320.00 for Wine Tours Buy 4, ONLY Pay for 3', async () => {
            const events = ['wt','wt','wt','wt'];
            const checkout = new Checkout();
            const checkoutPrice = await checkout.doCheckout(events);
            expect(checkoutPrice).to.be.equal(1320);
        }); 
        it('should return $ 330 for Picnics	Buy 4, ONLY Pay for 3', async () => {
            const events = ['pc','pc','pc','pc'];
            const checkout = new Checkout();
            const checkoutPrice = await checkout.doCheckout(events);
            expect(checkoutPrice).to.be.equal(330);
        }); 
        it('should return $ 1562 for input checkout: wt,wt,pc,kp,wt for Buy 5, Get 20% off the 5th experience', async () => {
            const events = ['wt','wt','pc','kp','wt'];
            const checkout = new Checkout();
            const checkoutPrice = await checkout.doCheckout(events);
            expect(checkoutPrice).to.be.equal(1562);
        });
        it('should return $ 550 for input checkout: pc,pc,kp,kp after applying  Buy 2, get 1 free', async () => {
            const events = ['pc','pc','kp','kp'];
            const checkout = new Checkout();
            const checkoutPrice = await checkout.doCheckout(events);
            expect(checkoutPrice).to.be.equal(550);
        });
        it('should return $ 1570 for input checkout: pc,tb,kp,wt as no promotions can be applied', async () => {
            const events = ['pc','tb','kp','wt'];
            const checkout = new Checkout();
            const checkoutPrice = await checkout.doCheckout(events);
            expect(checkoutPrice).to.be.equal(1570);
        });
         
    });
});