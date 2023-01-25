import React, { useState } from "react";
import { View, StyleSheet, Button, Alert, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Camera } from "expo-camera";
import { decode } from "base64-arraybuffer";

import { usernameAtom } from "../../jotai/atoms";
import { useAtom } from "jotai";
import supabase from "../../supabase/supabase";

export default function AvatarWidget({ url, size, onUpload }) {
  const [username] = useAtom(usernameAtom);
  const [uploading, setUploading] = useState(false);
  const avatarSize = { height: size, width: size };

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
        quality: 1,
      })
      if (!result.canceled) {
        const response = await fetch(result.assets[0].uri);
        convertToBase64(response);
      }
    }
  }

  const convertToBase64 = async (imageData) => {
    const blob = await imageData.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64String = reader.result;
      uploadAvatar(base64String)
    };
  }

  // const convertToArrayBuffer = (file) => {
  //   const base64 = file.replace('data:image/jpeg;base64,','');
  //   const decoded = base64.toString('binary');
  //   const len = decoded.length;
  //   const arrayBuffer = new Uint16Array(len);
  //   for (let i = 0; i < len; i++) {
  //       arrayBuffer[i] = decoded.charCodeAt(i);
  //   }
  //   uploadAvatar(arrayBuffer);
  // }

  const uploadAvatar = async (base64) => {
    const filePath = `${username}/public/avatar/${Math.random()}.jpg`;

    const { error } = await supabase.storage.from('avatars').upload(
      filePath,
      decode(base64), {
        contentType: 'image/jpeg'
      }
      )
    if (error) {
      Alert.alert(error.message);
      throw error
    } else {
      onUpload(filePath);
    }
  }

  return (
    <View>
      {url ? (
        <Image
          source={{ uri: url }}
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
