import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./applying.css";

const defaultApplicationSummary = {
  role: "Senior Product Designer",
  company: "Pixel Studio",
  location: "Remote",
  salary: "$90k - $120k",
};

export default function ApplyingPage() {
  const location = useLocation();
  const selectedJob = location.state?.job ?? defaultApplicationSummary;
  const applicationSummary = {
    role: selectedJob.title ?? selectedJob.role ?? defaultApplicationSummary.role,
    company: selectedJob.company ?? defaultApplicationSummary.company,
    location: selectedJob.location ?? defaultApplicationSummary.location,
    salary: selectedJob.salary ?? defaultApplicationSummary.salary,
  };

  const [form, setForm] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 234-8899",
    portfolio: "https://portfolio.example.com",
    coverLetter: "I’m excited to apply for this role because I enjoy turning product problems into elegant user experiences and measurable outcomes.",
    resume: "resume.pdf",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="applying-page">
      <div className="applying-shell">
        <aside className="applying-sidebar card">
          <p className="eyebrow">Application</p>
          <h1>{applicationSummary.role}</h1>
          <div className="company-block">
            <div className="company-mark">P</div>
            <div>
              <strong>{applicationSummary.company}</strong>
              <span>{applicationSummary.location}</span>
            </div>
          </div>

          <ul className="info-list">
            <li><span>Salary</span><strong>{applicationSummary.salary}</strong></li>
            <li><span>Type</span><strong>Full-time</strong></li>
            <li><span>Experience</span><strong>5+ years</strong></li>
          </ul>

          <div className="highlights">
            <span>Figma</span>
            <span>UX Writing</span>
            <span>Design Systems</span>
            <span>Research</span>
          </div>
        </aside>

        <main className="applying-main card">
          <div className="section-head">
            <div>
              <p className="eyebrow">Submit your profile</p>
              <h2>Apply for this position</h2>
            </div>
            <button type="button" className="btn btn--ghost">Save draft</button>
          </div>

          <form className="application-form" onSubmit={handleSubmit}>
            <div className="field-row two-col">
              <label>
                Full name
                <input name="fullName" value={form.fullName} onChange={handleChange} />
              </label>
              <label>
                Email address
                <input type="email" name="email" value={form.email} onChange={handleChange} />
              </label>
            </div>

            <div className="field-row two-col">
              <label>
                Phone number
                <input name="phone" value={form.phone} onChange={handleChange} />
              </label>
              <label>
                Portfolio URL
                <input name="portfolio" value={form.portfolio} onChange={handleChange} />
              </label>
            </div>

            <label>
              Cover letter
              <textarea name="coverLetter" rows="6" value={form.coverLetter} onChange={handleChange} />
            </label>

            <div className="upload-row">
              <label>
                Resume
                <input type="text" name="resume" value={form.resume} onChange={handleChange} />
              </label>
              <button type="button" className="btn btn--ghost upload-btn">Upload file</button>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn--ghost">Cancel</button>
              <button type="submit" className="btn btn--red">Submit application</button>
            </div>

            {submitted && (
              <div className="success-message">
                Application submitted successfully. The hiring team will review your profile soon.
              </div>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}
