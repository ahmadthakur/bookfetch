import { Input, Select, Textarea, Button, SelectItem } from "@nextui-org/react";
import Navbar from "../Components/Navbar";
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
    <div className="py-12">
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6">Feedback and Reporting</h1>
          <form onSubmit={handleSubmit}>
            <Input
              label="Name"
              name="name"
              value={feedback.name}
              onChange={handleChange}
              className="mb-4"
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={feedback.email}
              onChange={handleChange}
              className="mb-4"
            />
            <Select
              label="Type of Feedback"
              name="feedbackType"
              value={feedback.feedbackType}
              onChange={handleChange}
              className="mb-4"
            >
              <SelectItem value="Bug report">Bug report</SelectItem>
              <SelectItem value="Suggestion">Suggestion</SelectItem>
              <SelectItem value="Content request">Content request</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </Select>

            <Input
              label="Subject"
              name="subject"
              value={feedback.subject}
              onChange={handleChange}
              className="mb-4"
            />
            <Textarea
              label="Description"
              name="description"
              value={feedback.description}
              onChange={handleChange}
              className="mb-4"
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
