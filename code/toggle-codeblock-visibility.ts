module SaaratrixBlog {
    export class CodeBlockToggler {
        public setupSnippetToggleForBlocks (blocks: HTMLElement[]) {
            for (let i = 0; i < blocks.length; i++) {
                let block = blocks[i];
                this.setupSnippetToggleForBlock( block );
            }
        }

        public setupSnippetToggleForBlock (block: HTMLElement) {
            let lines: number = block.querySelectorAll("li").length;
            // Prettyprint might not have worked its magic yet so we need to get the rows from splitting on \n
            if ( lines === 0 ) {
                const code = block.querySelector("code").innerText;
                lines = code.split("\n").length;
            }
            // If still rows === 0 then just exit!
            // Also if too few rows then just always show
            if ( lines === 0 || lines < 10 ) {
                return;
            }

            let that = this;

            // Start the opposite because we're calling toggleVisibility()
            let isVisible: boolean = !(block.hasAttribute("data-start-visible") && block.getAttribute("data-start-visible") === "true") ? true : false;

            var button = document.createElement("button");
            button.style.display = "block";
            button.style.marginTop = "5px";

            block.parentElement.insertBefore(button, block);
            button.addEventListener("click", function () {
                toggleVisibility();
            });

            function toggleVisibility () {
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
        }

        private hideCode (block: HTMLElement, button: HTMLButtonElement, lines: number) {
            button.innerHTML = "Show code - " + lines + " lines";
            button.style.marginBottom = "5px";
            block.style.display = "none";
        }

        private showCode (block: HTMLElement, button: HTMLButtonElement) {
            button.innerHTML = "Hide code";
            button.style.marginBottom = "";
            block.style.display = "";
        }
    }
}