import React, {useCallback, useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Typing from '../../assets/typing.gif';
import {getAnswer} from '../../services/api';
import styles from './styles';

export const Conversation: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [conversation, setConversation] = useState<Record<string, string>>({});
  const scrollRef = useRef<ScrollView>(null);

  const handleSubmit = useCallback(async () => {
    setTimeout(() => scrollRef?.current?.scrollToEnd({animated: true}), 200);
    setConversation(prev => ({
      ...prev,
      ...{[`sent${Object.keys(prev)?.length}`]: text},
    }));
    setText('');
    setLoading(true);
    const answer = await getAnswer(text);
    setLoading(false);
    setConversation(prev => ({
      ...prev,
      ...{[`received${Object.keys(prev)?.length}`]: answer},
    }));
    setTimeout(() => scrollRef?.current?.scrollToEnd({animated: true}), 200);
  }, [text]);

  return (
    <>
      <ScrollView
        ref={scrollRef}
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={styles.scrollView}>
        {Object?.keys(conversation)?.map(keyName => {
          if (keyName?.includes('sent')) {
            return (
              <View
                key={`sent${keyName}`}
                style={[styles.sent, styles.chatBubble]}>
                <Text
                  selectable
                  selectionColor={'purple'}
                  style={styles.msgText}>
                  {conversation?.[keyName]}
                </Text>
              </View>
            );
          }
          return (
            <View key={keyName} style={[styles.received, styles.chatBubble]}>
              <Text selectable selectionColor={'yellow'} style={styles.msgText}>
                {conversation?.[keyName]?.replace('\n', '')?.replace('\n', '')}
              </Text>
            </View>
          );
        })}
        {loading && (
          <View
            key={'typingLoader'}
            style={[styles.received, styles.chatBubble]}>
            <Image
              resizeMode="contain"
              source={Typing}
              style={styles.typingLoader}
            />
          </View>
        )}
      </ScrollView>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TextInput
          blurOnSubmit
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          keyboardAppearance={'dark'}
          keyboardType={'web-search'}
          style={styles.input}
          placeholder="Ask me anything...."
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSubmit}
          placeholderTextColor={'#1116'}
        />
      </KeyboardAvoidingView>
    </>
  );
};
