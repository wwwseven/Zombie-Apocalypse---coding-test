import { React, useState } from 'react';
import styled from '@emotion/styled';
import UserInput from './components/UserInput';
import Display from './components/Display';
import { Paper } from '@mui/material';

const PageWrapper = styled(Paper)`
  width: 1200px;
  min-height: 800px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
`;

const HomePage = () => {
  const [response, setResponse] = useState('');

  return (
    <PageWrapper>
      <UserInput setResponse={setResponse} />
      <Display response={response} />
    </PageWrapper>
  );
};

export default HomePage;
