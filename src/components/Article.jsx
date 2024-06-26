import React, { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import CommentsList from "./CommentsList"; // Ensure the path is correct

const Article = () => {
  const scrollToRef = useRef({});
  const [bookData, setBookData] = useState(null);
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [liked, setLiked] = useState(false);
  const fullCommentRef = useRef(null);
  const [userId, setUserId] = useState(null);
  const [bookId, setBookId] = useState(null);
  // query

  console.log(userId, bookId);

  const handleScrollToUserTitle = (refName) => {
    scrollToRef.current[refName].scrollIntoView({ behavior: "smooth" });
  };

  const handleContributeClick = () => {
    if (fullCommentRef.current) {
      fullCommentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = async (e) => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    setUserId(params.get("userId"));
    setBookId(params.get("bookId"));

    if (replyText.trim() !== "") {
      try {
        const response = await axios({
          url: `http://192.168.1.111:5000/comments/${e}/reply`,
          method: "POST",
          data: {
            book: bookData?._id,
            user: params.get("userId"),
            text: replyText,
          },
        });

        if (response.status === 201) {
          getBook();
          setReplyText("");
        } else {
          console.log("Failed to submit reply");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addCommentBook = async () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    setUserId(params.get("userId"));
    setBookId(params.get("bookId"));
    if (replyText.trim() !== "") {
      try {
        const response = await axios({
          url: `http://192.168.1.111:5000/comments/addComment`,
          method: "POST",
          data: {
            bookId: bookData?._id,
            user: params.get("userId"),
            text: replyText,
          },
        });

        if (response.status === 201) {
          getBook();
          setReplyText("");
        } else {
          console.log("Failed to submit reply");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLikeClick = async (e) => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    setUserId(params.get("userId"));
    setBookId(params.get("bookId"));
    try {
      const response = await axios({
        url: `http://192.168.1.111:5000/comments/${e}/like`,
        method: "POST",
        data: {
          userId: params.get("userId"),
        },
      });

      if (response.status === 200) {
        getBook();
      } else {
        console.log("Failed to like comment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelReply = () => {
    setReplyText("");
  };

  const getBook = async () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    setUserId(params.get("userId"));
    setBookId(params.get("bookId"));
    try {
      const response = await axios({
        url: `http://192.168.1.111:5000/books/${params.get("bookId")}`,
        method: "GET",
      });

      if (response.status === 200) {
        setBookData(response?.data);
        setComments(response?.data?.comments);
      } else {
        console.log("Failed to fetch book data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook();
    // parseQueryString();
  }, []);

  return (
    <div>
      <Container>
        <div className="container mt-5 mb-5 ">
          <div className="row">
            <div className="col-lg-5 col-md-12 col-sm-12">
              <div className="left-side-book">
                <img src="/book.PNG" className="img-fluid" alt="Image" />
              </div>
            </div>
            <div className="col-lg-7 col-md-12 col-sm-12">
              <div className="community-chat-box">
                <div className="">{/* <h1>{bookData?.bookname}</h1> */}</div>
                <div className="">
                  <h1>Top experts in this article</h1>
                  <p>
                    Selected by the community from 37 contributions.{" "}
                    <strong className="font-500">
                      <a href="#" className="learn-more">
                        {" "}
                        Learn More{" "}
                      </a>
                    </strong>
                  </p>
                </div>
                <div className="earn-community-box">
                  <div className="media">
                    <div className="d-flex flex-nowrap justify-content-center">
                      <div className="media-left flex-shrink-0">
                        <img src="user.PNG" width="64px" alt="User" />
                      </div>
                      <div className="media-right flex-grow-1">
                        <div className="media-right-title">
                          <h5>Earn a Community Top Voice badge</h5>
                        </div>
                        <p>
                          Add to collaborative articles to get recognized for
                          your expertise on your profile.{" "}
                          <strong className="font-500">
                            <a href="#" className="learn-more">
                              Learn more
                            </a>
                          </strong>
                        </p>
                        <button
                          className="contribute-btn"
                          onClick={handleContributeClick}
                        >
                          <a href={`#text-comment`} data-bs-toggle="collapse">
                            Start a contribution
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="reply-comment" ref={fullCommentRef}>
                  <div id={`text-comment`} className="collapse text-comment">
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
                        <a href={`#text-comment`} data-bs-toggle="collapse">
                          Cancel
                        </a>
                      </button>
                      <a href={`#text-comment`} data-bs-toggle="collapse">
                        <button
                          className="reply-comment-btn"
                          onClick={() => addCommentBook()}
                        >
                          Reply
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="full-comment-community-box">
                  <div className="media">
                    <CommentsList
                      comments={comments}
                      handleLikeClick={handleLikeClick}
                      handleContributeClick={handleContributeClick}
                      handleReplyChange={handleReplyChange}
                      handleCancelReply={handleCancelReply}
                      handleReplySubmit={handleReplySubmit}
                      replyText={replyText}
                     
                    />
                  </div>
                </div>
                {/* <div className="load-more-contrubute">
                  <button>Load more contributions</button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Article;
