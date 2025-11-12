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
const existingReplyBox = document.querySelector(".reply-section");

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

    const savedReplies = JSON.parse(localStorage.getItem("userReplies")) || [];

    savedReplies.forEach((item) => {
      const parentComment = data.comments.find(
        (c) => c.id == item.parentCommentId
      );
      if (parentComment) {
        parentComment.replies.push(item.reply);
      }
    });

    // save function
    function saveReplyToStorage(newReply, parentCommentId) {
      // save to localStorage
      const savedReplies =
        JSON.parse(localStorage.getItem("userReplies")) || [];

      
      
      let actualParentCommentId = parentCommentId;

      

      // Add to comment replies array in memory
      let parentComment = data.comments.find((c) => c.id == parentCommentId);

      if (!parentComment) {
        parentComment = data.comments.find((comment) =>
          comment.replies.some((r) => r.id == parentCommentId)
        );
        actualParentCommentId = parentComment
          ? parentComment.id
          : parentCommentId;
      }


      savedReplies.push({
        parentCommentId: actualParentCommentId,
        reply: newReply,
      });
      localStorage.setItem("userReplies", JSON.stringify(savedReplies));

      if (parentComment) {
        parentComment.replies.push(newReply);
      }

      location.reload();
    }

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
                  <button class="reply-text" data-comment-id="${comment.id}" >Reply</button>
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
          let repliesHTML;

          // Check if the reply is from the current user
          // const isCurrentUser = reply.user.username === data.currentUser.username;
          if (reply.user.username === data.currentUser.username) {
            // Modify the repliesHTML to include delete and edit buttons
            repliesHTML = `<li>
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

                        <div class="edit-delete-div">
                          <div class="delete-btn">
                            <img
                              src="./images/icon-delete.svg"
                              alt=""
                              class="delete"
                            />
                            <button class="delete-text">Delete</button>
                          </div>

                          <div class="edit-card-btn">
                            <img
                              src="./images/icon-edit.svg"
                              alt=""
                              class="reply"
                            />
                            <button class="edit-text">Edit</button>
                          </div>
                        </div>
                      </div>
                    


                      <div class="comment-card-text">
                        ${reply.content}
                      </div>
                    </div>
                  </article>
                </li>`;
          } else {
            repliesHTML = `<li>
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
          }

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
                class="reply-text-area"
                rows="30"
                cols="50"
              ></textarea>

              <button class="current-reply-btn" data-comment-id="${commentID}">REPLY</button>
            </div>
          </article>
        `;

          commentArticle.insertAdjacentHTML("afterend", replyBoxHtml);

          const replyBtns = document.querySelector(".current-reply-btn");
          replyBtns.addEventListener("click", function (e) {
            // Get the text
            const textArea = document.getElementById("text-section");
            let textValue = textArea.value;
            const parentCommentId = e.currentTarget.dataset.commentId;
            console.log(parentCommentId);

            // Find the comment the user is trying to reply to
            const parentComment = data.comments.find(
              (c) => c.id == parentCommentId
            );
            console.log(parentComment);

            // Get the username from that comment
            let replyingToUsername = "";
            console.log(replyingToUsername);

            if (parentComment) {
              replyingToUsername = parentComment.user.username;
            } else {
              data.comments.forEach((comment) => {
                const foundReply = comment.replies.find(
                  (r) => r.id == parentCommentId
                );
                console.log(foundReply);

                if (foundReply) {
                  replyingToUsername = foundReply.user.username;
                }
              });
            }

            // When user adds reply.
            const newReply = {
              id: Date.now(),
              content: textValue,
              createdAt: "Just now",
              score: 0,
              replyingTo: replyingToUsername,
              user: {
                image: {
                  png: data.currentUser.image.png,
                  webp: data.currentUser.image.webp,
                },
                username: data.currentUser.username,
              },
            };

            console.log(newReply);

            textArea.value = "";

            saveReplyToStorage(newReply, parentCommentId);
          });
        });
      });
    }
  });

// Add event listeners for delete and edit buttons
// setTimeout(() => {
//   const deleteBtn = document.querySelector(`.delete-btn[data-reply-id="${reply.id}"]`);
//   const editBtn = document.querySelector(`.edit-btn[data-reply-id="${reply.id}"]`);

//   deleteBtn.addEventListener("click", function () {
//     // Remove reply from localStorage
//     let savedReplies = JSON.parse(localStorage.getItem("userReplies")) || [];
//     savedReplies = savedReplies.filter(item => item.reply.id !== reply.id);
//     localStorage.setItem("userReplies", JSON.stringify(savedReplies));

//     // Reload the page to reflect changes
//     location.reload();
//   });

//   editBtn.addEventListener("click", function () {
//     const replyContentDiv = document.querySelector(`#${reply.id} .comment-card-text`);
//     const originalContent = replyContentDiv.innerHTML;

//     // Replace content with textarea for editing
//     replyContentDiv.innerHTML = `
//       <textarea class="edit-reply-textarea">${originalContent}</textarea>
//       <button class="update-reply-btn" data-reply-id="${reply.id}">Update</button>
//     `;

//     // Add event listener for update button
//     const updateBtn = replyContentDiv.querySelector(".update-reply-btn");
//     updateBtn.addEventListener("click", function () {
//       const updatedContent = replyContentDiv.querySelector(".edit-reply-textarea").value;

//       // Update the reply in localStorage
//       let savedReplies = JSON.parse(localStorage.getItem("userReplies")) || [];
//       savedReplies = savedReplies.map(item => {
//         if (item.reply.id === reply.id) {
//           item.reply.content = updatedContent;
//         }
//         return item;
//       });
//       localStorage.setItem("userReplies", JSON.stringify(savedReplies));

//       // Reload the page to reflect changes
//       location.reload();
//     });
//   });
// }, 0)
