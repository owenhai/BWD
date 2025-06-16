window.addEventListener("DOMContentLoaded", () => {
  fetch("../COMPONENTS/HEADER/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      // Gọi lại xử lý menu sau khi header đã load
      setupHeaderEvents();
    })
    .catch((error) => console.error("Lỗi tải header:", error));
});

function setupHeaderEvents() {
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!mobileMenuButton || !mobileMenu) return;

  mobileMenuButton.addEventListener("click", () => {
    const isExpanded =
      mobileMenuButton.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMobileMenu();
    } else {
      mobileMenu.classList.add("active");
      mobileMenuButton.setAttribute("aria-expanded", "true");
      mobileMenuButton.querySelector("span").textContent = "close";

      const firstMobileLink = mobileMenu.querySelector("a");
      if (firstMobileLink) firstMobileLink.focus();
    }
  });

  mobileMenu.addEventListener("click", (event) => {
    if (event.target === mobileMenu) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
      closeMobileMenu();
      mobileMenuButton.focus();
    }
  });

  function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    mobileMenuButton.setAttribute("aria-expanded", "false");
    mobileMenuButton.querySelector("span").textContent = "menu";
  }

  // Xử lý tìm kiếm
  const searchInput = document.querySelector('.search-input');
  const searchIcon = document.querySelector('.search-icon');

  function emitSearchEvent() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    const keyword = searchInput.value.trim();
    window.dispatchEvent(new CustomEvent('search-story', { detail: keyword }));
  }

  if (searchInput) {
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        emitSearchEvent();
      }
    });
  }
  if (searchIcon) {
    searchIcon.addEventListener('click', emitSearchEvent);
  }
}

window.addEventListener('search-story', function(e) {
  const keyword = e.detail.trim().toLowerCase();
  // Tìm truyện có title khớp tuyệt đối (không phân biệt hoa thường)
  const found = stories.find(story =>
    story.title.toLowerCase() === keyword && story.link
  );
  if (found) {
    window.location.href = found.link; // chuyển đến trang chi tiết
  } else {
    // Nếu không khớp tuyệt đối, có thể filter như bình thường
    const filtered = stories.filter(story =>
      story.title.toLowerCase().includes(keyword) ||
      (story.description && story.description.toLowerCase().includes(keyword))
    );
    displayStories(filtered);
  }
});
