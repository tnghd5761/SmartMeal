export const checkEmailValidation = (userInput) => {
    const emailCheckRegex = /\S+@\S+\.\S+/
    return (userInput && emailCheckRegex.test(userInput))
}
    
export const checkUsernameValidation = (userInput) => {
    const usernameCheckRegex = /[~!@#$%^&*()_+|<>?:{}]/
    return (userInput && !usernameCheckRegex.test(userInput))
}

export const checkPasswordValidation = (passwordInput) => {
    const passwordCheckRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/
    return (passwordInput && passwordCheckRegex.test(passwordInput))
}