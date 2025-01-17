import React from 'react';
import HeaderButton from '../common/HeaderButton';

const AddPostHeaderRight = (onSubmit: () => void) => {
  return <HeaderButton labelText="등록" onPress={onSubmit} />;
};

export default AddPostHeaderRight;
