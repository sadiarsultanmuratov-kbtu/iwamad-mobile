import { Pressable, StyleSheet, Text } from 'react-native'
import type { CampusEvent } from '../data/events'

type EventRowProps = {
  event: CampusEvent
  saved: boolean
  onPress: () => void
  onLongPress: () => void
}

export default function EventRow({ event, saved, onPress, onLongPress }: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>
        {event.date} · {event.place}
      </Text>
      {saved && <Text style={styles.saved}>★ Saved</Text>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5d4d4',
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  cardPressed: {
    backgroundColor: '#fee2e2', // shows the touch
    borderColor: '#b91c1c',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f1f1f',
  },
  meta: {
    fontSize: 14,
    color: '#4b5563',
  },
  saved: {
    marginTop: 4,
    color: '#b91c1c',
    fontWeight: 'bold',
  },
})
