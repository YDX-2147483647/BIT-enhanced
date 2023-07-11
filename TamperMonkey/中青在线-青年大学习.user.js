// ==UserScript==
// @name         中青在线-青年大学习
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  显示控件，调整速度
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        *://h5.cyol.com/special/daxuexi/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict'
  const video = document.querySelector('video#Bvideo')
  video.setAttribute('controls', '')
  video.playbackRate = 1.3
})()
