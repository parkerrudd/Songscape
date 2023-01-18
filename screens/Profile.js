import { React, useEffect, useState } from "react";
import { 
  View, 
  Text,
  TextInput,
  Alert, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  SafeAreaView,
  Pressable
 } from "react-native";
import { Avatar, Header } from "react-native-elements";
import { useAtom } from "jotai";
import { 
  sessionAtom, 
  usernameAtom, 
  fullNameAtom, 
  avatarUrlAtom,
  bioAtom,
} from "../jotai/jotai";

import { primary, tertiary, textPrimary } from "../styles/colors/colors";

import { supabase } from "../supabase/supabase";

export default function Profile() {
  const [session] = useAtom(sessionAtom);
  const [username, setUsername] = useAtom(usernameAtom);
  const [fullName, setFullName] = useAtom(fullNameAtom);
  const [avatarUrl, setAvatarUrl] = useAtom(avatarUrlAtom);
  const [bio, setBio] = useAtom(bioAtom);

  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {
    try {
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
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
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        visible={modalVisible}
      >
        <SafeAreaView style={styles.modalView}>
          <Header
            backgroundColor={tertiary}
            leftComponent={
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
            }
            centerComponent={{ text: 'EDIT PROFILE', style: { color: textPrimary } }}
            rightComponent={
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.text}>Done</Text>
              </TouchableOpacity>
            }
          />
          <Pressable 
          onPress={() => console.log('change picture')}
          style={{padding: 10}}
          >
            <Avatar
              size="large"
              rounded
              title="TU"
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
              source={{uri: 'random'}}
            />
            <Text style={styles.text}>Edit picture</Text>
          </Pressable>
          <View style={{width: '80%'}}>
            <Pressable style={styles.modalInfo}>
              <Text style={styles.modalLabels}>Name: </Text>
              <TextInput 
                style={styles.modalInputs}
              placeholder="Your Name"
              value={fullName}
              onChangeText={fullName => setFullName(fullName)}
              />
            </Pressable>
            <Pressable style={styles.modalInfo}>
              <Text style={styles.modalLabels}>Username: </Text>
              <TextInput 
                style={styles.modalInputs}
                placeholder="username"
                value={username}
                autoCapitalize={'none'}
                onChangeText={username => setUsername(username)}
              />
            </Pressable>
            <Pressable style={styles.modalInfo}>
              <Text style={styles.modalLabels}>Bio: </Text>
              <TextInput 
                style={styles.modalInputs}
                placeholder="Bio here..."
                value={bio}
                onChangeText={bio => setBio(bio)}
              />
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
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
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.text}>Edit Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    color: textPrimary, 
    padding: 5,
    fontSize: 16
  },
  edit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: tertiary,
    borderRadius: 5,
    width: '40%',
  },
  modalView: {
    flex: 1,
    backgroundColor: tertiary,
    alignItems: 'center',
  },
  modalInfo: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10
  },
  modalInputs: {
    flex: 2, 
    color: textPrimary, 
    borderBottomWidth: 1, 
    borderBottomColor: textPrimary,
    fontSize: 16
  },
  modalLabels: {
    flex: 1, 
    color: textPrimary,
    fontSize: 16
  }
})
