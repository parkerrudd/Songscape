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

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signUp = () => {
    //validate that email is not a duplicate and add to db
    //if successful navigate back to login page
  }

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <Image
      style={styles.image} 
      source={require('../assets/Songscape-1.png')}
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
        value={username}
        onChangeText={username => setUsername({username})}
        textContentType='username'
        placeholder='Username'
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
      <Button title='Create Account' 
      style={styles.button}
      onPress={signUp()}
      />
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
    borderRadius: 5,
    padding: 10,
    color: '#8FE3CF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#8FE3CF',
    color: '#256D85',
    width: 10,
    height: 10
  }
});
