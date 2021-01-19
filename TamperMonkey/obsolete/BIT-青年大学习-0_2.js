// ==UserScript==
// @name         BIT-青年大学习
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  暂停背景音乐，收起广告，填表格
// @author       Y.D.X.
// @match        https://a.eqxiu.com/s/shUZuta8*
// @grant        none
// @run-at       document-end
// ==/UserScript==

// Failed

(function() {
    'use strict';

    function hideSideBar(){
        console.log("Hide side bar.");
        $("#lampHide-btn").click();
    }

    function muteBGM(){
        while($("#nr > div.bgm-btn-wraper > div").length == 0);
        while(document.querySelector("#nr > div.bgm-btn-wraper > div").style.animationPlayState != "running");
        console.log("Mute!!!");
        $("#nr > div.bgm-btn-wraper > div").click();
    }

    function nextPage(){
        $("#next_page").click();
        console.log("Next page.");
    }

    function fillForm(){
        document.querySelector("textarea[placeholder*='学院']").value = "睿信书院";
    }

    setTimeout(hideSideBar, 1000);
    // setTimeout(muteBGM, 1300);
    // setTimeout(nextPage, 2000);
    // setTimeout(nextPage, 2500);
    // setTimeout(nextPage, 3000);
    // setTimeout(fillForm, 3500);
})();