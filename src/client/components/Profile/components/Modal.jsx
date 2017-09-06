import React, { Component } from 'react';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';

import { transitions } from '../lib/style-utils';

const Wrapper = styled.div`
    position: fixed;

    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);

    z-index:10;

    width: ${props => props.width};

    .modal-enter{
        animation: ${transitions.slideDown} .5s ease-in-out;
        animation-fill-mode: forwards;
    }

    .modal-leave{
        animation: ${transitions.slideUp} .5s ease-in-out;
        animation-fill-mode: forwards;
    }
    
`;

Wrapper.propTypes = {
  width: PropTypes.string,
};

const ModalBox = styled.div`
    background:white;
    border: 1px solid rgba(0,0,0,0.3);
`;

class Modal extends Component {

  handleClickOutside(e) {
    const { visible, onHide } = this.props;

    if (!visible) return null;
    onHide();
  }

  handleKeyUp(e) {
    const { onHide } = this.props;
    if (e.keyCode === 27) {
      onHide();
    }
  }

  componentDidUpdate(prevProps, prevState) {
        // visible change:
    if (prevProps.visible !== this.props.visible) {
      if (this.props.visible) {
            // just display
                // .
        document.body.addEventListener('keyup', this.handleKeyPress);
      } else {
            //
        document.body.removeEventListener('keyup', this.handleKeyPress);
      }
    }
  }

  render() {
    const { visible, children, width } = this.props;

    return (
      <div>
        <Wrapper width={width}>
          <CSSTransitionGroup
            transitionName="modal"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {
                visible && (<ModalBox>{children}</ModalBox>)
             }

          </CSSTransitionGroup>
        </Wrapper>
      </div>
    );
  }
}


Modal.propTypes = {
  visible: PropTypes.bool,
  onHide: PropTypes.func,
  width: PropTypes.string,
};

Modal.defaultProps = {
  visible: () => console.log(''),
  onHide: () => console.log(''),
  width: '400px',
};

export default onClickOutside(Modal);
