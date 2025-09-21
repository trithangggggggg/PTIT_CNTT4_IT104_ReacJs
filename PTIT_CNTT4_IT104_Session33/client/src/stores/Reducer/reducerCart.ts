const initialState = {
  cart: [
    { id: 1, title: "cake", price: 10, quantity: 5 },
    { id: 2, title: "hamburger", price: 15, quantity: 2 },
    { id: 3, title: "bread", price: 100, quantity: 3 },
    { id: 4, title: "pizza", price: 150, quantity: 6 },
  ],
};

interface CartAction {
  type: string;
  payload?: any;
}

export const reducerCart = (state = initialState, action: CartAction) => {
  switch (action.type) {
    case "increment": {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        const newCart = [...state.cart];
        newCart[index] = {
          ...newCart[index],
          quantity: newCart[index].quantity + 1,
        };
        return { ...state, cart: newCart };
      }
      return state;
    }

    case "decrement": {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        const newCart = [...state.cart];
        if (newCart[index].quantity > 1) {
          newCart[index] = {
            ...newCart[index],
            quantity: newCart[index].quantity - 1,
          };
        } else {
          newCart.splice(index, 1); // xóa nếu =1
        }
        return { ...state, cart: newCart };
      }
      return state;
    }

    case "addtocart": {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        const newCart = [...state.cart];
        newCart[index] = {
          ...newCart[index],
          quantity: newCart[index].quantity + (action.payload.quantity || 1),
        };
        return { ...state, cart: newCart };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: action.payload.quantity || 1 }],
        };
      }
    }

    case "removeFromCart": {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    }

    default:
      return state;
  }
};
