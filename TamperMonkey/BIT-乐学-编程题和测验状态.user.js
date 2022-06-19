// ==UserScript==
// @name         BIT-乐学-编程题和测验状态
// @namespace    http://tampermonkey.net/
// @version      0.2.2
// @description  读取编程题状态并显示
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        https://lexue.bit.edu.cn/course/view.php*
// @grant        none
// ==/UserScript==

// 上一版本：BIT-Programming-编程题状态（0.1）。

(function () {
    'use strict'

    function add_style_sheet() {
        const sheet = document.createElement('style')
        sheet.innerHTML = `
        .problem-state-true::after,
        .quiz-state-true::after
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
        
        .problem-state-null,
        .quiz-state-false
        {
            font-weight: bold;
        }
        .problem-state-null::after,
        .quiz-state-false::after
        {
            content: "（未）";
            color: skyblue;
        }
        `
        document.head.appendChild(sheet)
    }

    async function check_all_problems() {
        const problems = document.querySelectorAll("a[href*='lexue.bit.edu.cn/mod/programming/view']")
        for (const p of problems) {
            const state = await get_problem_state(get_URL_id(p.href))
            p.classList.add("problem-state-" + String(state))
        }
    }
    async function check_all_quizzes() {
        const quizzes = document.querySelectorAll("a[href*='lexue.bit.edu.cn/mod/quiz/view']")
        for (const q of quizzes) {
            const state = await get_quiz_state(q.href)
            q.classList.add('quiz-state-' + String(state))
        }
    }


    function get_URL_id(href) {
        const params = (new URL(href)).searchParams
        return params.get('id')
    }
    function get_problem_result_URL(problem_id) {
        return document.location.origin + "/mod/programming/result.php?" + `id=${problem_id}`
    }

    const parser = new DOMParser()

    /**
     * 获取编程题的情况
     * @param {String} problem_id 编程题的 id
     * @returns null 尚未提交
     * @returns undefined 正在排队或正在编译
     * @returns true 全部通过
     * @returns false 已提交但尚未全部通过
     */
    async function get_problem_state(problem_id) {
        const response = await fetch(get_problem_result_URL(problem_id))
        const response_text = await response.text()
        const doc = parser.parseFromString(response_text, 'text/html')

        const headings = doc.querySelectorAll("[role=main] > h3")
        if (headings[0].textContent == "查看程序的测试结果" &&
            headings[0].nextSibling.textContent == "找不到您的程序")
            return null
        else if (headings[headings.length - 1].textContent != "测试结果")
            return undefined
        else {
            const result_text = doc.querySelector('#test-result-detail > p:first-child').textContent
            let result = result_text.match(/测试结果：共 (?<total>\d+) 个测试用例，您的程序通过了其中的 (?<accepted>\d+) 个，未能通过的有 (?<rejected>\d+) 个。/).groups
            for (const i in result)
                result[i] = parseInt(result[i])

            return result.rejected == 0
        }
    }

    /**
     * 获取测验的情况
     * @param {String} href 测验的 URL
     * @returns true 已完成
     * @returns false 未完成
     */
    async function get_quiz_state(href) {
        const response = await fetch(href)
        const response_text = await response.text()
        const doc = parser.parseFromString(response_text, 'text/html')

        const heading = doc.querySelector("[role=main] > h3")
        return heading != null && heading.textContent == "您上次尝试的概要"
    }


    add_style_sheet()
    check_all_problems()
    check_all_quizzes()

})()
