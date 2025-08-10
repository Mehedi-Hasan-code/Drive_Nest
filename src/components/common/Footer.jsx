import React from 'react';

const Footer = () => {
  return (
    <div className="bg-base rounded-2xl mt-10 md:mt-20 p-10">
      <div className="max-w-[1600px] mx-auto">
        <footer className="footer justify-center sm:justify-between sm:footer-horizontal text-anti-base w-11/12 mx-auto  ">
          <aside>
            <img className="w-24" src="/car.png" alt="" />
            <p>
              Drive Nest Company Ltd.
              <br />
              Providing reliable Services since 1992
            </p>
          </aside>
          <nav>
            <h6 className="footer-title">Services</h6>
            <a
              className="link link-hover"
              href="https://example.com/branding"
              target="_blank"
              rel="noopener noreferrer"
            >
              Branding
            </a>
            <a
              className="link link-hover"
              href="https://example.com/design"
              target="_blank"
              rel="noopener noreferrer"
            >
              Design
            </a>
            <a
              className="link link-hover"
              href="https://example.com/marketing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Marketing
            </a>
            <a
              className="link link-hover"
              href="https://example.com/advertisement"
              target="_blank"
              rel="noopener noreferrer"
            >
              Advertisement
            </a>
          </nav>
          <nav>
            <h6 className="footer-title">Social</h6>
            <a
              className="link link-hover"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              className="link link-hover"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              className="link link-hover"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              className="link link-hover"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a
              className="link link-hover"
              href="https://example.com/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of use
            </a>
            <a
              className="link link-hover"
              href="https://example.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy policy
            </a>
            <a
              className="link link-hover"
              href="https://example.com/cookie"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cookie policy
            </a>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
