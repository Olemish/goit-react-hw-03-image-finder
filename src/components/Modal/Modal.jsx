import { Component } from 'react';
import React from 'react';
// import { createPortal } from 'react-dom';

// const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscClick);
  }

  handleModalBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  handleEscClick = e => {
    if (e.code === 'Escape') {
      console.log('Esc');
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className="Overlay" onClick={this.handleModalBackdropClick}>
        <div className="Modal">{this.props.children}</div>
      </div>
    );
  }
}
