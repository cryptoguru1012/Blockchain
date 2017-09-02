
import React from "react"
import Config from 'config_env';

export default class SSIcon extends React.Component {
    render(){
      return <img src={require(Config.assets.appLogo)} />
    }
}
