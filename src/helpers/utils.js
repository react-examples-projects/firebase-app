export function imageToBase64(imageFile) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = (err) => reject(err);
    fr.readAsDataURL(imageFile);
  });
}

export function getData() {
  return fetch("https://jsonplaceholder.typicode.com/todos").then(
    (response) => response.json()
  );
}
