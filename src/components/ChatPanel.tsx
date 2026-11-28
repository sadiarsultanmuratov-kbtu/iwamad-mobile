import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useChat } from '../hooks/useChat'
import { sendMessage } from '../lib/chat'
import { askNotificationPermission } from '../lib/notifications'

type ChatPanelProps = {
  eventId: number
  eventTitle: string
}

export default function ChatPanel({ eventId, eventTitle }: ChatPanelProps) {
  const { messages, status } = useChat(eventId, eventTitle)
  const [text, setText] = useState('')
  const empty = text.trim() === ''

  // ask once when the chat opens
  useEffect(() => {
    askNotificationPermission()
  }, [])

  function handleSend() {
    sendMessage(eventId, text.trim())
    setText('')
  }

  return (
    <View style={styles.panel}>
      <Text style={styles.heading}>Live chat</Text>
      <TextInput
        style={styles.input}
        placeholder="Write a message"
        maxLength={200}
        value={text}
        onChangeText={setText}
      />
      <Pressable
        onPress={handleSend}
        disabled={empty}
        style={[styles.button, empty && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>

      {status === 'connecting' && <Text style={styles.note}>Connecting</Text>}
      {status === 'error' && <Text style={styles.note}>Chat unavailable</Text>}
      {status === 'live' && messages.length === 0 && <Text style={styles.note}>No messages yet</Text>}

      {/* newest first */}
      {[...messages].reverse().map((m) => (
        <Text key={m.id} style={styles.message}>
          {m.author}: {m.text}
        </Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  panel: {
    marginTop: 16,
    gap: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f1f1f',
  },
  input: {
    minHeight: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e5d4d4',
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  button: {
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#b91c1c',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    color: '#4b5563',
  },
  message: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    color: '#1f1f1f',
  },
})
