import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import WalletItem from './WalletItem';
import { transitions } from '../lib/style-utils';


const Wrapper = styled.div`
    
    padding: 0rem;
    .contact-enter{
        animation: ${transitions.stretchOut} .15s linear;
        animation-fill-mode: forwards;
    }

    .contact-leave{
        animation: ${transitions.shrinkIn} .15s linear;
        animation-fill-mode: forwards;
    }
`;


class WalletList extends React.Component {


  render() {
    const { wallets, onOpenModify, onToggleFavorite } = this.props;
    const walletList = wallets
                            .sort(
                                (a, b) => {
                                  if (a.get('name') > b.get('name')) return 1;
                                  if (a.get('name') < b.get('name')) return -1;
                                  return 0;
                                },
                            ).map(
                                wallet => (
                                  <WalletItem
                                    wallet={wallet}
                                    onOpenModify={onOpenModify}
                                    onToggleFavorite={onToggleFavorite}
                                  />
                                ),
                            );
    return (
      <Wrapper>
        <CSSTransitionGroup
          transitionName="wallet"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {walletList}
        </CSSTransitionGroup>
      </Wrapper>
    );
  }
}
WalletList.propTypes = {
  contacts: ImmutablePropTypes.listOf(
            ImmutablePropTypes.mapContains({
              id: PropTypes.string,
              name: PropTypes.string,
              account: PropTypes.string,
              color: PropTypes.string,
              url: PropTypes.string,
            }),
        ),
  onToggleFavorite: PropTypes.func,
  onOpenModify: PropTypes.func,
};

export default WalletList;
