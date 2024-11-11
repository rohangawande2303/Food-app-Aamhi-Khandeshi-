import Image from "next/image"; // Import Next.js Image component
import CartIcon from "../../images/cart.svg"; // Directly import the image

const Cart = ({ cartItems, onClose, isOpen }) => {
  return (
    <div
      className={`fixed right-0 bg-yellow-50 border border-gray-300 transition-transform duration-700 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } cart-top`} // Apply cart-top class here
      style={{
        width: "100%",
        maxWidth: "28rem",
        bottom: "4rem", // Ensure it stays above the footer/navbar
        zIndex: "50", // Higher z-index to overlay above the navbar
        overflowY: "auto", // Add scrolling if cart content exceeds available space
      }}
    >
      {/* Cart Header */}
      <div
        className="text-white p-4 flex justify-between items-center"
        style={{ background: "#723C1B" }}
      >
        <h2 className="text-lg">Your Cart</h2>
        <button onClick={onClose} className="text-white text-3xl">
          &times; {/* Close button */}
        </button>
      </div>

      {/* Cart Content */}
      <div className="p-4">
        {cartItems.length === 0 ? (
          <div className="text-center">
            <Image
              src={CartIcon} // Use the imported image here
              alt="Cart Icon"
              width={50}
              height={50}
              className="mx-auto mb-2"
            />
            <p>Your cart is currently empty!</p>
          </div>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between py-2">
                <span>{item.name}</span>
                <span>{item.count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
