// decalre variables

const result = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const btnGenerate = document.getElementById('btnGenerate');
const clipboard = document.getElementById('clipboard');



const getLower = () =>{
    // can use char codes to match letters
    return String.fromCharCode(Math.floor(Math.random() * 26 ) + 97);
}
const getUpper = () =>{
    return String.fromCharCode(Math.floor(Math.random() * 26 ) + 65);
}

const getNumber = () =>{
    return String.fromCharCode(Math.floor(Math.random() * 10 ) + 48);
}
const getSymbol = () =>{
    const symbols = '~!@#$%^&*()_+=-\'",./?><`'
    return symbols[Math.floor(Math.random() * symbols.length)]
}
const randomGenerator = {
    lower:getLower,
    upper:getUpper,
    number:getNumber,
    symbol:getSymbol,
}


btnGenerate.addEventListener('click', () => {
    const length = +lengthEl.value;
    const needsLower = lowercase.checked
    const needsUpper = uppercase.checked
    const needsNumbers = numbers.checked
    const needsSymbols = symbols.checked
    
    result.innerText = generatePwd(
        needsLower, 
        needsUpper,
        needsNumbers,
        needsSymbols, 
        length
    );
})

const generatePwd = (lower, upper, number, symbol, length) =>{
    // Make a pwd var
    let newPassword = '';
    // filter out checked types
    const optionsChecked = lower + upper + number + symbol;

    const optionsCheckedArr= [{lower},{upper},{number},{symbol}]
    .filter(
        option=>Object.values(option)[0]
    );
    
    if(optionsChecked === 0){
        // return nothing if no options checked
        return'';
    }
    // Loop over length call generator function for each type
    for(let i = 0 ; i < length; i += optionsChecked){
        optionsCheckedArr.forEach(option =>{
            const funcName = Object.keys(option)[0]
            // console.log('funcName: ', funcName)

            newPassword += randomGenerator[funcName]();
        });
    }
    const finalPassword = newPassword.slice(0, length)
    let finalPasswordArr = finalPassword.split('')
    console.log(finalPasswordArr)

    function shuffleArr(array){
        let currentIndex = finalPasswordArr.length, tempVal, randomI
        console.log(currentIndex)

        while( 0 !== currentIndex){
            randomI = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            tempVal = array[currentIndex];
            array[currentIndex] = array[randomI]
            array[randomI] = tempVal
        }
        return array.join('')
    }
    shuffleArr(finalPasswordArr)
    return shuffleArr(finalPasswordArr)

}

// copy to clipboard

clipboard.addEventListener('click',() =>{
    const textarea = document.createElement('textarea');
    const password = result.innerText;

    if(!password){
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    console.log("password copied")
})