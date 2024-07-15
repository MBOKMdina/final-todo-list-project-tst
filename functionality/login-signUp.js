import { users, check, generateId } from "../data/users.js";

function close()
{
    document.querySelector('.js-close-btn').addEventListener('click',()=>
    {
        document.querySelector('.js-appropriate-UI').innerHTML = '';
    })
}

document.querySelector('.js-log-in').addEventListener('click',()=>
{
    document.querySelector('.js-appropriate-UI').innerHTML = 
    `
    <div class="log-in-container">
        <div class="close-container">
            <div class="close-btn js-close-btn">
                <img src="images/x.svg" class="close">
            </div>
        </div>
        <div class="inputLI-user-container">
            <label class="inputLI-user-lbl">Enter username</label>
            <input class="inputLI-user js-inputLI-user" placeholer="Enter Username">
        </div>
        <button class="log-in-btn js-log-in-btn">Log In</button>
    </div>
    `;
    close();
    document.querySelector('.js-log-in-btn').addEventListener('click', ()=>
    {
        let valueLI = document.querySelector('.js-inputLI-user');
        let comparison = valueLI.value;
        let authentication = check(comparison);
        if(authentication)
        {
            localStorage.setItem('userInUse', JSON.stringify(comparison));
            window.close('login-signUp.html');
            window.open('mainPage.html');
        }    
        else
        {
            document.querySelector('.js-appropriate-UI').innerHTML =
            `
            <div class="error-container">
                <div class="close-container">
                    <div class="close-btn js-close-btn">
                        <img src="images/x.svg" class="close">
                    </div>
                </div>
                <div class="message js-message">User not found <span><img src="images/sad.png" class="sad"></span>. Please ensure correct characters have been entered or try signing up.</div>
            </div>
            `;
            close();
        }
    })
});

document.querySelector('.js-sign-up').addEventListener('click',()=>
{
    document.querySelector('.js-appropriate-UI').innerHTML = 
    `
    <div class="miss-match-container js-miss-match-container"></div>
    <div class="sign-up-container">
        <div class="close-container">
            <div class="close-btn js-close-btn">
                <img src="images/x.svg" class="close">
            </div>
        </div>
        <div class="inputSU-user-container">
            <div class="initial-input">
                <label class="inputSU-username-lbl">Create Username</label>
                <input class="inputSU-user js-inputSU-user" placeholer="Enter Username">
                <div class="sign-up-error js-sign-up-error"></div>
            </div>
            <div class="reEnter-container">
                <label class="reEnter-lbl">Re-enter Username</label>
                <input class="reEnter-username js-reEnter-username" placeholer="Enter Username">
            </div>
        </div>
        <button class="sign-up-btn js-sign-up-btn">Sign Up</button>
        <div class="tip js-tip">
            <div class="tip-message"> Note: Spaces count as entered characters.</div>
        </div>
    </div>
    `;
    close();
    document.querySelector('.js-sign-up-btn').addEventListener('click', ()=>
    {
        let firstValue = document.querySelector('.js-inputSU-user').value;
        let secondValue = document.querySelector('.js-reEnter-username').value;
        if(firstValue === '')
        {
            document.querySelector('.js-sign-up-error').innerHTML =`Please fill out all important data!`;
        }
        else
        {
            if(firstValue === secondValue)
            {
                if(check(firstValue))
                {
                    document.querySelector('.js-sign-up-error').innerHTML =`This user already exists.`;
                }
                else
                {
                    users.push(
                    {
                        name: firstValue,
                        dataId: generateId()
                    });
                    document.querySelector('.js-appropriate-UI').innerHTML = 
                    `
                    <div class="error-container">
                        <div class="close-container">
                            <div class="close-btn js-close-btn">
                                <img src="images/x.svg" class="close">
                            </div>
                        </div>
                        <div class="message js-message">Sign up successful <span><img src="images/sign-up-check.png" class="sad"></span>. Now try and log in with your newly created account.</div>
                    </div>
                    `;
                    close();
                }
            }
            else
            {
                document.querySelector('.js-sign-up-error').innerHTML = ``;
                document.querySelector('.js-miss-match-container').innerHTML = `
                <div class="miss-match">
                    <div class="close-miss-match js-close-miss-match">
                        <img src="images/x.svg" class="miss-x-match">
                    </div>
                    Please note that the user name that you have re-entered does not match the created username. All characters in both input fields have to be the same!
                </div>
                `;
                document.querySelector('.js-close-miss-match').addEventListener('click', ()=>
                {
                    document.querySelector('.js-miss-match-container').innerHTML = ``; 
                });
            }
        };
    })
});


