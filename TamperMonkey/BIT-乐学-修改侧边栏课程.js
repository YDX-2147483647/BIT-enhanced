// ==UserScript==
// @name         BIT-乐学-修改侧边栏课程
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @description  在侧边栏添加并重新排列课程
// @author       Y.D.X.
// @match        https://lexue.bit.edu.cn/*
// @match        https://webvpn.bit.edu.cn/https/77726476706e69737468656265737421fcf25989227e6a596a468ca88d1b203b/*
// @grant        none
// ==/UserScript==

// Moodle 好像是按某种规则挑选出最多 10 个课程。然而它并不能完全猜中，还不时更新，导致每次更新都要改。
// 在个人主页的课程概览可以筛选“进行中”“尚未开始的”或“过去的”课程。

(function () {
    'use strict'

    /**
     * 课程描述
     * @typedef {Object} CourseDescription
     * @property {string} name - 想显示的课程名
     * @property {string} id - 课程链接最后的id，例如`https://lexue.bit.edu.cn/course/view.php?id=8819`就是`'8819'`
     * @property {?string} icon - FontAwesome 的图标名称，默认为`'graduation-cap'`。→ http://www.fontawesome.com.cn/faicons/
     * @property {?string} comment - 给自己看的注释，比如为什么要屏蔽这门课
     */

    const config = {
        /**
         * 想添加的课程，有序，显示时前面的在上
         * @type {CourseDescription[]}
         */
        show: [
            { name: "网络开拓者", id: "877", icon: "star-o" },
            { name: "模拟电子学-硬件实验", id: "8819", icon: "bolt" },
            { name: "物理 2", id: "8853", icon: "globe" },
        ],
        /**
         * 想隐藏的课程
         * @type {(string | CourseDescription)[]}
         */
        hide: [
            { name: "模拟电子学-软件实验", id: "9250", icon: "television" },
            { name: '2021网络安全宣传周', id: '1727' },
            { name: "ECE实习", id: "8369", icon: "code" },
            { name: '学术用途英语12021-2022-1许子艳', id: '8751', comment: '错误课程' },
            { name: "工程制图习题", id: "1038" },
            { name: "MCM 2021春", id: "6693", icon: "line-chart" },
            { name: "数据结构", id: "6556", icon: "database" },
            { name: "唐宋诗词欣赏", id: "7154", icon: "paragraph" },
            "2020网络安全宣传周",
            { name: "CUMCM", id: "4246", icon: "line-chart" },
            { name: "物理实验B-绪论", id: "7661", icon: "flask" },
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
        ]
    }


    /**
     * `test`是否与`ref`是同一课程
     * @param {CourseDescription|string} ref 
     * @param {CourseDescription} test 
     */
    function course_match(ref, test) {
        if (typeof ref !== 'string') {
            return test.id === ref.id
        } else {
            return test.name.includes(ref)
        }
    }

    /**
     * 隐藏`config.hide`和`config.show`
     */
    function hide_courses() {
        document.querySelectorAll("a.list-group-item[href*='course/view.php'][data-indent='1'], a.list-group-item[href*='my'][data-indent='1']")
            .forEach(course_el => {
                const course = {
                    name: course_el.querySelector(".media > span.media-body").textContent,
                    id: course_el.dataset.key
                }

                if ([].concat(config.hide, config.show)
                    .some(ref => course_match(ref, course))) {
                    course_el.hidden = true
                }
            })
    }


    /**
     * 当前页面是否是是这个课程的页面
     * @param {Element} course 
     * @todo 打开文件夹时，`id`不是课程id
     */
    function is_current_page(course) {
        const current_id_match = window.location.href.match(/\?id=(\d+)/)
        if (current_id_match) {
            return current_id_match[1] === course.id
        } else {
            return false
        }
    }

    /**
     * 添加课程
     * @param {CourseDescription} course 
     */
    function append_course(course) {
        const anchor = document.createElement('a')
        anchor.dataset.key = course.id
        anchor.href = `https://lexue.bit.edu.cn/course/view.php?id=${course.id}`
        if (is_current_page(course)) {
            anchor.classList.add('active')
        }
        anchor.classList.add('list-group-item', 'list-group-item-action')

        anchor.innerHTML =
            `<div class="ml-1">
                <div class="media">
                    <span class="media-left">
                        <i class="icon fa fa-${course.icon || 'graduation-cap'} fa-fw " aria-hidden="true"></i>
                    </span>
                    <span class="media-body">${course.name}</span>
                </div>
            </div>`


        const li = document.createElement("li")
        li.appendChild(anchor)
        document.querySelector("#nav-drawer > nav.list-group:last-child > ul")
            .appendChild(li)
    }

    hide_courses()
    config.show.forEach(append_course)

})()
