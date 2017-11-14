// ==UserScript==
// @name         acgn-vote
// @version      beta 1.2
// @description  easy to vote
// @author       Juisen
// @match        https://acgn-stock.com/*
// @grant        none
// ==/UserScript==

function addPluginMenu() {
    const pluginMenu = $(`
        <li class="nav-item">
          <a class="nav-link btn btn-primary" href="#" id="block-vote">投票</a>
        </li>
        <li class="nav-item">
          <a class="nav-link btn btn-primary" href="#" id="text-Return">複製</a>
        </li>
                <li class="nav-item">
          <a class="nav-link btn btn-primary" href="#" id="test-01">AutoVote</a>
        </li>
      `).insertAfter($(".nav-item").last());
    pluginMenu.find("#block-vote").on("click", blockVote);
    pluginMenu.find("#text-Return").on("click", textReturn);
    pluginMenu.find("#test-01").on("click", autoVote);
}

function autoVote() {
    blockVote();
    setTimeout(function () {
        autoagree();
    }, 1000);
    setTimeout(function () {
        logCheck();
    }, 3000);
}

function openfolder() {
    var loadtext = $(".d-block.h4:eq(6)").text();
    if (loadtext == "") {
        setTimeout(function () {
            openfolder();
        }, 1000);
    } else {
        $(".d-block.h4:eq(3)").click();
        $(".d-block.h4:eq(6)").click();
        clearInterval();
    }
}

function blockVote() {
    $("button.btn.btn-primary.btn-sm:eq(0)").click();
}

function autoagree() {
    $('div[btn btn-primary]' && 'button[type="submit"]').click();
}

function logCheck() {
    var st = document.getElementsByClassName("logData")[0].innerText.indexOf(document.getElementsByClassName("dropdown-toggle")[0].innerText);
    if (st == -1) {
        setTimeout(function () {
            logCheck();
        }, 1000);
    } else {
        textReturn();
    }
}

function textReturn() {
    var subbutton = document.getElementById('text-Return');
    var content = '<div>' + document.getElementsByClassName("logData")[0].innerHTML.replace(/\n/g, '').replace(/ /gi, '') + '</div>';
    var text = $(content).text();
    var copyThis = text;
    new Clipboard('.btn', {
        text: function (trigger) {
            return copyThis;
        }
    });
    subbutton.innerText = "已複製";
    setTimeout(function () {
        //do what you need here
        subbutton.innerText = "複製";
    }, 5000);
}

(function () {
    addPluginMenu();
    var script = document.createElement("SCRIPT");
    onload = openfolder();
    script.src = 'https://cdn.jsdelivr.net/npm/clipboard@1/dist/clipboard.min.js';
    script.type = 'text/javascript';
    script.onload = function () {
        var $ = window.jQuery;
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();