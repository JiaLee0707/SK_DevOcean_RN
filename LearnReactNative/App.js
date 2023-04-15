import React from 'react';
import {SafeAreaView} from 'react-native';
// import Greeting from './components/Greeting';
import Box from './components/Box';

const App = () => {
  // const name = 'JSX';
  return (
    <SafeAreaView>
      {/* 주석을 작성해봅시다. */}
      {/* <Greeting
        name={name} // 이름을 설정하기
      /> */}
      <Box rounded={true} size="large" color="blue" />
    </SafeAreaView>
  );
};

export default App;
