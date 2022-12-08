import React, { Component } from "react";
import styled from "styled-components";
import { Transition } from "react-transition-group";
import Tween  from "gsap";

const duration = 200;

class Modal extends Component {

    componentDidUpdate(prevProps) {
        if (!prevProps.isOpen && this.props.isOpen) {
            Tween.to(this.myElement, 0.35, { y: 50, translateY: 1 });
        }

        if (prevProps.isOpen && !this.props.isOpen) {
            Tween.to(this.myElement, 0.35, { y: -50, translateY: 0.7 });
        }
    }

    closeModal = () => {
        this.props.handleClose();
    };

    render() {
        const { isOpen, title } = this.props;

        return (
            <Transition
                in={isOpen}
                timeout={{ enter: 0, exit: duration }}
                appear
                unmountOnExit
            >
                {tstate => (
                    <Overlay tstate={tstate}>
                        <ModalWrapper ref={div => (this.myElement = div)}>
                            <ModalClose onClick={this.closeModal}>
                                &#x2715;
                            </ModalClose>
                            <h3>{title}</h3>
                            {this.props.children}
                        </ModalWrapper>
                    </Overlay>
                )}
            </Transition>
        );
    }
}

export default Modal;

const Overlay = styled.div`
  position: absolute;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: ${props => (props.tstate === "entered" ? 1 : 0)};
  transition: opacity ${duration}ms ease-in-out;
`;

const ModalWrapper = styled.div`
  background-color: rgba(100, 150, 200, 0.8);
  margin: 30px auto;
  transform: translateY(0.8);
  width: 400px;
  color: white;
  padding: 20px;
  height: auto;
  border-radius: 20px;
  position: relative;
`;

const ModalClose = styled.span `
    width: 30px;
    height: 30px;
    font-weight: 900;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
`
