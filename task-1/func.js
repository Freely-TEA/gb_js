
function convert(){ 
               
    let result = document.querySelector('.result'); 
    let temp = document.querySelector('#temperature');
    alert(temp)
    temp = parseFloat(temp.value)
    alert(temp)
    temp = (9 / 5) * temp + 32
    alert(`${temp}f`)
    result.innerHTML = `${temp}f`
} 
