var toolbarFrame;

if (window.parent == window) {
  toolbarFrame = document.getElementById('blok-toolbar-iframe');

  browser.runtime.onMessage.addListener(function (message) {
    // Any message indicates Blok has something to show
    if (!toolbarFrame) {
      var toolbarSpacer = document.createElement("div");
      toolbarSpacer.setAttribute("id", "blok-toolbar-spacer");
      toolbarSpacer.setAttribute("class", "blok-toolbar-spacer");
      var bodyEl = document.getElementsByTagName("body")[0];
      bodyEl.insertBefore(toolbarSpacer, bodyEl.firstChild);

      toolbarFrame = document.createElement("iframe");
      toolbarFrame.setAttribute("id", "blok-toolbar-iframe");
      toolbarFrame.setAttribute("class", "blok-toolbar-iframe");
      toolbarFrame.setAttribute("src", browser.runtime.getURL('toolbar.html'));
      document.body.appendChild(toolbarFrame);
    }

    // page-problem message should show modal for feedback
    if (message.feedback && message.feedback == "page-problem") {
      let feedbackModalOverlay = document.createElement("div");
      feedbackModalOverlay.setAttribute("class", "blok-feedback-modal-overlay");

      feedbackFrame = document.createElement("iframe");
      feedbackFrame.setAttribute("id", "blok-feedback-iframe");
      feedbackFrame.setAttribute("class", "blok-feedback-iframe");
      feedbackFrame.setAttribute("src", browser.runtime.getURL('feedback.html'));

      feedbackModalOverlay.appendChild(feedbackFrame);
      document.body.appendChild(feedbackModalOverlay);
    }

    if (message == "close-feedback") {
      document.querySelector(".blok-feedback-modal-overlay").remove();
    }
  });
}
