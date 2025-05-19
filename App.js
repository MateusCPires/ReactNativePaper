import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import ViaCep from './component/ViaCep';
import Banco from './component/Banco';

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Banco></Banco>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282a36',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
