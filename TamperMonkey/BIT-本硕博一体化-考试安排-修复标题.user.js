// ==UserScript==
// @name         BIT-本硕博一体化-考试安排-修复标题
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  将课程号改为课程名称
// @license      GPL-3.0-or-later
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        http://jxzxehallapp.bit.edu.cn/jwapp/sys/studentWdksapApp/*default/index.do
// @match        http://jxzxehallapp.bit.edu.cn/jwapp/sys/studentWdksapApp/*default/index.do*
// @grant        none
// ==/UserScript==

(function () {
  /**
   * 等待元素出现
   * @param {string} selector 元素的 CSS 选择器
   * @param {number} interval 单位为 ms
   * @returns {Promise<HTMLElement>}
   */
  function wait_until_presence (selector, interval) {
    return new Promise((resolve, reject) => {
      const check = setInterval(function () {
        if (document.querySelector(selector)) {
          clearInterval(check)
          resolve(document.querySelector(selector))
        }
      }, interval)
    })
  }

  const tests_to_take_btn = '#wdksap-wkks-btn' // 我的考试安排-未考考试-button
  const tests_to_take = tests_to_take_btn + ' ~ .wdksap-wkks-content .scenes-cbrt-card-view'

  function fix_titles () {
    const cards = document.querySelectorAll(tests_to_take)
    cards.forEach(card => {
      const heading = card.querySelector('h3')

      const course_id = heading.textContent
      if (course_id.match(/\d+/) && heading.title !== '') {
        heading.textContent = heading.title
        heading.title = course_id
      }
    })
  }

  wait_until_presence(tests_to_take_btn, 1000).then(fix_titles)
})()
