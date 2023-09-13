import "./feedback.scss";
import Search from "../../Components/Search/Search";

import { useState } from "react";

function FeedbackPage() {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    feedbackType: "Bug report",
    subject: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would typically send the feedback data to your backend for processing.
    // For this example, we'll just log it to the console.
    console.log(feedback);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  return (
    <div>
      <Search />
      <div className="feedback">
        <div className="feedback__container">
          <h1 className="feedback__header">Feedback and Reporting</h1>
          <form className="feedback__form" onSubmit={handleSubmit}>
            <label className="feedback__label">
              Name:
              <input
                type="text"
                name="name"
                value={feedback.name}
                onChange={handleChange}
                className="feedback__input"
              />
            </label>
            <br />
            <label className="feedback__label">
              Email:
              <input
                type="email"
                name="email"
                value={feedback.email}
                onChange={handleChange}
                className="feedback__input"
              />
            </label>
            <br />
            <label className="feedback__label">
              Type of Feedback:
              <select
                name="feedbackType"
                value={feedback.feedbackType}
                onChange={handleChange}
                className="feedback__select"
              >
                <option value="Bug report">Bug report</option>
                <option value="Suggestion">Suggestion</option>
                <option value="Content request">Content request</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <br />
            <label className="feedback__label">
              Subject:
              <input
                type="text"
                name="subject"
                value={feedback.subject}
                onChange={handleChange}
                className="feedback__input"
              />
            </label>
            <br />
            <label className="feedback__label">
              Description:
              <textarea
                name="description"
                value={feedback.description}
                onChange={handleChange}
                className="feedback__textarea"
              ></textarea>
            </label>
            <br />
            <button type="submit" className="feedback__button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
