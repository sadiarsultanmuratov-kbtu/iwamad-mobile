import { Stack, useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import ChatPanel from '../../src/components/ChatPanel'
import HolidayNote from '../../src/components/HolidayNote'
import { useEvents } from '../../src/hooks/useEvents'

export default function EventScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, isPending, isError, error, refetch } = useEvents() // same cache as the list

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#b91c1c" />
        <Text style={styles.text}>Loading events</Text>
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Could not load events</Text>
        <Text style={styles.text}>{error.message}</Text>
        <Pressable onPress={() => refetch()} style={styles.button}>
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      </View>
    )
  }

  const event = data.find((e) => e.id === Number(id)) // id from the URL is a string

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
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Stack.Screen options={{ title: event.title }} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.text}>{event.date}</Text>
      <HolidayNote date={event.date} />
      <Text style={styles.text}>{event.place}</Text>
      <Text style={styles.text}>Seats: {event.seats}</Text>
      <ChatPanel eventId={event.id} eventTitle={event.title} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#fff5f5',
  },
  content: {
    padding: 16,
    gap: 8,
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 8,
    backgroundColor: '#fff5f5',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
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
  button: {
    minHeight: 44,
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
