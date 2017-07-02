import files from '../utils/files';

export default function(name, options) {
  // Install starter files with optional routing
  files.new(name, options.routes === 'true');
}