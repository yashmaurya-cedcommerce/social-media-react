import React from 'react';


export default function Home(props) {

  var renderActionBtn = (index) => {
    return <div className='postActionDiv'>

      <button className='postActionBtn mx-1' id={index} onClick={(event) => props.editPost(event)}><i class="fa-solid fa-pen-to-square"></i></button>

      <button className='postActionBtn mx-1' id={index} onClick={(event) => props.deletePost(event)}><i class="fa-solid fa-trash"></i></button>

    </div>
  }


  return (

    <>
      <div className='homeContainer mt-3'>

        <div className='otherUsersDiv p-2' id="otherUsersDivID">

          <h5>People You May Know <i class="fa-solid fa-users"></i></h5>
          <hr />
          {props.userArray.map((item, index) => {
            return <div className='userListDiv'>

              <p className='userNameSidebar'><i class="fa-solid fa-user me-2"></i>{item.name}<br />
                {item.email}</p>

              <p><i className="fa-solid fa-circle-dot onlineIcon"></i></p>

            </div>
          })}

        </div>

        <div className='postsDiv' id="postsDivID">

          <div className='uploadDiv py-4'>

            <p className='fw-bold onMind'>What's on Your Mind?</p>

            <textarea type="text" id='captionInput' placeholder='Write Something'></textarea>

            <div className='uploadFooterDiv'>

              <form onSubmit={props.handleSubmit}>

                <input type="file" id='fileUploadInput' onChange={(event) => props.handleFileUpload(event)} />

                <button type="submit" className='fileUploadBtn'>Post<i class="fa-solid fa-arrow-up-from-bracket mx-1"></i></button>

              </form>

            </div>
          </div>

          <div className='feedPostsDiv'>

            {props.posts.map((post, index) => {

              return <>
                <div className='singlePostDiv'>

                  <div className='postHeader'>

                    <div className='postHeaderCredits'>

                      <img src="../profile.webp" alt="asa" className='img-fluid postProfileImage me-2' /><b>{post.name}</b>


                    </div>



                    {(post.name === props.loginFlag.name) ? renderActionBtn(index) : ''}



                  </div>

                  <div className='postImageDiv'>

                    <img src={post.image} alt="" className='img-fluid' />

                  </div>

                  <div className='postCreditDiv mt-3'>

                    <p>

                      <i class="fa-solid fa-heart mx-1 likeBtn" id={index} onClick={(event) => props.liked(event)}></i> {post.likes}

                      <i class="fa-solid fa-comments mx-2 commentBtn" ></i> {post.comments.length}

                      <i class="fa-solid fa-share-nodes mx-2"></i>

                    </p>

                    <p> - {post.name}</p>

                  </div>

                  <div className='postCaptiontDiv'>

                    <p>{post.caption}</p>

                  </div>

                  <div className='commentsDiv'>

                    <ul className='commentsDisplay'>

                      {post.comments.map((item) => {
                        return (<>
                          <li className='commentLi'><b>{item.commentBy}</b> : {item.commentContent}</li>
                          <hr />
                        </>
                        )
                      })}

                    </ul>

                    <div className='addCommentDiv'>

                      <p className='my-0'>Add a comment</p>

                      <div className='addCommentFlex'>

                        <input type="text" className='addCommentInput' id={index + "comment"} />

                        <button className='postCommentBtn' id={index} onClick={(event) => props.commented(event)}><i class="fa-solid fa-arrow-up-from-bracket"></i></button>

                      </div>

                    </div>

                  </div>

                </div>
              </>
            })
            }

          </div>

        </div>

        <div className='userDetailsDiv py-3' id="userDetailsDivID">

          <p className='myDetailsHeading'>My Account</p>

          <div className='profilePicDiv'>

            <img src="../profile.webp" alt="asa" className='img-fluid' />

          </div>

          <p><i class="fa-solid fa-user"></i>{props.loginFlag.name}</p>

          <p><b>Email : </b>{props.loginFlag.email}</p>

        </div>

        <div className='editPostModal' id="editModalID">

          <p className='closeEditModalBtn' id="closeEditModalID" onClick={() => props.closeEditModal()}><i class="fa-solid fa-xmark"></i></p>

          <p className='editModalHeading'>Edit Your Post</p>

          <div className='editModalMain'>

            <div className='editImageDiv'>

              <img src={props.toBeEdited?.[0].image} className='img-fluid' alt="noooo" />

            </div>

            <div className='editCaptionDiv'>

              <textarea id="editCaptionInput" defaultValue={props.toBeEdited?.[0].caption}></textarea>

              <form onSubmit={props.saveChanges} className='editPostForm'>

                <input type="file" className='my-2' id="updatedImage" onChange={(event) => props.editImageHandler(event)} />

                <button type="submit" className='saveChangesBtn my-3'>Save Changes</button>

              </form>



            </div>

          </div>

        </div>

      </div>



    </>
  )
}
