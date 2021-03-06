// ==UserScript==
// @name         BIT-Programming-Change background color
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  给AC、WA以外的测试结果设置颜色
// @author       Y.D.X.
// @match        http://lexue.bit.edu.cn/mod/programming/result.php?*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function set_color(row, color){
        for(let column of row.querySelectorAll(".cell")){
            column.style.backgroundColor = color;
        }
    }

    for(let r of document.querySelectorAll("#test-result-detail > table > tbody > tr")){
        var result = r.querySelector(".cell.c12").innerText;
        var color = undefined;

        if(result.includes("RE:"))
            color = "LightBlue";
        else if(result.includes("FPE:"))
            color = "BlanchedAlmond";
        else if(result.includes("TLE:"))
            color = "Tomato";
        else if(result.includes("KS:"))
            color = "Violet";

        if(color){
            set_color(r, color);
        }
    }
})();