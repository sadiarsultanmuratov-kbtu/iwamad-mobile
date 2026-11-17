import { router } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import EventRow from '../../src/components/EventRow'
import { useEvents } from '../../src/hooks/useEvents'

export default function EventsScreen() {
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents()
  const [savedIds, setSavedIds] = useState<number[]>([])
  const [search, setSearch] = useState('')

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#b91c1c" />
        <Text style={styles.hint}>Loading events</Text>
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Could not load events</Text>
        <Text style={styles.hint}>{error.message}</Text>
        <Pressable onPress={() => refetch()} style={styles.button}>
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      </View>
    )
  }

  // computed every render, not stored in state
  const shown = data.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))

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
        refreshing={isRefetching}
        onRefresh={() => refetch()}
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: '#fff5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b91c1c',
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
