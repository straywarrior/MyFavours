// ==UserScript==
// @name         Zhihu Page Helper
// @namespace    strayscript
// @version      0.3.1
// @description  Make Zhihu easier to use for me.
// @author       StrayWarrior
// @match        http*://*.zhihu.com/*
// @grant        unsafeWindow
// ==/UserScript==

(function() {
  'use strict';

  var self_remove = function(e) { e.remove(); }

  const MARK_ID = "page-helper-mark";
  var after_setup = function() {
    var mark = document.createElement("div");
    mark.id = MARK_ID;
    document.body.insertAdjacentElement("afterend", mark);
  }

  HTMLCollection.prototype.forEach = function(callback) {
    for (var i = 0; i < this.length; ++i) {
      callback(this[i]);
    }
  }

  var zhuanlan_clean_function = function() {
    document.getElementsByClassName("is-fixed is-bottom").forEach(self_remove);
    document.getElementsByClassName("CornerButtons").forEach(self_remove);
    document.getElementById("clean-button").remove();
  }

  var zhuanlan_setup_function = function() {
    if (document.getElementsByClassName("ColumnPageHeader-Button").length == 0) {
      return;
    }

    var cleanButton = document.createElement("button");
    var header = document.getElementsByClassName("ColumnPageHeader-Button")[0];
    header.insertAdjacentElement("afterbegin", cleanButton);
    cleanButton.id = "clean-button";
    cleanButton.setAttribute("class", "Button ColumnPageHeader-WriteButton Button--blue");
    cleanButton.style.setProperty("margin-right", "16px");
    cleanButton.innerText = "cleanup";
    cleanButton.addEventListener("click", zhuanlan_clean_function);

    after_setup();
  }

  setInterval(function() {
    if (document.getElementById(MARK_ID) != null) {
      return;
    }
    var hostname = location.hostname;
    if (hostname.includes("zhuanlan.zhihu.com")) {
      zhuanlan_setup_function();
    }
  }, 2000);
})();