function encode(string, shift) {
    const alphabetUpperCase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const alphabetLowerCase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    let encoded = '';

    for (let i = 0; i < string.length; i++) {
        if (alphabetUpperCase.includes(string[i])){
            let index = (alphabetUpperCase.indexOf(string[i]) + shift ) % alphabetUpperCase.length
            if (index < 0){
                index = alphabetUpperCase.length + index
            }
            encoded += alphabetUpperCase[index]
        } else if (alphabetLowerCase.includes(string[i])) {
            let index = (alphabetLowerCase.indexOf(string[i]) + shift ) % alphabetLowerCase.length
            if (index < 0){
                index = alphabetLowerCase.length + index
            }
            encoded += alphabetLowerCase[index]
        } else {
            encoded += string[i]
        }
    }

    return encoded
}
