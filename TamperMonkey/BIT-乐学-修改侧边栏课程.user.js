// ==UserScript==
// @name         BIT-乐学-修改侧边栏课程
// @namespace    http://tampermonkey.net/
// @version      1.3.0-beta
// @description  在侧边栏添加并重新排列课程
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        https://lexue.bit.edu.cn/*
// @match        https://webvpn.bit.edu.cn/https/77726476706e69737468656265737421fcf25989227e6a596a468ca88d1b203b/*
// @grant        GM.getValue
// ==/UserScript==

// Moodle 好像是按某种规则挑选出最多 10 个课程。然而它并不能完全猜中，还不时更新，导致每次更新都要改。
// 在个人主页的课程概览可以筛选“进行中”“尚未开始的”或“过去的”课程。

// 您需要自己配置哪些课程要隐藏，哪些要显示。
// 1. 改为高级配置模式：前往 TamperMonkey → 设置 → 通用 → 配置模式，选为“高级”。
// 2. 找到“存储”：到这个脚本的编辑页，在上边栏切换到“存储”（位置与“编辑器”“设置”并排）。
// 3. 写入配置：在“存储”一栏写入 JSON，一般照猫画虎即可。
//    例如——
//    {
//        "show": [
//            { "name": "信号与系统-实验", "id": "10664", "icon": "signal" },
//            { "name": "电磁场与电磁波", "id": "10713", "icon": "globe" }
//        ],
//        "hide": [
//            { "name": "物理实验B-绪论", "id": "7661", "icon": "flask" },
//            "更多",
//            { "name": "学术用途英语12021-2022-1许子艳", "id": "8751", "comment": "错误课程" },
//            "乐学使用简明教程"
//        ]
//    }
//    详情见下面注释里的`Config`及`CourseDescription`。

(async function () {
    'use strict'

    /**
     * 课程描述
     * @typedef {Object} CourseDescription
     * @property {string} name - 想显示的课程名
     * @property {string} id - 课程链接最后的id，例如`https://lexue.bit.edu.cn/course/view.php?id=8819`就是`'8819'`
     * @property {?string} icon - FontAwesome 的图标名称，默认为`'graduation-cap'`。→ http://www.fontawesome.com.cn/faicons/
     * @property {?string} comment - 给自己看的注释，比如为什么要屏蔽这门课
     */

    /**
     * GM 存储的配置
     * @typedef {Object} Config
     * @property {CourseDescription[]} show - 想添加的课程，有序，显示时前面的在上
     * @property {(string | CourseDescription)[]} hide - 想隐藏的课程
     */


    /**
     * 加载 GM 存储的配置
     * @returns {Promise<Config>}
     */
    async function load_config() {
        return {
            show: await GM.getValue('show', []),
            hide: await GM.getValue('hide', []),
        }
    }

    const config = await load_config()

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
     * @param {CourseDescription} course 
     * @todo 打开文件夹时，`id`不是课程id
     */
    function is_current_page(course) {
        /** @type {HTMLAnchorElement} */
        const course_home = document.querySelector("[data-key='coursehome']")
        if (!course_home) {
            // 未打开课程
            return false
        }

        const url = new URL(course_home.href)
        const params = url.searchParams
        return params.get('id') === course.id
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
