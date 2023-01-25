import { React, useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, Modal, SafeAreaView, Pressable } from "react-native";
import { Header, Avatar } from "react-native-elements";

import AvatarWidget from "./Widgets/Avatar";
import { useAtom } from "jotai";
import { sessionAtom, usernameAtom, fullNameAtom, avatarUrlAtom, bioAtom, avatarPublicUrlAtom, sessionUserAtom } from "../jotai/atoms";
import { primary, tertiary, textPrimary } from "../styles/colors/colors";

import supabase from '../supabase/supabase';

export default function Profile() {
  const [session] = useAtom(sessionAtom);
  const [sessionUser] = useAtom(sessionUserAtom);
  const [username, setUsername] = useAtom(usernameAtom);
  const [fullName, setFullName] = useAtom(fullNameAtom);
  const [avatarUrl, setAvatarUrl] = useAtom(avatarUrlAtom);
  const [bio, setBio] = useAtom(bioAtom);
  const [publicAvatarUrl, setPublicAvatarUrl] = useAtom(avatarPublicUrlAtom);

  const [modalVisible, setModalVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded && session) {
      getProfile();
    }
  }, [session, avatarUrl, sessionUser])

  const getProfile = async () => {
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
        setFullName(data?.full_name ?? 'Your Name');
        if (data?.avatar_url) {
          setAvatarUrl(data?.avatar_url);
          getAvatar();
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    }
  }

  const getAvatar = () => {
    try {
      const { data, error } = supabase.storage.from('avatars').getPublicUrl(avatarUrl);

      if (error) {
        throw error;
      }

      if (data) {
        setPublicAvatarUrl(data.publicUrl);
      }
    }
    catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
    finally {
      setLoaded(true);
    }
  }

  const toggleModalVisibility = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible])

  const updateProfile = async (username, full_name, bio, avatar_url) => {
    try {
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        username,
        full_name,
        bio,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      } else {
        toggleModalVisibility();
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    }
  }

  const onCancel = () => {
    getProfile();
    toggleModalVisibility();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        animationTiming={1000}
        visible={modalVisible}
      >
        <SafeAreaView style={styles.modalView}>
          <Header
            backgroundColor={tertiary}
            leftComponent={
              <TouchableOpacity>
                <Text 
                  style={styles.text}
                  onPress={onCancel}
                >Cancel</Text>
              </TouchableOpacity>
            }
            centerComponent={{ text: 'EDIT PROFILE', style: { color: textPrimary } }}
            rightComponent={
              <TouchableOpacity>
                <Text 
                  style={styles.text}
                  onPress={() => updateProfile(username, fullName, bio, avatarUrl)}
                >Done</Text>
              </TouchableOpacity>
            }
          />
          <Pressable 
          style={{padding: 10}}
          >
            <AvatarWidget
              size={200}
              url={publicAvatarUrl}
              onUpload={(url) => {
                setAvatarUrl(url)
                updateProfile(username, fullName, bio, url)
              }}
            />
          </Pressable>
          <View style={{width: '80%'}}>
            <Pressable style={styles.modalInfo}>
              <Text style={styles.modalLabels}>Name: </Text>
              <TextInput 
                style={styles.modalInputs}
                placeholder="Your Name"
                placeholderTextColor={textPrimary}
                value={fullName}
                onChangeText={fullName => setFullName(fullName)}
              />
            </Pressable>
            <Pressable style={styles.modalInfo}>
              <Text style={styles.modalLabels}>Username: </Text>
              <TextInput 
                style={styles.modalInputs}
                placeholder="username"
                placeholderTextColor={textPrimary}
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
                placeholderTextColor={textPrimary}
                value={bio}
                onChangeText={bio => setBio(bio)}
                multiline={true}
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
        activeOpacity={0.7}
        source={{uri: publicAvatarUrl}}
      />
      <Text style={styles.text}>{username}</Text>
      <Text style={styles.text}>{bio}</Text>
      <TouchableOpacity 
      style={styles.edit}
      onPress={toggleModalVisibility}
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
