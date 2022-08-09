import React from 'react'

export default function LandingPage(props) {

    var openLoginModal = () => {
        document.getElementById("loginModalID").style.display = "block";
        document.getElementById("loginModalID").style.animation = "openAnimation 1s forwards";
        document.getElementById("landingContainerID").style.opacity = 0.5;
    }

    var closeLoginModal = () => {
        document.getElementById("loginModalID").style.display = "none";
        document.getElementById("landingContainerID").style.opacity = 1;
    }

    var openRegisterModal = () => {
        document.getElementById("registerModalID").style.display = "block";
        document.getElementById("registerModalID").style.animation = "openAnimation 1s forwards";
        document.getElementById("landingContainerID").style.opacity = 0.5;
    }

    var closeRegisterModal = () => {
        document.getElementById("registerModalID").style.display = "none";
        document.getElementById("landingContainerID").style.opacity = 1;
    }





    return (
        <>
            <div className='landingContainer' id="landingContainerID">

                <div className='taglineDiv'>

                    <h3>'A Smaller World'</h3>
                    <h4>By Us, For You!</h4>

                    <p className='py-3'><u>A community that makes you feel accepted</u></p>

                    <button className='text-light mx-2 loginBtn' onClick={() => openLoginModal()}>Login</button>

                    <button className='text-light mx-2 registerBtn' onClick={() => openRegisterModal()}>Become Member</button>

                    <p className='pt-3' id='registrationStatus'></p>

                </div>

            </div>

            <div className='featureDiv'>

                <div className='featureTextDiv'>

                    <h5>Free-for-all</h5>

                    <p>Providing the users free web space to upload content.</p>


                </div>

                <div className='featureImageDiv'>

                    <img src="../feature2.png" className='img-fluid' alt="" />

                </div>

            </div>

            <div className='featureDiv'>


                <div className='featureImageDiv'>

                    <img src="../security.png" className='img-fluid' alt="" />

                </div>



                <div className='featureTextDiv'>

                    <h5>Secure</h5>

                    <p>Your posts and privacy is never at risk.</p>


                </div>


            </div>

            <div className='featureDiv mb-5'>

                <div className='featureTextDiv'>

                    <h5>User Friendly UI</h5>

                    <p>UI that gets as friendly and easy as it can be.</p>


                </div>


                <div className='featureImageDiv'>

                    <img src="../userFriendly.png" className='img-fluid' alt="" />

                </div>


            </div>

            <div className='loginModal' id="loginModalID">


                <div className='modalCoverDiv'>

                    <img src="../modalCover.webp" className='img-fluid' alt="nooo" />

                </div>

                <p>Please Enter Your Credentials</p>

                <button className='closeModalBtn' onClick={() => closeLoginModal()}><i class="fa-solid fa-xmark"></i></button>

                <p id='errorDisplayLogin'></p>

                <table>
                    <tr>
                        <td>
                            <label for="emailInput">E-mail</label>
                        </td>
                        <td>
                            <input type="email" id="emailInput" />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label for="passwordInput">Password</label>
                        </td>

                        <td>
                            <input type="password" id='passwordInput' />
                        </td>
                    </tr>
                    <tr>
                        <td>

                        </td>
                        <td>
                            <input type="button" className='loginBtnModal' value="Submit" onClick={(event) => props.loginClicked(event)} />
                        </td>
                    </tr>
                </table>

            </div>


            <div className='registerModal' id="registerModalID">


                <div className='modalCoverDiv'>

                    <img src="../modalCover.webp" className='img-fluid' alt="nooo" />

                </div>

                <p>Please Enter Your Registration Credentials</p>

                <button className='closeModalBtn' onClick={() => closeRegisterModal()}><i class="fa-solid fa-xmark"></i></button>

                <p id='errorDisplay'></p>

                <table>

                    <tr>
                        <td>
                            Name
                        </td>
                        <td>
                            <input type="text" id="nameInputRegister" />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Phone Number
                        </td>
                        <td>
                            <input type="number" id="numberInputRegister" />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label for="emailInput">E-mail</label>
                        </td>
                        <td>
                            <input type="email" id="emailInputRegister" />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label for="passwordInput">Password</label>
                        </td>

                        <td>
                            <input type="password" id='passwordInputRegister' />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label for="passwordInput2">Confirm Password</label>
                        </td>

                        <td>
                            <input type="password" id='passwordInput2Register' />
                        </td>
                    </tr>

                    <tr>
                        <td>

                        </td>
                        <td>
                            <input type="button" className='registerModalBtn' value="Submit" onClick={() => props.registerClicked()} />
                        </td>
                    </tr>

                </table>

            </div>

        </>
    )
}
