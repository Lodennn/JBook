import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of index.js
      build.onResolve(
        { filter: /(^index\.js$)/ },
        async (args: esbuild.OnResolveArgs) => {
          return { path: "index.js", namespace: "a" };
        }
      );

      // Handle relative paths in a module
      build.onResolve(
        { filter: /^\.+\// },
        async (args: esbuild.OnResolveArgs) => {
          const packagePathURL = new URL(
            args.path,
            `https://unpkg.com${args.resolveDir}/`
          ).href;
          return {
            namespace: "a",
            path: packagePathURL,
          };
        }
      );

      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        // console.log("onResolve", args);

        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: "a",
        };
      });
    },
  };
};
