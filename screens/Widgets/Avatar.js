import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Alert, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Camera } from "expo-camera";

import { avatarUrlAtom, usernameAtom } from "../../jotai/jotai";
import { useAtom } from "jotai";
import supabase from "../../supabase/supabase";

export default function AvatarWidget({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useAtom(avatarUrlAtom);
  const [username] = useAtom(usernameAtom)
  const [uploading, setUploading] = useState(false);
  const avatarSize = { height: size, width: size }

  useEffect(() => {
    if (url) downloadImage();
  }, [url])

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)

      if (error) {
        throw error
      }

      const fr = new FileReader()
      fr.readAsDataURL(data)
      fr.onload = () => {
        setAvatarUrl(fr.result)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message)
      }
    }
  }

  const pickImage = async () => {
    const { status } = await Camera.getCameraPermissionsAsync();
    if (status !== 'granted') {
      const { status } = Camera.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(`No camera roll access`);
        }
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      })
      if (!result.canceled) {
        uploadAvatar(result);
      }
    }
  }

  const uploadAvatar = async (imageData) => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageData.assets[0].uri,
      type: 'image/png',
      name: 'image.png'
    })

    const filePath = `${username}/avatar/${Math.random()}.png`;

    const { error } = await supabase.storage.from('avatars').upload(filePath, JSON.stringify(formData));
    if (error) {
      Alert.alert(error.message);
      throw error
    } else {
      onUpload(filePath);
    }
  }

  // const uploadAvatar = async () => {
  //   try {
  //     setUploading(true)

  //     const file = await DocumentPickerOptions.pickSingle({
  //       presentationStyle: 'fullScreen',
  //       copyTo: 'cachesDirectory',
  //       type: types.images,
  //       mode: 'open',
  //     })

  //     const photo = {
  //       uri: file.fileCopyUri,
  //       type: file.type,
  //       name: file.name,
  //     }

  //     const formData = new FormData()
  //     formData.append('file', photo)

  //     const fileExt = file.name.split('.').pop()
  //     const filePath = `${Math.random()}.${fileExt}`

  //     let { error } = await supabase.storage.from('avatars').upload(filePath, formData)

  //     if (error) {
  //       throw error
  //     }

  //     onUpload(filePath)
  //   } catch (error) {
  //     if (isCancel(error)) {
  //       console.warn('cancelled')
  //       // User cancelled the picker, exit any dialogs or menus and move on
  //     } else if (isInProgress(error)) {
  //       console.warn('multiple pickers were opened, only the last will be considered')
  //     } else if (error instanceof Error) {
  //       Alert.alert(error.message)
  //     } else {
  //       throw error
  //     }
  //   } finally {
  //     setUploading(false)
  //   }
  // }

  return (
    <View>
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}
      <View>
        <Button
          title={uploading ? 'Uploading ...' : 'Change Picture'}
          onPress={pickImage}
          disabled={uploading}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    overflow: 'hidden',
    maxWidth: '100%',
  },
  image: {
    objectFit: 'cover',
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: '#333',
    border: '1px solid rgb(200, 200, 200)',
    borderRadius: 100,
  },
})