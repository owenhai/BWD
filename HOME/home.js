document.addEventListener("DOMContentLoaded", function () {
  const stories = [
    {
      title: "Truyện 1",
      description: "Mô tả ngắn về truyện 1.",
      link: "../INTRODUCE/truyen1.html",
      image: "https://via.placeholder.com/300x140?text=Truyện+1"
    },
    {
      title: "Truyện 2",
      description: "Mô tả ngắn về truyện 2.",
      image: "https://via.placeholder.com/300x140?text=Truyện+2",
    },
    {
      title: "Truyện 3",
      description: "Mô tả ngắn về truyện 3.",
      image: "https://via.placeholder.com/300x140?text=Truyện+3",
    },
    {
      title: "Truyện 4",
      description: "Mô tả ngắn về truyện 4.",
      image: "https://via.placeholder.com/300x140?text=Truyện+4",
    },
    {
      title: "Truyện 5",
      description: "Mô tả ngắn về truyện 5.",
      image: "https://via.placeholder.com/300x140?text=Truyện+5",
    },
    {
      title: "Truyện 6",
      description: "Mô tả ngắn về truyện 6.",
      image: "https://via.placeholder.com/300x140?text=Truyện+6",
    },
    {
      title: "Truyện 7",
      description: "Mô tả ngắn về truyện 7.",
      image: "https://via.placeholder.com/300x140?text=Truyện+7",
    },
    {
      title: "Truyện 8",
      description: "Mô tả ngắn về truyện 8.",
      image: "https://via.placeholder.com/300x140?text=Truyện+8",
    },
    {
      title: "Truyện 9",
      description: "Mô tả ngắn về truyện 9.",
      image: "https://via.placeholder.com/300x140?text=Truyện+9",
    },
    {
      title: "Truyện 10",
      description: "Mô tả ngắn về truyện 10.",
      image: "https://via.placeholder.com/300x140?text=Truyện+10",
    },
    {
      title: "Truyện 11",
      description: "Mô tả ngắn về truyện 11.",
      image: "https://via.placeholder.com/300x140?text=Truyện+11",
    },
    {
      title: "Truyện 12",
      description: "Mô tả ngắn về truyện 12.",
      image: "https://via.placeholder.com/300x140?text=Truyện+12",
    },
    {
      title: "Truyện 13",
      description: "Mô tả ngắn về truyện 13.",
      image: "https://via.placeholder.com/300x140?text=Truyện+13",
    },
    {
      title: "Truyện 14",
      description: "Mô tả ngắn về truyện 14.",
      image: "https://via.placeholder.com/300x140?text=Truyện+14",
    },
    {
      title: "Truyện 15",
      description: "Mô tả ngắn về truyện 15.",
      image: "https://via.placeholder.com/300x140?text=Truyện+15",
    },
    {
      title: "Truyện 16",
      description: "Mô tả ngắn về truyện 16.",
      image: "https://via.placeholder.com/300x140?text=Truyện+16",
    },
    {
      title: "Truyện 17",
      description: "Mô tả ngắn về truyện 17.",
      image: "https://via.placeholder.com/300x140?text=Truyện+17",
    },
    {
      title: "Truyện 18",
      description: "Mô tả ngắn về truyện 18.",
      image: "https://via.placeholder.com/300x140?text=Truyện+18",
    },
    {
      title: "Truyện 19",
      description: "Mô tả ngắn về truyện 19.",
      image: "https://via.placeholder.com/300x140?text=Truyện+19",
    },
    {
      title: "Truyện 20",
      description: "Mô tả ngắn về truyện 20.",
      image: "https://via.placeholder.com/300x140?text=Truyện+20",
    },
  ];

  const storiesPerPage = 9;
  let currentPage = 1;
  let filteredStories = [...stories];

  const storyGrid = document.getElementById("story-grid");
  const pagination = document.getElementById("pagination");

  function displayStories(page = 1) {
    storyGrid.innerHTML = "";
    const start = (page - 1) * storiesPerPage;
    const end = start + storiesPerPage;
    const storiesToShow = filteredStories.slice(start, end);

    if (storiesToShow.length === 0) {
      storyGrid.innerHTML = `<p style="grid-column:1/-1; text-align:center; font-weight:600; color:#555;">Không tìm thấy truyện phù hợp.</p>`;
      return;
    }

    storiesToShow.forEach((story) => {
      const card = document.createElement("article");
      card.className = "story-card";
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Mở chi tiết truyện ${story.title}`);
      card.innerHTML = `
        <img src="${story.image}" alt="Bìa truyện ${story.title}" class="story-image" />
        <div class="story-content">
          <h2 class="story-title">${story.title}</h2>
          <p class="story-description">${story.description}</p>
        </div>
      `;
      card.addEventListener("click", () => {
        window.location.href = story.link; // Chuyển đến trang chi tiết truyện
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          card.click();
        }
      });
      storyGrid.appendChild(card);
    });
  }

  function createButton(label, page, disabled = false, active = false) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = label;
    if (disabled) btn.disabled = true;
    if (active) btn.classList.add("active");
    btn.addEventListener("click", () => {
      if (page !== currentPage) {
        currentPage = page;
        displayStories(currentPage);
        createPagination(totalPages);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
    return btn;
  }

  function createPagination(totalPages) {
    pagination.innerHTML = "";
    if (totalPages <= 1) return;

    // Previous button
    pagination.appendChild(
      createButton("‹", currentPage - 1, currentPage === 1)
    );

    // Always show first page
    pagination.appendChild(createButton("1", 1, false, currentPage === 1));

    // Ellipsis before current page group
    if (currentPage > 4) {
      const ellipsis1 = document.createElement("span");
      ellipsis1.className = "ellipsis";
      ellipsis1.textContent = "...";
      pagination.appendChild(ellipsis1);
    }

    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pagination.appendChild(
        createButton(i.toString(), i, false, currentPage === i)
      );
    }

    // Ellipsis after current page group
    if (currentPage < totalPages - 3) {
      const ellipsis2 = document.createElement("span");
      ellipsis2.className = "ellipsis";
      ellipsis2.textContent = "...";
      pagination.appendChild(ellipsis2);
    }

    // Always show last page
    if (totalPages > 1)
      pagination.appendChild(
        createButton(
          totalPages.toString(),
          totalPages,
          false,
          currentPage === totalPages
        )
      );

    // Next button
    pagination.appendChild(
      createButton("›", currentPage + 1, currentPage === totalPages)
    );
  }

  // Initialize
  let totalPages = Math.ceil(filteredStories.length / storiesPerPage);
  displayStories(currentPage);
  createPagination(totalPages);

  window.addEventListener('search-story', function(e) {
    const keyword = e.detail.trim().toLowerCase();
    const found = stories.find(story =>
      story.title.toLowerCase() === keyword && story.link
    );
    if (found) {
      window.location.href = found.link;
    } else {
      // Nếu không khớp tuyệt đối, có thể filter như bình thường
      const filtered = stories.filter(story =>
        story.title.toLowerCase().includes(keyword) ||
        (story.description && story.description.toLowerCase().includes(keyword))
      );
      displayStories(filtered);
    }
  });
});
