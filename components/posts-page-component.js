import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  const postsHtml = posts.map((post) => {
    return `      <li class="post">
                  <div class="post-header" data-user-id="6425602ce156b600f7858df2">
                      <img src=${post.user.imageUrl} class="post-header__user-image">
                      <p class="post-header__user-name">${post.user.name}.</p>
                  </div>
                
                  
                  <div class="post-image-container">
                    <img class="post-image" src=${post.imageUrl}>
                  </div>
                  <div class="post-likes">
                    <button data-post-id="642cffed9b190443860c2f30" class="like-button">
                      <img src="./assets/images/like-not-active.svg">
                    </button>
                    <p class="post-likes-text">
                      Нравится: <strong>35(Ещё не работает)</strong>
                    </p>
                  </div>
                  <p class="post-text">
                    <span class="user-name">${post.user.name}</span>
                    ${post.description}
                  </p>
                  <p class="post-date">
                    3 часа назад (Ещё не работает)
                  </p>
                </li>`;
  }).join('');
                  

  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  ${postsHtml}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
