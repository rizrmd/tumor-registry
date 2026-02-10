// Register tsconfig paths for runtime
require('tsconfig-paths/register');

// Load environment variables
require('dotenv').config();

// Start the server
require('./dist_user/server.js');
