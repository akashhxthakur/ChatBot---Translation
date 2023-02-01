import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ConversationIcon from './src/assets/conversation.png';
import Translate from './src/assets/translate.png';
// import {Conversation as ConversationIcon, Translate} from './assets';
import {Conversation} from './src/components/Conversation';
import {Translation} from './src/components/Translation';

interface ContentProps {
  selectedIndex: number;
}

const Content: React.FC<ContentProps> = ({selectedIndex}) => {
  switch (selectedIndex) {
    case 0:
      return <Conversation />;
    case 1:
      return <Translation />;
    default:
      return <></>;
  }
};

const App: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const changeSelection = (selection: number) => () =>
    setSelectedIndex(selection);
  return (
    <View style={styles.container}>
      <Content {...{selectedIndex}} />
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={changeSelection(0)}>
          <Image style={styles.tabIcon} source={ConversationIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={changeSelection(1)}>
          <Image style={styles.tabIcon} source={Translate} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 30,
    paddingTop: 20,
    backgroundColor: '#82AAE3',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      height: -6,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
});

export default App;
