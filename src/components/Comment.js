import React, { useState } from "react";
import ShowMoreText from "./ShowMoreText"; // Ensure the path is correct

const Comment = ({
  comment,
  handleLikeClick,
  handleContributeClick,
  handleReplyChange,
  handleCancelReply,
  handleReplySubmit,
  replyText,
}) => {
  const [liked, setLiked] = useState(false);

  const handleLike = (id) => {
    handleLikeClick(id);
    setLiked(!liked);
  };

  return (
    <div className="full-comment-community-box">
      <div className="media">
        <div className="d-flex flex-nowrap justify-content-center">
          <a href="#">
            <div className="media-left flex-shrink-0">
              <img src="user.PNG" width="64px" alt="User" />
            </div>
          </a>
          <div className="media-right flex-grow-1">
            <a href="#">
              <div className="user-title">
                <h5>{comment?.user?.username}</h5>
              </div>
              <div className="user-designation one-ellipsis">
                <p>{comment?.user?.userdescription} </p>
              </div>
            </a>
            <div className="comment-text line-clamp-5">
              <p>
                <ShowMoreText text={comment?.text} />
              </p>
            </div>
            <div className="like-unlike d-flex flex-row">
              <div className="d-flex like-btn">
                <a
                  href="#"
                  className="like-anchor"
                  onClick={() => handleLike(comment?._id)}
                >
                  <i
                    className={`fa-regular fa-thumbs-up ${
                      liked ? "liked" : ""
                    }`}
                  ></i>
                  <span className="like-hit-btn">Like</span>
                </a>
                <div className="d-flex reaction-buttons">
                  <img src="like.PNG" alt="image" />
                  <span className="like-count">{comment?.likes?.length}</span>
                </div>
              </div>
              <div>
                <div>
                  <span className="reply-count">
                    {comment?.replies?.length}
                  </span>
                  <a
                    href={`#text-comment-${comment?._id}`}
                    className="reply-anchor"
                    data-bs-toggle="collapse"
                  >
                    <i className="far fa-comment-dots"></i>
                    <span className="reply-btn" onClick={handleContributeClick}>
                      Reply
                    </span>
                  </a>
                </div>
              </div>
            </div>
            {comment?.replies?.map((reply, index) => (
              <Comment
                key={index}
                comment={reply}
                handleLikeClick={handleLikeClick}
                handleContributeClick={handleContributeClick}
                handleReplyChange={handleReplyChange}
                handleCancelReply={handleCancelReply}
                handleReplySubmit={handleReplySubmit}
                replyText={replyText}
              />
            ))}
            <div className="reply-comment">
              <div
                id={`text-comment-${comment?._id}`}
                className="collapse text-comment"
              >
                <textarea
                  placeholder="Reply to this contribution"
                  value={replyText}
                  onChange={handleReplyChange}
                />
                <div className="d-flex align-content-center justify-content-end gap-2">
                  <button
                    className="cancel-reply-btn"
                    onClick={handleCancelReply}
                  >
                    <a
                      href={`#text-comment-${comment?._id}`}
                      data-bs-toggle="collapse"
                    >
                      Cancel
                    </a>
                  </button>
                  <button
                    className="reply-comment-btn"
                    onClick={() => handleReplySubmit(comment?._id)}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
