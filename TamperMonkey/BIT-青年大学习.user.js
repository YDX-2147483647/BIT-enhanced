// ==UserScript==
// @name         BIT-青年大学习
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  暂停背景音乐，收起广告，填表格
// @author       Y.D.X.
// @match        https://a.eqxiu.com/s/shUZuta8*
// @grant        none
// @run-at       document-end
// ==/UserScript==

// Promises are used!

(function() {
    'use strict';

    function timeoutPromise(action, interval){
        // https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/%E5%BC%82%E6%AD%A5/Async_await
        return new Promise((resolve, reject) => {
            setTimeout(function(){
                action();
                resolve("done");
            }, interval);
        });
    };

    // interval's unit: ms.
    function wait_until_presence(selector, interval){
        return new Promise((resolve, reject) => {
            let check = setInterval(function(){
                if(document.querySelector(selector)){
                    clearInterval(check);
                    resolve(document.querySelector(selector));
                }
            }, interval);
        });
    }
    function wait_until_true(expression, interval){
        return new Promise((resolve, reject) => {
            let check = setInterval(function(){
                console.log("Checking...");
                if(expression){
                    clearInterval(check);
                    resolve("Success.");
                }
            }, interval);
        });
    }

    // Hide side bar and mute BGM.
    function mute_BGM(){
        $("#nr > div.bgm-btn-wraper > div").click();
    }
    wait_until_presence(".bgm-btn", 100).then(function(){
        $("#lampHide-btn").click();
        document.querySelector(".bgm-btn > audio").addEventListener("play", mute_BGM, {once: true});
    });

    // Page down.
    async function next_page(){
        $("#next_page").click();

        // await wait_until_true(document.querySelector("#nr > .main-page.z-active") != null, 1);
        // console.log("Moving...");
        // await wait_until_true(document.querySelector("#nr > .main-page.z-active") == null, 20);
        // console.log("Arrived.");
    }
    async function page_down_and_fill(){
        await wait_until_presence("#nr > .main-page", 100);

        await next_page();
        await timeoutPromise(next_page, 1000);
        await timeoutPromise(next_page, 1000);

        await wait_until_presence("#nr > .main-page.z-current textarea[placeholder*='学院']").then(e => {e.value = "□□书院"});
        document.querySelector("#nr > .main-page.z-current textarea[placeholder*='团支部']").value = "□□○○班";
        document.querySelector("#nr > .main-page.z-current textarea[placeholder*='姓名']").value = "某某某";
        document.querySelector("#nr > .main-page.z-current textarea[placeholder*='学号']").value = "299792458";
    }

    page_down_and_fill();

})();
