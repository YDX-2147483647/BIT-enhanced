// ==UserScript==
// @name         BIT-乐学-修改侧边栏课程
// @namespace    http://tampermonkey.net/
// @version      1.1.1
// @description  在侧边栏添加并重新排列课程
// @author       Y.D.X.
// @match        https://lexue.bit.edu.cn/*
// @match        https://webvpn.bit.edu.cn/http/77726476706e69737468656265737421fcf25989227e6a596a468ca88d1b203b/*
// @grant        none
// ==/UserScript==

// Moodle 好像是按某种规则挑选出最多 10 个课程。然而它并不能完全猜中，还不时更新，导致每次更新都要改。
// 在个人主页的课程概览可以筛选“进行中”“尚未开始的”或“过去的”课程。

(function () {
    'use strict';

    let show_list = [
        // 有序，显示时前面的在上
        // icon 指 FontAwesome 的图标名称，默认为'graduation-cap'。→ http://www.fontawesome.com.cn/faicons/
        { name: "物理实验B-绪论", id: "7661", icon: "flask" },
        { name: "数据结构", id: "6556", icon: "database" },
        { name: "唐宋诗词欣赏", id: "7154", icon: "paragraph" },
        { name: "MCM", id: "4246", icon: "line-chart" },
    ]
    let hide_list = [
        "更多",
        { name: "工科数学分析 2", id: "6712", icon: "superscript" },
        { name: "线性代数A", id: "6721", icon: "square-o" },
        { name: "物理A 1", id: "7348", icon: "globe" },
        { name: "中国近现代史", id: "7880", icon: "book" },
        { name: "工训", id: "7297", icon: "wrench" },
        "乐学使用简明教程",
        "C语言程序设计（2020级电子信息-中文班）期末考试",
        "习近平新时代中国特色社会主义思想概论",
        "思想道德修养与法律基础",
        "信息技术基础",
    ];

    function hide_courses() {
        document.querySelectorAll("a.list-group-item[href*='course/view.php'][data-indent='1'], a.list-group-item[href*='my'][data-indent='1']").forEach(
            function (course) {
                let name = course.querySelector(".media > span.media-body");
                for (let i of hide_list) {
                    if ((i.hasOwnProperty('id') && course.dataset.key == i.id)
                        || name.textContent.includes(i)) {
                        course.hidden = true;
                        return;
                    }
                }
                for (let i of show_list) {
                    if (course.dataset.key == i.id) {
                        course.hidden = true;
                        return;
                    }
                }
            }
        );
    }

    function append_course(course) {
        let current_id_match = window.location.href.match(/\?id=(\d+)/);
        let is_current_page = false;
        if (current_id_match) {
            is_current_page = current_id_match[1] == course.id;
        }

        let list_item = document.createElement("li");
        list_item.innerHTML = `<a class="list-group-item list-group-item-action ${is_current_page ? 'active' : ''}" href="https://lexue.bit.edu.cn/course/view.php?id=${course.id}" data-key="${course.id}">
            <div class="ml-1">
                <div class="media">
                    <span class="media-left">
                        <i class="icon fa fa-${course.icon ? course.icon : 'graduation-cap'} fa-fw " aria-hidden="true"></i>
                    </span>
                    <span class="media-body">${course.name}</span>
                </div>
            </div>
        </a>`;

        document.querySelector("#nav-drawer > nav.list-group:last-child > ul").appendChild(list_item);
    }

    hide_courses();
    show_list.forEach(append_course);

})();
