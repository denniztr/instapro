import { renderHeaderComponent } from "./header-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
      <h3 class="form-title">Добавить пост</h3>
      <div class="form-inputs">
        <div class="upload-image-container">
          <div class="upload=image">
            <label class="file-upload-label secondary-button">
                <input type="file" class="file-upload-input" style="display:none">
                Выберите фотографию
            </label>
          </div>
        </div>
        <label>
          <textarea class="input textarea" placeholder="Опишите фотографию" id ="input_description" rows="4"></textarea>
         </label>
         <button class="button" id="add-button">Добавить</button>
      </div>
    </div>
  `;

    appEl.innerHTML = appHtml;
    
    renderHeaderComponent({ //Рендер шапки страницы
      element: document.querySelector(".header-container"), 
    });

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: "Описание картинки",
        imageUrl: "https://image.png",
      });
    });
  };

  render();
}
