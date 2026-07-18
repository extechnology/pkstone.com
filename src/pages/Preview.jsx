import { useParams } from "react-router-dom";
import Modal from "react-modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useMemo } from "react";
import useProducts from "../hooks/useProducts";
import usePreview from "../hooks/usePreview";
import useProductImage from "../hooks/userProductImage";

Modal.setAppElement("#root");

const Preview = () => {
  const { products } = useProducts();
  const { preview } = usePreview();
  const { image } = useProductImage();
  const { categoryName } = useParams();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const filteredProducts = Array.isArray(products)
    ? products.filter((item) => item.category === categoryName)
    : [];


    const filteredPreview = Array.isArray(preview)
      ? preview.find((item) => item.category === categoryName)
      : null;
  

      const relatedImages = useMemo(() => {
        if (!Array.isArray(image) || !selectedProduct) return [];
        return image.filter(
          (img) => img.product === selectedProduct.id
        );
      }, [selectedProduct, image]);
      

  const openModal = (product, index) => {
    setSelectedImageIndex(index);
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProduct(null);
  };

  const sliderSettings = {
    dots: true,
    infinite: false, // or true, as needed
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    vertical: false, // <-- important to ensure horizontal layout
    // This prevents duplicate slide rendering
    centerMode: false,
  };
  
  return (
    <div className="container mx-auto bg-zinc-100">
      <div>
        {filteredPreview ? (
          <div key={filteredPreview.id}>
            <img
              src={filteredPreview.preview_image}
              alt={categoryName}
              className="w-full h-100 object-cover mb-2 rounded"
            />

            {/* Centered container for heading */}
            <div className="w-full flex justify-center relative -top-[170px]">
              <h1
                className="typing-text preview_text w-2/3 text-4xl shadow-sm backdrop-blur py-2 md:text-5xl font-bold text-white text-center 
          after:content-[''] after:absolute after:z-[-1] after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:opacity-40 
          overflow-hidden whitespace-nowrap animate-typing"
              >
                {filteredPreview.category
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </h1>
            </div>
          </div>
        ) : (
          <p>No preview available for this category.</p>
        )}
      </div>

      {/* --------------------------------------------product images-------------------------------------------------------- */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:px-32 md:py-10 bg-transparent">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={product.id} className="p-3 rounded-lg shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-90 object-cover mb-2 rounded cursor-pointer"
                onClick={() => openModal(product, index)}
              />
              <h3 className="text-lg text-gray-600 font-semibold">
                {product.name}
              </h3>
            </div>
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>

      {/* Modal for Image Slider */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="relative top-20 md:left-1/4 bg-white bg-opacity-10"
        overlayClassName="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur"
      >
        <div className="max-w-2xl md:h-[500px] rounded-md w-full relative p-4">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
          >
            ✖
          </button>

          {relatedImages.length > 1 ? (
            <Slider {...sliderSettings}>
              {relatedImages.map((img, idx) => (
                <div
                  key={idx}
                  className="flex justify-center items-center h-full"
                >
                  <img
                    src={img.image}
                    alt={`Product ${selectedProduct?.name} - ${idx}`}
                    className="max-h-[400px] object-contain rounded-md"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="flex justify-center items-center h-full">
              <img
                src={relatedImages[0]?.image}
                alt={`Product ${selectedProduct?.name}`}
                className="max-h-[400px] object-contain rounded-md"
              />
            </div>
          )}
        </div>
      </Modal>

      <div className="flex justify-center pt-5">
        <a
          href={`https://wa.me/919447426004?text=Hi, I am interested in ${categoryName}`}
          target="_blank"
          className="p-3 rounded-4xl shadow-md hover:scale-110 text-stone-50 duration-300 hover:from-blue-500 hover:to-blue-700 bg-gradient-to-r from-blue-600 to-blue-500 mb-10"
        >
          Contact For More Queries
        </a>
      </div>
    </div>
  );
};

export default Preview;
