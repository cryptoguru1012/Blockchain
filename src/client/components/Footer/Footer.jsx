import React from 'react';
import Config from 'config_env';

import footerStyle from './css/styles.css';
import fonts from '../fonts/style.css';

require('./styles/footer.scss');

// var footer = {
//     position: 'absolute',
//     right: 0,
//     bottom: 0,
//     left: 0,
//     padding: '1rem',
//     backgroundColor: '#efefef',
//     textAlign: 'center',
//     height: '100px',
// };

/**
 * class Footer
 */
const Footer = {
  render() {
    return (
      <div className={fonts.alfaSlabOne} style={{position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <div className={footerStyle.footerContent}> {Config.Footer.copyright}. </div>
      </div>
    );
  },
};

export default Footer;
