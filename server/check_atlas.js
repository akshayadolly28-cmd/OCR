require('dotenv').config();
const dns = require('dns').promises;
const mongoose = require('mongoose');

(async () => {
  const uri = process.env.MONGO_URI;
  console.log('MONGO_URI=', uri);
  if (!uri) {
    console.error('No MONGO_URI in .env');
    process.exit(2);
  }

  try {
    // extract host from mongodb+srv://<user>:<pass>@host/... 
    const m = uri.match(/^mongodb\+srv:\/\/[^^@]+@([^\/\?]+)/);
    const host = m ? m[1] : null;
    if (host) {
      console.log('Resolving SRV for host:', host);
      const srvName = `_mongodb._tcp.${host}`;
      try {
        const records = await dns.resolveSrv(srvName);
        console.log('SRV records:', records);
      } catch (e) {
        console.error('SRV resolve error:', e && e.code ? e.code : e.message || e);
      }
    } else {
      console.log('No SRV host extracted from URI; skipping SRV lookup');
    }
  } catch (e) {
    console.error('DNS check error', e.message || e);
  }

  // Try mongoose connect with short timeout
  try {
    console.log('Attempting mongoose.connect (5s timeout)...');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000, connectTimeoutMS: 5000, socketTimeoutMS: 5000 });
    console.log('Mongoose connected to Atlas successfully');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Mongoose connect error:');
    console.error(err && err.message ? err.message : err);
    process.exit(3);
  }
})();
