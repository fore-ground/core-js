/**
 * Genere un fichier a partir de url
 *
 * @param {string} webPath
 * @param {string} format
 * @returns {Promise<File>}
 */
export function webPathToFile(webPath: string, format = "jpg") {
  return new Promise((resolve, reject) => {
    const filename = `${Math.round(Math.random() * 100000)}.${format}`;

    fetch(webPath)
      .then((response) => response.blob())
      .then((blobFile) => {
        resolve(
          new File([blobFile], filename, {
            type: "image/" + format,
          })
        );
      })
      .catch(reject);
  });
}

/**
 * Convertie un fichier en dateUrl
 *
 * @param {File} file
 * @returns {Promise<string>}
 */
export function fileToDataUrl(file: any) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();

    fr.onload = () => resolve(fr.result);
    fr.onerror = (e) => reject(e);

    fr.readAsDataURL(file);
  });
}
