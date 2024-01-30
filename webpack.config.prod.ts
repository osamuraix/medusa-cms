import { DuplicateReporterPlugin } from "duplicate-dependencies-webpack-plugin";
import path from "path";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { getWebpackConfig } from "./src/node/webpack/get-webpack-config";

const getProdServerConfig = () => {
  const analyzeBundle = process.env.ANALYZE_BUNDLE;
  const analyzeDuplicateDependencies = process.env.ANALYZE_DEPS;

  const devConfig = getWebpackConfig({
    cacheDir: __dirname,
    dest: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "ui", "src", "main.tsx"),
    env: "production",
    template: path.resolve(__dirname, "ui", "index.html"),
    publicFolder: path.resolve(__dirname, "ui", "public"),
  });

  if (analyzeBundle) {
    devConfig.plugins?.push(new BundleAnalyzerPlugin());
  }

  if (analyzeDuplicateDependencies === "true") {
    devConfig.plugins?.push(new DuplicateReporterPlugin());
  }

  return devConfig;
};

module.exports = getProdServerConfig();
