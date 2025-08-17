import Toast from '@components/Toast';
import i18n from './src/localization/i18n';
import Nav from '@navigation/AppDrawer';
import { ThemeManager } from '@providers/ThemeManager';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <ThemeManager>
          <Nav />
          <Toast />
        </ThemeManager>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}

export default App;
