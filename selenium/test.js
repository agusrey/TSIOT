const {Builder, By, until, Key, Capabilities} = require('selenium-webdriver');
const {expect} = require('chai');
var firefox = require('selenium-webdriver/firefox');
//var profilePath = '/home/tsiot/.mozilla/firefox/zoa6kvyg.default';
var profilePath = '/home/agus/.mozilla/firefox/i2gp0nlj.default-release';
let TIMEOUT=20000;

describe('test multi site with firefox', function() {
   let driver;

   const options = new firefox.Options();
   options.setProfile(profilePath);

   before(async function() {
/*      driver = new Builder().withCapabilities(
	       Capabilities.firefox().set("acceptInsecureCerts", true)
      ).build();*/
      driver = new Builder().forBrowser('firefox').
		   setFirefoxOptions(options).build();	   

   });

   it('check reset is working', async function() {
      this.timeout(TIMEOUT);
      await driver.get('https://sensor/reset');
      
      driver.findElement(By.id('action')).then(element=>{
         expect(element.text).to.equal('reset');  
      });
   });

  it('check that sitio1 does not generate hits', async function() {
      this.timeout(TIMEOUT);
      await driver.get('https://sensor/reset');
      await driver.get('https://sitio1/');
      await driver.get('https://sensor/hitcount');
      driver.findElement(By.id('count')).then(element=>{
         expect(element.text).to.equal('0');  
      });
   });

   it('check that sitio2 generates two hits', async function() {
      this.timeout(TIMEOUT);
      await driver.get('https://sensor/reset');
      await driver.get('https://sitio2/');
      await driver.get('https://sensor/hitcount');
      driver.findElement(By.id('count')).then(element=>{
         expect(element.text).to.equal('2');  
      });
   });

   it('check that there is no navigation away from sitio1', async function() {
      this.timeout(12000);
      await driver.get('https://sensor/reset');
      await driver.get('https://sitio1/');
      driver.findElement(By.id('canary')).then(element=>{
         expect(element.text).to.equal('Canario');  
      });
   });

   it('check that sitio2 only posts to form sensor without loading it', async function() {
      this.timeout(12000);
      await driver.get('https://sensor/reset');
      await driver.get('https://sitio2/');
      driver.findElement(By.id('canary')).then(element=>{
         expect(element.text).to.equal('Canario');  
      });
   });


   it('check that endpoint mult multiplies a * b', async function() {
      this.timeout(20000);
      
      await driver.get('https://sensor/multi');
      
      
      await driver.findElement(By.id('a')).then(element=> element.sendKeys('7'));
      await driver.findElement(By.id('b')).then(element=> element.sendKeys('8'));
      
      await driver.findElement(By.id('multiplica')).then(element=> element.click());

      
   });
            
/* hasta acá funciona */


/* Aca es cuando me trabo, no logro entender como recuperar el resultado de la multiplicación
   para compararlo con el esperado.
   
   Lo que pasa es que debería poder hacer algo parecido a driver.get pero del texto HTML que
   llega en el response res.send del app.post /mult como se ve en index.js

   Tal vez debería encararse de otra forma...., consultar a Carlos 
   
   */

   /*esto no funciona 
      await driver.findElement(By.id('resultado')).then(element=> {
         expect(element.text).to.equal("56");
      });
   });*/

   after( () =>
      driver && driver.quit()
   );
});

