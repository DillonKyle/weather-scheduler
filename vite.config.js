import {defineConfig} from 'vite'
import FullReload from "vite-plugin-full-reload"
import RubyPlugin from 'vite-plugin-ruby'
import StimulusHMR from 'vite-plugin-stimulus-hmr'
import path from 'path';

export default defineConfig({
      clearScreen: false,
      plugins: [
          RubyPlugin(), 
          StimulusHMR(), 
          FullReload(["config/routes.rb", "app/views/**/*"], {delay: 300}),
      ]
    }
)