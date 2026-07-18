import { useState } from "react";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      await axios.post(
        "http://server.pkstones.com/api/contact/",
        formData
      );

      const whatsappNumber = "919447426004";
      const messageText = `*New Contact Form Submission*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Message:* ${formData.message}`;
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;
      window.open(whatsappUrl, "_blank");

      setStatus("success");
      setFormData({ email: "", name: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <div className="relative bg-no-repeat w-full bg-cover bg-[url('/contact_background2.jpg')] p-5 md:pt-28">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="md:flex justify-center gap-10 max-w-7xl mx-auto pt-20 md:pt-0">
        <div className="content-center ">
          <img src="/pngwing.com (1).png" alt="" className="w-28 m-auto pb-5" />
          <div className="pt-5 text-white backdrop-blur-md">
            <h1 className="font-bold text-2xl pb-3">Address</h1>
            <div className="p-4 border rounded-lg shadow">
              <h2 className="font-bold text-xl">P K Stone</h2>
              <ul className="text-lg">
                <li>10/416, NH Road – Chungam</li>
                <li>Feroke – Kozhikode</li>
                <li>Kerala – India PIN: 673631</li>
                <li>Call & WhatsApp: +91 9447426004</li>
                <li>7x24 Hrs WhatsApp Chat: +91 9447426004</li>
              </ul>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="md:w-[40%] shadow-md hover:shadow-lg hover:scale-105 duration-300 p-3 md:p-7 rounded-xl bg-transparent backdrop-blur-md"
        >
          <div className="pb-10 pt-10 md:pt-0">
            <h1 className="text-4xl pb-5 font-semibold text-white">
              Contact Us
            </h1>
            <p className="text-xl font-semibold text-white">
              We'd love to hear from you
            </p>
          </div>

          {status === "success" && (
            <p className="text-green-400 font-semibold pb-4">
              Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 font-semibold pb-4">
              Failed to send message. Try again.
            </p>
          )}

          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded text-white"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded text-white"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded text-white"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded text-white"
              placeholder="Enter your message"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
