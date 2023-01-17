import {React, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../supabase/supabase';
import { 
  StyleSheet, 
  Text, 
  Button, 
  Image, 
  TextInput, 
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert
} from 'react-native';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'example@email.com',
      password: 'example-password',
    })

    if (error) {
      Alert.alert(error.message);
    } else {
      console.log('success');
    }
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
        autoCapitalize={'none'}
      />
      <TextInput
        style={styles.input}
        onChangeText={password => setPassword({password})}
        value={password}
        textContentType="password"
        secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor={'#8FE3CF'}
        autoCapitalize={'none'}
      />
      <Button title='Sign In' 
      style={styles.button}
      onPress={signIn}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Create Account')}
      >
        <Text
          style={{ color: '#8FE3CF', textDecorationLine: 'underline'}}  
        >
          Don't have an account? Sign up now.
        </Text>
      </TouchableOpacity>
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
