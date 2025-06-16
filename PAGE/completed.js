document.addEventListener("DOMContentLoaded", function() {
  // Dữ liệu mẫu
  const stories = [
    {
      title: "Truyện 1",
      description: "Đã hoàn thành với 100 chương",
      image: "https://via.placeholder.com/300x140?text=Completed+1",
      status: "Hoàn Thành",
      category: "Ngôn Tình",
      link: "../INTRODUCE/truyen1.html"
    },
    {
      title: "Truyện 2",
      description: "Đang cập nhật",
      image: "https://via.placeholder.com/300x140?text=Ongoing+2",
      status: "Chưa Hoàn Thành",
      category: "Tiên Hiệp",
      link: "../INTRODUCE/truyen2.html"
    },
    {
      title: "Truyện 3",
      description: "Tạm dừng ở chương 20",
      image: "https://via.placeholder.com/300x140?text=Paused+3",
      status: "Tạm Dừng",
      category: "Hành Động",
      link: "../INTRODUCE/truyen3.html"
    },
    // Thêm các truyện khác...
  ];

  const storiesPerPage = 9;
  let currentPage = 1;
  let currentFilter = "Tất cả";

  const storyGrid = document.getElementById("story-grid");
  const pagination = document.getElementById("pagination");
  const filterButtons = document.querySelectorAll(".filter-button");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      currentFilter = button.textContent.trim();
      currentPage = 1;
      displayStories();
    });
  });

  function displayStories(filteredList) {
    const list = filteredList || stories;
    storyGrid.innerHTML = "";

    let filteredStories = list;
    if (!filteredList && currentFilter !== "Tất cả") {
      filteredStories = stories.filter(story => story.status === currentFilter);
    }

    const start = (currentPage - 1) * storiesPerPage;
    const end = start + storiesPerPage;
    const paginatedStories = filteredStories.slice(start, end);

    paginatedStories.forEach(story => {
      const card = document.createElement("article");
      card.className = "story-card";
      card.innerHTML = `
        <img src="${story.image}" alt="${story.title}" class="story-image">
        <div class="story-content">
          <h3 class="story-title">${story.title}</h3>
          <p class="story-description">${story.description}</p>
          <small>${story.status}</small>
        </div>
      `;
      storyGrid.appendChild(card);
    });

    createPagination(filteredStories.length);
  }

  function createPagination(totalStories) {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(totalStories / storiesPerPage);

    if (totalPages <= 1) return;

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "‹";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayStories();
      }
    });
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.textContent = i;
      if (i === currentPage) pageBtn.classList.add("active");

      pageBtn.addEventListener("click", () => {
        currentPage = i;
        displayStories();
      });

      pagination.appendChild(pageBtn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "›";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        displayStories();
      }
    });
    pagination.appendChild(nextBtn);
  }

  displayStories();

  // Lắng nghe sự kiện tìm kiếm từ header
  window.addEventListener('search-story', function(e) {
    const keyword = e.detail.trim().toLowerCase();
    const found = stories.find(story =>
      story.title.toLowerCase() === keyword && story.link
    );
    if (found) {
      window.location.href = found.link;
      return;
    }
    const filtered = stories.filter(story =>
      story.title.toLowerCase().includes(keyword) ||
      (story.description && story.description.toLowerCase().includes(keyword))
    );
    displayStories(filtered);
  });
});