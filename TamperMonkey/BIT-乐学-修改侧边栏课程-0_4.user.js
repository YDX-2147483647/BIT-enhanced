// ==UserScript==
// @name         BIT-乐学-修改侧边栏课程
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  在侧边栏隐藏、重命名、增加一些课程
// @author       Y.D.X.
// @match        http://lexue.bit.edu.cn/*
// @match        https://webvpn.bit.edu.cn/http/77726476706e69737468656265737421fcf25989227e6a596a468ca88d1b203b/*
// @grant        none
// ==/UserScript==

// 上一版本：隐藏侧边栏课程（0.2）。

(function() {
    'use strict';

    let hide_list = [
        "更多",
        "CUMCM",
        "乐学使用简明教程",
        "C语言程序设计（2020级电子信息-中文班）期末考试",
        "习近平新时代中国特色社会主义思想概论",
        "思想道德修养与法律基础",
        "2020网络安全宣传周",
        "信息技术基础",
    ];
    let change_list = {
        "唐宋诗词欣赏": null,
        "物理A1": "物理A 1",
        // "中国近现代史": null,
        "工程训练": "工训",
        "物理实验B绪论": "物理实验B-绪论",
        "数据结构": null,
        // "线性代数B": null,
        "线性代数A": null,
        "工科数学分析 II": "工科数学分析 2",
        // "C语言程序设计（2020级电子信息-中文班）期末考试": "C语言程序设计-期末考试",
        // "CUMCM": null,
        // "习近平新时代中国特色社会主义思想概论": "习思想概论",
        // "思想道德修养与法律基础": null,
        // "C语言程序设计": null,
    }; // null 表示值与键相同；优先匹配前面的键，但键重复时只保留后面的
    let append_list = [
        {name: "中国近现代史", id: "7880"},
        // {name: "物理A 1", id: "7348"},
        // {name: "MCM辅导", id: "1988"},
        // {name: "工科数学分析I", id: "5836"},
        // {name: "学术用途英语I", id: "5889"},
    ];

    function hide_and_change_courses(){
        document.querySelectorAll("a.list-group-item[href*='course/view.php'][data-indent='1'], a.list-group-item[href*='my'][data-indent='1']").forEach(
            function(course){
                let name = course.querySelector(".media > span.media-body");
                for(let i of hide_list){
                    if(name.textContent.includes(i)){
                        course.hidden = true;
                        break;
                    }
                }
                for(let i in change_list){
                    if(name.textContent.includes(i)){
                        name.textContent = change_list[i]? change_list[i]: i;
                        break;
                    }
                }
            }
        );
    }

    function append_courses(){
        append_list.forEach(
            function(course){
                let current_id_match = window.location.href.match(/\?id=(\d+)/);
                let is_current_page = false;
                if(current_id_match){
                    is_current_page = current_id_match[1] == course.id;
                }

                let list_item = document.createElement("li");
                list_item.innerHTML = `<a class="list-group-item list-group-item-action ${is_current_page? 'active': ''}" href="http://lexue.bit.edu.cn/course/view.php?id=${course.id}">
                    <div class="ml-1">
                        <div class="media">
                            <span class="media-left">
                                <i class="icon fa fa-graduation-cap fa-fw " aria-hidden="true"></i>
                            </span>
                            <span class="media-body ">${course.name}</span>
                        </div>
                    </div>
                </a>`;

                document.querySelector("#nav-drawer > nav.list-group:nth-last-child(1) > ul").appendChild(list_item);
            }
        )
    }

    hide_and_change_courses();
    append_courses();
})();
