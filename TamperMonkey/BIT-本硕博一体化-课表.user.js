// ==UserScript==
// @name         BIT-本硕博一体化-课表
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  去除课表中课程及教学班编号
// @author       Y.D.X.
// @match        http://jxzxehallapp.bit.edu.cn/jwapp/sys/wdkbby/*
// @grant        none
// ==/UserScript==

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



    function shrink_titles(){
        document.querySelectorAll(".mtt_item_kcmc").forEach(c => {
            c.textContent = c.childNodes[1].textContent.replace(
                /^\d{8,9}\s(.+)\[(\d{2}|\d{9})\]$/,
                "$1");
        })
    }
    function wait_and_shrink_titles(){
        wait_until_presence("#kcb_container", 1000).then(shrink_titles);
    }

    wait_and_shrink_titles();

    wait_until_presence("#dqxnxq2 + a[data-action='更改2']", 1000).then(button => {
        // 更改学期时的对话框是每次现画的……所以每次都要加
        button.addEventListener("click", function(){
            document.querySelector("#buttons > button.bh-btn-primary").addEventListener(
                "click", wait_and_shrink_titles);
        });
    });

})();
