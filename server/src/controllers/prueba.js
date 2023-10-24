let str = ["6-app.png","2-app.png", "10-app.png", "4-app.png"]

function getElementByNumber(filenames, targetNumber) {
    for (const filename of filenames) {
      const match = filename.match(/(\d+)-app\.png/);
      if (match) {
        const number = parseInt(match[1]);
        if (number === targetNumber) {
          return filename;
        }
      }
    }
  
    return null; // Devuelve null si no se encuentra ninguna coincidencia
  }

  console.log(getElementByNumber(["6-app.png","2-app.png", "10-app.png", "4-app.png"], 10))