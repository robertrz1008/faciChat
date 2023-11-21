function msgText(text: string): string{
    const textArr = text.split("")
    let newText;
    if(textArr.length <= 30){
        return text
    }
    newText = textArr.slice(0, 31).join("")
    return newText + "..."
}

export default msgText