import { Pressable, StyleSheet, Text } from 'react-native'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import Animated, { FadeIn, FadeOut, LinearTransition, ZoomIn } from 'react-native-reanimated'
import type { CampusEvent } from '../data/events'

type EventRowProps = {
  event: CampusEvent
  saved: boolean
  onPress: () => void
  onToggleSaved: () => void
}

export default function EventRow({ event, saved, onPress, onToggleSaved }: EventRowProps) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition}>
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved()
              swipeable.close()
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>{saved ? 'Unsave' : 'Save'}</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.meta}>
            {event.date} · {event.place}
          </Text>
          {saved && (
            <Animated.Text entering={ZoomIn} style={styles.saved}>
              ★ Saved
            </Animated.Text>
          )}
        </Pressable>
      </Swipeable>
    </Animated.View>
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
  action: {
    minHeight: 44,
    width: 96,
    marginBottom: 12,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#b91c1c',
  },
  actionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
