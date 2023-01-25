import React, { useEffect } from "react";
import { Text, SafeAreaView, Alert } from "react-native";
import { useAtom } from "jotai";

import supabase from "../../supabase/supabase";
import { sessionAtom, sessionUserAtom } from "../../jotai/atoms";

export default function Home() {
  const [session, setSession] = useAtom(sessionAtom);
  const [sessionUser, setSessionUser] = useAtom(sessionUserAtom);

  useEffect(() => {
    getSession();
  }, [])

  const getSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (data) {
        setSession(data?.session);
        setSessionUser(data?.session?.user);
      }

      if (error) {
        Alert.alert(error.message);
      }
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  )
}