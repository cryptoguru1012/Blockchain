const renderHTML = (assetUrl) => {
  return `
    <!DOCTYPE html>
      <html lang="en-US" style="height: 100%;">
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Shopshot</title>
          <link rel="icon" href="/favicon.png">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
          <link rel="stylesheet" type="text/css" href="${assetUrl}/public/styles.css">
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
					<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </head>
      <body style="height: 100%; display: flex; min-height: 100vh; flex-direction: column;">
        <div id="react-view"></div>
        <script type="application/javascript" src="${assetUrl}/bundle.js"></script>
      </body>
    </html>
  `;
};

export default renderHTML;
