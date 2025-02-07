import { HighlightBox as LetterBoxHighlighterElement } from "./lib/highlight-box.js";
import { OutlineHighlighterElement } from "./lib/outline-highlighter.js";
import { AutoplayControlsElement, HighlighterControlsElement } from "./ui-elements.js";
import { PageHighlightManager } from "./lib/page-highlighter.js";

export function init() {
  let controlsContainer = document.querySelector("#controls-panel");
  if(!controlsContainer) {
    controlsContainer = document.createElement("div");
    controlsContainer.id = "controls-panel";
  }
  let docFragment = document.createDocumentFragment();

  window.highlightManager = new PageHighlightManager();
  highlightManager.registerHighlighter("letterbox", LetterBoxHighlighterElement);
  highlightManager.registerHighlighter("outline", OutlineHighlighterElement);

  const autoPlayer = window.autoPlayer = new AutoplayControlsElement();
  autoPlayer.configure(window.highlightManager);
  docFragment.appendChild(autoPlayer);

  window.highlighterControls = new HighlighterControlsElement();
  highlighterControls.configureHighlighters("letterbox", "outline");
  docFragment.appendChild(window.highlighterControls);

  controlsContainer.appendChild(docFragment);
  if (!controlsContainer.isConnected) {
    document.body.appendChild(controlsContainer);
  }

  return {
    highlightManager,
    highlighterControls,
  };
}
