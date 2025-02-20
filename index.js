function submitData() {
    let firstname_DOM = document.querySelector('input[name = firstname]')
    let lastname_DOM = document.querySelector('input[name = lastname]')
    let age_DOM = document.querySelector('input[name = age]')
    let gender_DOM = document.querySelector('input[name = gender]:checked')
    let interest_DOM = document.querySelectorAll('input[name=Interest]:checked')
        let interest = ''
        for (let i = 0 ; i < interest_DOM.length; i++) {
            interest += interest_DOM.value + ', '
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
}