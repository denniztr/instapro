const personalKey = "";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }
      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}


export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
}


export function addPost({ token, description, imageUrl}) {
  return fetch(postsHost, {
    method: 'POST',
    body: JSON.stringify({
      description,
      imageUrl,
    }),
    headers: {
      Authorization: token,
    }
  }).then((res) => {
    if (res.status === 201) {
      res.json()
    } else if (res.status === 400) {
      throw new Error('Нет описания или картинки')
    } 
  })
};


export function getUserPosts({ id, token }) {
  return fetch(postsHost + `/user-posts/${id}`, {
    method: 'GET',
    headers: { 
      Authorization: token,
    },
  })
  .then((res) => res.json())
  .then((data) => {
    return data.posts;
  })
};


export function deletePost({ id, token }) {
  return fetch(postsHost + `/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    }
  }).then((res) => {

    if (res.status === 200) {
      res.json();
    } else if (res.status === 401) {
      throw new Error('Нет авторизации')
    } else {
      alert('Ошибка при удалении (доработать)')
      throw new Error('Вы можете удалить только свой пост')
    }
  })
};


export function likeFetchFunc({ id, token }) {
  return fetch(postsHost + `/${id}/like`, {
    method: 'POST',
    headers: {
      Authorization: token,
    }
  })
  .then((res) => {
    if (res.status === 401) {
      throw new Error('Авторизуйтесь чтобы поставить лайк')
    }
    res.json()
  })
};


export function dislikeFetchFunc({ id, token }) {
  return fetch(postsHost + `/${id}/dislike`, {
    method: 'POST',
    headers: {
      Authorization: token,
    }
  })
  .then((res) => {
    if (res.status === 401) {
      throw new Error('Авторизуйтесь чтобы убрать лайк')
    }
    return res.json()
  })
};