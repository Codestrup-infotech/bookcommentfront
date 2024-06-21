import React, { useRef, useState } from "react";
import ShowMoreText from "./ShowMoreText"; // Ensure the path is correct

const Comment = ({
  comment,
  handleLikeClick,
  // handleContributeClick,
  handleReplyChange,
  handleCancelReply,
  handleReplySubmit,
  replyText,
}) => {
  const [liked, setLiked] = useState(false);
  const commentRefs = useRef({});
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const getLike = (arr) => {
    return arr?.some((element) => element._id === params.get("userId"));
  };

  console.log(liked, "cccc");

  const handleLike = (id) => {
    handleLikeClick(id);
    setLiked(!liked);
  };
  const handleContributeClick = (commentId) => {
    if (commentRefs.current[commentId]) {
      commentRefs.current[commentId].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="media-right flex-grow-1 mt-2">
      <div className="box-comment">
        <div className="d-flex flex-nowrap justify-content-start gap-2">
          <a href="#">
            <div className="media-left flex-shrink-0">
              <img src="user.PNG" width="64px" alt="User" />
            </div>
          </a>
          <a href="#">
            <div className="user-title">
              <h5>{comment?.user?.username}</h5>
            </div>
            <div className="user-designation one-ellipsis">
              <p>{comment?.user?.userdescription} </p>
            </div>
          </a>
        </div>
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
              onClick={() => {
                handleLike(comment?._id);
              }}
            >
              <i
                className={` ${
                  getLike(comment?.likes)
                    ? "fa-solid fa-thumbs-up"
                    : "fa-regular fa-thumbs-up"
                }`}
              ></i>
              <span className="like-hit-btn">
                {" "}
                {getLike(comment?.likes) ? "Unlike" : "Like"}
              </span>
            </a>
            <div className="d-flex reaction-buttons">
              <img src="like.PNG" alt="image" />
              <span className="like-count">{comment?.likes?.length}</span>
            </div>
          </div>
          <div>
            <div>
              <span className="reply-count">{comment?.replies?.length}</span>
              <a
                href={`#text-comment-${comment?._id}`}
                className="reply-anchor"
                data-bs-toggle="collapse"
              >
                <i className="far fa-comment-dots"></i>
                <span
                  className="reply-btn"
                  onClick={() => handleContributeClick(comment?._id)}
                >
                  Reply
                </span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="reply-comment"
          ref={(el) => (commentRefs.current[comment._id] = el)}
        >
          <div
            id={`text-comment-${comment?._id}`}
            className="collapse text-comment"
            // ref={commentRefs}
          >
            <textarea
              placeholder="Reply to this contribution"
              value={replyText}
              onChange={handleReplyChange}
            />
            <div className="d-flex align-content-center justify-content-end gap-2">
              <button className="cancel-reply-btn" onClick={handleCancelReply}>
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
        <div className="box-noborder">
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
        </div>
      </div>
    </div>
  );
};

export default Comment;
