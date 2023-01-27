import { React, useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, Modal, SafeAreaView, Pressable } from "react-native";
import { Header, Avatar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import AvatarWidget from '../Widgets/Avatar';
import TabsParent from "./ProfileTabs/TabsParent";
import { useAtom } from "jotai";
import { sessionAtom, usernameAtom, fullNameAtom, avatarUrlAtom, bioAtom, avatarPublicUrlAtom, sessionUserAtom } from "../../jotai/atoms";
import { primary, secondary, tertiary, textPrimary } from "../../styles/colors/colors";
import supabase from '../../supabase/supabase';
import { screenHeight, screenWidth } from "../../constants/constants";

export default function Profile({ navigation }) {
  const [session] = useAtom(sessionAtom);
  const [sessionUser] = useAtom(sessionUserAtom);
  const [username, setUsername] = useAtom(usernameAtom);
  const [fullName, setFullName] = useAtom(fullNameAtom);
  const [avatarUrl, setAvatarUrl] = useAtom(avatarUrlAtom);
  const [bio, setBio] = useAtom(bioAtom);
  const [publicAvatarUrl, setPublicAvatarUrl] = useAtom(avatarPublicUrlAtom);

  const [modalVisible, setModalVisible] = useState(false);
  const [contentModalVisible, setContentModalVisible] = useState(false);
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

  const toggleContentModal = () => {
    setContentModalVisible(!contentModalVisible);
  }

  const onNavigate = (location) => {
    toggleContentModal();
    navigation.navigate(location);
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
      <View style={styles.plus}>
        <TouchableOpacity onPress={toggleContentModal}>
          <Ionicons
            style={styles.plus}
            name='add-circle-outline'
            size={30}
            color={textPrimary}
          />
        </TouchableOpacity>
      </View>
      <Modal
        visible={contentModalVisible}
        animationType={"slide"}
        transparent={true}
        
      >
        <SafeAreaView style={styles.contentModal}>
          <TouchableOpacity onPress={toggleContentModal}>
            <Ionicons
              style={styles.close}
              name='arrow-down-sharp'
              size={30}
              color={secondary}
            />
          </TouchableOpacity>
          <View>
            <TouchableOpacity style={styles.newContentList} onPress={() => onNavigate('Add Review')}>
              <Ionicons
                name='ios-star'
                size={30}
                color={secondary}
              />
              <Text style={styles.newContentText}>Add a Review</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.newContentList} onPress={() => onNavigate('Add List')}>
              <Ionicons
                name='ios-list'
                size={30}
                color={secondary}
              />
              <Text style={styles.newContentText}>Add a List</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.newContentList} onPress={() => onNavigate('Add Favorite')}>
              <Ionicons
                name='ios-heart'
                size={30}
                color={secondary}
              />
              <Text style={styles.newContentText}>Add Favorites</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <Text style={[styles.text]}>{fullName}</Text>
      <Avatar
        size="large"
        rounded
        title="TU"
        activeOpacity={0.7}
        source={{uri: publicAvatarUrl}}
      />
      <Text style={styles.text}>{username}</Text>
      <TouchableOpacity 
      style={styles.edit}
      onPress={toggleModalVisibility}
      >
        <Text style={styles.text}>Edit Profile</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{bio}</Text>
      <TabsParent />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: primary,
    alignItems: 'center',
    padding: 20
  }, 
  text: {
    color: textPrimary, 
    padding: 5,
    fontSize: 16,
    maxWidth: screenWidth/1.3,
    textAlign: 'center'
  },
  edit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: tertiary,
    borderRadius: 5,
    width: '40%'
  },
  plus: {
    position: 'absolute',
    top: 30,
    right: 15,
    zIndex: 1
  },
  close: {
    textAlign: 'center',
  },
  modalView: {
    flex: 1,
    backgroundColor: tertiary,
    alignItems: 'center'
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
  },
  contentModal: {
    height: screenHeight/3,
    width: screenWidth,
    backgroundColor: tertiary,
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
    opacity: .9
  },
  newContentList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    height: '30%',
    paddingLeft: 10
  },
  newContentText: {
    color: textPrimary,
    padding: 20,
    fontSize: 20,
    fontWeight: "bold"
  }
})
