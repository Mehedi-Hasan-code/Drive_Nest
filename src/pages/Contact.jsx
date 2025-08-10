import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend or email service
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <h1
        className="text-3xl font-bold mb-2"
        style={{ color: 'var(--color-btn-bg)' }}
      >
        Contact Us
      </h1>
      <p
        className="mb-6 text-center max-w-md"
        style={{ color: 'var(--color-anti-base)' }}
      >
        Have questions, feedback, or need support? Fill out the form below and
        our team will get back to you soon!
      </p>
      <div
        className="w-full max-w-md rounded-lg shadow p-6"
        style={{
          background: 'var(--color-base)',
          color: 'var(--color-anti-base)',
        }}
      >
        {submitted ? (
          <div
            className="text-center font-semibold"
            style={{ color: 'var(--color-btn-bg)' }}
          >
            Thank you for reaching out! We'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: 'var(--color-anti-base)' }}
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring"
                style={{
                  borderColor: 'var(--color-btn-bg)',
                  background: 'var(--color-base)',
                  color: 'var(--color-anti-base)',
                }}
                placeholder="Your Name"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: 'var(--color-anti-base)' }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring"
                style={{
                  borderColor: 'var(--color-btn-bg)',
                  background: 'var(--color-base)',
                  color: 'var(--color-anti-base)',
                }}
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: 'var(--color-anti-base)' }}
              >
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring"
                style={{
                  borderColor: 'var(--color-btn-bg)',
                  background: 'var(--color-base)',
                  color: 'var(--color-anti-base)',
                }}
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-md font-semibold hover:transition"
              style={{
                background: 'var(--color-btn-bg)',
                color: 'var(--color-base)',
              }}
            >
              Send Message
            </button>
          </form>
        )}
      </div>
      <div
        className="mt-8 text-sm text-center"
        style={{ color: 'var(--color-anti-base)' }}
      >
        Or email us directly at{' '}
        <a
          href="mailto:support@drivenest.com"
          style={{ color: 'var(--color-btn-bg)', textDecoration: 'underline' }}
        >
          support@drivenest.com
        </a>
      </div>
    </div>
  );
};

export default Contact;
