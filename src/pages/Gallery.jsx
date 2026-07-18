import React, { useState } from "react";
import useGallery from "../hooks/useGallery";
import useImages from "../hooks/useImages";
import Modal from "react-modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gallery = () => {
  const { gallery } = useGallery();
  const { image } = useImages();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (projectId) => {
    const projectImages = image.filter((img) => img.product === projectId);
    setFilteredImages(projectImages);
    setSelectedImageIndex(0); // reset to first image
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const sliderSettings = {
    dots: filteredImages.length > 1,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(filteredImages.length, 3),
    slidesToScroll: 1,
    initialSlide: selectedImageIndex,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  

  return (
    <div>
      <div className="bg-gray-600 h-80">
        <h1 className="text-center relative top-1/2 transform -translate-y-1/2 font-bold text-7xl text-stone-50">
          Project Gallery
        </h1>
      </div>

      <div className="max-w-7xl mx-auto p-5">
        {/* Masonry-like grid with different sizes, neatly aligned */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-5 space-y-5">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 mb-5 break-inside-avoid"
              onClick={() => openModal(item.id)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto block"
              />
              <div className="p-3">
                <h1 className="font-bold text-xl text-gray-800 mb-1">
                  {item.title}
                </h1>
                <p className="text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="w-full max-w-4xl mx-auto bg-white rounded-lg  p-4 outline-none"
        overlayClassName="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div className="relative">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 z-50 text-gray-200 hover:text-black text-2xl font-bold"
          >
            ✖
          </button>

          <Slider {...sliderSettings}>
            {filteredImages.map((item) => (
              <div
                key={item.id}
                className="px-2 flex justify-center items-center content-center h-96"
              >
                <img
                  src={item.image}
                  alt={item.product}
                  className="rounded-md object-contain max-h-full max-w-full"
                />
              </div>
            ))}
          </Slider>
        </div>
      </Modal>
    </div>
  );
};

export default Gallery;
