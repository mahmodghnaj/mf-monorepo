import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'host',
  remotes: {
    passport_form: 'passport_form@http://localhost:3001/remoteEntry.js',
  },
  dts: true,
  shared: {
    react: {
      singleton: true,
      requiredVersion: false,
      eager: true,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: false,
      eager: true,
    },
  },
});
