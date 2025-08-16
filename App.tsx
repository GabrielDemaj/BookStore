import Toast from '@components/Toast';
import Nav from '@navigation/AppDrawer';
import { ThemeManager } from '@providers/ThemeManager';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <ThemeManager>
        <Nav />
        <Toast />
      </ThemeManager>
    </SafeAreaProvider>
  );
}

export default App;
