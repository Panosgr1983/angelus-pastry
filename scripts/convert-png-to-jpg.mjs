import https from 'https';
import http from 'http';

const API_KEY = '343239382294598';
const API_SECRET = 'Cq0chVJRKjYRcXz4h86SkaZum_A';
const CLOUD_NAME = 'duvtwanvc';
const AUTH = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');

// All PNG Cloudinary URLs and their public_ids
const images = [
  { path: 'v1779831564/angelus/image95.png', publicId: 'angelus/image95' },
  { path: 'v1779831564/angelus/image96.png', publicId: 'angelus/image96' },
  { path: 'v1779831564/angelus/image97.png', publicId: 'angelus/image97' },
  { path: 'v1779831564/angelus/image98.png', publicId: 'angelus/image98' },
  { path: 'v1779831564/angelus/image99.png', publicId: 'angelus/image99' },
  { path: 'v1779831564/angelus/image100.png', publicId: 'angelus/image100' },
  { path: 'v1779831564/angelus/image101.png', publicId: 'angelus/image101' },
  { path: 'v1779831564/angelus/image102.png', publicId: 'angelus/image102' },
  { path: 'v1779831564/angelus/image103.png', publicId: 'angelus/image103' },
  { path: 'v1779831564/angelus/image104.png', publicId: 'angelus/image104' },
  { path: 'v1779831564/angelus/image105.png', publicId: 'angelus/image105' },
  { path: 'v1779831564/angelus/image106.png', publicId: 'angelus/image106' },
  { path: 'v1779831564/angelus/image107.png', publicId: 'angelus/image107' },
  { path: 'v1779831409/angelus/angelus/image040.png', publicId: 'angelus/angelus/image040' },
  { path: 'v1779831409/angelus/angelus/image044.png', publicId: 'angelus/angelus/image044' },
  { path: 'v1779831409/angelus/angelus/image045.png', publicId: 'angelus/angelus/image045' },
  { path: 'v1779831409/angelus/angelus/image047.png', publicId: 'angelus/angelus/image047' },
  { path: 'v1779831409/angelus/angelus/image048.png', publicId: 'angelus/angelus/image048' },
  { path: 'v1779831409/angelus/angelus/image050.png', publicId: 'angelus/angelus/image050' },
  { path: 'v1779831409/angelus/angelus/image051.png', publicId: 'angelus/angelus/image051' },
  { path: 'v1779831409/angelus/angelus/image052.png', publicId: 'angelus/angelus/image052' },
  { path: 'v1779831409/angelus/angelus/image053.png', publicId: 'angelus/angelus/image053' },
  { path: 'v1779831409/angelus/angelus/image054.png', publicId: 'angelus/angelus/image054' },
  { path: 'v1779831409/angelus/angelus/image055.png', publicId: 'angelus/angelus/image055' },
  { path: 'v1779831409/angelus/angelus/image056.png', publicId: 'angelus/angelus/image056' },
  { path: 'v1779831409/angelus/angelus/image058.png', publicId: 'angelus/angelus/image058' },
  { path: 'v1779831409/angelus/angelus/image059.png', publicId: 'angelus/angelus/image059' },
  { path: 'v1779831409/angelus/angelus/image061.png', publicId: 'angelus/angelus/image061' },
  { path: 'v1779831409/angelus/angelus/image062.png', publicId: 'angelus/angelus/image062' },
  { path: 'v1779831409/angelus/angelus/image063.png', publicId: 'angelus/angelus/image063' },
  { path: 'v1779831409/angelus/angelus/image064.png', publicId: 'angelus/angelus/image064' },
  { path: 'v1779831409/angelus/angelus/image065.png', publicId: 'angelus/angelus/image065' },
  { path: 'v1779905375/image93_cett6o.png', publicId: 'image93_cett6o' },
  { path: 'v1779906104/image094_cn66fx.png', publicId: 'image094_cn66fx' },
  { path: 'v1779840144/angelus/bread-image001.png', publicId: 'angelus/bread-image001' },
  { path: 'v1779840147/angelus/bread-image002.png', publicId: 'angelus/bread-image002' },
  { path: 'v1779840150/angelus/bread-image003.png', publicId: 'angelus/bread-image003' },
  { path: 'v1779840153/angelus/bread-image004.png', publicId: 'angelus/bread-image004' },
  { path: 'v1779840156/angelus/bread-image005.png', publicId: 'angelus/bread-image005' },
  { path: 'v1779840159/angelus/bread-image006.png', publicId: 'angelus/bread-image006' },
  { path: 'v1779840161/angelus/bread-image007.png', publicId: 'angelus/bread-image007' },
  { path: 'v1779840164/angelus/bread-image008.png', publicId: 'angelus/bread-image008' },
  { path: 'v1779840167/angelus/bread-image009.png', publicId: 'angelus/bread-image009' },
  { path: 'v1779840169/angelus/bread-image010.png', publicId: 'angelus/bread-image010' },
  { path: 'v1779840172/angelus/bread-image011.png', publicId: 'angelus/bread-image011' },
  { path: 'v1779840175/angelus/bread-image012.png', publicId: 'angelus/bread-image012' },
  { path: 'v1779840177/angelus/bread-image013.png', publicId: 'angelus/bread-image013' },
  { path: 'v1779840183/angelus/bread-image014.png', publicId: 'angelus/bread-image014' },
  { path: 'v1779840185/angelus/bread-image015.png', publicId: 'angelus/bread-image015' },
  { path: 'v1779840188/angelus/bread-image016.png', publicId: 'angelus/bread-image016' },
  { path: 'v1779840190/angelus/bread-image017.png', publicId: 'angelus/bread-image017' },
  { path: 'v1779840192/angelus/bread-image018.png', publicId: 'angelus/bread-image018' },
  { path: 'v1779840194/angelus/bread-image019.png', publicId: 'angelus/bread-image019' },
  { path: 'v1779840197/angelus/bread-image020.png', publicId: 'angelus/bread-image020' },
  { path: 'v1779840200/angelus/bread-image021.png', publicId: 'angelus/bread-image021' },
  { path: 'v1779840202/angelus/bread-image022.png', publicId: 'angelus/bread-image022' },
];

function uploadToCloudinary(fileUrl, publicId) {
  return new Promise((resolve, reject) => {
    const postData = `file=${encodeURIComponent(fileUrl)}&public_id=${encodeURIComponent(publicId)}&format=jpg&overwrite=true`;
    
    const req = https.request({
      hostname: 'api.cloudinary.com',
      path: `/v1_1/${CLOUD_NAME}/image/upload`,
      method: 'POST',
      headers: {
        'Authorization': `Basic ${AUTH}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            resolve(json.secure_url);
          } catch {
            reject(new Error(`Parse error: ${data.slice(0, 100)}`));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 200)}`));
        }
      });
    });
    
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  const failed = [];
  
  for (let i = 0; i < images.length; i++) {
    const { path, publicId } = images[i];
    const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${path}`;
    
    process.stdout.write(`[${i + 1}/${images.length}] Converting ${publicId}... `);
    
    try {
      const newUrl = await uploadToCloudinary(url, publicId);
      console.log(`✓ ${newUrl}`);
    } catch (err) {
      console.log(`✗ ${err.message}`);
      failed.push(publicId);
    }
    
    // Rate limiting - 500ms between requests
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log(`\n=== Done ===`);
  console.log(`Total: ${images.length}, Failed: ${failed.length}`);
  if (failed.length > 0) {
    console.log('Failed:');
    failed.forEach(f => console.log(`  - ${f}`));
  }
}

main().catch(console.error);
