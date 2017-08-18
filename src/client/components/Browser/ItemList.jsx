import React, { Component} from 'react'
import Paper from 'material-ui/Paper';
import Img from 'react-image'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router';


class ItemList extends Component{
    render(){
        return (
            <div className="container" style={{width:'100%', height: '100%'}}>
            	<Paper zDepth={3} style={{padding: 10, width:'100%'}}>
                <h2>{this.props.marker.title}</h2>
                  <div className="row">
                    <div className="col-xs-4"> 
                      <Img src="https://image.ibb.co/er6NWa/dummyimg.png" style={{height:100, width: 100}}/>
                    </div>
	                <div className="col-xs-8"> 
	                      <b>category:</b> {this.props.marker.category} <br />
	                      <b>price:</b> {this.props.marker.price} {this.props.marker.currency}<br />
	                      <b>description:</b> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo  <br />
	                      <b>quantity:</b> {this.props.marker.quantity} <br />
	                </div>
                    </div>
                    <div className="row">
	                    <div className="col-xs-offset-7"> 
                            <Link to={'/offer/' + this.props.marker.offer}>
    		                    <RaisedButton
    		                        href=""
    		                        target="_blank"
    		                        label="Add to Cart"
    		                        primary={true}
    		                        icon={<FontIcon className="shopping-cart" />}
    		                        style={{float: 'left'}}
    		                      />
                            </Link>
	                    </div>
                    </div>
                <Divider />
              </Paper>
            </div>
            )
    }
}

export default ItemList