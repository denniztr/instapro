import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
import { addPost } from "../api.js";
import { getToken } from "../index.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {

  let imageUrl = '';

  const render = () => {
    const appHtml = ` <div class="page-container">
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
                      </div>`;

    appEl.innerHTML = appHtml;
    
    renderHeaderComponent({ 
      element: document.querySelector(".header-container"), 
    });
    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });
    

    document.getElementById("add-button").addEventListener("click", () => {

      const inputValidation = document.getElementById("input_description").value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");

      if (inputValidation === '') {
        alert('Заполните поле описания фотографии')
      } 
      if (imageUrl === '') {
        alert('Выберите фотографию')
      }

      addPost({
        token: getToken(),
        description: inputValidation,
        imageUrl: imageUrl,
      });
      onAddPostClick();
    });
  };
  render();
};
