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
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <h6 className="footer-title">Social</h6>
            <a className="link link-hover">Twitter</a>
            <a className="link link-hover">Instagram</a>
            <a className="link link-hover">Facebook</a>
            <a className="link link-hover">GitHub</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
