import {
  CLEAR_CART,
  DECREASE,
  DISPLAY_ITEMS,
  INCREASE,
  LOADING,
  REMOVE,
} from "./action";

const reducer = (state, action) => {
  // handle clear  cart
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }
  // remove item
  if (action.type === REMOVE) {
    const newCart = new Map(state.cart);
    newCart.delete(action.payload.id);
    return { ...state, cart: newCart };
  }
  // increase item
  if (action.type === INCREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId);
    const newItem = { ...item, amount: item.amount + 1 };
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }

  // decrease item
  if (action.type === DECREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId);
    // when amount reach to one while decrease delete it
    if (item.amount === 1) {
      newCart.delete(itemId);
      return { ...state, cart: newCart };
    }

    const newItem = { ...item, amount: item.amount - 1 };
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }

  // handle loading
  if (action.type === LOADING) {
    return { ...state, loading: true };
  }

  // handle display items
  if (action.type === DISPLAY_ITEMS) {
    const newArray = new Map(
      action.payload.cart.map((item) => [item.id, item])
    );
    return { ...state, loading: false, cart: newArray };
  }

  // error handler
  throw new Error(`no matching action type ${action.type}`);
};

export default reducer;
