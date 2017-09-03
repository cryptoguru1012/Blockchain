export const SHOW_ITEMS = 'SHOW_ITEMS';

// Title
// Category
// Price
// Quantity
// Currency
// Payment Options
// Certificate (optional)
// Item description

export function showItems() {
  return (dispatch) => {
    const items = [
        { id: 1, title: 'Article 1', category: 'Cat1', price: 60, quantity: 10, currency: 1, paymentOption: 1, certificate: true, description: 'Article 1 description', url: 'http://placehold.it/2520x720/ffa', url2: 'http://loremflickr.com/400/200/bitcoin,computer?ramdom=1', width: 320, height: 320, urlVideo: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', url3: 'http://loremflickr.com/280/260/bitcoin,computer?ramdom=1', sells: 12, score: 4 },
        { id: 2, title: 'Article 2', category: 'Cat2', price: 50, quantity: 5, currency: 1, paymentOption: 1, certificate: false, description: 'Article 2 description', url: 'http://placehold.it/2520x720/a4a', url2: 'http://loremflickr.com/400/200/bitcoin,computer?ramdom=3', width: 320, height: 320, urlVideo: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', url3: 'http://loremflickr.com/280/260/bitcoin,computer?ramdom=6', sells: 20, score: 3 },
        { id: 3, title: 'Article 3', category: 'Cat3', price: 20, quantity: 9, currency: 1, paymentOption: 1, certificate: true, description: 'Article 3 description', url: 'http://placehold.it/2520x720/66a', url2: 'http://loremflickr.com/400/200/bitcoin,computer?ramdom=18', width: 320, height: 320, urlVideo: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', url3: 'http://loremflickr.com/280/260/bitcoin,computer?ramdom=7', sells: 5, score: 2 },
        { id: 4, title: 'Article 4', category: 'Cat3', price: 100, quantity: 8, currency: 1, paymentOption: 1, certificate: false, description: 'Article 4 description', url: 'http://placehold.it/2520x720/22a', url2: 'http://loremflickr.com/400/200/bitcoin,computer?ramdom=6', width: 320, height: 320, urlVideo: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', url3: 'http://loremflickr.com/280/260/bitcoin,computer?ramdom=4', sells: 3, score: 1 },
    ];
    dispatch({
      type: SHOW_ITEMS,
      payload: items,
    });
  };
}
