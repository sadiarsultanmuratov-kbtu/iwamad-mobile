import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function App() {
  const [likes, setLikes] = useState(0)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, World!</Text>
      <Text style={styles.name}>Sultanmuratov Shadiyar</Text>

      <Text style={styles.likes}>Likes: {likes}</Text>
      <Pressable onPress={() => setLikes(likes + 1)} style={styles.button}>
        <Text style={styles.buttonText}>Like</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#fff5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#b91c1c',
  },
  name: {
    fontSize: 20,
    color: '#1f1f1f',
  },
  likes: {
    fontSize: 18,
    color: '#1f1f1f',
  },
  button: {
    minHeight: 44, // big enough to tap
    justifyContent: 'center',
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: '#b91c1c',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})