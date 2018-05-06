var SaaratrixBlog;
(function (SaaratrixBlog) {
    var CodeBlockToggler = /** @class */ (function () {
        function CodeBlockToggler() {
        }
        CodeBlockToggler.prototype.setupSnippetToggleForBlocks = function (blocks) {
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i];
                this.setupSnippetToggleForBlock(block);
            }
        };
        CodeBlockToggler.prototype.setupSnippetToggleForBlock = function (block) {
            var lines = block.querySelectorAll("li").length;
            // Prettyprint might not have worked its magic yet so we need to get the rows from splitting on \n
            if (lines === 0) {
                var code = block.querySelector("code").innerText;
                lines = code.split("\n").length;
            }
            // If still rows === 0 then just exit!
            // Also if too few rows then just always show
            if (lines === 0 || lines < 10) {
                return;
            }
            var that = this;
            // Start the opposite because we're calling toggleVisibility()
            var isVisible = !(block.hasAttribute("data-start-visible") && block.getAttribute("data-start-visible") === "true") ? true : false;
            var button = document.createElement("button");
            button.style.display = "block";
            button.style.marginTop = "5px";
            block.parentElement.insertBefore(button, block);
            button.addEventListener("click", function () {
                toggleVisibility();
            });
            function toggleVisibility() {
                if (isVisible) {
                    isVisible = false;
                    that.hideCode(block, button, lines);
                }
                else {
                    isVisible = true;
                    that.showCode(block, button);
                }
            }
            toggleVisibility();
        };
        CodeBlockToggler.prototype.hideCode = function (block, button, lines) {
            button.innerHTML = "Show code - " + lines + " lines";
            button.style.marginBottom = "5px";
            block.style.display = "none";
        };
        CodeBlockToggler.prototype.showCode = function (block, button) {
            button.innerHTML = "Hide code";
            button.style.marginBottom = "";
            block.style.display = "";
        };
        return CodeBlockToggler;
    }());
    SaaratrixBlog.CodeBlockToggler = CodeBlockToggler;
})(SaaratrixBlog || (SaaratrixBlog = {}));
(function () {
    document.addEventListener("DOMContentLoaded", function () {
        var elementRoot = document.getElementById("contents");
        if (!elementRoot) {
            elementRoot = document.querySelector(".post-body");
        }
        // No codeblocks found!
        if (!elementRoot) {
            return;
        }
        var blocksList = elementRoot.querySelectorAll("pre.prettyprint");
        var blocks = new Array(blocksList.length);
        for (var i = 0; i < blocksList.length; i++) {
            blocks[i] = blocksList[i];
        }
        var codeBlockToggler = new SaaratrixBlog.CodeBlockToggler();
        codeBlockToggler.setupSnippetToggleForBlocks(blocks);
    });
})();
//# sourceMappingURL=blogcode.js.map