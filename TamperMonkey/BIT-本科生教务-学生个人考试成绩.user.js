// ==UserScript==
// @name         BIT-本科生教务-学生个人考试成绩
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  计算平均绩点
// @license      GPL-3.0-or-later
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        http://jwms.bit.edu.cn/jsxsd/kscj/cjcx_list
// @match        https://webvpn.bit.edu.cn/http/77726476706e69737468656265737421fae04c8f69326144300d8db9d6562d/jsxsd/kscj/cjcx_list
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict'

  /* spell-checker: disable */
  const selectors = {
    grade: '#dataList > * > tr > td:nth-child(5)',
    weight: '#dataList > * > tr > td:nth-child(7)',
    statistics: 'body > div:nth-child(12) > strong'
  }
  /* spell-checker: enable */

  function get_data () {
    const [grade_elements, weight_elements] = [selectors.grade, selectors.weight]
      .map(s => Array.from(document.querySelectorAll(s)))

    const [grades, weights] = [grade_elements, weight_elements].map(elements =>
      elements.map(e => Number(e.textContent))
    )

    return { grades, weights }
  }

  /**
   * @param {{grades: number[], weights: number[]}} param0
   */
  function calc_GPA ({ grades, weights }) {
    const products = grades.map((grade, index) => grade * weights[index])
    const sum = products.reduce((sum, p) => sum + p, 0)
    const total_weight = weights.reduce((sum, w) => sum + w)
    return sum / total_weight
  }

  /**
   * @param {Number} GPA_value
   */
  function show_GPA (GPA_value) {
    const output_element = document.querySelector(selectors.statistics)
    const { got, to_get } = output_element.textContent
      .match(/^已获得学分：(?<got>[\d.]+)\s+未获得学分：(?<to_get>[\d.]+)$/)
      .groups

    output_element.textContent = [
            `已获得 ${got} 学分，待获得 ${to_get} 学分。`,
            `当前页平均绩点为 ${GPA_value.toFixed(2)}。`
    ].join('')
  }

  show_GPA(calc_GPA(get_data()))
})()
