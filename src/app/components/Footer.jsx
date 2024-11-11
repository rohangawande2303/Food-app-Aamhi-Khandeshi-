import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="pt-12 relative bg-[#723C1B] text-white">
      <div className="mx-auto max-w-7xl p-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 pt-20">
          {/* Logo and description section */}
          <div className="lg:pr-8 text-center md:text-start flex flex-col items-center md:flex-row md:items-center">
            <div className="ml-3 text-center md:text-left">
              <Link href="/">
                <span
                  className="text-4xl font-bold"
                  style={{ color: "#d18334" }}
                >
                  Jandhyala Foods
                </span>
              </Link>

              <p className="text-base mt-8">
                Aamhi Khandeshi Foods was established in 2024 with a motive to
                manufacture authentic Maharashtrian pickles, Papads. All these
                wholesome products provide an enticing blend of taste, and are
                made from fresh, high quality ingredients procured directly from
                the farmer. All our products are nourishing as well as tasty and
                also 100% natural.
              </p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="mx-auto text-center md:text-start sm:text-center">
            <h3 className="text-xl font-medium mb-6">Quick Links</h3>
            <ul className="list-inside md:list-outside">
              <li className="my-2 text-lg">
                <Link href="/">Home</Link>
              </li>
              <li className="my-2 text-lg">
                <Link href="/about">About Us</Link>
              </li>
              <li className="my-2 text-lg">
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="my-2 text-lg">
                <Link href="/return-and-refund-policy">
                  Return, Refund Policy
                </Link>
              </li>
              <li className="my-2 text-lg">
                <Link href="/cookie-policy">Cookie Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="mx-auto text-center md:text-start sm:text-center">
            <h3 className="text-2xl font-medium mb-6">Get In Touch</h3>
            <ul>
              <li className="my-2">
                <a
                  className="text-base flex items-center justify-center md:justify-start gap-2"
                  href="tel:+9987393833"
                >
                  <FiPhone className="text-xl" /> +91-9987393833
                </a>
              </li>
              <li className="my-2">
                <a
                  className="text-base flex items-center justify-center md:justify-start gap-2"
                  href="mailto:aarav.enterprises1704@gmail.com"
                >
                  <AiOutlineMail className="text-xl" />{" "}
                  aarav.enterprises1704@gmail.com
                </a>
              </li>

              {/* Social Media Icons */}
              <li className="mt-8">
                <ul className="flex justify-center gap-6 md:gap-6 items-center">
                  <li>
                    <a
                      className="flex items-center justify-center w-10 h-10 text-xl rounded-full border border-white transition-all duration-300 hover:bg-[#d18334]"
                      href="https://www.facebook.com/aaravrealty.in?mibextid=ZbWKwL"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook className="w-5 h-5 text-white" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center justify-center w-10 h-10 text-xl rounded-full border border-white transition-all duration-300 hover:bg-[#d18334]"
                      href="https://www.instagram.com/aaravrealty.in?igsh=MTFsZHY5YnptbTd5Zw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram className="w-5 h-5 text-white" />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Footer bottom section */}

      {/* Added thin black border */}
      <div className="text-center py-6 mt-2 md:mt-2 lg:mt-2 mb-0 border-t border-white pt-6">
        <p className="text-sm">
          © Copyright{" "}
          <a href="#" className="transition-all duration-300">
            Aamhi Khandeshi
          </a>{" "}
          2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
