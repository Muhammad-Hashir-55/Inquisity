import * as admin from 'firebase-admin';

let adminAuth: admin.auth.Auth | null = null;

// Service account credentials provided by the user.
const serviceAccount = {
  "type": "service_account",
  "project_id": "studio-7858137319-ca73f",
  "private_key_id": "fd44ffd471501c6f891f428d1839a50bc9d833ea",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDbnV/+PKPo04Pd\neNmT1O8F4WVs16eNzpKCeznu1N2PUmqcDJHtvX88FoIGgRZ3NkR93wfLbyaW/Fk0\nQqrANVpaD2rRINDDRdGQxNu0RSINAz+NBBm+cdUNjpjHwJ/urKAX+swOb1aL4vD2\n06E5eJmbaO8WAPaCQXLhNYPrW+4XNUOCzQW/8zffJQ72HAmDl2v8rb3VWaggKG7c\n27ZsPjTbExNzfcNrBFO/jI050wc6O/jJ6CqMxgx+WWS6+J8UGyOW9j9urQv40wVu\nAnyTlXtCYKtzti9avv7CKiIu7tavWSttrYpUrjh/7+qaRqhVp6RtY1zDd381tvKW\n604kL7qDAgMBAAECggEAJFp2N+8Q0OsmcmRdW+fNE0Oe1vgRz9sIjJnaWqsY6+8g\nH6nDBEAwjiFJr8rxjZVJnC5tq2LAWBD4sTpx6nRKewr/SxPsCs8FZDn6BmrFOrM1\nc2Hg4xITyvU2XCaKMueXbrDA04jhojFUYv9gOlO41a12mkVZiPFNk3MY3b5veJ61\nhS1TEM5LOrniv7lWOr/M+DVBYTVWYLXk15bLbe03sx2yh8qjSyvMwb1SAhHT7uyd\nz0Ob7d3XRH36kqjigrGR7/Rf4QGilF83y4fh1lOX7Dw/MiKEx3UlsQk7o+tJfHiD\nuM/g3U9UvS+7PznpTaXn5BYW7KG7crkRU1K/WfVavQKBgQDxkQekJxTM58vnVyZ+\nAWXKAMFelYXtbv3vPOFor6all7YA4QirTx1r1UdJXQe5Lb4SHjYKKCzROSW5ty5p\nh5DkZdrgXQSPm/ccWSre2hguORMAe/YkzTBYN1Qu9KeBBWN4OBDuxNqLDY475yjW\n/FnnM/oPRvekFWOhAm1fpuW8NQKBgQDovJLXSaqVp26L9LYXfQBtIwH2QIel7Md+\nNZ6aOThQ8glSG/geWufdAxTuW9MaloaLSpHIAhtnvoMPodw73An0ZfJZwyXt5y6R\nw5FGPitaFwV+7OblnHwKTCNq1ERyNgkv7XKQa1QPUWeJRlC9sMaI958O3VE2kYwI\n4MUWIPVC1wKBgCo/mTyGcUbdC3ZscZj8GZdYxnkKYaADF3puBWZPwi+X9wb0VJXR\ngm3HoW4dTSp/64wzqHPiTuRQwF5YwU9HnHm1rrAq1I9hUbith6fuMOh0pvQgug35\nnrQjgtGJ5+4m/LYRrGdsIpshHGKc1aJkhDYA4QPXHDayu6PvR9tsRz4A5AoGAY8ku\nYFX6aK3f7OvgAtQakbB3z+A9CLwrkIZm2RL9fV849dZ+HG23igAfQk9mhLjTOPeg\n55NXsrRxNwucBKJENmBbd3b/VTBQvDiQmgBf0AGc3p2uJfZhDH02lkAqlJlsePsi\nqp8J7INnk+jtB1e619DrhpEHmBDxbIEKn4FEBwMCgYAzwdfATbcuCcS/wETLQ/fj\nzdOgbg3RcEnCiSTN0FL/pE5FjxNDMYMu2l35KqRaAXowy4HMTl55hTSRRHVu3EKY\nHoJxlF8jqGdkKi4qGJNUL6OytJO3YH+Dum0G2XwvV54U012v8JTGMdxkwTppxoQt\n5zLyxy2YAtBJ1k2mGiuBZw==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@studio-7858137319-ca73f.iam.gserviceaccount.com",
};

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    adminAuth = admin.auth();
  } catch (error: any) {
    console.error('Firebase admin initialization error', error.stack);
  }
} else {
    adminAuth = admin.auth();
}


export { adminAuth };
