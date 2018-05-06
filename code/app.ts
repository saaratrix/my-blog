(function () {
    document.addEventListener("DOMContentLoaded", () => {
        let elementRoot = document.getElementById("contents");
        if (!elementRoot) {
            elementRoot = document.querySelector(".post-body") as HTMLElement;
        }
        // No codeblocks found!
        if (!elementRoot) {
            return;
        }

        let blocksList = elementRoot.querySelectorAll("pre.prettyprint");
        let blocks = new Array(blocksList.length);

        for (let i = 0; i < blocksList.length; i++) {
            blocks[i] = blocksList[i];
        }

        let codeBlockToggler = new SaaratrixBlog.CodeBlockToggler();

        codeBlockToggler.setupSnippetToggleForBlocks(blocks);
    });
})();