document.addEventListener("DOMContentLoaded", function () {
  const searchPageInput = document.getElementById("search-page-input");

  // 只在搜索页面 (即找到了 #search-page-input 的页面) 才执行所有逻辑
  if (!searchPageInput) {
    return;
  }

  // --- 从这里开始是搜索页面的专属逻辑 ---

  let isfetched = false;
  let datas;
  const resultContent = document.getElementById(
    "search-page-results-container"
  );
  const searchPath = CONFIG.path || "search.xml";

  // 获取数据
  const fetchData = () => {
    fetch(CONFIG.root + searchPath)
      .then((response) => response.text())
      .then((res) => {
        isfetched = true;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(res, "text/xml");
        datas = [...xmlDoc.querySelectorAll("entry")].map((element) => {
          return {
            title: element.querySelector("title").textContent,
            content: element.querySelector("content").textContent,
            url: element.querySelector("url").textContent,
          };
        });
      });
  };

  // 高亮关键词
  const highlightKeyword = (text, keyword) => {
    const lowerText = text.toLowerCase();
    const lowerKeyword = keyword.toLowerCase();
    let highlightedText = "";
    let lastIndex = 0;
    let index = lowerText.indexOf(lowerKeyword, lastIndex);

    while (index !== -1) {
      highlightedText += text.substring(lastIndex, index);
      highlightedText += `<b class="search-keyword">${text.substring(
        index,
        index + keyword.length
      )}</b>`;
      lastIndex = index + keyword.length;
      index = lowerText.indexOf(lowerKeyword, lastIndex);
    }
    highlightedText += text.substring(lastIndex);
    return highlightedText;
  };

  // 输入事件处理
  const inputEventFunction = () => {
    if (!isfetched) return;

    let searchText = searchPageInput.value.trim();
    if (searchText === "") {
      resultContent.innerHTML =
        '<div class="search-init-tip">请在上方搜索框输入内容</div>';
      return;
    }

    let resultItems = [];
    datas.forEach(({ title, url }) => {
      // 只在标题中搜索
      if (title.toLowerCase().includes(searchText.toLowerCase())) {
        resultItems.push(
          `<a href="${url}" class="search-result-item">
            <div class="search-result-title">${highlightKeyword(
              title,
              searchText
            )}</div>
          </a>`
        );
      }
    });

    if (resultItems.length > 0) {
      resultContent.innerHTML = resultItems.join("");
    } else {
      resultContent.innerHTML =
        '<div class="search-no-result">未找到相关结果</div>';
    }
  };

  // 页面加载后就去获取数据
  fetchData();
  // 监听输入框的输入事件
  searchPageInput.addEventListener("input", inputEventFunction);
});
