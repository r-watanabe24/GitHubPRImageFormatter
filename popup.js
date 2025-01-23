document.addEventListener("DOMContentLoaded", () => {
  const formatButton = document.getElementById("format-images");
  const widthInput = document.getElementById("image-width");
  const statusElement = document.getElementById("status");

  formatButton.addEventListener("click", async () => {
    const width = parseInt(widthInput.value, 10) || 300;
    setStatus("Formatting images...", "blue");

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      // Execute the image formatting script in the current tab
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: formatImagesInCommentBoxes,
        args: [width],
      });

      setStatus("Images formatted successfully!", "green");
    } catch (error) {
      console.error(error);
      setStatus(`Error: ${error.message}`, "red");
    }
  });

  function setStatus(message, color) {
    statusElement.textContent = message;
    statusElement.style.color = color;
  }
});

/**
 * Formats images within comment boxes. This function targets specific blocks
 * defined by %% delimiters, extracts and transforms image URLs into a Markdown-like table format.
 * @param {number} width - The width to set for images.
 */
function formatImagesInCommentBoxes(width) {
  const commentBoxes = document.querySelectorAll(".CommentBox-container textarea");

  if (commentBoxes.length === 0) {
    throw new Error("No comment boxes found on this page.");
  }

  let hasFormatted = false;

  commentBoxes.forEach(commentBox => {
    const content = commentBox.value;

    // Replace %% blocks with formatted Markdown table
    const updatedContent = content.replace(/%%([\s\S]*?)%%/g, (match, blockContent) => {
      const lines = blockContent.trim().split("\n");
      const rows = [];
      let currentRow = [];
      let maxCols = 0;
      let isValid = true;

      for (const line of lines) {
        const match = line.match(/<img .*?src=\"(.*?)\".*?>|!\[.*?\]\((.*?)\)/);
        if (match) {
          const imageUrl = match[1] || match[2];
          currentRow.push(`<img width=\"${width}\" src=\"${imageUrl}\">`);
          maxCols = Math.max(maxCols, currentRow.length);
        } else if (currentRow.length > 0) {
          rows.push(currentRow);
          currentRow = [];
        } else if (line.trim() !== "") {
          isValid = false; // Detect formatting error
        }
      }

      if (currentRow.length > 0) {
        rows.push(currentRow);
      }

      if (!isValid) {
        throw new Error("Invalid format detected.");
      }

      if (rows.length === 0) {
        throw new Error("No images found for conversion.");
      }

      const header = Array.from({ length: maxCols }, (_, i) => `Title${i + 1}`).join(" | ");
      const separator = Array.from({ length: maxCols }, () => "-").join(" | ");
      const formattedRows = rows
        .map(row =>
          row.concat(Array(maxCols - row.length).fill("")).join(" | ")
        )
        .map(row => `| ${row} |`);

      hasFormatted = true;
      return `| ${header} |\n| ${separator} |\n${formattedRows.join("\n")}`;
    });

    if (updatedContent !== content) {
      commentBox.value = updatedContent;
    }
  });

  if (!hasFormatted) {
    throw new Error("No images found for conversion.");
  }
}