import React from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import DateHead from "./components/DateHead";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AddTodo from './components/AddTodo';
import Empty from './components/Empty';

function App() {
  const today = new Date();

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView 
          // behavor={Platform.OS === 'ios' ? 'padding': undefined}
          // behavior={Platform.select({ios: 'padding', android: undefined})}
          behavior={Platform.select({ios: 'padding'})}
          style={styles.aviud}
        />
        <DateHead date={today} />
        {/* <View style={{flex: 1, backgroundColor: 'blue'}} /> */}
        <Empty />
        <AddTodo />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  },
});

export default App;
