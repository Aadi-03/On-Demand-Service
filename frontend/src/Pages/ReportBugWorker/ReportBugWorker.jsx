import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./ReportBugWorker.css";
import NewNavbar from "../../Components/NewNavbar/NewTradesmanNavbar";
import Footer from "../../Components/Footer/Footer";

const ReportBugWorker = () => {
  const [bugReport, setBugReport] = useState({
    title: "",
    description: "",
    severity: "low",
    deviceInfo: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBugReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailjs.send(
        "",
        "",
        {
          message: `Bug Report Details
                        Title: ${bugReport.title}
                        Description: ${bugReport.description}
                        Severity: ${bugReport.severity}
                        Device Info: ${bugReport.deviceInfo}
                        Email: ${bugReport.email}`,
        },
        ""
      );

      alert("Bug report sent successfully!");
      setBugReport({
        title: "",
        description: "",
        severity: "low",
        deviceInfo: "",
        email: "",
      });
    } catch (error) {
      console.error("Error sending bug report:", error);
      alert("Failed to send bug report. Please try again.");
    }
  };

  return (
    <>
      <NewNavbar />
      <div className="bug-report">
        <div className="bug-report__wrapper">
          <div className="bug-report__container">
            <h1 className="bug-report__title">Report a Bug</h1>
            <p className="bug-report__subtitle">
              Help us improve by reporting bugs you encounter
            </p>
            <form onSubmit={handleSubmit} className="bug-report__form">
              <div className="bug-report__form-group">
                <label htmlFor="title" className="bug-report__label">
                  Bug Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={bugReport.title}
                  onChange={handleInputChange}
                  className="bug-report__input"
                  placeholder="Enter a short title"
                  required
                />
              </div>

              <div className="bug-report__form-group">
                <label htmlFor="description" className="bug-report__label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={bugReport.description}
                  onChange={handleInputChange}
                  className="bug-report__textarea"
                  placeholder="Explain the issue you're experiencing"
                  required
                />
              </div>

              <div className="bug-report__form-group">
                <label htmlFor="severity" className="bug-report__label">
                  Severity
                </label>
                <select
                  id="severity"
                  name="severity"
                  value={bugReport.severity}
                  onChange={handleInputChange}
                  className="bug-report__select"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div className="bug-report__form-group">
                <label htmlFor="deviceInfo" className="bug-report__label">
                  Device & Browser
                </label>
                <input
                  type="text"
                  id="deviceInfo"
                  name="deviceInfo"
                  value={bugReport.deviceInfo}
                  onChange={handleInputChange}
                  className="bug-report__input"
                  placeholder="e.g., Android 13, Chrome 115"
                />
              </div>

              <div className="bug-report__form-group">
                <label htmlFor="email" className="bug-report__label">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={bugReport.email}
                  onChange={handleInputChange}
                  className="bug-report__input"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <button type="submit" className="bug-report__submit">
                Submit Report
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReportBugWorker;
