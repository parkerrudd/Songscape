import { React, useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { useAtom } from "jotai";
import { 
  sessionAtom, 
  usernameAtom, 
  fullNameAtom, 
  avatarUrlAtom,
  bioAtom
} from "../jotai/jotai";

import { primary } from "../styles/colors/colors";
import { secondary } from "../styles/colors/colors";
import { tertiary } from "../styles/colors/colors";
import { accent } from "../styles/colors/colors";

import { supabase } from "../supabase/supabase";


export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [session] = useAtom(sessionAtom);
  const [username, setUsername] = useAtom(usernameAtom);
  const [fullName, setFullName] = useAtom(fullNameAtom);
  const [avatarUrl, setAvatarUrl] = useAtom(avatarUrlAtom);
  const [bio, setBio] = useAtom(bioAtom);
  
  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, full_name, bio, avatar_url`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data?.username ?? 'username');
        setBio(data?.bio ?? 'Bio');
        setAvatarUrl(data?.avatar_url);
        setFullName(data?.full_name ?? 'Your Name');
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
    <Text style={styles.text}>{fullName}</Text>
    <Avatar
    size="large"
    rounded
    title="TU"
    onPress={() => console.log("Works!")}
    activeOpacity={0.7}
    source={{uri: 'random'}}
      />
      <Text style={styles.text}>{username}</Text>
      <Text style={styles.text}>{bio}</Text>
      <TouchableOpacity 
        style={styles.edit}
        onPress={() => console.log('edit profile')}
      >
        <Text style={styles.text}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: primary,
    alignItems: 'center',
    padding: 20,
  }, 
  text: {
    color: '#fff', 
    padding: 5
  },
  edit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: tertiary,
    borderRadius: 5,
    width: '25%',
  }
})
