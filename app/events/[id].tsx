import { Stack, useLocalSearchParams } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { events } from '../../src/data/events'

export default function EventScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const event = events.find((e) => e.id === Number(id)) // id from the URL is a string

  if (!event) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Event not found' }} />
        <Text style={styles.title}>Event not found</Text>
        <Text style={styles.text}>No event with id {id}.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.text}>{event.date}</Text>
      <Text style={styles.text}>{event.place}</Text>
      <Text style={styles.text}>Seats: {event.seats}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 8,
    backgroundColor: '#fff5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b91c1c',
  },
  text: {
    fontSize: 16,
    color: '#1f1f1f',
  },
})
