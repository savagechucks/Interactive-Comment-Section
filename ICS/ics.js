// Vairables of Containers holding comments and replies

const commentsContainer = document.querySelector(".unpadded-comment");
// const repliesContainer = document.querySelector('')

// Comments
const commentBoxId1 = document.getElementById("comment-box1");
const commentBoxId2 = document.getElementById("comment-box2");

// Replies
const replyBoxId1 = document.getElementById("reply-box1");
const replyBoxId2 = document.getElementById("reply-box2");

// Reply empty boxes
const emptyReplyBoxId = document.getElementById("empty-reply-box");

// Variables holding the buttons: reply, delete, edit, send, update...

const replyBtnId1 = document.getElementById("reply-btn1");
const replyBtnId2 = document.getElementById("reply-btn2");
const replyBtnId3 = document.getElementById("reply-btn3");
const replyBtnId4 = document.getElementById("reply-btn4");

// Send
const sendBtnId1 = document.getElementById("send-btn1");

// window.addEventListener("DOMContentLoaded", function () {

// });
// let   comm = 0
fetch("./data.json")
  .then((Response) => Response.json())
  .then((data) => {
    const comments = data.comments;
    commentsContainer.innerHTML = "";
    comments.forEach((comment) => {
      let commentHTML = ` <li>
          <article id="${comment.id}" class="comment-contents">
            <div class="first-score-icons">
              <img src="./images/icon-plus.svg" alt="" class="plus-icon" />
              <p class="number">${comment.score}</p>
              <img src="./images/icon-minus.svg" alt="" class="minus" />
            </div>
            <div class="second-contents-heading">
              <div class="content-user-heading">
                <div class="content-header">
                  <img
                    src="${comment.user.image.png}"
                    alt=""
                    class="user-avatar"
                  />
                  <h3 class="user-name">${comment.user.username}</h3>
                  <p class="timestamp">
                    <time datetime="2025-09-16">${comment.createdAt}</time>
                  </p>
                </div>

                <div class="reply-btn">
                  <img src="./images/icon-reply.svg" alt="" class="reply" />
                  <button class="reply-text" data-comment-id="${
                    comment.id
                  }" >Reply</button>
                </div>
              </div>

              <div class="comment-text">
                ${comment.content}
            </div>
          </article>
        </li>


        `;
      
      
// check if any comment has a reply, if it does, create the comment reply.
      if (comment.replies.length > 0) {
        let allRepliesHTML = "";

        comment.replies.forEach((reply) => {
          const repliesHTML = `<li>
                  <article id="${reply.id}" class="comment-card">
                    <div class="first-score-icons">
                      <img
                        src="./images/icon-plus.svg"
                        alt=""
                        class="plus-icon"
                      />
                      <p class="number">${reply.score}</p>
                      <img src="./images/icon-minus.svg" alt="" class="minus" />
                    </div>
                    <div class="second-contents-heading">
                      <div class="content-user-card-heading">
                        <div class="content-header">
                          <img
                            src="${reply.user.image.webp}"
                            alt=""
                            class="user-avatar"
                          />
                          <h3 class="user-name">${reply.user.username}</h3>
                          <p class="timestamp">
                            <time datetime="2025-09-16">${reply.createdAt}</time>
                          </p>
                        </div>

                        <div class="reply-card-btn">
                          <img
                            src="./images/icon-reply.svg"
                            alt=""
                            class="reply"
                          />
                          <button class="reply-text" data-comment-id="${reply.id}">
                            Reply
                          </button>
                        </div>
                      </div>

                      <div class="comment-card-text">
                        ${reply.content}
                      </div>
                    </div>
                  </article>
                </li>`;
          allRepliesHTML += repliesHTML;
 




        });
// Add the comment reply box to the comment depending on how many the comment has
        commentHTML += `
        <div class="reply-block">
            <div class="vertical-line"></div>
            <div class="reply-list-ul">
              <ul class="replies-list">
                ${allRepliesHTML}
              </ul>
            </div>
          </div>
        `;
      }

      commentsContainer.innerHTML += commentHTML;
    });

           
   
// Create the currentUser comment box
    commentsContainer.innerHTML += `<li>
          <article id="empty-send-box" class="send-section">
            <div class="reply-section-content">
              <img
                src="${data.currentUser.image.webp}"
                alt=""
                class="user-reply-avatar"
              />
              <textarea
                name=""
                placeholder="Add a comment..."
                id="text-section"
                rows="30"
                cols="50"
              ></textarea>

              <button id="send-btn1" class="send-btn">SEND</button>
            </div>
          </article>
        </li>
     `;
    
        addReplyEventListeners();

    
    // function for the reply buttons for each comment.
    function addReplyEventListeners() {
      const replyButtons = document.querySelectorAll(".reply-text");

      replyButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
          const existingReplyBox = document.querySelector('.reply-section');
          
          if (existingReplyBox) {
            existingReplyBox.remove();
          }


          const commentID = e.currentTarget.dataset.commentId;
          // console.log(commentID);
          
          const commentArticle = document.getElementById(commentID);
          // console.log(commentArticle);
          
          
          // Create the reply box HTML here
        const replyBoxHtml = `
          <article class="reply-section">
            <div class="reply-section-content">
              <img
                src="${data.currentUser.image.webp}"
                alt=""
                class="user-reply-avatar"
              />
              <textarea
                name=""
                placeholder="Add a comment..."
                id="text-section"
                rows="30"
                cols="50"
              ></textarea>

              <button class="current-reply-btn">REPLY</button>
            </div>
          </article>
        `;
          
            commentArticle.insertAdjacentHTML("afterend", replyBoxHtml);


        });
      });
    }
   
  });


 