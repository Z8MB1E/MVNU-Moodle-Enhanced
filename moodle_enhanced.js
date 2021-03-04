// ==UserScript==
// @name         MVNU Moodle Enhanced™
// @namespace    https://onyxsimple.com
// @version      0.5.9
// @description  Provides a variety of enhancements to the MVNU Moodle experience.
// @author       Jason Fraley (Z8MB1E)
// @license      All Rights Reserved
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=computerboy1999@gmail.com&item_name=MVNU+Moodle+Enhanced+donation
// @contributionAmount $2.00
// @match        https://courses.mvnu.edu/*
// @exclude      https://courses.mvnu.edu/login/index.php
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.ui.position.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.min.js
// @grant        none
// ==/UserScript==

/**============================================
 *               COOKIE FUNCTIONS
 *=============================================**/

function setCookie(cname, cvalue, exdays) {
  if (exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  document.cookie = cname + "=" + cvalue + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/*=============== END OF COOKIE FUNCTIONS ==============*/

(function () {
  "use strict";

  class EnhancedClass {
    constructor() {
      this.log = function (msg) {
        console.log(`[Enhanced] ${msg}`);
      };
      this.warn = function (msg) {
        console.warn(`[Enhanced] ${msg}`);
      };
      this.error = function (msg) {
        console.error(`[Enhanced] ${msg}`);
      };

      this.toast = function (text, icon = "info", hideAfter = 5000) {
        $.toast({
          heading: "MVNU Moodle Enhanced&reg;",
          text: text,
          icon: icon,
          loader: true, // Change it to false to disable loader
          loaderBg: "#9EC600", // To change the background
          hideAfter: hideAfter,
        });
      };

      this.toastRand = function (
        chance = 50,
        text,
        icon = "info",
        hideAfter = 5000
      ) {
        var rand = Math.round(Math.random() * 100);
        if (rand <= chance) {
          Enhanced.log(
            `Toast message displayed after ${rand} within ${chance}%.`
          );
          this.toast(text, icon, hideAfter);
        }
      };

      this.toastDelay = function (
        delay = 30,
        text,
        icon = "info",
        hideAfter = 5000
      ) {
        Enhanced.log(
          `A new toast message has been set to appear after a ${delay} second delay.`
        );
        var delayedToast = setTimeout(function () {
          Enhanced.toast(text, icon, hideAfter);
        }, delay * 1000);
      };

      // Helper functions!
      this.chance = function (chance = 50, callback) {
        var rand = Math.round(Math.random() * 100);
        if (rand <= chance) {
          if (typeof callback == "function") {
            Enhanced.log(`Chance succeeded with ${rand} within ${chance}%.`);
            return callback();
          } else {
            console.error("Enhanced.chance is not returning a function!");
          }
        }
      };
    }
  }

  window.Enhanced = new EnhancedClass();

  var $ = window.jQuery;

  if (window.jQuery) {
    Enhanced.log("jQuery is loaded!");
  } else {
    Enhanced.log("jQuery is NOT loaded!");
  }

  // Load context menu CSS
  Enhanced.log("Importing context menu CSS...");
  var CM = document.createElement("link");
  CM.rel = "stylesheet";
  CM.href =
    "https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.css";
  document.head.appendChild(CM);
  Enhanced.log("Import completed!");

  // Load toast CSS
  Enhanced.log("Importing toast CSS...");
  var TST = document.createElement("link");
  TST.rel = "stylesheet";
  TST.href =
    "https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.min.css";
  document.head.appendChild(TST);
  Enhanced.log("Import completed! Testing toast script...");

  var darkModeStyle = `
    /* MAIN SITE */
    body {
        color: azure;
    }
    .navbar {
        background: #263238;
    }
    .navbar-light .nav-link {
        color: #e4eaec!important;
    }
    .navbar-light .navbar-nav .nav-link {
        color: #ced4da!important;
    }
    #page {
        background: #212529;
    }
    h1, h2, h3, h4, h5, h6, .h1, .h2, .path-calendar .maincalendar .calendar-controls .current, .h3, .h4, .h5, .h6 {
        color: #ced4da;
    }
    .card, #page-enrol-users #filterform, .que .history, .userprofile .profile_tree section, .groupinfobox, .well {
        background-color: #263238;
    }
    a {
        color: #e4eaec;
    }
    a:hover {
        color: #5bc0de;
    }
    [data-region="blocks-column"] {
        background: #263238;
    }
    .calendar_event_course {
        background-color: #526069;
    }
    .btn-outline-secondary {
        color: #ccc;
        border-color: #526069 !important;
    }
    .btn-outline-secondary:hover {
        background-color: #b9e4ff;
        color: #212529;
        border-color: #b9e4ff;
    }
    .btn-secondary, .btn-default {
        color: #eee;
        background: #526069;
        border-color: #526069;
    }
    .pagelayout-course #section-0 {
        background-color: #243842!important;
        border-radius: 5px;
        padding: 10px;
    }
    .no-overflow p *:not([style]), .no-overflow p *[style=""], .content *:not([style]), .content *[style=""] {
        color: azure !important;
    }
    .course-content ul.gridicons li .image_holder {
        border-color: #526069;
        background-color: #526069;
    }
    #gridshadebox_content {
        background: #263238;
        border: solid 2px #526069;
        padding: 20px 15px;
    }
    .pagelayout-course .course-content .section.main {
        background: #243842;
    }
    .pagelayout-course .course-content .sectionname a {
        color: #9ac5da!important;
    }
    .que .content {
        background: #263238;
    }
    .que .qtext {
        background: #35464e;
    }
    .que .qtext div {
        color: azure !important;
    }
    .btn-inverse {
        color: azure;
        background: #212529;
    }
    .btn-primary {
        background-color: #1f354a;
        border-color: #24313e;
    }
    .qnbutton.notyetanswered, .qnbutton.notanswered, .qnbutton.invalidanswer {
        background-color: #0987ad !important;
    }
    div.answer * span {
        color: azure;
    }
    .generaltable tr td, .collection tr td {
        background: #3c535f;
        border-color: #768894;
        color: azure !important;
    }
    .generaltable tr:hover td, .collection tr:hover td {
        background: #2aa2c5;
    }
    .modal-content, .moodle-dialogue-base .moodle-dialogue-wrap.moodle-dialogue-content {
        background-color: #242525;
        color: lightgrey !important;
    }
    .alert-warning, #page-admin-index .adminwarning, .uninstalldeleteconfirmexternal, .que .outcome, .que .comment {
        background-color: #3e3e3e;
        border-color: #9c9c9c;
    }
    .que.multichoice .answer .specificfeedback {
        padding: 10px;
        background: #5cb85c82;
        border-radius: 3px;
    }
    .rightanswer span * {
        color: #a7e2a7;
        font-weight: bold;
    }
    .table, table.collection, table.flexible, .generaltable {
        color: #97bed2;
    }
    .moodle-actionmenu a.dropdown-toggle {
        color: #263238!important;
    }
    .form-control, input[type="text"] {
        color: #f3f7f9;
        background-color: #212529;
        border: 1px solid #526069;
    }
    .form-control:focus, input:focus[type="text"] {
        color: #f3f7f9;
        background-color: #11161b;
        border-color: slategrey;
    }
    .was-validated .form-control:invalid:focus, .was-validated input:invalid:focus[type="text"], .form-control.is-invalid:focus, input.is-invalid:focus[type="text"] {
        border-color: rgb(62 142 247);
    }
    .qnbutton.answersaved {
        background-color: #212529!important;
    }
    .editor_atto .editor_atto_content_wrap {
        border: 1px solid #263238!important;
    }
    .file-picker .fp-content {
        background: #373a3c;
    }
    .path-mod-assign td.submissionstatussubmitted, .path-mod-assign div.submissionstatussubmitted, .path-mod-assign a:link.submissionstatussubmitted {
        background-color: #5cb85c;
    }
    .path-mod-assign td.submissionnotgraded, .path-mod-assign div.submissionnotgraded {
        background-color: #b35855;
    }
    hr {
        border-top: 1px solid #526069;
    }
    .path-grade-report-user .user-grade.generaltable .levelodd {
        background-color: #212529;
    }
    .table-striped tbody tr:nth-of-type(odd), table.collection tbody tr:nth-of-type(odd), table#explaincaps tbody tr:nth-of-type(odd), table#defineroletable tbody tr:nth-of-type(odd), table.grading-report tbody tr:nth-of-type(odd), table#listdirectories tbody tr:nth-of-type(odd), table.rolecaps tbody tr:nth-of-type(odd), table.userenrolment tbody tr:nth-of-type(odd), form#movecourses table tbody tr:nth-of-type(odd), #page-admin-course-index .editcourse tbody tr:nth-of-type(odd), .forumheaderlist tbody tr:nth-of-type(odd), table.flexible tbody tr:nth-of-type(odd), .generaltable tbody tr:nth-of-type(odd) {
        background-color: #364d5d;
    }
    .nav-tabs {
        border-bottom: 1px solid #526069;
    }
    .table-hover tbody tr:hover, table.grading-report tbody tr:hover, .forumheaderlist tbody tr:hover, .generaltable tbody tr:hover, table.flexible tbody tr:hover, .category_subcategories tbody tr:hover, table#modules tbody tr:hover, table#permissions tbody tr:hover {
        color: #f3f7f9 !important;
        background-color: #2f4c69;
    }
    .btn-outline-secondary:not(:disabled):not(.disabled):active, .btn-outline-secondary:not(:disabled):not(.disabled).active, .show>.btn-outline-secondary.dropdown-toggle {
        background-color: #0097c3;
        border-color: #4b8b9e !important;
    }
    .dropdown-item:hover, .dropdown-item:focus {
        background-color: #0080a7;
    }
    .card, #page-enrol-users #filterform, .que .history, .userprofile .profile_tree section, .groupinfobox, .well {
        background-color: #212529;
    }
    button.close, .moodle-dialogue-base button.closebutton {
        padding: 2px;
        background-color: #ff4c52;
        color: white;
    }
    .close:hover, .moodle-dialogue-base .closebutton:hover {
        color: #fff;
    }
    fieldset legend.ftoggler {
        background: #242525;
    }
    fieldset div.fcontainer {
        border: 0;
    }
    div.moodle-dialogue-hd.yui3-widget-hd {
        color: white !important;
    }
    .quiztimer {
        background: #263238;
    }
    .dndupload-arrow {
        filter: invert(1)hue-rotate(160deg)contrast(0.75);
    }
    /* .path-mod-assign div.fileuploadsubmissiontime {
        float: right;
        clear: both;
    } */
    .path-mod-assign td.submissionstatusdraft, .path-mod-assign div.submissionstatusdraft, .path-mod-assign a:link.submissionstatusdraft {
        background-color: #bbbb55;
    }
    .fp-iconview .fp-filename-field .fp-filename {
        background: none;
    }
    .fp-iconview .fp-thumbnail {
        border: 1px solid #999;
        border-radius: 10px;
    }
    .fp-iconview .fp-thumbnail img {
        border: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    `;

  var style = `    
    /* EDITOR TOOLS */
    .editor_atto .editor_atto_toolbar {
        display: flex;
        flex-flow: wrap;
    }

    .editor_atto .editor_atto_toolbar .atto_group, .editor_atto .editor_atto_content_wrap .atto_group {
        margin: 0 !important;
    }
    .dropdown-menu {
        background-color: #373a3c;
        border: 1px solid #373a3c;
        padding: 5px;
    }

    / * END EDITOR TOOLS */
    `;

  Enhanced.log("Injecting objectively better CSS styling...");
  var styleObj = document.createElement("style");
  styleObj.id = "Enhanced_CSS";
  styleObj.innerHTML = style;

  document.body.appendChild(styleObj);
  if (document.getElementById("Enhanced_CSS")) {
    Enhanced.log("CSS styling successfully injected!");
  }

  Enhanced.log("Unlocking any available editor tools...");
  setTimeout(function () {
    var textEditTools = document.getElementsByClassName("atto_group");
    if (textEditTools.length > 0) {
      for (let i = 0; i < textEditTools.length; i++) {
        const element = textEditTools[i];
        element.removeAttribute("hidden");
        element.removeAttribute("style");
      }

      Enhanced.log("Unlocked editor tools!");
      Enhanced.toast("Unlocked editor tools!", "success");

      // fixEditorIssues();
    } else {
      Enhanced.log("Editor tools were not detected.");
    }
  }, 3000);

  // function fixEditorIssues() {
  //   if
  // }

  // Auto-click on sidebar element to remove issue
  $("a.list-group-item.activity-sections.active").click();

  /**========================================================================
   *                           DARK MODE FEATURE
   *========================================================================**/
  // Determine if Dark Mode is activated
  var darkmode = false;

  function toggleDarkMode(force) {
    if (document.getElementById("dm_invertScheme")) {
      // document.getElementById("dm_invertScheme").remove();
      toggleInversionMode();
    }
    if (force) {
      setCookie("darkmode", "true");
      document.body.appendChild(darkModeCss);
      document
        .getElementById("toggleDarkModeIcon")
        .classList.replace("fa-moon-o", "fa-lightbulb-o");
      darkmode = !darkmode;
      return;
    }
    if (!darkmode) {
      setCookie("darkmode", "true");
      document.body.appendChild(darkModeCss);
      document
        .getElementById("toggleDarkModeIcon")
        .classList.replace("fa-moon-o", "fa-lightbulb-o");
      Enhanced.toast("Dark Mode enabled.", "info");
    } else {
      setCookie("darkmode", "false");
      document.getElementById("darkModeStyle").remove();
      document
        .getElementById("toggleDarkModeIcon")
        .classList.replace("fa-lightbulb-o", "fa-moon-o");
      if (document.getElementById("dm_whiteText")) {
        document.getElementById("dm_whiteText").remove();
      }
      Enhanced.toast("Dark Mode disabled.", "warning");
    }
    darkmode = !darkmode;
  }

  // Establish the new Dark Mode theme
  var darkModeCss = document.createElement("style");

  darkModeCss.id = "darkModeStyle";
  darkModeCss.innerHTML = darkModeStyle;

  // Add a toggle button for toggling dark mode on the webpage
  var darkModeBtn = document.createElement("li");
  darkModeBtn.classList.add("nav-item");
  darkModeBtn.id = "toggleDarkMode";
  darkModeBtn.innerHTML =
    '<a id="toggleDarkModeLink" class="nav-link" role="button" href="#"><i id="toggleDarkModeIcon" class="icon fa fa-moon-o" aria-hidden="true"></i></a>';

  document
    .getElementsByClassName(
      "nav navbar-nav ml-auto mr-2 h-100 right-menu justify-content-end"
    )[0]
    .insertAdjacentElement("afterbegin", darkModeBtn);

  document.getElementById("toggleDarkMode").onclick = function () {
    toggleDarkMode();
  };

  // Add options for context menu
  // - White text forced -
  var whiteText = document.createElement("style");
  whiteText.innerHTML = `
  .no-overflow p *, .no-overflow p *, .content *, .content * {
    color: azure !important;
  }
  `;
  whiteText.id = "dm_whiteText";

  // Finalize and apply all changes
  // document.body.appendChild(darkmode);
  if (getCookie("darkmode") == "true") {
    toggleDarkMode(true);
  }

  /**--------------------------------------------
   *               ADDITIONAL FEATURES
   *---------------------------------------------**/

  var opt_whiteText = getCookie("enhanced_whiteText") == "true" ? true : false;

  if (opt_whiteText) toggleWhiteText(false);

  function toggleWhiteText(log = true) {
    if (darkmode) {
      if (document.getElementById("dm_whiteText")) {
        document.getElementById("dm_whiteText").remove();
        setCookie("enhanced_whiteText", "false");
        if (log) Enhanced.toast("White text mode disabled.", "warning");
      } else {
        document.body.appendChild(whiteText);
        setCookie("enhanced_whiteText", "true");
        if (log) Enhanced.toast("White text mode enabled.", "info");
      }
      // return false; // Do not close the menu after clicking an item
    } else {
      alert("You need to be in Dark Mode to force white text!");
      // return false; // Do not close the menu after clicking an item
    }
  }

  var inversionMode =
    getCookie("enhanced_inversionMode") == "true" ? true : false;

  if (inversionMode) toggleInversionMode(false);

  function toggleInversionMode(log = true) {
    if (document.getElementById("dm_invertScheme")) {
      document.getElementById("dm_invertScheme").remove();
      if (log) Enhanced.toast("Removed inversion filter from page.", "warning");
      setCookie("enhanced_inversionMode", "false");
    } else {
      if (darkmode) {
        if (document.getElementById("dm_whiteText")) {
          document.getElementById("dm_whiteText").remove();
        }
        // toggleWhiteText(false);
        toggleDarkMode();
      }

      var dm_inversion = document.createElement("style");
      dm_inversion.id = "dm_invertScheme";
      dm_inversion.innerHTML = `
      html { 
        filter: invert(1)contrast(0.9)hue-rotate(-160deg)saturate(1.5)brightness(1.15); 
      }
      `;
      document.body.appendChild(dm_inversion);
      if (log) Enhanced.toast("Applied inversion filter to full page.", "info");
      setCookie("enhanced_inversionMode", "true");
      // return;
    }
  }

  var modernFont = getCookie("enhanced_modernFont") == "true" ? true : false;

  if (modernFont) toggleModernFont(false);

  function toggleModernFont(log = true) {
    if (document.getElementById("dm_modernFont")) {
      document.getElementById("dm_modernFont").remove();
      if (log) Enhanced.toast("Disabled modern font.", "warning");
      setCookie("enhanced_modernFont", "false");
    } else {
      var dm_poppinsFont = document.createElement("style");
      dm_poppinsFont.id = "dm_modernFont";
      dm_poppinsFont.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

      body {
        font-family: 'Poppins', sans-serif !important;
      }
      
      h1, h2, h3, h4, h5, h6, .h1, .h2, .path-calendar .maincalendar .calendar-controls .current, .h3, .h4, .h5, .h6 {
        font-family: 'Poppins', sans-serif !important;
      }
      `;
      document.body.appendChild(dm_poppinsFont);
      if (log) Enhanced.toast("Enabled modern font.", "info");
      setCookie("enhanced_modernFont", "true");
      // return;
    }
  }

  console.log(
    `Checking options: ${whiteText}, ${inversionMode}, ${modernFont}`
  );

  /*---------- END OF ADDITIONAL FEATURES -------*/

  /**--------------------------------------------
   *               LEAVE A REVIEW
   *---------------------------------------------**/

  if (getCookie("enhanced_reviewNotify") == "true") {
    var rand = (Math.round(Math.random() * 60) + 30) * 1000;
    Enhanced.log(
      "Leave a review notification will pop up in " + rand / 1000 + " seconds."
    );
    var notify = setTimeout(function () {
      window.notifyToast = $.toast({
        text:
          "MVNU Moodle Enhanced&trade; is under constant development. Would you be so kind as to <a href='https://greasyfork.org/en/scripts/422185-mvnu-moodle-enhanced/feedback' onclick='return window.wentToReview();' target='_blank'>leave some feedback?</a>",
        heading: "Leave a comment!",
        icon: "warning",
        allowToastClose: true,
        hideAfter: false,
      });
    }, rand);
  } else if (getCookie("enhanced_reviewNotify") == "false") {
    Enhanced.log(
      "Client followed feedback link, will not show review notification!"
    );
  } else {
    setCookie("enhanced_reviewNotify", "true");
    Enhanced.log(
      "Detected missing review cookie, inserted cookie into browser."
    );
  }

  window.wentToReview = function () {
    Enhanced.log("Client has followed feedback link!");
    setCookie("enhanced_reviewNotify", "false");
    window.notifyToast.update({
      heading: "Thank you!",
      text:
        "Thank you for leaving your feedback on MVNU Moodle Enhanced&trade;! I won't ask you again.",
      icon: "success",
      hideAfter: 10000,
    });
  };

  /*--------------- END OF LEAVE A REVIEW --------------*/

  /**--------------------------------------------
   *               REPORT AN ISSUE
   *---------------------------------------------**/

  Enhanced.chance(25, function () {
    Enhanced.toastDelay(
      Math.round(Math.random() * 60) + 30,
      "Discovered an issue with this add-on? Report it on our <a href='https://github.com/Z8MB1E/MVNU-Moodle-Enhanced/issues' target='_blank'>issue tracker!</a>",
      "info",
      15000
    );
  });

  /*--------------- END OF REPORT AN ISSUE --------------*/

  // Add context menu
  $.contextMenu({
    selector: "#toggleDarkMode",
    items: {
      toggleWhiteText: {
        name: "Toggle White Text",
        icon: function (opt, $itemElement, itemKey, item) {
          if (document.getElementById("dm_whiteText")) {
            $itemElement.html(
              '<i class="fa fa-toggle-on" aria-hidden="true"></i> ' + item.name
            );
            // return "fa-toggle-on";
          } else {
            $itemElement.html(
              '<i class="fa fa-toggle-off" aria-hidden="true"></i> ' + item.name
            );
            // return "fa-toggle-off";
          }
        },
        callback: function () {
          toggleWhiteText();
          return false; // Do not close the menu after clicking an item
        },
      },
      invertColorScheme: {
        name:
          "Invert Color Scheme<br/><span><small>Inverts colors of entire page. <span style='color: red;border-bottom: 1px dotted red;' title='This feature is in development.'>(Indev)</span></small></span>",
        isHtmlName: true,
        icon: function (opt, $itemElement, itemKey, item) {
          if (document.getElementById("dm_invertScheme")) {
            $itemElement.html(
              '<i class="fa fa-toggle-on" aria-hidden="true"></i> ' + item.name
            );
            // return "fa-toggle-on";
          } else {
            $itemElement.html(
              '<i class="fa fa-toggle-off" aria-hidden="true"></i> ' + item.name
            );
            // return "fa-toggle-off";
          }
        },
        callback: function () {
          toggleInversionMode();
          return false; // Do not close the menu after clicking an item
        },
      },
      enableModernFont: {
        name:
          "Toggle Modern Font<br/><span><small>Inverts colors of entire page. <span style='color: red;border-bottom: 1px dotted red;' title='This feature is in development.'>(Indev)</span></small></span>",
        isHtmlName: true,
        icon: function (opt, $itemElement, itemKey, item) {
          if (document.getElementById("dm_modernFont")) {
            $itemElement.html(
              '<i class="fa fa-toggle-on" aria-hidden="true"></i> ' + item.name
            );
            // return "fa-toggle-on";
          } else {
            $itemElement.html(
              '<i class="fa fa-toggle-off" aria-hidden="true"></i> ' + item.name
            );
            // return "fa-toggle-off";
          }
        },
        callback: function () {
          toggleModernFont();
          return false; // Do not close the menu after clicking an item
        },
      },
      credits: {
        name: "<small>MVNU Moodle Enhanced™ created by Jason F.</small>",
        isHtmlName: true,
        disabled: true,
      },
    },
  });

  /*============================ END OF DARK MODE FEATURE ============================*/
})();
