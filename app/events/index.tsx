import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import EventRow from '../../src/components/EventRow'
import type { CampusEvent } from '../../src/data/events'
import { fetchEvents } from '../../src/lib/api'

export default function EventsScreen() {
  const [events, setEvents] = useState<CampusEvent[]>([])
  const [error, setError] = useState('')
  const [savedIds, setSavedIds] = useState<number[]>([])
  const [search, setSearch] = useState('')

  // load once when the screen opens
  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch((e) => setError(e.message))
  }, [])

  const shown = events.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))

  function toggleSaved(id: number) {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((savedId) => savedId !== id))
    } else {
      setSavedIds([...savedIds, id])
    }
  }

  return (
    <View style={styles.container}>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <Text style={styles.hint}>Long-press an event to save it. Saved: {savedIds.length}</Text>
      <TextInput
        style={styles.input}
        placeholder="Search events"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={shown}
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            saved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSaved(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.hint}>No events match</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff5f5',
  },
  hint: {
    marginBottom: 12,
    color: '#4b5563',
  },
  error: {
    marginBottom: 12,
    color: '#b91c1c',
    fontWeight: 'bold',
  },
  input: {
    minHeight: 44,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e5d4d4',
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
})
