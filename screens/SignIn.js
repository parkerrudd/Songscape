import { React, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useAtom } from 'jotai';
import { sessionAtom, sessionUserAtom } from '../jotai/atoms';
import { 
  StyleSheet, 
  Text, 
  Button, 
  Image, 
  TextInput, 
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';

import supabase from '../supabase/supabase';
import { secondary, primary, accent } from '../styles/colors/colors';

const isIOS = Platform.OS === 'ios';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useAtom(sessionAtom);
  const [sessionUser, setSessionUser] = useAtom(sessionUserAtom);

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setSession(data ?? undefined);
    setSessionUser(data?.user ?? undefined);

    if (error) {
      Alert.alert(error.message);
    }
  }

  return (
    <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={styles.container}>
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
        placeholderTextColor={secondary}
        autoCapitalize={'none'}
      />
      <TextInput
        style={styles.input}
        onChangeText={password => setPassword(password)}
        value={password}
        textContentType="password"
        secureTextEntry
        placeholder="Password"
        placeholderTextColor={secondary}
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
          style={{ color: secondary, textDecorationLine: 'underline'}}  
        >
          {`Don't have an account? Sign up now.`}
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
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
    borderColor: accent,
    borderRadius: 5,
    padding: 10,
    color: secondary,
    fontSize: 16,
  },
  button: {
    backgroundColor: secondary,
    color: accent,
    width: 10,
    height: 10
  }
});
