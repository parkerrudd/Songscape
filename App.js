import {React, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  Button, 
  Image, 
  TextInput, 
  KeyboardAvoidingView,
} from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Image 
      style={styles.image} 
      source={require('./assets/Songscape-1.png')}
      /> 
      <TextInput
        style={styles.input}
        onChangeText={email => setEmail({email})}
        value={email}
        textContentType="emailAddress"
        keyboardType='email-address'
        placeholder="Email"
        placeholderTextColor={'#8FE3CF'}
      />
      <TextInput
        style={styles.input}
        onChangeText={password => setPassword({password})}
        value={password}
        textContentType="password"
        secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor={'#8FE3CF'}
      />
      <Button title='Sign In' 
      style={styles.button}
      onPress={() =>  console.log(email, password)}
      />
      <Text 
      style={{ 
        color: '#8FE3CF',
      }}>
        Don't have an account? Sign up!
      </Text>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B4865',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxWidth: '35%',
    maxHeight: '35%'
  },
  input: {
    height: 40,
    width: '60%',
    margin: 12,
    borderWidth: 1,
    borderColor: '#256D85',
    borderRadius: '5px',
    padding: 10,
    color: '#8FE3CF',
    fontSize: '16px'
  },
  button: {
    backgroundColor: '#8FE3CF',
    color: '#256D85',
    width: 10,
    height: 10
  }
});
