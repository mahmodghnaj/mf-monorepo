import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export default createModuleFederationConfig({
  name: "passport_form",
  filename: "remoteEntry.js",
  exposes: {
    "./PassportForm": "./src/components/PassportForm",
  },
  shared: {
    react: { singleton: true, eager: false, requiredVersion: "^18.0.0" },
    "react-dom": { singleton: true, eager: false, requiredVersion: "^18.0.0" },
  },
});
