// ==UserScript==
// @name         BIT-Programming-编程题状态
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  读取编程题状态并显示
// @author       Y.D.X.
// @match        http://lexue.bit.edu.cn/course/view.php*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function add_style_sheet() {
        let sheet = document.createElement('style');
        sheet.innerHTML = `
        .problem-state-true::after
        {
            content: " ✓";
            color: #00ff00;
        }
        
        .problem-state-false
        {
            font-weight: bold;
        }
        .problem-state-false::after
        {
            content: " ✗";
            color: red;
        }
        
        .problem-state-undefined::after
        {
            content: " ↻";
            color: purple;
        }
        
        .problem-state-null
        {
            font-weight: bold;
        }
        .problem-state-null::after
        {
            content: "（未）";
            color: skyblue;
        }
        `;
        document.head.appendChild(sheet);
    }

    async function check_all_problems() {
        const problems = document.querySelectorAll("a[href*='lexue.bit.edu.cn/mod/programming/']");
        for (const p of problems) {
            let state = await check_state(get_problem_id(p.href));
            p.classList.add("problem-state-" + String(state));
        }
    }

    function get_problem_id(href) {
        let params = (new URL(href)).searchParams;
        return params.get('id');
    }
    function get_result_URL(problem_id) {
        return document.location.origin + "/mod/programming/result.php?" + `id=${problem_id}`;
    }

    /**
     * 检查编程题的情况
     * @param {String} problem_id 编程题的 id
     * @returns null 尚未提交
     * @returns undefined 正在排队或正在编译
     * @returns true 全部通过
     * @returns false 已提交但尚未全部通过
     */
    async function check_state(problem_id) {
        let response = await fetch(get_result_URL(problem_id));
        let response_text = await response.text();
        let parser = new DOMParser();
        let doc = parser.parseFromString(response_text, 'text/html');

        const headings = doc.querySelectorAll("[role=main] > h3");
        if (headings[0].textContent == "查看程序的测试结果" &&
            headings[0].nextSibling.textContent == "找不到您的程序")
            return null;
        else if (headings[headings.length - 1].textContent != "测试结果")
            return undefined;
        else {
            const result_text = doc.querySelector('#test-result-detail > p:first-child').textContent;
            let result = result_text.match(/测试结果：共 (?<total>\d+) 个测试用例，您的程序通过了其中的 (?<accepted>\d+) 个，未能通过的有 (?<rejected>\d+) 个。/).groups;
            for (const i in result)
                result[i] = parseInt(result[i]);

            return result.rejected == 0;
        }
    }


    add_style_sheet();
    check_all_problems();

})();
