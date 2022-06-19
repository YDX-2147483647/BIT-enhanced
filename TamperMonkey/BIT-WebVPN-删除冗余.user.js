// ==UserScript==
// @name         BIT-WebVPN-删除冗余
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  删除学校名称，简化过长的名字，删除名字里重复的地址
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        https://webvpn.bit.edu.cn/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 如果修改了“我的收藏”，会重新刷新，但脚本不会重新运行，因而失效。
    // 不过这种事件不常发生，所以就不考虑了……
    document.querySelectorAll(".vpn-content div.vpn-content-block-panel__content > p:nth-child(1), #vpn-bastion-list .bastion-item > .bastion-item__content > .bastion-item__title").forEach(e => {
        e.textContent = e.textContent.replace("北京理工大学", "").replace(/系统$/, "");
        let address = e.parentNode.lastElementChild.textContent;
        let redundant_address = e.textContent.match(/[0-9a-zA-Z.]+/);
        if(redundant_address){
            if(address.includes(redundant_address[0]) && e.textContent != redundant_address[0]){
                e.textContent = e.textContent.replace(redundant_address[0], "");
            }
        }
        e.textContent = e.textContent.replace(/^[_-]/, "").replace(/[_-]$/, "");
    });
})();
