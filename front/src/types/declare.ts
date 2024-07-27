declare module 'react-native-config' {
  interface EnvConfig {
    GOOGLE_MAPS_API_KEY: string;
  }

  const Config: EnvConfig;
  export default Config;
}
