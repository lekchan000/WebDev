const submitData = async () => {
    let firstname_DOM = document.querySelector('input[name = firstname]')
    let lastname_DOM = document.querySelector('input[name = lastname]')
    let age_DOM = document.querySelector('input[name = age]')
    let gender_DOM = document.querySelector('input[name = gender]:checked')
    let interest_DOM = document.querySelectorAll('input[name=Interest]:checked')
        let interest = ''
        for (let i = 0 ; i < interest_DOM.length; i++) {
            interest += interest_DOM[i].value
                if (i != interest_DOM.length-1) {
                    interest += ', '
                }
        }
    let description_DOM = document.querySelector('textarea[name=description]')

    //---------------------------------------------------------------------------
    let userData = {
        firstname: firstname_DOM.value ,
        lastname: lastname_DOM.value ,
        age: age_DOM.value ,
        gender: gender_DOM.value ,
        interest: interest,
        description: description_DOM.value
    }
    console.log('Submit Data',userData)
    try {
        const response = await axios.post('http://localhost:8000/users',userData)
        console.log('response',response.data)
    } catch (error) {
        if (error.response) {
            console.log(error.response.data.message)
        }
    }
}