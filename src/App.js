import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import LandingPage from './LandingPage';
import AboutUs from './AboutUs';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Data } from './Data';
import { dblClick } from '@testing-library/user-event/dist/click';
// import axios from 'axios';

function App() {

  let navigate = useNavigate();

  // stores the file that is to be uploaded 

  const [file, setFile] = useState();

  // stores the users that are registered on the website 

  const [userArray, setUserArray] = useState(Data.users);

  // stores the posts that have been uploaded on the website 

  const [posts, setPosts] = useState(Data.posts);

  // flag that helps in form validation 

  const [errorFlag, setErrorFlag] = useState(0);

  const [loginFlag, setLoginFlag] = useState({});

  const [fileUpload, setFileUpload] = useState();

  // stores the details of the post that has to be edited 

  const [toBeEdited, setToBeEdited] = useState();

  // stores the details of the updated posts 

  const [editedImage, setEditedImage] = useState();

  // gets executed on every onchange event of the file upload 

  var handleFileUpload = (event) => {

    const tempURL = URL.createObjectURL(event.target.files[0]);
    setFile(tempURL);

  }

  // handles the post upload and stores it inside a state array 

  var handleSubmit = (event) => {
    event.preventDefault();
    var captionTemp = document.getElementById("captionInput").value;

    var tempPostArray = posts;
    tempPostArray.unshift({ caption: captionTemp, image: file, name: loginFlag.name, likes: 0, likedBy: [], comments: [] });

    setPosts([...tempPostArray]);

    document.getElementById("captionInput").value = "";
    document.getElementById("fileUploadInput").value = "";
  }

  // validation that checks only letters and spaces are allowed

  var onlyLettersAndSpaces = (str) => {

    return /^[A-Za-z\s]*$/.test(str);
  }

  // validation that checks that the filled email is valid 

  var isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }


  // handles registration validation 

  var registerClicked = () => {
    setErrorFlag(0);
    var name = document.getElementById("nameInputRegister").value;
    var phone = document.getElementById("numberInputRegister").value;
    var email = document.getElementById("emailInputRegister").value;
    var password = document.getElementById("passwordInputRegister").value;
    var password2 = document.getElementById("passwordInput2Register").value;

    if (name === '') {
      document.getElementById("errorDisplay").innerText = "Name is Empty";
      setErrorFlag(1);
    }

    else if (onlyLettersAndSpaces(name) === false) {
      document.getElementById("errorDisplay").innerText = "Enter Proper Name";
      setErrorFlag(1);
    }

    else if (phone === '') {
      document.getElementById("errorDisplay").innerText = "Phone is Empty";
      setErrorFlag(1);
    }

    else if (email === '') {
      document.getElementById("errorDisplay").innerText = "Email is Empty";
      setErrorFlag(1);
    }

    else if (isValidEmail(email) === false) {
      document.getElementById("errorDisplay").innerText = "Enter Proper E-mail";
      setErrorFlag(1);
    }

    else if (password === '') {
      document.getElementById("errorDisplay").innerText = "Password is Empty";
      setErrorFlag(1);
    }

    else if (password2 === '') {
      document.getElementById("errorDisplay").innerText = "Confirm Password is Empty";
      setErrorFlag(1);
    }

    else if (password !== password2) {
      document.getElementById("errorDisplay").innerText = "Passwords Aren't Matching";
    }

    else {
      document.getElementById("errorDisplay").innerText = "";
      var credentials = ({ name: name, phone: phone, email: email, password: password });
      setUserArray([...userArray, credentials]);

      document.getElementById("registerModalID").style.display = "none";
      document.getElementById("landingContainerID").style.opacity = 1;
      document.getElementById("registrationStatus").style.display = "block";
      document.getElementById("registrationStatus").innerText = "Registered Succesfully. Login to continue!"
    }
  }


  // handles login validation 

  var loginClicked = () => {
    var email = document.getElementById("emailInput").value;
    var password = document.getElementById("passwordInput").value;

    if (email === '') {
      document.getElementById("errorDisplayLogin").innerText = "E-mail is empty";
    }

    else if (isValidEmail(email) === false) {
      document.getElementById("errorDisplayLogin").innerText = "Enter Correct E-mail";
    }

    else if (password === '') {
      document.getElementById("errorDisplayLogin").innerText = "Password is empty";
    }

    else {
      for (var i = 0; i < userArray.length; i++) {

        if (userArray[i].email === email && userArray[i].password === password) {

          var tempObj = {
            email: email,
            password: password,
            name: userArray[i].name
          }
          setLoginFlag(tempObj);
          document.getElementById("errorDisplayLogin").innerText = "";
          navigate("../home", { replace: true });
        }

        else {
          document.getElementById("errorDisplayLogin").innerText = "Invalid Credentials";
        }

      }
    }
  }

  // handles signout event 

  var signOutClicked = () => {
    setLoginFlag({});
    navigate("../", { replace: true });
  }

  // manages the like functionality

  var liked = (event) => {

    posts.map((item, index) => {

      // checking if the user has already liked that post 

      if (index == event.currentTarget.id) {
        if (item.likedBy.includes(loginFlag.name) == false) {

          var tempObj = item;
          tempObj.likes++;
          tempObj.likedBy.push(loginFlag.name);
          var tempArray = posts;
          tempArray[index] = tempObj;
          setPosts([...tempArray]);
        }
        else {
          var tempObj2 = item;
          tempObj2.likes--;
          var temp3 = tempObj2.likedBy.filter((item3) => item3 != loginFlag.name);
          tempObj2.likedBy = temp3;
          var tempArray2 = posts;
          tempArray2[index] = tempObj2;
          setPosts([...tempArray2]);

        }
      }
    })
  }


  // handles comment functionality 

  var commented = (event) => {

    var commentContent = document.getElementById(event.currentTarget.id + "comment").value;

    posts.map((item, index) => {
      if (index == event.currentTarget.id) {

        var tempCommentObj = { "commentBy": loginFlag.name, "commentContent": commentContent }

        var tempPostObj = item;
        tempPostObj.comments.push(tempCommentObj);
        var tempArray = posts;
        tempArray[index] = tempPostObj;
        setPosts([...tempArray]);
        document.getElementById(event.currentTarget.id + "comment").value = "";
      }
    })

  }


  // removes the clicked post from the posts state array

  var deletePost = (event) => {
    var index = event.currentTarget.id;
    var tempArray = posts;
    tempArray.splice(index, 1);
    setPosts([...tempArray]);
  }

  // edits the clicked post as per the user's requirement 

  var editPost = (event) => {
    var clickedIndex = event.currentTarget.id;
    posts.map((item, index) => {
      if (index == clickedIndex) {
        setToBeEdited([item, index]);
      }
    });

    document.getElementById("editModalID").style.display = "block";
    document.getElementById("otherUsersDivID").style.opacity = "0.3";
    document.getElementById("postsDivID").style.opacity = "0.3";
    document.getElementById("userDetailsDivID").style.opacity = "0.3";
  }

  var closeEditModal = (event) => {
    document.getElementById("editModalID").style.display = "none";
    document.getElementById("otherUsersDivID").style.opacity = "1";
    document.getElementById("postsDivID").style.opacity = "1";
    document.getElementById("userDetailsDivID").style.opacity = "1";
  }

  var editImageHandler = (event) => {
    const tempURL = URL.createObjectURL(event.target.files[0]);
    setEditedImage(tempURL);
  }


  // saves the edited changes and modifies the array accordingly 

  var saveChanges = (event) => {
    event.preventDefault();
    var index = toBeEdited[1];

    var captionTemp = document.getElementById("editCaptionInput").value;

    var tempPostArray = posts;
    tempPostArray[index].image = editedImage;
    tempPostArray[index].caption = captionTemp;

    setPosts([...tempPostArray]);

    document.getElementById("editModalID").style.display = "none";
    document.getElementById("otherUsersDivID").style.opacity = "1";
    document.getElementById("postsDivID").style.opacity = "1";
    document.getElementById("userDetailsDivID").style.opacity = "1";
  }



  return (
    <div className="App">

      <Navbar loginFlag={loginFlag} signOutClicked={signOutClicked} />

      <Routes>

        <Route path="/" element={<LandingPage loginClicked={loginClicked} registerClicked={registerClicked} />} />

        <Route path="/home" element={<Home loginFlag={loginFlag} userArray={userArray} file={file} handleFileUpload={handleFileUpload} handleSubmit={handleSubmit} fileUpload={fileUpload} liked={liked} posts={posts} commented={commented} editPost={editPost} deletePost={deletePost} closeEditModal={closeEditModal} toBeEdited={toBeEdited} editImageHandler={editImageHandler} saveChanges={saveChanges} />} />

        <Route path="/aboutus" element={<AboutUs />} />


      </Routes>

    </div>
  );
}

export default App;
