import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};

Message.prototype = {
  variant: PropTypes.string,
};

export default Message;
