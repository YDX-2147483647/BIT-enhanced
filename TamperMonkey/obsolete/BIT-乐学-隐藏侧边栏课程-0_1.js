// ==UserScript==
// @name         BIT-乐学-隐藏侧边栏课程
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  隐藏侧边栏中出现在 hide_list 中的课程
// @author       Y.D.X.
// @match        http://lexue.bit.edu.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var hide_list = ["4244", "5836", "5889", "1727"];
    function hide(){
        document.querySelectorAll("a.list-group-item[href*='course/view.php']").forEach(
            function(course){
                if(hide_list.indexOf(course.attributes["data-key"].value) > -1){
                    course.hidden = "hidden";
                }
            }
        );
    }
    
    hide();
})();
