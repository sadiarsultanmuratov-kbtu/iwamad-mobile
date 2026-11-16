import { router } from 'expo-router'
import { useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import EventRow from '../../src/components/EventRow'
import { events } from '../../src/data/events'

export default function EventsScreen() {
  const [savedIds, setSavedIds] = useState<number[]>([])
  const [search, setSearch] = useState('')

  // computed every render, not stored in state
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
