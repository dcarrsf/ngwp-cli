import files from '../utils/files';

export default function(name, options) {
  // Install starter files with optional routing
  // files.new(name, options.routes === 'true');

    // Update confignpm ins
    config.name = name;
    config.routes = routes;
    // Save config in json file
    // todo...
    src_path = routes ? path.join(troot, templ_routes) : path.join(troot, templ);
    // Create folder
    createFolder(ipath, '', name);
    // Update path
    ipath = path.join(ipath, name);
}