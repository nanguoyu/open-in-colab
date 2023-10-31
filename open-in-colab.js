// ==UserScript==
// @name         Open in Colab
// @updateURL       https://raw.githubusercontent.com/nanguoyu/open-in-colab/master/dist/open-in-colab.js
// @downloadURL     https://raw.githubusercontent.com/nanguoyu/open-in-colab/master/dist/open-in-colab.js
// @version      0.3
// @description  Open a GitHub notebook in Colab.
// @author       Dong Wang
// @match        https://github.com/*
// @grant        none
// @license      GPL-3.0
// @copyright       2023, Dong Wang, AKA nanguoyu, (https://wangdongdong.wang and https://www.nanguoyu.com)
// ==/UserScript==

(function() {
    'use strict';

    var lastPathname = null;

    // Function to create the floating button
    function createFloatingButton() {
        var existingButton = document.getElementById("open-in-colab-button");
        if (!existingButton && window.location.pathname.endsWith('.ipynb')) {
            // Create the button element
            var button = document.createElement("button");
            button.textContent = "Open in Colab";
            button.id = "open-in-colab-button";
            button.style.position = "fixed";
            button.style.bottom = "20px";
            button.style.right = "20px";
            button.style.zIndex = "1000";
            button.style.padding = "10px 15px";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.backgroundColor = "#F76B1C";
            button.style.color = "white";
            button.style.cursor = "pointer";
            button.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

            // Add click event to the button
            button.addEventListener("click", function() {
                // Extract username, repository, branch, and file path from the URL
                let pathArray = window.location.pathname.split('/');
                let username = pathArray[1];
                let repository = pathArray[2];
                let branch = pathArray[4];
                let filePath = pathArray.slice(5).join('/');

                // Construct the Colab URL
                let colabUrl = `https://colab.research.google.com/github/${username}/${repository}/blob/${branch}/${filePath}`;

                // Open the notebook in a new tab
                window.open(colabUrl, '_blank').focus();
            });

            // Add the button to the body
            document.body.appendChild(button);
        }
    }

    // Function to remove the floating button
    function removeFloatingButton() {
        var existingButton = document.getElementById("open-in-colab-button");
        if (existingButton) {
            existingButton.remove();
        }
    }

    // Check the URL every 1000 milliseconds
    setInterval(function() {
        if (lastPathname !== window.location.pathname) {
            lastPathname = window.location.pathname;

            if (window.location.pathname.endsWith('.ipynb')) {
                createFloatingButton();
            } else {
                removeFloatingButton();
            }
        }
    }, 1000);
})();
