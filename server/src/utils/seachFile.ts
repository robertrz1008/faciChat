export function getElementByNumber(filenames: String[], targetNumber: number) {
    for (const filename of filenames) {
      const match = filename.match(/(\d+)-facichat\.png/);
      if (match) {
        const number = parseInt(match[1]);
        if (number == targetNumber) {
          return filename;
        }
      }
    }
  
    return null; // Devuelve null si no se encuentra ninguna coincidencia
  }