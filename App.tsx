import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { AllRoutes } from './src/routes';

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar
      barStyle="light-content"
      translucent
      backgroundColor="transparent"
      />
      <AllRoutes />
    </NativeBaseProvider>
  );
}
