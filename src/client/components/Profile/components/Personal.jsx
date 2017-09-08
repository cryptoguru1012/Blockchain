import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import EditButton from 'material-ui/RaisedButton';
import Item from './Item';
import PublicItem from './PublicItem';
import Shipping from './privateItem/Shipping';
import Yutube from './privateItem/Yutube';
import Twiiter from './privateItem/Twitter';
import Facebok from './privateItem/Facebok';
import Phone from './privateItem/Phone';
import EditIcon from '../asset/pen.png';

const Wrapper = styled.div`
    padding: 5rem;
    padding-top: 8rem;
    padding-left: 8rem;
    position: relative;
    overflow: hidden;
    display: flex;
    
    
    background:white;
    border: 1px solid #ced4da;

    transition: all .25s;
    flex-direction: column;

    .editButton{
      position: absolute;
      bottom: 5rem !important;
      right: 15rem !important;
      width: 17rem;
      margin-top 2rem;
      
    }
    
    
`;

const PriceSelector = styled.div`
    margin-top: 4rem;
    display:flex;
    flex-direction: column;
`;

const PersonalInfo = styled.div`
    display:flex;
    flex-direction: column;    
`;
const PublicInfo = styled.div`
    margin-top: 4rem;
    display:flex;
    flex-direction: column;
`;

const PrivateInfo = styled.div`
    margin-top: 4rem;
    margin-bottom: 5rem;
    display:flex;
    flex-direction: column;
`;
const PublicLabel = styled.div`
    font-size: 3rem;
`;


class Personal extends React.Component {

  render() {
    const {
            personal,
            onOpenModify,
            handleChangeValue,
        } = this.props;

    const { id, name, email, value, alias, password, publicaddress, shippingaddress, phonenumber, yutube, twitter, facebok } = personal.toJS();

    return (
      <Wrapper>
        <PersonalInfo>
          <Item info={name} match="name" />
          <Item info={email} match="email" />
          <Item info={alias} match="alias" />
          <Item info={password} match="password" />

        </PersonalInfo>

        <PriceSelector>
          <SelectField
            floatingLabelText="Show Price in"
            value={value}
            menuItemStyle={{ color: '#019921' }}
            selectedMenuItemStyle={{ color: '#019921' }}
          
            labelStyle={{ color: '#019921' }}
            onChange={handleChangeValue}
          >
            <MenuItem value={1} primaryText="USD" />
            <MenuItem value={2} primaryText="EURO" />
          </SelectField>
        </PriceSelector>

        <PublicInfo>
          <PublicLabel>Public info</PublicLabel>
          <PublicItem info={publicaddress} />
        </PublicInfo>

        <PrivateInfo>
          <PublicLabel>Private info</PublicLabel>
          <Shipping info={shippingaddress} />
          <Phone info={phonenumber} />
          <Yutube info={yutube} />
          <Twiiter info={twitter} />
          <Facebok info={facebok} />
        </PrivateInfo>

        <EditButton
          className="editButton"
          label="Edit"
          labelColor="#fff"
          backgroundColor="#019921"
        >
          <img src={EditIcon} style={EditIcon.logo} alt="fireSpot" />&nbsp;&nbsp;
        </EditButton>


      </Wrapper>
    );
  }
}

Personal.propTypes = {
  personal: ImmutablePropTypes.mapContains({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    alias: PropTypes.string,
    password: PropTypes.string,
    public_address: PropTypes.string,
    shipping_address: PropTypes.string,
    phone_number: PropTypes.string,
    yutube: PropTypes.string,
    twitter: PropTypes.string,
    facebok: PropTypes.string,
  }),
  onOpenModify: PropTypes.func,
};

Personal.defaultProps = {
  onOpenModify: () => console.log('This is change function.'),
};

export default Personal;
