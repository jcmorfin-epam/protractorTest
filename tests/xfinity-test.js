describe('XFinity Page Test', function () {
    
    beforeEach(function () {
        browser.get('https://forums.xfinity.com/');
    });
    
    it('Verify Correct Search results', function () {


        //Search for nfl
        element(by.name('messageSearchField')).sendKeys('nfl');
        element(by.className('lia-button-searchForm-action')).click();

        //Verify that we are now in search results page
        var pageTitle = element(by.id('link')).getText();
        expect(pageTitle).toEqual("Search");

        //verify that all there are exactly 10 results
        var results = element.all(by.css('h2.message-subject'));
        expect(results.count()).toEqual(10);

        //Verify that all results include the word that it was searched for
        results.each(function(element, index){
            element.getText().then(function (text) {
                expect(text.toLowerCase()).toContain('nfl');
                console.log("Verification #"+index+": "+text);
            });
        });

    });

    it('Verify Incorrec Password Error is displayed', function () {

        //Click on email menu link
        element(by.name('email')).click();
        //Verify thal log in page is displayed
        var pageHeaderTitle = browser.driver.findElement(By.css('.screen-reader-text')).getText();
        expect(pageHeaderTitle).toBeDefined();
        
        // AT NON-ANGULAR PAGE
        //Enter incorrect user name and password and click on Sign in button
        browser.driver.findElement(By.id('user')).sendKeys('user');
        browser.driver.findElement(By.id('passwd')).sendKeys('password');
        browser.driver.findElement(By.css('#sign_in')).click();

        //Verify that error message for incorrect user and password is displayed
        var resetPasswordHeaderTitle = browser.driver.findElement(By.xpath('//p[@id="error"]')).getText();
        expect(resetPasswordHeaderTitle).toEqual('The Xfinity ID or password you entered was incorrect. Please try again.');

    });

});