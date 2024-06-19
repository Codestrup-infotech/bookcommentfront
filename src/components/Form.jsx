import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Form({ formId }) {
  const fullCommentRef = useRef(null);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = () => {
    if (replyText.trim() !== "") {
      const newReplies = [...replies, replyText];
      setReplies(newReplies);
      setReplyText("");
    }
  };

  const handleLikeClick = () => {
    setCount(count + 1);
    setLiked(true);
  };
  const handleCancelReply = () => {
    setReplyText("");
  };
  const handleContributeClick = () => {
    if (fullCommentRef.current) {
      fullCommentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="like-unlike d-flex flex-row">
        <div className="d-flex like-btn">
          <a href="#" className="like-anchor" onClick={handleLikeClick}>
            <i
              className={`fa-regular fa-thumbs-up ${liked ? "liked" : ""}`}
            ></i>
            <span className="like-hit-btn">Like</span>
          </a>
          <div class="d-flex reaction-buttons">
            <img src="like.PNG" alt="image" />
            <span className="like-count ">{count}</span>
          </div>
        </div>
        <div>
          <div>
            <span className="reply-count">{replies?.length}</span>
            <a
              href={`#text-comment-${formId}`}
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

      <div className=" reply-comment">
        <div
          id={`text-comment-${formId}`}
          className="collapse text-comment"
          ref={fullCommentRef}
        >
          <textarea
            placeholder="Reply to this contribution"
            value={replyText}
            onChange={handleReplyChange}
          />
          <div className="d-flex align-content-center justify-content-end gap-2">
            <button className="cancel-reply-btn" onClick={handleCancelReply}>
              Cancel
            </button>
            <button className="reply-comment-btn" onClick={handleReplySubmit}>
              Reply
            </button>
          </div>
        </div>
        {replies?.length > 0 && (
          <div className="replies-container">
            <h6>Replies:</h6>
            {replies.map((reply, index) => (
              <div key={index} className="reply-item">
                {reply}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Form;
