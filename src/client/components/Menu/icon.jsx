
import React from 'react';
import Config from 'configEnv';

function SSIcon() {
  return <img alt="" src={require(Config.assets.appLogo)} />;
}

export default SSIcon;
