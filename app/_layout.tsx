import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="register" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="privacy" />
        <Stack.Screen name="help" />
        <Stack.Screen name="about" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="settings-edit-profile" />
        <Stack.Screen name="privacy/password" options={{ headerShown: false }} />
        <Stack.Screen name="privacy/visibility" options={{ headerShown: false }} />
        <Stack.Screen name="privacy/two-factor" options={{ headerShown: false }} />
        <Stack.Screen name="privacy/sessions" options={{ headerShown: false }} />
        <Stack.Screen name="privacy/delete-account" options={{ headerShown: false }} />        
      </Stack>
    </>
  );
}