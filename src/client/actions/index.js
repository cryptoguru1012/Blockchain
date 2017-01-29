export const SHOW_ITEMS = 'SHOW_ITEMS';

// Title
// Category
// Price
// Quantity
// Currency
// Payment Options
// Certificate (optional)
// Item description

export function showItems(){
    return (dispatch, getState) => {
      const items = [
            {id: 1, title: 'Article 1', category: 'Cat1', price: 60, quantity: 10, currency: 1, paymentOption: 1, certificate: true, description: "Article 1 description"},
            {id: 2, title: 'Article 2', category: 'Cat2', price: 50, quantity: 5, currency: 1, paymentOption: 1, certificate: false, description: "Article 2 description"},
            {id: 3, title: 'Article 3', category: 'Cat3', price: 20, quantity: 9, currency: 1, paymentOption: 1, certificate: true, description: "Article 3 description"},
            {id: 4, title: 'Article 4', category: 'Cat1', price: 100, quantity: 8, currency: 1, paymentOption: 1, certificate: false, description: "Article 4 description"}
        ];
        
        dispatch({
            type: SHOW_ITEMS,
            payload: items
        });
    }
    
}