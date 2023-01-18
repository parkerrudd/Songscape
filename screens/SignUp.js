import { React, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StackActions } from '@react-navigation/native';

import { 
  StyleSheet,
  Button,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert
} from 'react-native';

import { supabase } from '../supabase/supabase';

const popAction = StackActions.pop(1);

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function signUpWithEmail() {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert(error.message);
    } else {
      createProfile();
      navigation.dispatch(popAction);
    }
  }

  const createProfile = async () => {
    const { data, error } = await supabase
    .from('profiles')
    .insert([
      { username: username },
    ])

    if (error) Alert.alert(error.message);
  }

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <Image
      style={styles.image} 
      source={require('../assets/Songscape-1.png')}
      /> 
      <TextInput
        style={styles.input}
        onChangeText={email => setEmail(email)}
        value={email}
        textContentType="emailAddress"
        keyboardType='email-address'
        placeholder="Email"
        placeholderTextColor={'#8FE3CF'}
        autoCapitalize={'none'}
      />
      <TextInput 
        style={styles.input}
        value={username}
        onChangeText={username => setUsername(username)}
        textContentType='username'
        placeholder='Username'
        placeholderTextColor={'#8FE3CF'}
        autoCapitalize={'none'}
      />
      <TextInput
        style={styles.input}
        onChangeText={password => setPassword(password)}
        value={password}
        textContentType="password"
        secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor={'#8FE3CF'}
        autoCapitalize={'none'}
      />
      <Button title='Create Account' 
      style={styles.button}
      onPress={() => signUpWithEmail()}
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
