function carregarJSON(url) {
  let promesa;
  let xhr;
  promesa = new Promise((resolve, reject) => {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          resolve(xhr.responseText);
        } else {
          reject();
        }
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  });
  return promesa;
}

export function exitPromesa(resp) {
  return JSON.parse(resp);
}


export default carregarJSON;
